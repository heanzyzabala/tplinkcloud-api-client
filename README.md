# TP-Link Smart API
<p align="left">
  <a href="./LICENSE.md"><img src="https://img.shields.io/badge/license-MIT-blue.svg" alt="License MIT"/></a>
<p>

A simple library to interact with a TP-Link Tapo P105. 

## Installation
Install using npm:
```bash
npm i @hzabala/tplink-smart-api
```

## Usage
Create an instance of `P105` and provide required `P105Option`. 

Initially, you need to perform a handshake and login before executing an action, any subsequent actions are automatically authenticated.

```typescript
import { P105, P105Option } from "@hzabala/tplink-smart-api"

const option: P105Option = {
  ip: "192.168.1.14",
  username: "sample@gmail.com",
  password: "password",
};

const device = new P105(option)
await device.handshake()
await device.login()
await device.toggle(true) // turn on the device
await device.toggle(false) // turn off the device
```

The `username` and `password` are your tplink account credentials used here: [TP-Link Tapo](https://apps.apple.com/us/app/tp-link-tapo/id1472718009)

The `ip` is the local ip address of the device you want to access.

## Discovering device IP
Use `getLocalDevices` to list all the devices connected to your tplink account that is available in your local network. (filtered by device mac address)
```typescript
import { getLocalDevices, getToken } from "@hzabala/tplink-smart-api"
const token = await getToken('sample@gmail.com', 'password')
const localDevices = await getLocalDevices(token)

console.log(localDevices)
```
In this example, if you have a 3rd P105 plug that is connected to another local network then it will not be listed.
```console
[
  {
    ip: '192.168.1.12',
    type: 'SMART.TAPOPLUG',
    name: 'P105',
    alias: 'AC 2',
    mac: '*redacted*',
    model: 'P105',
    status: 0
  },
  {
    ip: '192.168.1.14',
    type: 'SMART.TAPOPLUG',
    name: 'P105',
    alias: 'AC 2',
    mac: '*redacted*',
    model: 'P105',
    status: 0
  }
]  
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
