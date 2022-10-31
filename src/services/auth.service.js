import api from "../config/api"

const authService = {
    login(form) {
        return api.post('/login', form)
    },
    register(form) {
        return api.post('/register', form)
    },
    refreshToken(form) {
        return api.post('/refresh-token', form)
    }
}

export default authService