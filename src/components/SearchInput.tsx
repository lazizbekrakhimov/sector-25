import { Search } from "lucide-react";
import type { ChangeEvent, Dispatch, FC, SetStateAction } from "react";

interface SearchInputType {
    value: string
    setLoading?: Dispatch<SetStateAction<boolean>>
    setValue: Dispatch<SetStateAction<string>>
}

const SearchInput: FC<SearchInputType> = ({  setValue, setLoading, value}) => {

    function handleSearch(events:ChangeEvent<HTMLInputElement>) {
        if (setLoading) setLoading(true)
        setValue(events.target.value)
    }
    return (
        <div className="relative w-60">
            <Search className="absolute left-2 top-1/2 -translate-y-1/2 text-neutral-600 w-5 h-5" />
            <input
                value={value}
                onChange={handleSearch}
                autoComplete="off"
                type="text"
                name="search"
                placeholder="SEARCH"
                className=" bg-transparent border-b-2 border-[#c7c0b1] text-[#c7c0b1] placeholder:text-neutral-600 pl-10 py-3 px-2 w-full outline-none tracking-[3px] focus:border-[#a61e1e] transition-all duration-300 "
            />
        </div>
    );
}

export default SearchInput