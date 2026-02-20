import React from 'react';

// Eager load all player images from the assets folder using Vite
const avatarModules = import.meta.glob('../assets/*.{png,jpg,jpeg,webp}', { eager: true });

const getAvatarUrl = (playerName) => {
    if (!playerName) return null;

    // Clean string for loose matching (remove spaces, lowercase)
    const normalize = (str) => str.toLowerCase().replace(/[^a-z0-9]/g, '');
    const normalName = normalize(playerName);

    for (const path in avatarModules) {
        // Strip out the folder and extension
        const fileName = path.split('/').pop().replace(/\.[^/.]+$/, "");
        if (fileName === "pallet") continue; // Exclude main app logo

        const normalFileName = normalize(fileName);

        // Exact or case-insensitive/space-insensitive match
        // "sorespect.png" will match "so respec1" if we do a contains but let's do this:
        // if normalize(fileName) == normalize(playerName) OR they loosely contain each other
        if (normalFileName === normalName || normalFileName.includes(normalName) || normalName.includes(normalFileName)) {
            return avatarModules[path].default;
        }
    }
    return null;
};

const AVATAR_COLORS = [
    'bg-[#ef4444]', 'bg-[#3b82f6]', 'bg-[#10b981]', 'bg-[#f59e0b]',
    'bg-[#8b5cf6]', 'bg-[#ec4899]', 'bg-[#14b8a6]', 'bg-[#f97316]'
];

const getAvatarColor = (name) => {
    if (!name || name.startsWith('TBD')) return 'bg-[#334155]';
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
        hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }
    return AVATAR_COLORS[Math.abs(hash) % AVATAR_COLORS.length];
};

export default function PlayerAvatar({ name, className = "w-8 h-8 text-xs" }) {
    const url = getAvatarUrl(name);

    if (url) {
        return (
            <div className={`rounded-full overflow-hidden flex-shrink-0 shadow-md border border-[#334155]/50 bg-[#0a0b10] flex items-center justify-center ${className}`}>
                <img src={url} alt={name || 'Player avatar'} className="w-full h-full object-cover" />
            </div>
        );
    }

    const initials = name && !name.startsWith('TBD') ? name.substring(0, 2).toUpperCase() : '?';
    const color = getAvatarColor(name);

    return (
        <div className={`rounded-full ${color} flex-shrink-0 flex items-center justify-center font-black text-white shadow-md border border-[#ffffff10] ${className}`}>
            {initials}
        </div>
    );
}
