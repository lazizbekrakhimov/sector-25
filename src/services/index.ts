import toast from "react-hot-toast"
import { instance } from "../hooks"
import { PATH } from "../components"
import type { RegisterDataInterface } from "../pages/Auth/Register"
import type { NavigateFunction } from "react-router-dom"
import type { Dispatch, SetStateAction } from "react"

export const RegisterFc = (data: RegisterDataInterface, navigate: NavigateFunction, setLoading: Dispatch<SetStateAction<boolean>>) => {
    instance().post("/users", data).then(() => {
        toast.success(`${data.name} added successfully`)
        setTimeout(() => navigate(PATH.login), 1000)
    }).finally(() => setLoading(false))
}