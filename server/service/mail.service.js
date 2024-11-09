const nodemailer = require('nodemailer')

class MailService {
	constructor() {
		this.transporter = nodemailer.createTransport({
			host: process.env.SMTP_HOST,
			port: process.env.SMTP_PORT,
			secure: false,
			auth: {
				user: process.env.SMTP_USER,
				pass: process.env.SMTP_PASS,
			},
		})
	}

	async sendOtp(to) {
		const otp = Math.floor(100000 + Math.random() * 900000) // 6 digit otp
		console.log(otp)

		await this.transporter.sendMail({
			from: process.env.SMTP_USER,
			to,
			subject: `OTP for verification ${new Date().toLocaleString()}`,
			html: `<h1>Your OTP is ${otp}</h1>`,
		})
	}

	async verifyOtp(to, subject, text) {}
}

module.exports = new MailService()
