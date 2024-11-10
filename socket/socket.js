const io = require('socket.io')(5000, {
	cors: { origin: '*', methods: ['GET', 'POST'] },
})

let users = [] // {user, socketId}

const addOnlineUser = (user, socketId) => {
	const checkUser = users.find(u => u.user._id === user._id)
	if (!checkUser) {
		users.push({ user, socketId })
	}
}

io.on('connection', socket => {
	console.log('User connected', socket.id)

	socket.on('addOnlineUser', user => {
		addOnlineUser(user, socket.id)
		io.emit('getOnlineUsers', users)
	})

	socket.on('disconnect', () => {
		console.log('User disconnected', socket.id)
		users = users.filter(u => u.socketId !== socket.id)
		io.emit('getOnlineUsers', users)
	})
})
