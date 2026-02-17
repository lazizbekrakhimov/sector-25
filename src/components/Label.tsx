import type { FC } from "react"

interface LabelType {
    content: string
}

const Label: FC<LabelType> = ({ content }) => {
    return (
        <label className="absolute -top-4 text-[9px] uppercase tracking-[0.3em] font-bold text-[#333]">
            {content}
        </label>
    )
}

export default Label