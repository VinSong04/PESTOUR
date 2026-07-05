import { useMemo } from 'react';

export default function BracketConnectors({ bracketData }) {
    // Determine active paths
    const status = useMemo(() => {
        const getM = (id) => bracketData?.find((m) => m.id === id);
        return {
            po1Active: getM('PO-1')?.played,
            po2Active: getM('PO-2')?.played,
            po3Active: getM('PO-3')?.played,
            po4Active: getM('PO-4')?.played,
            qf1Active: getM('QF-1')?.played,
            qf2Active: getM('QF-2')?.played,
            qf3Active: getM('QF-3')?.played,
            qf4Active: getM('QF-4')?.played,
            sf1Active: getM('SF-1')?.played,
            sf2Active: getM('SF-2')?.played,
        };
    }, [bracketData]);

    return (
        <svg
            className="absolute inset-0 w-full h-full pointer-events-none hidden lg:block z-0"
            viewBox="0 0 1400 800"
            preserveAspectRatio="none"
        >
            <defs>
                {/* Gradients */}
                <linearGradient id="gradient-inactive" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="rgba(255, 255, 255, 0.03)" />
                    <stop offset="100%" stopColor="rgba(255, 255, 255, 0.03)" />
                </linearGradient>
                <linearGradient id="gradient-teal-active" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#14b8a6" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="#10b981" stopOpacity="0.4" />
                </linearGradient>
                <linearGradient id="gradient-cyan-active" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.4" />
                </linearGradient>
                <linearGradient id="gradient-purple-active" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#a78bfa" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.4" />
                </linearGradient>
                <linearGradient id="gradient-gold-active" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#fbbf24" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="#f59e0b" stopOpacity="0.4" />
                </linearGradient>

                {/* Glow Filters */}
                <filter id="glow-teal" x="-20%" y="-20%" width="140%" height="140%">
                    <feGaussianBlur stdDeviation="3" result="blur" />
                    <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
                <filter id="glow-cyan" x="-20%" y="-20%" width="140%" height="140%">
                    <feGaussianBlur stdDeviation="3" result="blur" />
                    <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
                <filter id="glow-purple" x="-20%" y="-20%" width="140%" height="140%">
                    <feGaussianBlur stdDeviation="3" result="blur" />
                    <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
                <filter id="glow-gold" x="-20%" y="-20%" width="140%" height="140%">
                    <feGaussianBlur stdDeviation="3" result="blur" />
                    <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
            </defs>

            {/* PO to QF Connectors */}
            {[
                { active: status.po1Active, d: "M 250,100 L 350,100" },
                { active: status.po2Active, d: "M 250,300 L 350,300" },
                { active: status.po3Active, d: "M 250,500 L 350,500" },
                { active: status.po4Active, d: "M 250,700 L 350,700" }
            ].map((path, i) => (
                <path
                    key={`po-qf-${i}`}
                    d={path.d}
                    fill="none"
                    stroke={path.active ? "url(#gradient-teal-active)" : "url(#gradient-inactive)"}
                    strokeWidth={path.active ? 3 : 1.5}
                    filter={path.active ? "url(#glow-teal)" : undefined}
                    className={path.active ? "bracket-line" : ""}
                />
            ))}

            {/* QF to SF Connectors */}
            {[
                { active: status.qf1Active, d: "M 650,100 C 700,100 700,200 750,200" },
                { active: status.qf2Active, d: "M 650,300 C 700,300 700,200 750,200" },
                { active: status.qf3Active, d: "M 650,500 C 700,500 700,600 750,600" },
                { active: status.qf4Active, d: "M 650,700 C 700,700 700,600 750,600" }
            ].map((path, i) => (
                <path
                    key={`qf-sf-${i}`}
                    d={path.d}
                    fill="none"
                    stroke={path.active ? "url(#gradient-cyan-active)" : "url(#gradient-inactive)"}
                    strokeWidth={path.active ? 3 : 1.5}
                    filter={path.active ? "url(#glow-cyan)" : undefined}
                    className={path.active ? "bracket-line" : ""}
                />
            ))}

            {/* SF to Final Connectors */}
            {[
                { active: status.sf1Active, d: "M 1050,200 C 1100,200 1100,400 1150,400" },
                { active: status.sf2Active, d: "M 1050,600 C 1100,600 1100,400 1150,400" }
            ].map((path, i) => (
                <path
                    key={`sf-f-${i}`}
                    d={path.d}
                    fill="none"
                    stroke={path.active ? "url(#gradient-purple-active)" : "url(#gradient-inactive)"}
                    strokeWidth={path.active ? 3 : 1.5}
                    filter={path.active ? "url(#glow-purple)" : undefined}
                    className={path.active ? "bracket-line" : ""}
                />
            ))}
        </svg>
    );
}
