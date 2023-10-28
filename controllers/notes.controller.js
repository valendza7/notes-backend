"use strict";

let NotesModel = postgresModel.notes

exports.getall = async (req, res, next) => {
	try {
		let response
		let requestuser = req.user
		const data = await NotesModel.findAll({ where: { userid: requestuser.userid } })
		if(data.length > 0) response = data
		else {
			response = "Notes list is empty"
		}

		res.commonsuccess(response)
	} catch (error) {
		next({
			source: "get", type: "error",
			content: error
		})
	}
}

exports.get = async (req, res, next) => {
	try {
		let requestid = req.params.id
		let response
		const data = await NotesModel.findOne({ where: { noteid: requestid} })
		if(data) response = data
		else {
			response = "No Note with this key"
		}
		res.commonsuccess(response)
	} catch (error) {
		next({
			source: "get", type: "error",
			content: error
		})
	}
}

exports.create = async (req, res, next) => {
	try {
		let response
		let insertdata = {
			note_data: req.body.note_data,
			userid: req.user.userid
		}
		const data = await NotesModel.create(insertdata)
		response = "Note Saved"
		res.commonsuccess(response)
	} catch (error) {
		next({
			source: "get", type: "error",
			content: error
		})
	}
}

exports.edit = async (req, res, next) => {
	try {
		let response
		let insertdata = {
			note_data: req.body.note_data
		}
		const note = await NotesModel.findOne({ where: { noteid: req.params.noteid} })
		if(note.userid == req.user.userid){
			const data = await NotesModel.update(insertdata, {where: { noteid: req.params.noteid}})
			response = "Note Saved"	
		}
		else response = "You can't edit someone else's note"
		res.commonsuccess(response)
	} catch (error) {
		next({
			source: "get", type: "error",
			content: error
		})
	}
}

exports.delete = async (req, res, next) => {
	try {
		let response
		let insertdata = {
			note_data: req.body.note_data
		}
		const note = await NotesModel.findOne({ where: { noteid: req.params.noteid} })
		if(note.userid == req.user.userid){
			const data = await NotesModel.destroy({where: { noteid: req.params.noteid}})
			response = "Note Deleted"	
		}
		else response = "You can't delete someone else's note"
		res.commonsuccess(response)
	} catch (error) {
		next({
			source: "get", type: "error",
			content: error
		})
	}
}