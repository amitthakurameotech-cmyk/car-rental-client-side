import api from './api'

export const register = (data) => api.post('/register', data)
export const login = (data) => api.post('/login', data)
export const forgetPassword = (data) => api.post('/forgetpassword', data)
// Use the explicit reset-password URL the backend sends in email links.
// The backend link format you provided is: http://localhost:3000/reset-password/<token>
// We call the full absolute URL so axios will send the request to the backend host directly.
export const resetPassword = (token, data) =>
	api.patch(`/reset-password/${token}`, data)

export const setAuthToken = (token) => {
	if (token) api.defaults.headers.common['Authorization'] = `Bearer ${token}`
	else delete api.defaults.headers.common['Authorization']
}

export default { register, login, forgetPassword, resetPassword, setAuthToken }
