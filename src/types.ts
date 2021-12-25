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

export interface KeyPair {
  privateKey: string
  publicKey: string
}

export interface CipherParam {
  key: Buffer
  iv: Buffer
}
