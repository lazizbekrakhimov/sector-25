import { useEffect, useState, type ChangeEvent, type Dispatch, type FC, type SetStateAction } from "react"
import { instance } from "../hooks"

interface SelecType {
    extraClass?: string
    URL?: string
    customList?: any[]
    setValue: Dispatch<SetStateAction<string | number>>
    value: string | number
    setLoading?: Dispatch<SetStateAction<boolean>>
}

const Select: FC<SelecType> = ({ extraClass, URL, customList, setValue, value, setLoading }) => {

    const [list, setList] = useState(URL ? [] : customList)

    useEffect(() => {
        if (URL) instance().get(URL).then(res => setList(res.data))
    }, [])

    function handleSelectChange(e: ChangeEvent<HTMLSelectElement>) {
        if (setLoading) setLoading(true)
        setValue(e.target.value === 'all' ? "" : e.target.value)
    }

    return (
        <div>
            <select value={value} onChange={handleSelectChange} name="category" className={`w-60 bg-transparent border-b-2 border-neutral-500 hover:border-[#c7c0b1] text-[#c7c0b1] px-2 py-3 outline-none tracking-[3px] focus:border-[#d4a017] transition-all duration-300 ${extraClass}`} >
                <option value="all" className="bg-[#111111] text-[#c7c0b1]">
                    ALL
                </option>
                {list?.map((item: { id: string | number, name: string }) => (<option className="bg-[#111111] text-[#c7c0b1]" key={item.id} value={item.id}> {item.name} </option>))}
            </select>
        </div >
    )
}

export default Select