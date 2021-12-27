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

The `username` and `password` are your Tapo credentials when using the app.

The `ip` is the local ip address of the device you want to access.
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
