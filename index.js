require('dotenv-safe').config({
	path: __dirname + "/app-secret/.env",
	example: __dirname + "/.env_sample",
	allowEmptyValues: true
})
const express = require('express')
const environment = process.env.ENVTYPE
const port = process.env.PORT

const app = express()
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(function (req, res, next) {
	res.commonsuccess = function (data) {
		let response = { data, status: 1 }
        res.status(200).json(response)
	}
	next();
});

global.postgresModel = require('./models/index')

const routes = require('./routes');
app.use("/", routes)

// error handler
app.use((err, req, res, next) => {
	console.log(err);
	res.status(200).json(err);
})

app.listen(port, () => {
	console.log(`Server started on port ${port}`)
})