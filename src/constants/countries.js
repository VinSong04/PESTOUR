/**
 * Shared country data used by PlayerAvatar (for flag lookup) and RegisterView (for team selection).
 * Single source of truth — no more duplicate lists.
 */

export const COUNTRY_CODES = {
    'afghanistan': 'af', 'albania': 'al', 'algeria': 'dz', 'andorra': 'ad', 'argentina': 'ar', 'armenia': 'am', 'australia': 'au', 'austria': 'at',
    'azerbaijan': 'az', 'bahrain': 'bh', 'bangladesh': 'bd', 'belarus': 'by', 'belgium': 'be', 'bhutan': 'bt', 'bolivia': 'bo',
    'bosnia and herzegovina': 'ba', 'botswana': 'bw', 'brazil': 'br', 'british virgin islands': 'vg', 'brunei darussalam': 'bn',
    'bulgaria': 'bg', 'burkina faso': 'bf', 'cambodia': 'kh', 'cameroon': 'cm', 'canada': 'ca', 'cape verde': 'cv', 'cayman islands': 'ky',
    'chad': 'td', 'chile': 'cl', 'china pr': 'cn', 'colombia': 'co', 'comoros': 'km', 'congo dr': 'cd', 'costa rica': 'cr', "cote d'ivoire": 'ci',
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

/**
 * Sorted list of all country names (derived from COUNTRY_CODES keys).
 * Used by RegisterView for the team selection dropdown.
 */
export const COUNTRIES = Object.keys(COUNTRY_CODES)
    .map(name => name.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' '))
    .sort();

/**
 * Get a flag CDN URL for a country name.
 * Returns null if the country is not recognized.
 */
export const getFlagUrl = (countryName) => {
    if (!countryName) return null;
    const code = COUNTRY_CODES[countryName.toLowerCase().trim()];
    return code ? `https://flagcdn.com/w160/${code}.png` : null;
};
