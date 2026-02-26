import { useState, useEffect, type SubmitEvent } from "react"
import { Plus } from "lucide-react"
import { Button, fadeUp, Input, Label, LedgerLayout, Loading, ShadowBox } from "../../../components"
import { useNavigate, useParams } from "react-router-dom"
import { instance } from "../../../hooks"
import { CrudFn } from "../../../services"

const CategoryCrud = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const [loading, setLoading] = useState<boolean>(false)
    const [visible, setVisible] = useState(false)

    const [name, setName] = useState<string>("")
    const [image, setImage] = useState<string>("")
    const [preview, setPreview] = useState<string>("")

    function handleSubmit(evt: SubmitEvent<HTMLFormElement>) {
        setLoading(true)
        evt.preventDefault()
        const data = {
            name: name.trim(),
            image: image.trim() || "https://placehold.co/600x400",
        }
        CrudFn(id, id ? `/categories/${id}` : "/categories", data, setLoading, navigate, `Category ${id ? "updated" : "added"} successfully!`)
    }console.log(id)

    useEffect(() => {
        if (id) {
            instance()
                .get(`/categories/${id}`)
                .then((res) => {
                    setName(res.data.name)
                    setImage(res.data.image)
                    setPreview(res.data.image)
                })
                
        }
        const t = setTimeout(() => setVisible(true), 30)
        return () => clearTimeout(t)
    }, [])

    return (
        <form onSubmit={handleSubmit} autoComplete="off" className="px-11 py-8">
            <div className="flex items-center justify-end mb-8 gap-5" style={fadeUp(0, visible)}>
                <Button type="submit" extraClass="!flex !items-center !gap-2 !px-4.5 !py-2 !mt-0 !w-auto !text-sm !font-medium hover:!bg-[#161616] relative z-10" >
                    {loading ? <Loading /> : <><Plus className="w-4 h-4" /> Save</>}
                </Button>
            </div>

            <LedgerLayout
                title={id ? "UPDATE CATEGORY" : "ADD NEW CATEGORY"}
                badge="STATUS"
                badgeValue="DRAFT"
                visible={visible}
                footer={{ left: "NEW RECORD — CATEGORY MODULE" }}
            >
                <div className="relative z-10 px-18 py-8 grid grid-cols-2 gap-13">

                    <div className="flex flex-col gap-5">

                        <ShadowBox style={fadeUp(240, visible)}>
                            <Label extraClass="mono-font tracking-[0.3em] uppercase font-bold pb-1 mt-7" content={"Category Name"} />
                            <Input
                                value={name}
                                setValue={setName}
                                extraClass="mono-font text-[15px] font-normal mt-2"
                                placeholder="e.g. Electronics"
                                type={"text"}
                                name={"name"}
                            />
                        </ShadowBox>

                        <ShadowBox style={fadeUp(320, visible)}>
                            <Label extraClass="mono-font tracking-[0.3em] uppercase font-bold pb-1 mt-7" content={"Image URL"} />
                            <div className="flex items-center gap-2 pt-1">
                                <Input
                                    value={image}
                                    setValue={(val: string) => {
                                        setImage(val)
                                        setPreview(val)
                                    }}
                                    extraClass="mono-font text-[15px] font-normal mt-2"
                                    placeholder="https://example.com/image.jpg"
                                    type={"text"}
                                    name={"image"}
                                />
                            </div>
                        </ShadowBox>
                    </div>

                    <div style={fadeUp(240, visible)} className="flex flex-col gap-5">
                        <div className="relative w-full pr-1.5 pb-1.5 group">
                            <div className="absolute top-1.5 left-1.5 right-0 bottom-0 bg-[#1a1a1a] z-0 transition-all duration-150 group-hover:translate-x-0.5 group-hover:translate-y-0.5" />
                            <div className="relative z-10 border-2 border-[#1a1a1a] bg-[#c7c0b1] overflow-hidden transition-all duration-150 group-hover:-translate-x-0.5 group-hover:-translate-y-0.5">

                                <div className="px-4 pt-4 pb-2 border-b-2 border-[#1a1a1a]">
                                    <p className="text-[10px] font-bold tracking-[0.3em] uppercase text-[#1a1a1a]/40 mono-font">
                                        IMAGE PREVIEW
                                    </p>
                                </div>

                                <div className="relative w-full h-64 bg-[#1a1a1a]/5">
                                    {preview ? (
                                        <img src={preview} alt="preview" className="w-full h-full object-cover" onError={() => setPreview("")} />
                                    ) : (
                                        <div className="flex flex-col items-center justify-center w-full h-full gap-2">
                                            <span className="text-[40px] font-black text-[#1a1a1a]/10 mono-font">IMG</span>
                                            <p className="text-[10px] tracking-[0.25em] text-[#1a1a1a]/25 uppercase">
                                                PASTE A URL TO PREVIEW
                                            </p>
                                        </div>
                                    )}
                                </div>

                                <div className="px-4 py-3">
                                    <div className="flex items-center justify-between">
                                        <span className="text-[10px] tracking-[0.2em] text-[#1a1a1a]/30 uppercase mono-font">
                                            {name ? name.toUpperCase() : "—"}
                                        </span>
                                        <span className="text-[10px] font-mono text-[#8b1e1e]/40 tracking-widest uppercase">
                                            {id ? "UPDATE" : "NEW"} RECORD
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </LedgerLayout>
        </form>
    )
}

export default CategoryCrud