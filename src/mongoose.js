const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/todo-task', {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useFindAndModify: false
})

const dbConnection = mongoose.connection

dbConnection.on('error', console.error.bind(console, 'Connection error'))
dbConnection.once('open', function () {
	console.log('Connected Successfully!')
})