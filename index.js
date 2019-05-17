const express = require('express')
const https = require('https')
const http = require('http')
const fs = require('fs')
const bodyParser = require('body-parser')
let app = express();

require('./src/helpers/blockchain-helper')(app)

let config
const configPath = './config.json'
const configExists = fs.existsSync(configPath, fs.F_OK)
if (configExists) {
	config = JSON.parse(fs.readFileSync(configPath, 'utf8'))
} else {
	return console.log('There is no config.json file')
}
app.config = config

let web3
app.configureWeb3(config)
.then(web3 => {
	app.web3 = web3
	app.use(express.static(__dirname + '/public'))
	app.use(bodyParser.json({
		limit: '50mb',
	}))
	app.use(bodyParser.urlencoded({
		limit: '50mb',
		extended: true,
	}))

	require('./src/controllers/index')(app)

	app.get('/', function(request, response) {
	  response.send('UND Testnet faucet')
	});

	let listenPort = config.UND[config.environment].port || 5000;

	if app.config.UND[config.environment].ssl == true {
	    var httpsOptions = {
        key: fs.readFileSync(app.config.UND[config.environment].ssl_key, 'utf8'),
        cert: fs.readFileSync(app.config.UND[config.environment].ssl_cert, 'utf8')
      };
	    const httpsServer =  https.createServer(httpsOptions, app);

      httpsServer.listen(listenPort, () => {
	        console.log('HTTPS Server running on port ' + listenPort);
      });
	} else {
	    const httpServer =  http.createServer(app);
	    httpServer.listen(listenPort, () => {
	        console.log('HTTP Server running on port ' + listenPort);
      });
	}


})
.catch(error => {
	return console.log(error)
})