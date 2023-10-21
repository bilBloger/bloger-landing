import Cookies from 'js-cookie'

const setTokensAndRedirect = async (authToken: string, refreshToken: string, redirectRoute?: string) => {
  Cookies.set('auth._token.local', `Bearer ${authToken}`)
  Cookies.set('auth._refresh_token.local', refreshToken, { expires: 30 })
  localStorage.setItem('auth._token.local', `Bearer ${authToken}`)
  localStorage.setItem('auth._refresh_token.local', refreshToken)
  window.location.assign(redirectRoute || "/")
}

export default setTokensAndRedirect
