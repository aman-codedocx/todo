const express = require('express')
const router = new express.Router()
const TodoModel = require('../models/Todo')

const backurl = '/todo'

router.get('/', async (req, res) => {
	try {
		await TodoModel.find({ "status": 0 }, (err, todoList) => {
			if(err) {
				res.render('404', {
					error: err,
					backurl: backurl
				})
			} else {
				res.render('index', {
					todo_list: todoList
				})
			}
		})
	} catch(e) {
		res.render('404', {
			error: e,
			backurl: backurl
		})
	}
})

router.get('/create', async (req, res) => {
	try {
		res.render('create')	
	} catch(e) {
		res.render('404', {
			error: e,
			backurl: backurl
		})
	}
})

router.get('/trash', async (req, res) => {
	try {
		await TodoModel.find({ "status": 1 }, (err, todoList) => {
			if(err) {
				res.render('404', {
					error: err,
					backurl: backurl
				})
			} else {
				res.render('trash', {
					todo_list: todoList
				})
			}
		})
	} catch(e) {
		res.render('404', {
			error: e,
			backurl: backurl
		})
	}
})

router.post('/', async (req, res) => {
	try {
		if(req.body._id) {
			const updateTodo = Object.keys(req.body)
			const todo = await TodoModel.findById(req.body._id)

			updateTodo.forEach((upd) => todo[upd] = req.body[upd])

			await todo.save((err, todoUpdate) => {
				if(err) {
					res.render('404', {
						error: err,
						backurl: backurl
					})
				} else {
					res.redirect('/todo')
				}
			})
		} else {
			const todo = new TodoModel()
			todo.name = req.body.name

			await todo.save((err, result) => {
				if(err) {
					res.render('404', {
						error: err,
						backurl: backurl
					})
				} else {
					res.redirect('/todo')
				}
			})
		}
	} catch(e) {
		res.render('404', {
			error: e,
			backurl: backurl
		})
	}
})

//FOR EDIT FORM
router.get('/edit/:id', async (req, res) => {
	try {
		console.log(req.get('host'))
		await TodoModel.findById(req.params.id, (err, editTodo) => {
			if(err) {
				res.render('404', {
					error: err,
					backurl: backurl
				})
			} else {
				res.render('edit', {
					todo: editTodo
				})
			}
		})
	} catch(e) {
		res.render('404', {
			error: e,
			backurl: backurl
		})
	}
})

router.get('/delete/:_id', async (req, res) => {
	try {
		req.params.deleted_at = new Date()
		req.params.status = 1
		const delTodo = Object.keys(req.params)

		const todo = await TodoModel.findById(req.params._id)

		delTodo.forEach((del) => todo[del] = req.params[del])
		
		await todo.save((err, deleteTodo) => {
			if(err) {
				res.render('404', {
					error: err,
					backurl: backurl
				})
			} else {
				res.redirect('/todo')
			}
		})
	} catch(e) {
		res.render('404', {
			error: e,
			backurl: backurl
		})
	}
})

router.get('/restore/:_id', async (req, res) => {
	try {
		req.params.deleted_at = null
		req.params.status = 0
		const restoreTodo = Object.keys(req.params)

		const todo = await TodoModel.findById(req.params._id)

		restoreTodo.forEach((restore) => todo[restore] = req.params[restore])
		
		await todo.save((err, restTodo) => {
			if(err) {
				res.render('404', {
					error: err,
					backurl: backurl
				})
			} else {
				res.redirect('/todo/trash')
			}
		})
	} catch(e) {
		res.render('404', {
			error: e,
			backurl: backurl
		})
	}
})

router.get('/force/delete/:_id', async (req, res) => {
	try {
		await TodoModel.deleteOne({_id: req.params._id}, (err, forceDel) => {
			if(err) {
				res.render('404', {
					error: err,
					backurl: backurl
				})
			} else {
				res.redirect('/todo/trash')
			}
		})
	} catch(e) {
		res.render('404', {
			error: e,
			backurl: backurl
		})
	}
})

router.get('/trash/empty', async (req, res) => {
	try {
		await TodoModel.deleteMany({status: 1}, (err, trashEmt) => {
			if(err) {
				res.render('404', {
					error: err,
					backurl: backurl
				})
			} else {
				res.redirect('/todo/trash')
			}
		})
	} catch(e) {
		res.render('404', {
			error: e,
			backurl: backurl
		})
	}
})

module.exports = router