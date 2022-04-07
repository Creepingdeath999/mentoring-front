import { from } from 'rxjs'
import axios from 'axios'

type Method = 'GET' | 'POST' | 'PUT' | 'DELETE'

interface IHttp {
  data?: any
  method?: Method
}

export const useHttp = (
  url: string,
  config?: IHttp,
  ...observers: Function[]
) => {
  const http = axios.create({
    baseURL: 'http://localhost:3000/',
    headers: {
      authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  })

  return from(
    http({
      method: config?.method,
      url,
      data: config?.data,
    })
  ).subscribe({
    next: ({ data }) => observers.forEach((observer) => observer(data)),
    error: (err) => console.log(err),
  })
}
