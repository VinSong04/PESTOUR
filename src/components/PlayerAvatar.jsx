import { memo } from 'react';
import { COUNTRY_CODES, getFlagUrl } from '../constants/countries';

// Eager load all player images from the assets folder using Vite
const avatarModules = import.meta.glob('../assets/*.{png,jpg,jpeg,webp}', { eager: true });

// Cache for avatar URL lookups to avoid scanning all modules on every render
const avatarCache = new Map();

const normalize = (str) => str.toLowerCase().replace(/[^a-z0-9]/g, '');
const NAME_CORRECTIONS = { sor3spac1: 'sor3spec1' };

// Pre-build a normalized lookup table (runs once at module load)
const normalizedAssets = [];
for (const path in avatarModules) {
    const fileName = path.split('/').pop().replace(/\.[^/.]+$/, "");
    if (fileName === "pallet") continue;
    normalizedAssets.push({ normalized: normalize(fileName), url: avatarModules[path].default });
}

const getAvatarUrl = (playerName) => {
    if (!playerName) return null;

    // Check cache first
    if (avatarCache.has(playerName)) return avatarCache.get(playerName);

    let normalName = normalize(playerName);
    if (NAME_CORRECTIONS[normalName]) normalName = NAME_CORRECTIONS[normalName];

    let result = null;
    for (const asset of normalizedAssets) {
        if (asset.normalized === normalName || asset.normalized.includes(normalName) || normalName.includes(asset.normalized)) {
            result = asset.url;
            break;
        }
    }

    avatarCache.set(playerName, result);
    return result;
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

export default memo(function PlayerAvatar({ name, logo, className = "w-8 h-8 text-xs" }) {
    // Priority 1: Use provided logo. If it's not a URL/base64, try to map it as a country flag.
    let displayUrl = null;

    if (logo) {
        if (logo.startsWith('http') || logo.startsWith('data:')) {
            displayUrl = logo;
        } else {
            displayUrl = getFlagUrl(logo);
        }
    }

    if (displayUrl) {
        const defaultRounding = className.includes('rounded-') ? '' : 'rounded-full';
        const objectFit = displayUrl.includes('flagcdn') ? 'object-cover scale-110' : 'object-contain scale-[1.3] drop-shadow-md';

        return (
            <div className={`flex-shrink-0 flex items-center justify-center overflow-hidden border border-white/10 shadow-sm ${defaultRounding} ${className}`}>
                <img src={displayUrl} alt={name || 'Player avatar'} className={`w-full h-full ${objectFit}`} loading="lazy" />
            </div>
        );
    }

    // Priority 2: Match static asset file
    const url = getAvatarUrl(name);

    if (url) {
        return (
            <div className={`flex-shrink-0 flex items-center justify-center ${className.replace(/rounded-\w+/, '').replace(/shadow-\w+/, '').replace(/border\b/, '')}`}>
                <img src={url} alt={name || 'Player avatar'} className="w-full h-full object-contain drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]" loading="lazy" />
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
});
