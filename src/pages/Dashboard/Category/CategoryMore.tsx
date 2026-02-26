import { useNavigate, useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import type { CategoryType, ProductType } from "../../../@types"
import { Pencil, Trash2 } from "lucide-react"
import { Button, fadeUp, LedgerLayout, Loading, Modal } from "../../../components"
import { DeleteFn, getById } from "../../../services"
import { instance } from "../../../hooks"

const fmt = (iso: string) => new Date(iso).toLocaleString("en-GB", { day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" })

const CategoryMore = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const [moreData, setMoreData] = useState<CategoryType | null>(null)
    const [products, setProducts] = useState<ProductType[]>([])
    const [visible, setVisible] = useState<boolean>(false)
    const [loading, setLoading] = useState<boolean>(false)
    const [delModal, setDelModal] = useState<boolean>(false)

    useEffect(() => {
        setVisible(false)
        getById(`/categories/${id}`, setMoreData, setVisible)
        instance()
            .get(`/categories/${id}/products`)
            .then((res) => setProducts(res.data.slice(0, 6)))
    }, [])

    function handleDelete() {
        setLoading(true)
        DeleteFn(`/categories/${id}`, setLoading, setDelModal, "Category deleted successfully!", navigate)
    }

    if (!moreData) return "";

    return (
        <div className="px-11 py-8">
            <div className="flex items-center justify-end mb-8 gap-5" style={fadeUp(0, visible)}>
                <Button onClick={() => setDelModal(true)} type="button" extraClass="!flex !bg-black !border-black !items-center !gap-2 !px-4.5 !py-2 !mt-0 !w-auto !text-sm !font-medium hover:!bg-[#161616] hover:!border-[#8b1e1e] relative z-10">
                    <Trash2 className="w-4 h-4" /> Delete
                </Button>
                <Button onClick={() => navigate('update')} type="button" extraClass="!flex !items-center !gap-2 !px-4.5 !py-2 !mt-0 !w-auto !text-sm !font-medium hover:!bg-[#161616] relative z-10">
                    <Pencil className="w-4 h-4" /> Edit
                </Button>
            </div>

            <LedgerLayout title="CATEGORY INFO" badge="RECORD ID" badgeValue={`#${String(moreData.id).padStart(4, "0")}`} visible={visible} footer={{ left: `CATEGORY #${String(moreData.id).padStart(4, "0")} — DETAIL MODULE` }} >
                <div className="relative z-10 px-18 py-8 grid grid-cols-2 gap-8">

                    <div className="flex flex-col gap-5">

                        <div style={fadeUp(240, visible)} className="relative w-full pr-1.5 pb-1.5 group">
                            <div className="absolute top-1.5 left-1.5 right-0 bottom-0 bg-[#1a1a1a] z-0 transition-all duration-150 group-hover:translate-x-0.5 group-hover:translate-y-0.5" />
                            <div className="relative z-10 border-2 border-[#1a1a1a] overflow-hidden bg-[#c7c0b1] transition-all duration-150 group-hover:-translate-x-0.5 group-hover:-translate-y-0.5">
                                <div className="relative w-full h-72 overflow-hidden border-b-2 border-[#1a1a1a]">
                                    <img src={moreData.image} alt={moreData.name} className="w-full h-full object-cover" />
                                    <div className="absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
                                </div>
                                <div className="px-5 py-4">
                                    <p className="text-[10px] tracking-[0.3em] text-[#1a1a1a]/40 uppercase font-bold mb-1">IMAGE URL</p>
                                    <p className="text-[11px] font-mono text-[#1a1a1a]/50 truncate">{moreData.image}</p>
                                </div>
                            </div>
                        </div>

                        <div style={fadeUp(320, visible)} className="relative w-full pr-1.5 pb-1.5 group">
                            <div className="absolute top-1.5 left-1.5 right-0 bottom-0 bg-[#1a1a1a] z-0 transition-all duration-150 group-hover:translate-x-0.5 group-hover:translate-y-0.5" />
                            <div className="relative z-10 border-2 border-[#1a1a1a] bg-[#c7c0b1] p-4 transition-all duration-150 group-hover:-translate-x-0.5 group-hover:-translate-y-0.5">
                                <p className="text-[12px] tracking-[0.3em] text-[#1a1a1a]/40 uppercase font-bold mb-3">META</p>
                                {([
                                    ["CREATED", moreData.creationAt],
                                    ["UPDATED", moreData.updatedAt],
                                ] as [string, string][]).map(([k, v]) => (
                                    <div key={k} className="flex justify-between items-center py-1.5 border-b border-[#1a1a1a]/8 last:border-0">
                                        <span className="font-mono text-[10px] text-[#1a1a1a]/30 uppercase tracking-[0.2em]">{k}</span>
                                        <span className="font-mono text-[10px] text-[#1a1a1a]/50">{fmt(v)}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col gap-5">

                        <div style={fadeUp(240, visible)} className="relative w-full pr-1.5 pb-1.5 group">
                            <div className="absolute top-1.5 left-1.5 right-0 bottom-0 bg-[#1a1a1a] z-0 transition-all duration-150 group-hover:translate-x-0.5 group-hover:translate-y-0.5" />
                            <div className="relative z-10 border-2 border-[#1a1a1a] bg-[#c7c0b1] p-5 transition-all duration-150 group-hover:-translate-x-0.5 group-hover:-translate-y-0.5">
                                <p className="text-[10px] tracking-[0.3em] text-[#1a1a1a]/35 uppercase font-bold mb-1">CATEGORY NAME</p>
                                <h2 className="font-black text-[26px] text-[#1a1a1a] uppercase tracking-[0.04em] leading-[1.2] mono-font">
                                    {moreData.name}
                                </h2>
                                <div className="h-px bg-[#1a1a1a]/12 my-3" />
                                <div className="flex items-center justify-between">
                                    <span className="text-[10px] tracking-[0.18em] uppercase text-[#1a1a1a]/40 border border-[#1a1a1a]/15 bg-[#1a1a1a]/5 px-1.5 py-0.5">
                                        {moreData.slug}
                                    </span>
                                    <span className="text-[15px] font-mono text-[#1a1a1a]/20 tracking-widest">
                                        #{String(moreData.id).padStart(4, "0")}
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div style={fadeUp(320, visible)} className="relative w-full pr-1.5 pb-1.5 group">
                            <div className="absolute top-1.5 left-1.5 right-0 bottom-0 bg-[#1a1a1a] z-0 transition-all duration-150 group-hover:translate-x-0.5 group-hover:translate-y-0.5" />
                            <div className="relative z-10 border-2 border-[#1a1a1a] bg-[#c7c0b1] p-4 transition-all duration-150 group-hover:-translate-x-0.5 group-hover:-translate-y-0.5">
                                <div className="flex items-center justify-between mb-3">
                                    <p className="text-[12px] tracking-[0.3em] text-[#1a1a1a]/40 uppercase font-bold">PRODUCTS</p>
                                    <span className="text-[10px] font-mono bg-[#1a1a1a] text-[#c7c0b1] px-2 py-0.5 tracking-widest">
                                        {products.length} ITEMS
                                    </span>
                                </div>

                                {products.length === 0 ? (
                                    <p className="text-[11px] text-[#1a1a1a]/30 tracking-widest uppercase text-center py-6">
                                        NO PRODUCTS
                                    </p>
                                ) : (
                                    <div className="flex flex-col gap-2">
                                        {products.map((p) => (
                                            <div key={p.id} className="flex items-center gap-3 py-2 border-b border-[#1a1a1a]/8 last:border-0">
                                                <div className="relative w-9 h-9 pr-0.5 pb-0.5 shrink-0">
                                                    <div className="absolute top-0.5 left-0.5 right-0 bottom-0 bg-[#1a1a1a]/40 z-0" />
                                                    <div className="relative z-10 border border-[#1a1a1a]/40 overflow-hidden w-full h-full">
                                                        <img src={p.images?.[0]} alt={p.title} className="w-full h-full object-cover" />
                                                    </div>
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <p className="font-bold text-[11px] text-[#1a1a1a] uppercase tracking-[0.04em] mono-font truncate">
                                                        {p.title}
                                                    </p>
                                                    <p className="text-[10px] text-[#1a1a1a]/35 tracking-widest">
                                                        ${Number(p.price).toLocaleString("en-US", { minimumFractionDigits: 2 })}
                                                    </p>
                                                </div>
                                                <span className="text-[10px] font-mono text-[#1a1a1a]/25 shrink-0">
                                                    #{String(p.id).padStart(4, "0")}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </LedgerLayout>

            <Modal
                open={delModal}
                onClose={() => setDelModal(false)}
                title={"Do you really want to delete this category?"}
            >
                <div className="flex gap-4 justify-center">
                    <Button
                        onClick={() => setDelModal(false)}
                        type="button"
                        extraClass="flex-1 mt-0 flex items-center justify-center gap-2 bg-black border-black hover:!bg-[#161616] hover:!text-[#8b1e1e]"
                    >
                        Cancel
                    </Button>
                    <Button
                        onClick={handleDelete}
                        type="button"
                        extraClass="flex-1 mt-0 flex items-center justify-center gap-3 hover:!bg-[#161616]"
                    >
                        {loading ? <Loading /> : <><Trash2 size={18} /> Delete</>}
                    </Button>
                </div>
            </Modal>
        </div>
    )
}

export default CategoryMore