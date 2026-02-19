import { createContext, type Dispatch, useState, type ReactNode, type SetStateAction } from "react";

interface ContextType {
    token: string,
    setToken: Dispatch<SetStateAction<string>>
}

export const Context = createContext<ContextType>({} as ContextType)

export const TokenContext = ({ children }: { children: ReactNode }) => {
    const [token, setToken] = useState<string>(localStorage.getItem("token") || "")
    localStorage.setItem("token", token)
    return <Context.Provider value={{ setToken, token }}>{children}</Context.Provider>
}