const { Schema, model } = require('mongoose')

const otpSchema = new Schema({
	email: { type: String, required: true },
	otp: { type: String, required: true },
	expireAt: { type: Date },
})

module.exports = model('Otp', otpSchema)
