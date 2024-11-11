const { Schema, model } = require('mongoose')
const { CONST } = require('../lib/constants')

const messageSchema = new Schema(
	{
		sender: { type: Schema.Types.ObjectId, ref: 'User', required: true },
		receiver: { type: Schema.Types.ObjectId, ref: 'User', required: true },
		text: { type: String },
		image: { type: String },
		status: { type: String, enum: [CONST.DELIVERED, CONST.READ, CONST.SENT], default: CONST.SENT },
		reaction: { type: String },
	},
	{ timestamps: true }
)

module.exports = model('Message', messageSchema)
