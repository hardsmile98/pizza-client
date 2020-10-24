import { AUTH_SUCCESS, AUTH_LOGOUT } from './actionTypes'

export const login = (token: string) => {
  localStorage.setItem('token', token)
  return {
    type: AUTH_SUCCESS,
    token,
  }
}

export const logout = () => {
  localStorage.removeItem('token')
  return {
    type: AUTH_LOGOUT,
  }
}

export const autoLogin = () => {
  return (dispatch: any) => {
    const token = localStorage.getItem('token')
    if (!token) {
      dispatch(logout())
    } else {
      dispatch(login(token))
    }
  }
}
