## UND Testnet faucet

### Building from source

1. Clone repository
  ```
  git clone https://github.com/unification-com/und-faucet
  ```
2. Copy `config.json.example` to `config.json`
  ```
  cp config.json.example config.json
  ```
2. Update config.json `./config.json` (see config.json with placeholders below)
3. Update `./public/index.html`: Find `<div class="g-recaptcha" data-sitekey="type your reCaptcha plugin secret here"></div>` line and type your reCaptcha plugin secret in `data-sitekey` attribute. For more info, [see](https://developers.google.com/recaptcha/docs/verify?hl=ru)
4. Install dependencies `npm install` from the project's root
5. Run faucet with `npm start`. UND Testnet faucet will be launched at `http://localhost:5000`

### Server config.json (`./config.json`) with placeholders
```
{
  "environment": "switcher between configurations: 'prod' or 'dev'",
  "debug": "switch on/off server logs: true or false",
  "Captcha": {
    "secret": "reCaptcha plugin secret"
  },
  "UND": {
    "milliUndToTransfer": "The number of milliEther to be sent from the faucet. For example, 500",
    "gasLimit": "Transaction gas limit, for example, 22000",
    "prod": {
      "rpc": "JSON RPC endpoint. For example, https://rpc.testnet.unification.com",
      "account": "The address from which the funds will be drained",
      "privateKey": "Private key of the account",
      "block_explorer": "Block explorer URL,
      "ssl_cert": "/path/to/cert.crt",
      "ssl_key": "/path/to/key.key",
      "port": 5000
    },
    "dev": {
      ...
    }
  }
}
