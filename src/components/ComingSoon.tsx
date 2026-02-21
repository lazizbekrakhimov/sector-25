import { useEffect, useState } from "react";

interface ComingSoonProps {
    sectorName: string;
    description?: string;
}

const ComingSoon = ({
    sectorName,
    description = "THIS SECTOR IS CURRENTLY UNDER CONSTRUCTION. ACCESS WILL BE GRANTED UPON COMPLETION.",
}: ComingSoonProps) => {
    const [progress, setProgress] = useState(0);
    const [dots, setDots] = useState("");

    useEffect(() => {
        const progressInterval = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 73) {
                    clearInterval(progressInterval);
                    return 73;
                }
                return prev + 1;
            });
        }, 18);

        const dotsInterval = setInterval(() => {
            setDots((prev) => (prev.length >= 3 ? "" : prev + "."));
        }, 500);

        return () => {
            clearInterval(progressInterval);
            clearInterval(dotsInterval);
        };
    }, []);

    return (
        <div className="min-h-screen bg-[#161616] flex items-center justify-center px-6 pt-10">

            <div className="flex w-full max-w-4xl pb-32" style={{ minHeight: 520 }}>
                <div className="flex items-center justify-center px-4"
                    style={{
                        background: "black",
                        minWidth: 70,
                    }}
                >
                    <span className="side-bar mono-font tracking-widest"
                        style={{ color: "rgba(255,255,255,0.35)", fontSize: 11 }}
                    >
                        SECTOR {25} // STANDBY MODE
                    </span>
                </div>

                <div className="card-bg flex-1 relative overflow-hidden fade-in"
                    style={{ padding: "56px 60px 48px" }}
                >
                    <div className="scan-line" />

                    <div className="ghost-text">{sectorName}</div>

                    <div className="mono-font"
                        style={{
                            fontSize: 12,
                            letterSpacing: "0.25em",
                            color: "#888",
                            marginBottom: 8,
                        }}
                    >
                        SYSTEM STATUS
                    </div>

                    <div className="sector-font"
                        style={{
                            fontSize: 16,
                            letterSpacing: "0.3em",
                            color: "#c0392b",
                            marginBottom: 4,
                        }}
                    >
                        SECTOR {25}
                    </div>

                    <div className="sector-font"
                        style={{
                            fontSize: 82,
                            lineHeight: 0.95,
                            color: "#1a1a1a",
                            marginBottom: 8,
                        }}
                    >
                        {sectorName}
                    </div>

                    <div style={{ width: 70, height: 3, background: "#1a1a1a", marginBottom: 28 }} />

                    <p className="mono-font"
                        style={{
                            fontSize: 12,
                            letterSpacing: "0.14em",
                            color: "#666",
                            lineHeight: 1.9,
                            maxWidth: 520,
                            marginBottom: 36,
                        }}
                    >
                        {description}
                    </p>

                    <div className="mono-font"
                        style={{
                            fontSize: 11,
                            letterSpacing: "0.2em",
                            color: "#888",
                            marginBottom: 8,
                        }}
                    >
                        INITIALIZATION PROGRESS
                    </div>

                    <div className="progress-bar"
                        style={{
                            height: 10,
                            borderRadius: 2,
                            marginBottom: 8,
                            "--progress": `${progress}%`,
                        } as React.CSSProperties}
                    />

                    <div className="mono-font"
                        style={{
                            fontSize: 11,
                            color: "#888",
                            letterSpacing: "0.12em",
                        }}
                    >
                        {progress}% COMPLETE{dots}
                        <span className="blink"
                            style={{ marginLeft: 8, color: "#c0392b" }}
                        >
                            █
                        </span>
                    </div>

                    <div className="flex gap-0 mt-8"
                        style={{
                            borderTop: "1px solid rgba(0,0,0,0.1)",
                            paddingTop: 20,
                        }}
                    >
                        <div className="status-cell mono-font"
                            style={{ fontSize: 11, letterSpacing: "0.14em" }}
                        >
                            <div style={{ color: "#888", marginBottom: 6 }}>
                                MODULE
                            </div>
                            <div
                                style={{ color: "#1a1a1a", fontWeight: 700 }}
                            >
                                {sectorName}
                            </div>
                        </div>

                        <div className="status-cell mono-font"
                            style={{ fontSize: 11, letterSpacing: "0.14em" }}
                        >
                            <div style={{ color: "#888", marginBottom: 6 }}>
                                STATUS
                            </div>
                            <div
                                style={{ color: "#c0392b", fontWeight: 700 }}
                            >
                                PENDING
                            </div>
                        </div>

                        <div className="status-cell mono-font"
                            style={{ fontSize: 11, letterSpacing: "0.14em" }}
                        >
                            <div style={{ color: "#888", marginBottom: 6 }}>
                                ACCESS
                            </div>
                            <div
                                style={{ color: "#888", fontWeight: 700 }}
                            >
                                RESTRICTED
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ComingSoon;