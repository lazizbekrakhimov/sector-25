const ShadowBox = ({ children, className = "", style }: { children: React.ReactNode; className?: string; style?: React.CSSProperties }) => (
    <div className={`relative w-full pr-1 pb-1 group ${className}`} style={style}>
        <div className="absolute top-1 left-1.5 right-0 bottom-0 bg-[#1a1a1a] z-0 transition-all duration-150 group-hover:translate-x-0.5 group-hover:translate-y-0.5 group-active:translate-x-0.75 group-active:translate-y-0.75" />
        
        <div className="relative z-10 border-2 border-[#1a1a1a] bg-[#c7c0b1] p-5 transition-all duration-150 group-hover:-translate-x-0.5 group-hover:-translate-y-0.5 group-active:-translate-x-0.75 group-active:-translate-y-0.75" >
            {children}
        </div>
    </div>
);

export default ShadowBox