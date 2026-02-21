import type { ReactNode } from "react"

type CardButtonVariant = "view" | "delete" | "default"

interface CardButtonProps {
    onClick?: () => void
    children: ReactNode
    variant?: CardButtonVariant
    extraClass?: string
}

const variantClass: Record<CardButtonVariant, string> = {
    view: "hover:border-[#d4a017] hover:text-[#d4a017]",
    delete: "hover:border-[#8b1a1a] hover:text-[#8b1a1a]",
    default: "hover:border-[#1a1a1a] hover:text-[#1a1a1a]",
}

const CardButton = ({ onClick, children, variant = "default", extraClass = "" }: CardButtonProps) => {
    return (
        <button onClick={onClick} className={` w-9 h-9 shrink-0 flex items-center justify-center border-2 border-[#1a1a1a]/20  text-[#1a1a1a]/35 transition-all duration-200 ${variantClass[variant]} ${extraClass} `}>
            {children}
        </button>
    )
}

export default CardButton