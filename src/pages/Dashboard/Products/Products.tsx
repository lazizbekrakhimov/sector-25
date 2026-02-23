import { useEffect, useState } from "react"
import { Plus } from "lucide-react"
import { Button, SearchInput, Select, ProductCard, Loading, PATH, LedgerLayout } from "../../../components"
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
    }).then(res => setProducts(res.data.splice(0, 32))).finally(() => setLoading(false))

    const t = setTimeout(() => setVisible(true), 30)
    return () => clearTimeout(t)
  }, [title, categoryId])

  return (
    <div className="px-11 py-8">

      <div className=" flex items-center justify-between mb-8">
        <div className="flex gap-6 items-center">
          <SearchInput value={search} setLoading={setLoading} setValue={setSearch} />
          <Select setLoading={setLoading} value={categoryId} setValue={setCategoryId} URL="/categories" />
        </div>
        <Button onClick={() => navigate(PATH.productsCreate)} type="button" extraClass="!flex !items-center !gap-2 !px-4.5 !py-1.5 !mt-0 !w-auto !text-sm !font-medium hover:!bg-[#161616] relative z-10">
          <Plus className="w-4" />Create
        </Button>
      </div>

      <LedgerLayout
        title="PRODUCTS"
        badge="TOTAL RECORDS"
        badgeValue={String(products.length).padStart(3, "0")}
        visible={visible}
        footer={{ left: "PAGE 01 — PRODUCTS MODULE" }} >

        <div className="relative z-10 p-8 grid grid-cols-4 gap-6">
          {loading ? (
            <div className="col-span-4 flex items-center text-3xl justify-center py-32.75">
              <Loading />
            </div>
          ) : products.length === 0 ? (
            <div className="col-span-4 flex flex-col items-center justify-center py-24">
              <span className="text-[80px] font-black text-[#1a1a1a]/10 leading-none tracking-wider select-none sector-font">
                EMPTY
              </span>
              <p className="text-[10px] tracking-[0.3em] text-[#1a1a1a]/35 uppercase mt-3">
                NO PRODUCTS FOUND
              </p>
            </div>
          ) : (
            products.map((item, i) => (
              <div key={item.id} style={{ opacity: 0, transform: "translateY(24px)", animation: "fadeUp 0.55s ease forwards", animationDelay: `${i * 60}ms` }} >
                <ProductCard item={item} />
              </div>
            ))
          )}
        </div>
      </LedgerLayout>
    </div>
  )
}

export default Products

