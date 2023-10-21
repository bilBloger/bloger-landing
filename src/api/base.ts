import axios, { AxiosRequestConfig } from 'axios'
import { nanoid } from 'nanoid'


interface IApiFetchOptions extends AxiosRequestConfig {
  withAuth?: boolean
  formData?: boolean
}

function uuidv4() {
  return nanoid(8).toString()
}


const apiFetch = (url: string, options: IApiFetchOptions = {}) => {
  const defaultOptions: IApiFetchOptions = {
    method: `GET`,
    headers: {
      'Content-Type': `application/json`,
      'X-Trace-Id': uuidv4(),
    },
    validateStatus: status => status !== 401,
    baseURL: `https://server.bilbet.com`,
  }

  return axios(url, { ...defaultOptions, ...options })
}

export default apiFetch
