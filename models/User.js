const {Schema, model} = require('mongoose')
const plm = require('passport-local-mongoose')

const userSchema = new Schema(
  {
    email: String,
    password: String,
    role: {
      type: String,
      enum: ['PATRON', 'WERO'],
      default: 'WERO'
    },
    profile: {
      ref: 'Profile',
      type: Schema.Types.ObjectId
    }
  },
  {
    timestamps: {
      createdAt: 'createdAt',
      updatedAt: 'updatedAt'
    }
  }
)

userSchema.plugin(plm, {usernameField: 'email'})

module.exports = model('User', userSchema)
