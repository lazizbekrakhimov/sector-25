import { useNavigate, useParams } from "react-router-dom"
import { useEffect, useState } from "react";
import type { ProductType } from "../../../@types";
import { Pencil, Trash2 } from "lucide-react";
import { Button, fadeUp, LedgerLayout, Loading, Modal } from "../../../components";
import { DeleteFn, getById } from "../../../services";

const fmt = (iso: string) =>
    new Date(iso).toLocaleString("en-GB", {
        day: "2-digit", month: "short", year: "numeric",
        hour: "2-digit", minute: "2-digit",
    });

const ProductMore = () => {
    const { id } = useParams();
    const [moreData, setMoreData] = useState<ProductType | null>(null);
    const [activeImg, setActiveImg] = useState<number>(0);
    const [visible, setVisible] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const [delModal, setDelModal] = useState<boolean>(false);
    const navigate = useNavigate()

    useEffect(() => {
        setVisible(false);
        getById(`/products/${id}`, setMoreData, setVisible)
    }, []);

    function handleDeleteProduct() {
        setLoading(true)
        DeleteFn(`/products/${id}`, setLoading, setDelModal, "Product deleted successfully!", navigate)
    }

    if (!moreData) return (
        <div className="flex items-center justify-center min-h-[60vh]">
            <span className="text-[10px] font-mono tracking-[0.35em] text-[#1a1a1a]/30 uppercase animate-pulse">
                <Loading />
            </span>
        </div>
    );

    const cover = moreData.images?.[activeImg];

    return (
        <div className="px-11 py-8">
            <div className="flex items-center justify-end mb-8 gap-5" style={fadeUp(0, visible)}>
                <Button onClick={() => setDelModal(true)} type="button" extraClass="!flex !bg-black !border-black !items-center !gap-2 !px-4.5 !py-1.5 !mt-0 !w-auto !text-sm !font-medium hover:!bg-[#161616] hover:!border-[#8b1e1e] relative z-10">
                    <Trash2 className="w-4 h-4" /> Delete
                </Button>
                <Button onClick={() => navigate('update')} type="button" extraClass="!flex !items-center !gap-2 !px-4.5 !py-1.5 !mt-0 !w-auto !text-sm !font-medium hover:!bg-[#161616] relative z-10">
                    <Pencil className="w-4 h-4" /> Edit
                </Button>
            </div>

            <LedgerLayout
                title="PRODUCT INFO"
                badge="RECORD ID"
                badgeValue={`#${String(moreData.id).padStart(4, "0")}`}
                visible={visible}
                footer={{ left: `PRODUCT #${String(moreData.id).padStart(4, "0")} — DETAIL MODULE` }}
            >
                <div className="relative z-10 px-18 py-8 grid grid-cols-2 gap-8">

                    <div style={fadeUp(240, visible)}>
                        <div className="relative w-full pr-1.5 pb-1.5 group">
                            <div className="absolute top-1.5 left-1.5 right-0 bottom-0 bg-[#1a1a1a] z-0" />
                            <div className="relative z-10 border-2 border-[#1a1a1a] overflow-hidden bg-[#c7c0b1]">
                                <div className="relative w-full h-100 overflow-hidden border-b-2 border-[#1a1a1a]">
                                    <img src={cover} alt={moreData.title} className="w-full h-full object-cover block" />
                                    <div className="absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
                                </div>
                            </div>
                        </div>

                        <div className="flex gap-2 mt-4">
                            {moreData.images?.map((src, i) => (
                                <button key={i} onClick={() => setActiveImg(i)} className="relative w-25 h-25 pr-0.75 pb-0.75 cursor-pointer">
                                    <div className={`absolute top-0.75 left-0.75 right-0 bottom-0 bg-[#1a1a1a] z-0 transition-opacity ${activeImg === i ? "opacity-100" : "opacity-40"}`} />
                                    <div className={`relative z-10 border-2 overflow-hidden transition-all w-full h-full ${activeImg === i ? "border-[#1a1a1a]" : "border-[#1a1a1a]/30 opacity-50 hover:opacity-80"}`}>
                                        <img src={src} alt={moreData.title} className="w-full h-full object-cover" />
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="flex flex-col gap-5">

                        <div className="relative w-full pr-1.5 pb-1.5" style={fadeUp(320, visible)}>
                            <div className="absolute top-1.5 left-1.5 right-0 bottom-0 bg-[#1a1a1a] z-0" />
                            <div className="relative z-10 border-2 border-[#1a1a1a] bg-[#c7c0b1] p-4">
                                <h2 className="font-black text-[22px] text-[#1a1a1a] uppercase tracking-[0.05em] leading-[1.3] mono-font">
                                    {moreData.title}
                                </h2>
                                <div className="h-px bg-[#1a1a1a]/15 my-3" />
                                <div className="flex items-center justify-between gap-2">
                                    <span className="text-[10px] tracking-[0.18em] uppercase text-[#1a1a1a]/40 border border-[#1a1a1a]/15 bg-[#1a1a1a]/4 px-1.5 py-0.5 truncate max-w-[75%] block">
                                        {moreData.slug}
                                    </span>
                                    <span className="text-[15px] font-mono text-[#1a1a1a]/25 tracking-widest shrink-0">
                                        #{String(moreData.id).padStart(4, "0")}
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="relative w-full pr-1.5 pb-1.5" style={fadeUp(400, visible)}>
                            <div className="absolute top-1.5 left-1.5 right-0 bottom-0 bg-[#1a1a1a] z-0" />
                            <div className="relative z-10 border-2 border-[#1a1a1a] bg-[#c7c0b1] p-4">
                                <p className="text-[13px] tracking-[0.3em] text-[#1a1a1a]/40 uppercase font-bold mb-2">DESCRIPTION</p>
                                <p className="text-[13px] text-[#1a1a1a]/60 leading-[1.7]">{moreData.description}</p>
                            </div>
                        </div>

                        <div className="relative w-full pr-1.5 pb-1.5" style={fadeUp(480, visible)}>
                            <div className="absolute top-1.5 left-1.5 right-0 bottom-0 bg-[#1a1a1a] z-0" />
                            <div className="relative z-10 border-2 border-[#1a1a1a] bg-[#c7c0b1] p-4">
                                <p className="text-[14px] tracking-[0.3em] text-[#1a1a1a]/40 uppercase font-bold mb-3">CATEGORY</p>
                                <div className="absolute top-2 right-3 leading-9 z-10">
                                    <p className="text-[14px] flex justify-end tracking-[0.3em] text-[#1a1a1a]/40 uppercase font-bold">PRICE</p>
                                    <span className="text-[#161616] text-[28px] font-black tracking-[-0.01em] mono-font px-0.5">
                                        ${Number(moreData.price).toLocaleString("en-US", { minimumFractionDigits: 2 })}
                                    </span>
                                </div>
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="relative w-10 h-10 pr-0.75 pb-0.75 shrink-0">
                                        <div className="absolute top-0.75 left-0.75 right-0 bottom-0 bg-[#1a1a1a] z-0" />
                                        <div className="relative z-10 border border-[#1a1a1a] overflow-hidden w-full h-full">
                                            <img src={moreData.category?.image} alt={moreData.category?.name} className="w-full h-full object-cover" />
                                        </div>
                                    </div>
                                    <div>
                                        <p className="font-black text-[14px] text-[#1a1a1a] uppercase tracking-[0.05em] mono-font leading-none">
                                            {moreData.category?.name}
                                        </p>
                                        <p className="text-[10px] text-[#1a1a1a]/35 tracking-widest mt-0.5">{moreData.category?.slug}</p>
                                    </div>
                                </div>

                                <div className="h-px bg-[#1a1a1a]/12 mb-3" />
                                <p className="text-[12px] tracking-[0.3em] text-[#1a1a1a]/40 uppercase font-bold mb-2">META</p>
                                {([
                                    ["CREATED", moreData.creationAt],
                                    ["UPDATED", moreData.updatedAt],
                                    ["CAT CREATED", moreData.category?.creationAt],
                                ] as [string, string][]).map(([k, v]) => (
                                    <div key={k} className="flex justify-between items-center py-1.5 border-b border-[#1a1a1a]/8 last:border-0">
                                        <span className="font-mono text-[10px] text-[#1a1a1a]/30 uppercase tracking-[0.2em]">{k}</span>
                                        <span className="font-mono text-[10px] text-[#1a1a1a]/50">{fmt(v)}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </LedgerLayout>

            <Modal
                open={delModal}
                onClose={() => setDelModal(false)}
                title={"Do you really want to delete this product?"}>
                <div className="flex gap-4 justify-center">
                    <Button
                        onClick={() => setDelModal(false)}
                        type="button"
                        extraClass="flex-1 mt-0 flex items-center justify-center gap-2 bg-black border-black hover:!bg-[#161616] hover:!text-[#8b1e1e]"
                    >
                        Cancel
                    </Button>

                    <Button
                        onClick={handleDeleteProduct}
                        type="button"
                        extraClass="flex-1 mt-0 flex items-center justify-center gap-3 hover:!bg-[#161616]"
                    >
                        {loading ? <Loading /> : <><Trash2 size={18} /> Delete</>}
                    </Button>
                </div>
            </Modal>
        </div>
    );
};

export default ProductMore;