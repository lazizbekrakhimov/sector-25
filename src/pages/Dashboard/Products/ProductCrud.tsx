import { useState, useEffect, type SubmitEvent } from "react";
import { Plus } from "lucide-react";
import { Button, fadeUp, Input, Label, LedgerLayout, Loading, Select, ShadowBox, TextArea } from "../../../components";
import { useNavigate, useParams } from "react-router-dom";
import { instance } from "../../../hooks";
import { CrudFn } from "../../../services";

const ProductCrud = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [loading, setLoading] = useState<boolean>(false);

    const [title, setTitle] = useState<string>("");
    const [price, setPrice] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [images, setImages] = useState<string>("");
    const [categoryId, setCategoryId] = useState<string | number>("")
    const [visible, setVisible] = useState(false);

    function handleSubmit(evt: SubmitEvent<HTMLFormElement>) {
        setLoading(true);
        evt.preventDefault();
        const data = { title: title.trim(), price: Number(price), description: description.trim(), categoryId: Number(categoryId), images: [images || "https://picsum.photos/640/480"], };
        CrudFn(id, id ? `/products/${id}` : "/products", data, setLoading, navigate, `Product ${id ? "updated" : "added"} successfully!`);
    }

    useEffect(() => {
        if (id) {
            instance().get(`/products/${id}`).then(res => {
                setTitle(res.data.title);
                setPrice(String(res.data.price));
                setDescription(res.data.description);
                setImages(res.data.images[0]);
                setCategoryId(String(res.data.categoryId));
            })
        }
        const t = setTimeout(() => setVisible(true), 30);
        return () => clearTimeout(t);
    }, []);

    return (
        <form onSubmit={handleSubmit} autoComplete="off" className="px-11 py-8">
            <div className="flex items-center justify-end mb-8 gap-5" style={fadeUp(0, visible)}>
                <Button type="submit" extraClass="!flex !items-center !gap-2 !px-4.5 !py-2 !mt-0 !w-auto !text-sm !font-medium hover:!bg-[#161616] relative z-10">
                    {loading ? <Loading /> : <><Plus className="w-4 h-4" /> Save</>}
                </Button>
            </div>

            <LedgerLayout
                title={id ? "UPDATE PRODUCT" : "ADD NEW PRODUCT"}
                badge="STATUS"
                badgeValue="DRAFT"
                visible={visible}
                footer={{ left: "NEW RECORD — CREATE MODULE" }}
            >
                <div className="relative z-10 px-18 py-8 grid grid-cols-2 gap-13">

                    <div className="flex flex-col gap-5">
                        <ShadowBox style={fadeUp(240, visible)}>
                            <Label extraClass="mono-font  tracking-[0.3em] uppercase font-bold pb-1 mt-7" content={"Product Title"} />
                            <Input value={title} setValue={setTitle} extraClass="mono-font text-[15px] font-normal mt-2" placeholder="e.g. Classic Grey Hooded Sweatshirt" type={"text"} name={""} />
                        </ShadowBox>

                        <ShadowBox style={fadeUp(320, visible)}>
                            <Label extraClass="mono-font  tracking-[0.3em] uppercase font-bold pb-1 mt-7" content="Unit Price" />
                            <div className="flex items-center gap-2">
                                <span className="font-black text-[24px] mt-1 text-[#1a1a1a] mono-font">$</span>
                                <Input value={price} setValue={setPrice} extraClass="mono-font text-[15px] font-normal mt-2" type="number" placeholder="0.00" name={"number"} />
                            </div>
                        </ShadowBox>

                        <ShadowBox style={fadeUp(400, visible)}>
                            <Label extraClass="mono-font  tracking-[0.3em] uppercase font-bold pb-1 mt-7" content={"Select Category"} />
                            <div className="flex items-center gap-3">
                                <Select extraClass="mono-font w-98 !text-[#1a1a1a] !border-[#1a1a1a] hover:border-[#1a1a1a] focus:!border-[#8b1e1e]" value={categoryId} setValue={setCategoryId} URL="/categories" />
                            </div>
                        </ShadowBox>
                    </div>

                    <div className="flex flex-col gap-5">
                        <ShadowBox style={fadeUp(240, visible)}>
                            <Label extraClass="mono-font tracking-[0.3em] uppercase font-bold pb-1 mt-7" content={"Description"} />
                            <TextArea
                                value={description}
                                setValue={setDescription}
                                name="description"
                                placeholder="Write a product description..."
                                rows={6}
                                extraClass="mono-font text-[15px] font-normal mt-2"
                            />
                        </ShadowBox>

                        <ShadowBox style={fadeUp(320, visible)}>
                            <Label extraClass="mono-font tracking-[0.3em] uppercase font-bold pb-1 mt-7" content={"Image URL"} />
                            <div className="flex items-center gap-2 pt-1">
                                <Input value={images} setValue={setImages} extraClass="mono-font text-[15px] font-normal mt-2" placeholder="https://example.com/image.jpg" type={"text"} name={"image"} />
                            </div>
                        </ShadowBox>
                    </div>
                </div>
            </LedgerLayout>
        </form>
    );
};

export default ProductCrud;