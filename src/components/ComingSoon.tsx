import { useEffect, useState } from "react";

interface ComingSoonProps {
    sectorName: string;
    sectorCode: string;
    description?: string;
}

const ComingSoon = ({
    sectorName,
    sectorCode,
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
        <div className="min-h-screen bg-[#161616] flex items-center justify-center p-4">
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&family=Bebas+Neue&display=swap');

        .sector-font { font-family: 'Bebas Neue', sans-serif; }
        .mono-font { font-family: 'Space Mono', monospace; }

        .card-bg {
          background-color: #c7c0b1;
          background-image:
            repeating-linear-gradient(
              0deg,
              transparent,
              transparent 39px,
              rgba(0,0,0,0.04) 39px,
              rgba(0,0,0,0.04) 40px
            );
        }

        .side-bar {
          writing-mode: vertical-rl;
          text-orientation: mixed;
          transform: rotate(180deg);
        }

        .progress-bar {
          background: #1a1a1a;
          position: relative;
          overflow: hidden;
        }
        .progress-bar::after {
          content: '';
          position: absolute;
          top: 0; left: 0; bottom: 0;
          width: var(--progress);
          background: #c0392b;
          transition: width 0.05s linear;
        }

        .blink {
          animation: blink 1.2s step-end infinite;
        }
        @keyframes blink {
          50% { opacity: 0; }
        }

        .ghost-text {
          position: absolute;
          font-family: 'Bebas Neue', sans-serif;
          font-size: 9rem;
          color: rgba(0,0,0,0.06);
          letter-spacing: 0.05em;
          top: 50%;
          left: 50%;
          transform: translate(-40%, -50%);
          white-space: nowrap;
          pointer-events: none;
          user-select: none;
          line-height: 1;
        }

        .scan-line {
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 2px;
          background: rgba(192,57,43,0.3);
          animation: scan 3s linear infinite;
        }
        @keyframes scan {
          0% { top: 0; opacity: 1; }
          100% { top: 100%; opacity: 0; }
        }

        .fade-in {
          animation: fadeIn 0.6s ease forwards;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .status-cell {
          border: 1px solid rgba(0,0,0,0.15);
          padding: 8px 14px;
          text-align: center;
        }
      `}</style>

            <div className="flex w-full max-w-2xl" style={{ minHeight: 420 }}>
                <div
                    className="flex items-center justify-center px-3"
                    style={{
                        background: "black",
                        minWidth: 44,
                        borderRadius: "4px 0 0 4px",
                    }}
                >
                    <span
                        className="side-bar mono-font text-xs tracking-widest"
                        style={{ color: "rgba(255,255,255,0.35)", fontSize: 9 }}
                    >
                        SECTOR {sectorCode} // STANDBY MODE
                    </span>
                </div>

                <div
                    className="card-bg flex-1 relative overflow-hidden fade-in"
                    style={{ borderRadius: "0 4px 4px 0", padding: "36px 40px 32px" }}
                >
                    <div className="scan-line" />

                    <div className="ghost-text">{sectorName}</div>

                    <div className="mono-font" style={{ fontSize: 10, letterSpacing: "0.2em", color: "#888", marginBottom: 6 }}>
                        SYSTEM STATUS
                    </div>
                    <div
                        className="sector-font"
                        style={{ fontSize: 13, letterSpacing: "0.25em", color: "#c0392b", marginBottom: 2 }}
                    >
                        SECTOR {sectorCode}
                    </div>
                    <div className="sector-font" style={{ fontSize: 64, lineHeight: 0.95, color: "#1a1a1a", marginBottom: 4 }}>
                        {sectorName}
                    </div>

                    <div style={{ width: 48, height: 2, background: "#1a1a1a", marginBottom: 20 }} />

                    <p
                        className="mono-font"
                        style={{ fontSize: 10, letterSpacing: "0.12em", color: "#666", lineHeight: 1.8, maxWidth: 380, marginBottom: 28 }}
                    >
                        {description}
                    </p>

                    <div className="mono-font" style={{ fontSize: 9, letterSpacing: "0.18em", color: "#888", marginBottom: 6 }}>
                        INITIALIZATION PROGRESS
                    </div>
                    <div
                        className="progress-bar"
                        style={{ height: 6, borderRadius: 1, marginBottom: 6, "--progress": `${progress}%` } as React.CSSProperties}
                    />
                    <div className="mono-font" style={{ fontSize: 9, color: "#888", letterSpacing: "0.1em" }}>
                        {progress}% COMPLETE{dots}
                        <span className="blink" style={{ marginLeft: 6, color: "#c0392b" }}>█</span>
                    </div>

                    <div className="flex gap-0 mt-6" style={{ borderTop: "1px solid rgba(0,0,0,0.1)", paddingTop: 16 }}>
                        <div className="status-cell mono-font" style={{ fontSize: 9, letterSpacing: "0.12em" }}>
                            <div style={{ color: "#888", marginBottom: 4 }}>MODULE</div>
                            <div style={{ color: "#1a1a1a", fontWeight: 700 }}>{sectorName}</div>
                        </div>
                        <div className="status-cell mono-font" style={{ fontSize: 9, letterSpacing: "0.12em" }}>
                            <div style={{ color: "#888", marginBottom: 4 }}>STATUS</div>
                            <div style={{ color: "#c0392b", fontWeight: 700 }}>PENDING</div>
                        </div>
                        <div className="status-cell mono-font" style={{ fontSize: 9, letterSpacing: "0.12em" }}>
                            <div style={{ color: "#888", marginBottom: 4 }}>ACCESS</div>
                            <div style={{ color: "#888", fontWeight: 700 }}>RESTRICTED</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ComingSoon;