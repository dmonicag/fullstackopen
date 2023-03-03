const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  username: String,
  user: String,
  passwordHash: String,
  blogs: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Blog'
  }
})

userSchema.set('toJSON', {
  transform: (document, result) => {
    result.id = result._id.toString()
    delete result._id
    delete result.__v
    delete result.passwordHash
  }
})

const User = mongoose.model('User', userSchema)
module.exports = User