import React from "react";
import UseGlitch from "./UseGlitch";

interface LedgerLayoutProps {
    title: string;
    badge?: string;
    badgeValue?: string;
    visible?: boolean;
    footer?: { left: string; right?: string };
    children: React.ReactNode;
}

const LedgerLayout = ({
    title,
    badge,
    badgeValue,
    visible = true,
    footer,
    children,
}: LedgerLayoutProps) => {
    return (
        <div
            className="relative flex"
            style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0px)" : "translateY(20px)",
                transition: "opacity 0.35s ease, transform 0.35s ease",
            }}
        >
            <div className="relative w-[4.7%] shrink-0 bg-black flex flex-col items-center py-6 z-10">
                <span
                    className="mono-font absolute top-8 text-neutral-600 text-[10px] font-bold tracking-[0.4em] uppercase"
                    style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
                >
                    SECTOR 25 // CLASSIFIED
                </span>
            </div>

            <div
                className="relative flex-1 overflow-hidden"
                style={{ background: "#c7c0b1", boxShadow: "7px 7px 0 #1a1a1a" }}
            >
                <svg
                    className="absolute inset-0 w-full h-full pointer-events-none z-0"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    {Array.from({ length: 1000 }).map((_, i) => (
                        <line
                            key={i}
                            x1="0" y1={44 + i * 32}
                            x2="100%" y2={44 + i * 32}
                            stroke="rgba(26,26,26,0.065)"
                            strokeWidth="1"
                        />
                    ))}
                    <line
                        x1="95%" y1="0" x2="95%" y2="100%"
                        stroke="rgba(139,26,26,0.15)"
                        strokeWidth="1.5"
                    />
                </svg>

                <div className="relative z-10 px-18 pt-6 flex items-end justify-between">
                    <div>
                        <p className="text-[9px] tracking-[0.35em] text-[#8b1a1a] uppercase mb-2 font-bold">
                            SECTOR 25 — INVENTORY LEDGER
                        </p>
                        <h1
                            className="text-[40px] font-black text-[#1a1a1a] uppercase leading-none tracking-[0.05em] sector-font transition-all duration-75"
                            style={
                                UseGlitch()
                                    ? { textShadow: '2px 0 #1a1a1a, -2px 0 #b03a2e', transform: 'skewX(-4deg)' }
                                    : {}
                            }
                        >
                            {title}
                        </h1>
                        <div className="w-14 h-0.75 bg-[#1a1a1a] mt-2.5" />
                    </div>

                    {badge && (
                        <div className="text-right pb-1">
                            <p className="text-[9px] tracking-[0.25em] text-[#1a1a1a]/35 uppercase mb-1">
                                {badge}
                            </p>
                            <p className="text-[46px] font-black tracking-wider text-[#1a1a1a]/12 leading-none sector-font">
                                {badgeValue}
                            </p>
                        </div>
                    )}
                </div>

                <div className="relative z-10">{children}</div>

                {footer && (
                    <div className="relative z-10 px-18 py-5 flex items-center justify-between">
                        <span className="text-[10px] font-mono text-[#1a1a1a]/30 tracking-[0.2em] uppercase">
                            {footer.left}
                        </span>
                        <span className="text-[10px] tracking-[0.25em] text-[#8b1a1a]/40 uppercase font-bold">
                            {footer.right ?? "SECTOR 25 // CLASSIFIED"}
                        </span>
                    </div>
                )}
            </div>
        </div>
    );
};

export default LedgerLayout;