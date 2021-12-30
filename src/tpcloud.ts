import axios from 'axios'
import { DeviceInfo } from './types'

export const getDevices = async (token: string): Promise<DeviceInfo[]> => {
  const payload = {
    method: 'getDeviceList',
  }
  const res = await axios.post(`https://wap.tplinkcloud.com?token=${token}`, payload)
  if (res.data.error_code !== 0) {
    throw new Error(`Received error: ${JSON.stringify(res.data)}`)
  }
  return res.data.result.deviceList
}

export const getToken = async (username: string, password: string): Promise<string> => {
  const payload = {
    method: 'login',
    params: {
      appType: 'Tapo_Android',
      cloudUserName: username,
      cloudPassword: password,
      terminalUUID: '0bb7fcd3-36a1-4578-a410-be12ff672bf0',
    },
  }
  const res = await axios.post('https://wap.tplinkcloud.com', payload)
  if (res.data.error_code !== 0) {
    throw new Error(`Received error: ${JSON.stringify(res.data)}`)
  }
  return res.data.result.token
}
