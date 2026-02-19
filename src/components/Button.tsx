import type { MouseEventHandler, ReactNode } from "react"
import type React from "react"

interface ButtonProps {
    children: ReactNode,
    type: "button" | "submit",
    extraClass?: string
    onclick?: MouseEventHandler<HTMLButtonElement>
}

const Button: React.FC<ButtonProps> = ({ type, extraClass, children, onclick }) => {
    return (
        <button type={type} onClick={onclick} className={` w-full mt-4 bg-[#8b1e1e] text-[#c7c0b1] py-3 font-black uppercase tracking-[0.3em] border-[#8b1e1e] border-2 hover:bg-[#c7c0b1] hover:text-[#8b1e1e] hover:border-[#8b1e1e] transition-all duration-200 cursor-pointer ${extraClass} `}>
            {children}
        </button>
    )
}

export default Button