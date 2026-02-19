import toast from "react-hot-toast"
import { instance } from "../hooks"
import { PATH } from "../components"
import type { RegisterDataInterface } from "../pages/Auth/Register"
import type { NavigateFunction } from "react-router-dom"
import type { Dispatch, SetStateAction } from "react"

export const RegisterFc = (data: RegisterDataInterface, navigate: NavigateFunction, setLoading: Dispatch<SetStateAction<boolean>>) => {
    instance().post("/users", data).then(() => {
        toast.success(`${data.name} added successfully`)
        setTimeout(() => navigate(PATH.login), 2000)
    }).catch(() => toast.error('Error occurred')).finally(() => setLoading(false))
}

export const LoginFc = (data: { email: string, password: string }, setLoading: Dispatch<SetStateAction<boolean>>, setToken: Dispatch<SetStateAction<string>>, navigate: NavigateFunction) => {
    instance().post("/auth/login", data).then((res) => {
        toast.success(`Successfully logged in`)
        setTimeout(() => {
            setToken(res.data.access_token)
            navigate(PATH.home)
        }, 2000)
    }).catch(() => toast.error("Something went wrong")).finally(() => setLoading(false))
}