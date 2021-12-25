import axios from 'axios'
import * as crypto from 'crypto'

import { CipherParam, KeyPair, P105HandshakeResponse, P105LoginResponse, P105Option } from './types'
import { decrypt, decryptHandshakeKey, encrypt, generateKeyPair } from './util'

export class P105 {
	private ip: string
	private username: string
	private password: string
	private privateKey: any
	private publicKey: any

	private cipherParam: CipherParam
	private cookie: string
	private token: string

	constructor(option: P105Option) {
		this.ip = option.ip
		this.username = option.username
		this.password = option.password
		this.resolveKeyPair(option.keyPair)
	}

	private resolveKeyPair(keyPair?: KeyPair) {
		if (!keyPair) {
			console.log('No keyPair provided. Generating.')
			const pair = generateKeyPair()
			this.privateKey = pair.privateKey
			this.publicKey = pair.publicKey
		} else {
			this.privateKey = keyPair.privateKey
			this.publicKey = keyPair.publicKey
		}
	}

	async handshake(): Promise<P105HandshakeResponse> {
		try {
			const url = `http://${this.ip}/app`
			const payload = {
				method: 'handshake',
				params: {
					key: this.publicKey.toString('utf8'),
					requestTimeMils: Math.round(Date.now() * 1000),
				},
			}
			const res = await axios.post(url, payload)
			if (res.data.error_code !== 0) {
				throw new Error(`Received error: ${JSON.stringify(res.data)}`)
			}
			const cipherParam = decryptHandshakeKey(res.data.result.key, this.privateKey)
			this.cipherParam = cipherParam
			// @ts-ignore
			this.cookie = res.headers['set-cookie'][0].split(';')[0]
			return {
				axiosResponse: res,
				cipherParam,
			}
		} catch (err) {
			throw err
		}
	}

	async login(): Promise<P105LoginResponse> {
		try {
			const url = `http://${this.ip}/app`
			const hashedUsername = crypto.createHash('sha1').update(this.username).digest('hex')
			const encodedUsername = Buffer.from(hashedUsername).toString('base64')
			const encodedPassword = Buffer.from(this.password).toString('base64')
			const payload = {
				method: 'login_device',
				params: {
					username: encodedUsername,
					password: encodedPassword,
				},
				requestTimeMils: Math.round(Date.now() * 1000),
			}

			const encryptedPayload = encrypt(this.cipherParam, JSON.stringify(payload))
			const securePayload = {
				method: 'securePassthrough',
				params: {
					request: encryptedPayload,
				},
			}
			const config = {
				headers: {
					Cookie: this.cookie,
				},
			}
			const res = await axios.post(url, securePayload, config)
			if (res.data.error_code !== 0) {
				throw new Error(`Received error: ${JSON.stringify(res.data)}`)
			}
			const decrypted = decrypt(this.cipherParam, res.data.result.response)
			const parsed = JSON.parse(decrypted)
			if (parsed.error_code !== 0) {
				throw new Error(`Received inner error: ${JSON.stringify(parsed)}`)
			}
			const token = parsed.result.token
			this.token = token
			return {
				axiosResponse: res,
				token,
			}
		} catch (err) {
			throw err
		}
	}

	async toggle(status: boolean): Promise<void> {
		try {
			const url = `http://${this.ip}/app?token=${this.token}`
			const payload = {
				method: 'set_device_info',
				params: {
					device_on: status,
				},
				requestTimeMils: Math.round(Date.now() * 1000),
			}

			const encryptedPayload = encrypt(this.cipherParam, JSON.stringify(payload))
			const securePayload = {
				method: 'securePassthrough',
				params: {
					request: encryptedPayload,
				},
			}
			const config = {
				headers: {
					Cookie: this.cookie,
				},
			}
			const res = await axios.post(url, securePayload, config)
			if (res.data.error_code !== 0) {
				throw new Error(`Received error: ${JSON.stringify(res.data)}`)
			}
			const decrypted = decrypt(this.cipherParam, res.data.result.response)
			const parsed = JSON.parse(decrypted)
			if (parsed.error_code !== 0) {
				throw new Error(`Received inner error: ${JSON.stringify(parsed)}`)
			}
		} catch (err) {
			throw err
		}
	}
}
