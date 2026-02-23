import type { FC } from "react"

interface LabelType {
    content: string
    extraClass?: string
}

const Label: FC<LabelType> = ({ content, extraClass }) => {
    return (
        <label className={`absolute -top-4 text-[9px] uppercase tracking-[0.3em] font-bold text-[#333] ${extraClass}`}>
            {content}
        </label>
    )
}

export default Label