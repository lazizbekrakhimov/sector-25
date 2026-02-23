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

export const getById = (URL: string, setValue: Dispatch<SetStateAction<any>>, setVisible: Dispatch<any>) => {
    instance().get(URL).then(res => {
        setValue(res.data);
        const t = setTimeout(() => setVisible(true), 30);
        return () => clearTimeout(t);
    })
}

export const DeleteFn = (URL: string, setLoading: Dispatch<SetStateAction<boolean>>, setDelModal: Dispatch<SetStateAction<boolean>>, toastTitle: string, navigate: NavigateFunction) => {
    instance().delete(URL).then(() => {
        setLoading(false)
        setDelModal(false)
        toast.success(toastTitle)
        setTimeout(() => navigate(-1), 1000)
    })
}

export const CrudFn = ( id: string | undefined, URL: string, data: any, setLoading: Dispatch<SetStateAction<boolean>>, navigate: NavigateFunction, toastTitle: string) => {
    const request = id
        ? instance().put(`${URL}`, data)
        : instance().post(`${URL}`, data);
    request
        .then(() => {
            toast.success(toastTitle);
            setTimeout(() => navigate(-1), 1000);
        })
        .catch((err) => {
            console.log("SERVER ERROR:", err.response?.data);
            toast.error("Bad request - check console");
        })
        .finally(() => setLoading(false));
};