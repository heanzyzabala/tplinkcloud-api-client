import { AxiosResponse } from 'axios'

export interface P105HandshakeResponse {
  axiosResponse: AxiosResponse
  cipherParam: CipherParam
}

export interface P105LoginResponse {
  axiosResponse: AxiosResponse
  token: string
}
export interface P105Option {
  ip: string
  username: string
  password: string
  keyPair?: KeyPair
}

export interface LocalDevice {
  ip: string
  type: string
  name: string
  alias: string
  mac: string
  model: string
  status: number
}

export interface Device {
  deviceType: string
  deviceName: string
  alias: string
  deviceMac: string
  deviceModel: string
  status: number
}
export interface KeyPair {
  privateKey: string
  publicKey: string
}

export interface CipherParam {
  key: Buffer
  iv: Buffer
}
