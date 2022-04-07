import { Dispatch, SetStateAction } from 'react'

export interface IContext {
  token: {
    token: string | null
    setToken: Dispatch<SetStateAction<string | null>>
  }
}
