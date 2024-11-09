import { IUser } from '@/types'
import { Schema, models, model } from 'mongoose'

const userSchema = new Schema<IUser>({
	email: { type: String, required: true, unique: true },
	isVerified: { type: Boolean, default: false },
	firstName: { type: String },
	lastName: { type: String },
	bio: { type: String },
	avatar: { type: String },
	muted: { type: Boolean, default: false },
	notificationSound: { type: String, default: 'notification.mp3' },
	sendingSound: { type: String, default: 'sending.mp3' },
	contacts: [{ type: Schema.Types.ObjectId, ref: 'User' }],
})

const User = models.User || model<IUser>('User', userSchema)
export default User
