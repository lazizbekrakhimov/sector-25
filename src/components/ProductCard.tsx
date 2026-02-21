import { useState } from "react"
import type { ProductType } from "../@types"
import CardButton from "./CardButton"
import { EyeIcon, TrashIcon } from "lucide-react"
import { EditIcon } from "../assets/icons"
import { useNavigate } from "react-router-dom"


interface ProductCardProps {
  item: ProductType
}

const ProductCard = ({ item }: ProductCardProps) => {
  const navigate = useNavigate()
  const [imgErr, setImgErr] = useState(false)
  const [hovered, setHovered] = useState(false)

  const cover = item.images?.[0]
  const hasImg = !!cover && !imgErr

  return (
    <div
      onClick={() => navigate(`${item.id}`)}
      className="relative w-full cursor-pointer pr-1.25 pb-1.25 group"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="absolute top-1.25 left-1.25 right-0 bottom-0 bg-[#1a1a1a] z-0 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:translate-y-0.5" />
      <div className={`relative z-10 flex flex-col bg-[#c7c0b1] border-2 border-[#1a1a1a] overflow-hidden transition-transform duration-200 ${hovered ? "-translate-x-0.5 -translate-y-0.5" : ""}`}>

        <div className="relative w-full h-50 overflow-hidden border-b-2 border-[#1a1a1a] shrink-0">
          {hasImg ? (
            <img src={cover} alt={item.title} onError={() => setImgErr(true)} loading="lazy" className={`w-full h-full object-cover block transition-transform duration-500 ${hovered ? "scale-[1.04]" : "scale-100"}`} />
          ) : (
            <div className="w-full h-full bg-[#b5ad9e] flex items-center justify-center relative">
              <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <pattern id={`g-${item.id}`} width="24" height="24" patternUnits="userSpaceOnUse">
                    <path d="M 24 0 L 0 0 0 24" fill="none" stroke="#1a1a1a" strokeWidth="0.4" opacity="0.12" />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill={`url(#g-${item.id})`} />
              </svg>
              <span className="relative z-10 font-black text-[48px] text-[#1a1a1a]/[0.07] tracking-[-0.04em] select-none mono-font">
                S25
              </span>
            </div>
          )}

          <div className="absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-transparent pointer-events-none" />

          <div className="absolute top-2 left-2 flex items-center gap-1.5 bg-[#1a1a1a] px-2.5 py-1.25 z-10">
            <span className="w-1.25 h-1.25 bg-[#c7c0b1] block shrink-0" />
            <span className="text-[#c7c0b1] text-[7px] font-bold tracking-[0.22em] uppercase leading-none whitespace-nowrap">
              {item.category?.name}
            </span>
          </div>

          <div className="absolute bottom-2 right-2 bg-[#1a1a1a] flex px-2 py-1.25 z-10">
            <span className="text-[#c7c0b1] text-[13px] font-black tracking-[-0.01em] mono-font">
              ${item.price.toLocaleString("en-US", { minimumFractionDigits: 2 })}
            </span>
          </div>
        </div>

        <div className="flex flex-col flex-1 p-3.5 gap-2">
          <h3 className="font-black text-[15px] text-[#1a1a1a] uppercase tracking-[0.05em] leading-[1.45] m-0 line-clamp-2 min-h-8.75 mono-font">
            {item.title}
          </h3>

          <p className="text-[12px] text-[#1a1a1a]/50 leading-[1.6] m-0 line-clamp-2 min-h-8.75">
            {item.description}
          </p>

          <div className="h-px bg-[#1a1a1a]/15 shrink-0" />

          <div className="flex items-center justify-between gap-2">
            <span className="text-[9px] tracking-[0.18em] uppercase text-[#1a1a1a]/40 border border-[#1a1a1a]/15 bg-[#1a1a1a]/4 px-1.5 py-0.5 truncate max-w-[65%] block">
              {item.slug}
            </span>
            <span className="text-[9px] font-mono text-[#1a1a1a]/25 tracking-widest shrink-0">
              #{String(item.id).padStart(4, "0")}
            </span>
          </div>

          <div className="flex gap-1.5 pt-0.5 shrink-0">
            <button className="flex-1 h-9 flex items-center justify-center gap-1.5 bg-[#1a1a1a] hover:bg-[#8b1a1a] text-[#c7c0b1] text-[12px] font-bold tracking-[0.3em] uppercase border-2 border-[#1a1a1a] hover:border-[#8b1a1a] transition-colors duration-150">
              <EditIcon /> EDIT
            </button>
            
            <CardButton>
              <EyeIcon />
            </CardButton>

            <CardButton>
              <TrashIcon />
            </CardButton>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductCard