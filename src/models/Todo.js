const mongoose = require('mongoose')

const TodoSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
		trim: true
	},
	created_at: {
		type: Date,
		required: true, 
		default: Date.now
	},
	modified_at: {
		type: Date,
		required: true, 
		default: Date.now
	},
	deleted_at: {
		type: Date,
		default: ''
	},
	status: {
		type: Number,
		default: 0
	}
})

TodoSchema.pre('save', function(next) {
    const todo = this
    todo.modified_at = Date.now

    next()
})

const Todo = mongoose.model('Todo', TodoSchema)

module.exports = Todo