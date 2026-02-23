const ShadowBox = ({ children, className = "", style }: { children: React.ReactNode; className?: string; style?: React.CSSProperties }) => (
    <div className={`relative w-full pr-2.5 pb-2.5 ${className}`} style={style}>
        <div className="absolute top-1 left-1 right-0 bottom-0 bg-[#1a1a1a] z-0" />
        <div className="relative z-10 border-2 border-[#1a1a1a] bg-[#c7c0b1] p-5">
            {children}
        </div>
    </div>
);


export default ShadowBox