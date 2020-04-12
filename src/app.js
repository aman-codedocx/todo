const express = require('express')
const hbs = require('hbs')
const path = require('path')
const db = require('./mongoose')
const bodyParser = require('body-parser')
const todoRouter = require('./routers/todo')

const app = express();
const port = process.env.PORT || 4000

const public_path = path.join(__dirname, '../public')
const views = path.join(__dirname, '../templates/views')
const partial_view = path.join(__dirname, '../templates/partial')

app.set('view engine', 'hbs')
app.set('views', views)
hbs.registerPartials(partial_view)
app.use(express.static(public_path))

app.use(bodyParser.urlencoded({
	extended: true
}))
app.use(bodyParser.json());
app.listen(port, () => {
	console.log('Server started on '+port)
})
app.use('/todo', todoRouter)