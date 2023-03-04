const mongoose = require('mongoose')
const validator = require('mongoose-unique-validator')

const userSchema = new mongoose.Schema({
  blogs: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Blog'
  }],
  username: {
    type: String,
    required: true,
    minLength: 3,
    unique: true
  },
  user: String,
  passwordHash: String
})

userSchema.set('toJSON', {
  transform: (document, result) => {
    result.id = result._id.toString()
    delete result._id
    delete result.__v
    delete result.passwordHash
  }
})

userSchema.plugin(validator)
const User = mongoose.model('User', userSchema)
module.exports = User