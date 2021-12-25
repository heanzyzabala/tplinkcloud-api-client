import { P105 } from '../src'

describe('P105', () => {
	it('should successfully handshake ', async () => {
		const device = new P105({
			ip: '192.168.1.14',
			username: 'sample@gmail.com',
			password: 'password',
		})

		const { cipherParam } = await device.handshake()
		expect(cipherParam.key).toBeTruthy()
		expect(cipherParam.iv).toBeTruthy()
	})

	it('should succesfully login', async () => {
		const device = new P105({
			ip: '192.168.1.14',
			username: 'sample@gmail.com',
			password: 'password',
		})
		await device.handshake()

		const { token } = await device.login()
		expect(token).toBeTruthy()
	})

	it('should successfully toggle', async () => {
		const device = new P105({
			ip: '192.168.1.14',
			username: 'sample@gmail.com',
			password: 'password',
		})
		await device.handshake()
		await device.login()

		await device.toggle(true)
	})
})
