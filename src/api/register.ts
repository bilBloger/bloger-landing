import { AxiosPromise } from 'axios'

import apiFetch from './base'

const URL = `/register`

const register = (data: {
  email: string
  password: string
  currency: string
  referrer_id?: string
  partner_id?: string
}, params: { 
  guid: string
  promocode_name?: string
  preferences?: string
  lp?: string
}): AxiosPromise => apiFetch(URL, { data, method: `POST`, params })

export default register
