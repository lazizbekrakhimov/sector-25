import { useEffect, useState } from "react"
import { Plus } from "lucide-react"
import { Button, SearchInput, Select, ProductCard, Loading, PATH } from "../../../components"
import { debounce, instance } from "../../../hooks"
import type { ProductType } from "../../../@types"
import { useNavigate } from "react-router-dom"

const Products = () => {
  const navigate = useNavigate()
  const [search, setSearch] = useState('')
  const title = debounce(search, 1000)
  const [categoryId, setCategoryId] = useState<string | number>("")

  const [loading, setLoading] = useState<boolean>(true)
  const [products, setProducts] = useState<ProductType[]>([])
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    instance().get("/products", {
      params: { title, categoryId }
    }).then(res => setProducts(res.data.splice(0, 25))).finally(() => setLoading(false))

    const t = setTimeout(() => setVisible(true), 30)
    return () => clearTimeout(t)
  }, [title, categoryId])

  return (
    <div className="p-8">

      <div className="flex items-center justify-between mb-8">
        <div className="flex gap-6 items-center">
          <SearchInput value={search} setLoading={setLoading} setValue={setSearch} />
          <Select setLoading={setLoading} value={categoryId} setValue={setCategoryId} URL="/categories" />
        </div>
        <Button onclick={() => navigate(PATH.productsCreate)} type="button" extraClass="!flex !items-center !gap-2 !px-4 !py-1.5 !mt-0 !w-auto !text-sm !font-medium hover:!bg-[#161616] relative z-10">
          <Plus className="w-4" />Create
        </Button>
      </div>

      <div
        className="relative flex"
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0px)" : "translateY(20px)",
          transition: "opacity 0.35s ease, transform 0.35s ease",
        }}
      >

        <div className="relative w-14 shrink-0 bg-black border-2 border-r-0 border-[#1a1a1a] flex flex-col items-center py-6 gap-3 z-10">
          <span className="absolute top-6 text-neutral-600 text-[8px] font-bold tracking-[0.4em] uppercase" style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }} >
            SECTOR 25 // CLASSIFIED
          </span>
        </div>

        <div className="relative flex-1 border-2 border-[#1a1a1a] overflow-hidden" style={{ background: "#c7c0b1", boxShadow: "7px 7px 0 #1a1a1a" }} >
          <svg className="absolute inset-0 w-full h-full pointer-events-none z-0" xmlns="http://www.w3.org/2000/svg">
            {Array.from({ length: 1000 }).map((_, i) => (
              <line key={i} x1="0" y1={44 + i * 32} x2="100%" y2={44 + i * 32} stroke="rgba(26,26,26,0.065)" strokeWidth="1" />
            ))}
            <line x1="1000" y1="0" x2="1000" y2="100%" stroke="rgba(139,26,26,0.15)" strokeWidth="1.5" />
          </svg>

          <div className="relative z-10 border-b-2 border-[#1a1a1a] px-20 py-6 flex items-end justify-between">
            <div>
              <p className="text-[9px] tracking-[0.35em] text-[#8b1a1a] uppercase mb-1.5 font-bold">
                SECTOR 25 — INVENTORY LEDGER
              </p>
              <h1 className="text-[40px] font-black text-[#1a1a1a] uppercase leading-none tracking-[0.05em] sector-font">
                PRODUCTS
              </h1>
              <div className="w-14 h-0.75 bg-[#1a1a1a] mt-2.5" />
            </div>
            <div className="text-right pb-1">
              <p className="text-[9px] tracking-[0.25em] text-[#1a1a1a]/35 uppercase mb-1">TOTAL RECORDS</p>
              <p className="text-[46px] font-black tracking-wider text-[#1a1a1a]/10 leading-none sector-font">
                {String(products.length).padStart(3, "0")}
              </p>
            </div>
          </div>

          <div className="relative z-10 p-8 grid grid-cols-4 gap-6">
            {loading ? (
              <div className="col-span-4 flex items-center text-3xl justify-center py-32.75">
                <Loading />
              </div>
            ) : products.length === 0 ? (
              <div className="col-span-4 flex flex-col items-center justify-center py-24">
                <span className="text-[80px] font-black text-[#1a1a1a]/5 leading-none tracking-wider select-none sector-font">
                  EMPTY
                </span>
                <p className="text-[10px] tracking-[0.3em] text-[#1a1a1a]/25 uppercase mt-3">
                  NO PRODUCTS FOUND
                </p>
              </div>
            ) : (
              products.map((item, i) => (
                <div
                  key={item.id}
                  style={{
                    opacity: 0,
                    transform: "translateY(24px)",
                    animation: "fadeUp 0.55s ease forwards",
                    animationDelay: `${i * 60}ms`,
                  }}
                >
                  <ProductCard item={item} />
                </div>
              ))
            )}
          </div>

          <div className="relative z-10 border-t-2 border-[#1a1a1a] px-20 py-3 flex items-center justify-between">
            <span className="text-[9px] font-mono text-[#1a1a1a]/25 tracking-[0.2em] uppercase">
              PAGE 01 — PRODUCTS MODULE
            </span>
            <span className="text-[9px] tracking-[0.25em] text-[#8b1a1a]/40 uppercase font-bold">
              SECTOR 25 // CLASSIFIED
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Products