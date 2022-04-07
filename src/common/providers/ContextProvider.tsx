import { createContext, PropsWithChildren, ReactNode, useState } from 'react'
import { IContext } from '../interfaces'

export const ApplicationContext = createContext<IContext | null>(null)

export const ContextProvider = ({ children }: PropsWithChildren<ReactNode>) => {
  const [token, setToken] = useState<string | null>(null)
  return (
    <ApplicationContext.Provider
      value={{
        token: { token, setToken },
      }}
    >
      {children}
    </ApplicationContext.Provider>
  )
}
