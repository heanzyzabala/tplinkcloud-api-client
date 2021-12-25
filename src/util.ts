import * as crypto from 'crypto'
import { CipherParam, KeyPair } from './types'

export const generateKeyPair = (): KeyPair => {
	return crypto.generateKeyPairSync('rsa', {
		publicKeyEncoding: {
			type: 'spki',
			format: 'pem',
		},
		privateKeyEncoding: {
			type: 'pkcs1',
			format: 'pem',
		},
		modulusLength: 1024,
	})
}

export const decryptHandshakeKey = (key: string, privateKey: any): CipherParam => {
	const buffer = Buffer.from(key, 'base64')
	const decrypted = crypto.privateDecrypt(
		{
			key: privateKey,
			padding: crypto.constants.RSA_PKCS1_PADDING,
		},
		buffer,
	)
	return {
		key: decrypted.slice(0, 16),
		iv: decrypted.slice(16, 32),
	}
}

export const encrypt = (cipherParam: CipherParam, payload: any): string => {
	const cipher = crypto.createCipheriv('aes-128-cbc', cipherParam.key, cipherParam.iv)
	let encrypted = cipher.update(payload, 'utf8', 'base64')
	encrypted += cipher.final('base64')
	return encrypted
}

export const decrypt = (cipherParam: CipherParam, payload: any): string => {
	const decipher = crypto.createDecipheriv('aes-128-cbc', cipherParam.key, cipherParam.iv)
	let decrypted = decipher.update(payload, 'base64', 'utf8')
	decrypted += decipher.final('utf8')
	return decrypted
}
