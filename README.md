# TP-Link Cloud API Client
<p align="left">
  <a href="./LICENSE.md"><img src="https://img.shields.io/badge/license-MIT-blue.svg" alt="License MIT"/></a>
<p>

A simple library to interact with TP-Link cloud devices. (Currently supports Tapo P105)

## Installation
Install using npm:
```bash
npm i @hzabala/tplinkcloud-api-client
```

## Usage
Create a `P105` instance and provide required credentials.

Perform a handshake and login before executing an action, any subsequent actions are automatically authenticated.

```typescript
import { P105 } from '@hzabala/tplinkcloud-api-client'

const device = new P105('192.168.1.14', 'sample@gmail.com', 'password')
await device.handshake()
await device.login()

await device.toggle(true) // turn on the device
await device.toggle(false) // turn off the device
```

The `username` and `password` are your tplink account credentials used here: [TP-Link Tapo](https://apps.apple.com/us/app/tp-link-tapo/id1472718009)

The `ip` is the local ip address of the device you want to access.

## Discovering device IP
Use `getLocalDevices` to list all the devices connected to your tplink account that's available in your local network. (filtered by device mac address)
```typescript
import { getLocalDevices, getToken } from "@hzabala/tplinkcloud-api-client"
const token = await getToken('sample@gmail.com', 'password')
const localDevices = await getLocalDevices(token)

console.log(localDevices)
```
In this example, if you have a 3rd P105 plug that is connected to another local network then it will not be listed.
```console
[
  {
    deviceType: 'SMART.TAPOPLUG',
    role: 0,
    fwVer: '1.3.2 Build 20210122 Rel. 57063',
    appServerUrl: 'https://aps1-wap.tplinkcloud.com',
    deviceRegion: 'ap-southeast-1',
    deviceId: '*redacted*',
    deviceName: 'P105',
    deviceHwVer: '1.0.0',
    alias: 'Bedroom 1',
    deviceMac: '*redacted*',
    oemId: '*redacted*',
    deviceModel: 'P105',
    hwId: '*redacted*',
    fwId: '*redacted*',
    isSameRegion: true,
    status: 0
  },
  {
    deviceType: 'SMART.TAPOPLUG',
    role: 0,
    fwVer: '1.3.2 Build 20210122 Rel. 57063',
    appServerUrl: 'https://aps1-wap.tplinkcloud.com',
    deviceRegion: 'ap-southeast-1',
    deviceId: '*redacted*',
    deviceName: 'P105',
    deviceHwVer: '1.0.0',
    alias: 'Bedroom 2',
    deviceMac: '*redacted*',
    oemId: '*redacted*',
    deviceModel: 'P105',
    hwId: '*redacted*',
    fwId: '*redacted*',
    isSameRegion: true,
    status: 0
  }
```
Alternatively, you can use `arp` to lookup devices in your local network and manually filter them by name. (in this case, you only need `tapo_smartplug`)
```console
foo@bar:~$ arp -a
iphone (192.168.1.7) at *redacted* on en0 ifscope [ethernet]
mbp (192.168.1.8) at *redacted* on en0 ifscope [ethernet]  
tapo_smartplug (192.168.1.12) at *redacted* on en0 ifscope [ethernet]
tapo_smartplug (192.168.1.14) at *redacted* on en0 ifscope [ethernet]  
```
## Contributing

Pull requests are welcome. Please open an issue first to discuss what you would like to change.

Inspired by:
- https://github.com/fishbigger/TapoP100
- https://github.com/K4CZP3R/tapo-p100-python

## License
```
MIT License

Copyright (c) 2021 Heanzy Zabala

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```
