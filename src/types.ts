import { AxiosResponse } from 'axios'

export interface HandshakeResponse {
  axiosResponse: AxiosResponse
  cipherParam: CipherParam
}

export interface LoginResponse {
  axiosResponse: AxiosResponse
  token: string
}

export interface DeviceInfo {
  deviceType: string
  role: number
  fwVer: string
  appServerUrl: string
  deviceRegion: string
  deviceId: string
  deviceName: string
  deviceHwVer: string
  alias: string
  deviceMac: string
  oemId: string
  deviceModel: string
  hwId: string
  fwId: string
  isSameRegion: boolean
  status: number
  ipAddress?: string
}
export interface KeyPair {
  privateKey: string
  publicKey: string
}

export interface CipherParam {
  key: Buffer
  iv: Buffer
}
