const mongoose = require('mongoose')

mongoose.connect('mongodb://admin:redfort143@172.30.216.245:27017/sampledb', {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useFindAndModify: false
})

// const dbConnection = mongoose.connection

// dbConnection.on('error', console.error.bind(console, 'Connection error'))
// dbConnection.once('open', function () {
// 	console.log('Connected Successfully!')
// })
