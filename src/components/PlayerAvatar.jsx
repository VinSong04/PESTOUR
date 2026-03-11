// Eager load all player images from the assets folder using Vite
const avatarModules = import.meta.glob('../assets/*.{png,jpg,jpeg,webp}', { eager: true });

const getAvatarUrl = (playerName) => {
    if (!playerName) return null;

    // Clean string for loose matching (remove spaces, lowercase)
    const normalize = (str) => str.toLowerCase().replace(/[^a-z0-9]/g, '');
    let normalName = normalize(playerName);

    // Name correction map
    const corrections = { sor3spac1: 'sor3spec1' };
    if (corrections[normalName]) normalName = corrections[normalName];

    for (const path in avatarModules) {
        // Strip out the folder and extension
        const fileName = path.split('/').pop().replace(/\.[^/.]+$/, "");
        if (fileName === "pallet") continue; // Exclude main app logo

        const normalFileName = normalize(fileName);

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

const COUNTRY_CODES = {
    'afghanistan': 'af', 'albania': 'al', 'algeria': 'dz', 'andorra': 'ad', 'argentina': 'ar', 'armenia': 'am', 'australia': 'au', 'austria': 'at',
    'azerbaijan': 'az', 'bahrain': 'bh', 'bangladesh': 'bd', 'belarus': 'by', 'belgium': 'be', 'bhutan': 'bt', 'bolivia': 'bo',
    'bosnia and herzegovina': 'ba', 'botswana': 'bw', 'brazil': 'br', 'british virgin islands': 'vg', 'brunei darussalam': 'bn',
    'bulgaria': 'bg', 'burkina faso': 'bf', 'cambodia': 'kh', 'cameroon': 'cm', 'canada': 'ca', 'cape verde': 'cv', 'cayman islands': 'ky',
    'chad': 'td', 'chile': 'cl', 'china pr': 'cn', 'colombia': 'co', 'comoros': 'km', 'congo dr': 'cd', 'costa rica': 'cr', 'cote d\'ivoire': 'ci',
    'croatia': 'hr', 'cyprus': 'cy', 'czech republic': 'cz', 'denmark': 'dk', 'dominican republic': 'do', 'ecuador': 'ec', 'egypt': 'eg',
    'el salvador': 'sv', 'england': 'gb-eng', 'equatorial guinea': 'gq', 'estonia': 'ee', 'eswatini': 'sz', 'faroe islands': 'fo',
    'finland': 'fi', 'france': 'fr', 'georgia': 'ge', 'germany': 'de', 'ghana': 'gh', 'gibraltar': 'gi', 'greece': 'gr', 'guam': 'gu', 'guinea': 'gn',
    'guyana': 'gy', 'honduras': 'hn', 'hong kong (china)': 'hk', 'hungary': 'hu', 'iceland': 'is', 'india': 'in', 'indonesia': 'id', 'iran': 'ir',
    'iraq': 'iq', 'israel': 'il', 'italy': 'it', 'jamaica': 'jm', 'japan': 'jp', 'jordan': 'jo', 'kazakhstan': 'kz', 'kenya': 'ke', 'korea republic': 'kr',
    'kosovo': 'xk', 'kuwait': 'kw', 'kyrgyz republic': 'kg', 'laos': 'la', 'latvia': 'lv', 'lebanon': 'lb', 'libya': 'ly', 'liechtenstein': 'li',
    'lithuania': 'lt', 'luxembourg': 'lu', 'macau': 'mo', 'madagascar': 'mg', 'malaysia': 'my', 'maldives': 'mv', 'mali': 'ml', 'malta': 'mt',
    'mauritius': 'mu', 'mexico': 'mx', 'moldova': 'md', 'mongolia': 'mn', 'montenegro': 'me', 'morocco': 'ma', 'myanmar': 'mm', 'nepal': 'np',
    'netherlands': 'nl', 'new zealand': 'nz', 'nigeria': 'ng', 'north macedonia': 'mk', 'northern ireland': 'gb-nir', 'norway': 'no',
    'oman': 'om', 'pakistan': 'pk', 'panama': 'pa', 'papua new guinea': 'pg', 'paraguay': 'py', 'peru': 'pe', 'philippines': 'ph', 'poland': 'pl',
    'portugal': 'pt', 'puerto rico': 'pr', 'qatar': 'qa', 'republic of ireland': 'ie', 'romania': 'ro', 'russia': 'ru', 'san marino': 'sm',
    'saudi arabia': 'sa', 'scotland': 'gb-sct', 'senegal': 'sn', 'serbia': 'rs', 'seychelles': 'sc', 'slovakia': 'sk', 'slovenia': 'si',
    'somalia': 'so', 'south africa': 'za', 'south sudan': 'ss', 'spain': 'es', 'sri lanka': 'lk', 'sweden': 'se', 'switzerland': 'ch',
    'syria': 'sy', 'tajikistan': 'tj', 'tanzania': 'tz', 'thailand': 'th', 'trinidad and tobago': 'tt', 'tunisia': 'tn', 'turkey': 'tr',
    'turks and caicos islands': 'tc', 'uae': 'ae', 'usa': 'us', 'us virgin islands': 'vi', 'ukraine': 'ua', 'uruguay': 'uy',
    'uzbekistan': 'uz', 'venezuela': 've', 'vietnam': 'vn', 'wales': 'gb-wls', 'zambia': 'zm', 'zimbabwe': 'zw'
};

export default function PlayerAvatar({ name, logo, className = "w-8 h-8 text-xs" }) {
    // Priority 1: Use provided logo. If it's not a URL/base64, try to map it as a country flag.
    let displayUrl = null;

    if (logo) {
        if (logo.startsWith('http') || logo.startsWith('data:')) {
            displayUrl = logo;
        } else {
            const lowerLogo = logo.toLowerCase().trim();
            if (COUNTRY_CODES[lowerLogo]) {
                displayUrl = `https://flagcdn.com/w160/${COUNTRY_CODES[lowerLogo]}.png`;
            }
        }
    }

    if (displayUrl) {
        // We ensure overflow-hidden and default rounding if the parent didn't specify one.
        const defaultRounding = className.includes('rounded-') ? '' : 'rounded-full';

        // If it's a flag (via flagcdn), use cover so it fills the circle perfectly.
        // If it's an uploaded logo, use contain so it isn't cropped.
        const objectFit = displayUrl.includes('flagcdn') ? 'object-cover scale-110' : 'object-contain scale-[1.3] drop-shadow-md';

        return (
            <div className={`flex-shrink-0 flex items-center justify-center overflow-hidden border border-white/10 shadow-sm ${defaultRounding} ${className}`}>
                <img src={displayUrl} alt={name || 'Player avatar'} className={`w-full h-full ${objectFit}`} />
            </div>
        );
    }

    // Priority 2: Match static asset file
    const url = getAvatarUrl(name);

    if (url) {
        return (
            <div className={`flex-shrink-0 flex items-center justify-center ${className.replace(/rounded-\w+/, '').replace(/shadow-\w+/, '').replace(/border\b/, '')}`}>
                <img src={url} alt={name || 'Player avatar'} className="w-full h-full object-contain drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]" />
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
