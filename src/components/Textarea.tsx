interface TextareaType {
    placeholder: string;
    extraClass?: string;
    name: string;
    value?: string;
    setValue?: React.Dispatch<React.SetStateAction<string>>;
    rows?: number;
}

const Textarea: React.FC<TextareaType> = ({ placeholder, extraClass, name, value, setValue, rows = 6 }) => {
    return (
        <textarea
            value={value}
            onChange={(e) => setValue?.(e.target.value)}
            name={name}
            rows={rows}
            placeholder={placeholder}
            className={`w-full bg-transparent border-b-2 border-black py-2.5 text-xl font-bold placeholder:text-black/20 focus:outline-none focus:border-[#8b1e1e] transition-colors duration-200 resize-y ${extraClass}`}
        />
    );
};

export default Textarea;