"use strict";
const bcrypt = require('bcrypt');
let { create_jwt_token } = require('../helpers/jwt')
const saltRounds = 10;

let UsersModel = postgresModel.users

exports.signUp = async (req, res, next) => {
	try {
		let request = req.body
		let response
		const data = await UsersModel.findAll({ where: { email: request.email} })
		if(data.length > 0) response = "account with this email already exists"
		else {
			bcrypt.hash(request.password, saltRounds, async function(err, hash) {
				let user = {
					name: request.name,
					email: request.email,
					username: request.username,
					password: hash
				}
				await UsersModel.create(user)
			});
			response = "account created succesfully"
		}
		res.commonsuccess(response)
	} catch (error) {
		next({
			source: "signUp", type: "error",
			content: error
		})
	}
}

exports.login = async (req, res, next) => {
	try {
		let request = req.body
		let response = ""
		if(request.email !== '' && request.password !== ''){
			let data = await UsersModel.findAll({ where: { email: request.email} })
			if(data.length > 0) {
				bcrypt.compare(request.password, data[0].password, function(err, result) {
					if(result) {
						response = { username: data[0].username, name: data[0].name, email: data[0].email }
						let token = create_jwt_token(response)
						response.token = token
					}
					else response = "Incorrect Credentials"
					res.commonsuccess(response)
				});
			}else{
				response = "Account does not exist"
				res.commonsuccess(response)
			}
		}else {
			response = "Please provide email && password"
			res.commonsuccess(response)
		}
	} catch (error) {
		next({
			source: "login", type: "error",
			content: error
		})
	}
}