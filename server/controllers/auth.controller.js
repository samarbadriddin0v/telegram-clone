class AuthController {
	async login(req, res, next) {
		const { email } = req.body
		res.json({ email })
	}
	async verify(req, res, next) {
		const { email, otp } = req.body
		res.json({ email, otp })
	}
}

module.exports = new AuthController()

// CLIENT bilan SERVER data muloqot tili bu JSON formatda bo'ladi
