import { AxiosPromise } from 'axios'

import apiFetch from './base'

const URL = `/login`

const login = (data: {
  email: string
  password: string
}): AxiosPromise => apiFetch(URL, { data, method: `POST` })

export default login
