import axios from 'axios'

export const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL

export const axiosClient = axios.create({
	baseURL: SERVER_URL,
	headers: { 'Content-Type': 'application/json' },
})
