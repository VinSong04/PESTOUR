import { useMemo } from 'react';

export default function BracketConnectors({ bracketData }) {
    // Determine active paths
    const status = useMemo(() => {
        const getM = (id) => bracketData?.find((m) => m.id === id);
        return {
            qf1Active: getM('QF-1')?.played,
            qf2Active: getM('QF-2')?.played,
            sf1Active: getM('SF-1')?.played,
            qf3Active: getM('QF-3')?.played,
            qf4Active: getM('QF-4')?.played,
            sf2Active: getM('SF-2')?.played,
        };
    }, [bracketData]);

    return (
        <svg
            className="absolute inset-0 w-full h-full pointer-events-none hidden lg:block z-0"
            viewBox="0 0 1000 600"
            preserveAspectRatio="none"
        >
            <defs>
                {/* Gradients */}
                <linearGradient id="gradient-inactive" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="rgba(255, 255, 255, 0.03)" />
                    <stop offset="100%" stopColor="rgba(255, 255, 255, 0.03)" />
                </linearGradient>
                <linearGradient id="gradient-qf1-active" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.4" />
                </linearGradient>
                <linearGradient id="gradient-qf2-active" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.4" />
                </linearGradient>
                <linearGradient id="gradient-sf1-active" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.6" />
                    <stop offset="100%" stopColor="#fbbf24" stopOpacity="0.8" />
                </linearGradient>
                
                <linearGradient id="gradient-qf3-active" x1="100%" y1="0%" x2="0%" y2="0%">
                    <stop offset="0%" stopColor="#a78bfa" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.4" />
                </linearGradient>
                <linearGradient id="gradient-qf4-active" x1="100%" y1="0%" x2="0%" y2="0%">
                    <stop offset="0%" stopColor="#a78bfa" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.4" />
                </linearGradient>
                <linearGradient id="gradient-sf2-active" x1="100%" y1="0%" x2="0%" y2="0%">
                    <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.6" />
                    <stop offset="100%" stopColor="#fbbf24" stopOpacity="0.8" />
                </linearGradient>

                {/* Glow Filters */}
                <filter id="glow-cyan" x="-20%" y="-20%" width="140%" height="140%">
                    <feGaussianBlur stdDeviation="3" result="blur" />
                    <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
                <filter id="glow-purple" x="-20%" y="-20%" width="140%" height="140%">
                    <feGaussianBlur stdDeviation="3" result="blur" />
                    <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
            </defs>

            {/* Left Bracket Paths */}
            {/* QF-1 to SF-1 */}
            <path
                d="M 200,180 C 250,180 250,300 300,300"
                fill="none"
                stroke={status.qf1Active ? "url(#gradient-qf1-active)" : "url(#gradient-inactive)"}
                strokeWidth={status.qf1Active ? 3 : 1.5}
                filter={status.qf1Active ? "url(#glow-cyan)" : undefined}
                className={status.qf1Active ? "bracket-line" : ""}
            />
            {/* QF-2 to SF-1 */}
            <path
                d="M 200,420 C 250,420 250,300 300,300"
                fill="none"
                stroke={status.qf2Active ? "url(#gradient-qf2-active)" : "url(#gradient-inactive)"}
                strokeWidth={status.qf2Active ? 3 : 1.5}
                filter={status.qf2Active ? "url(#glow-cyan)" : undefined}
                className={status.qf2Active ? "bracket-line" : ""}
            />
            {/* SF-1 to Grand Final */}
            <path
                d="M 380,300 C 420,300 420,360 460,360"
                fill="none"
                stroke={status.sf1Active ? "url(#gradient-sf1-active)" : "url(#gradient-inactive)"}
                strokeWidth={status.sf1Active ? 3 : 1.5}
                className={status.sf1Active ? "bracket-line" : ""}
            />

            {/* Right Bracket Paths */}
            {/* QF-3 to SF-2 */}
            <path
                d="M 800,180 C 750,180 750,300 700,300"
                fill="none"
                stroke={status.qf3Active ? "url(#gradient-qf3-active)" : "url(#gradient-inactive)"}
                strokeWidth={status.qf3Active ? 3 : 1.5}
                filter={status.qf3Active ? "url(#glow-purple)" : undefined}
                className={status.qf3Active ? "bracket-line" : ""}
            />
            {/* QF-4 to SF-2 */}
            <path
                d="M 800,420 C 750,420 750,300 700,300"
                fill="none"
                stroke={status.qf4Active ? "url(#gradient-qf4-active)" : "url(#gradient-inactive)"}
                strokeWidth={status.qf4Active ? 3 : 1.5}
                filter={status.qf4Active ? "url(#glow-purple)" : undefined}
                className={status.qf4Active ? "bracket-line" : ""}
            />
            {/* SF-2 to Grand Final */}
            <path
                d="M 620,300 C 580,300 580,360 540,360"
                fill="none"
                stroke={status.sf2Active ? "url(#gradient-sf2-active)" : "url(#gradient-inactive)"}
                strokeWidth={status.sf2Active ? 3 : 1.5}
                className={status.sf2Active ? "bracket-line" : ""}
            />
        </svg>
    );
}
