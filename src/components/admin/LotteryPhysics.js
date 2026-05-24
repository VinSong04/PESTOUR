// Antigravity physics engine for lottery draw
const BALL_RADIUS = 34;
const FRICTION = 0.9995;
const WOBBLE = 0.06;
const MAX_SPEED = 8;

export function createBall(player, canvasW, canvasH, index, total) {
    const margin = BALL_RADIUS + 10;
    const cols = Math.ceil(Math.sqrt(total));
    const spacingX = (canvasW - margin * 2) / (cols + 1);
    const spacingY = (canvasH - margin * 2) / (Math.ceil(total / cols) + 1);
    const col = index % cols;
    const row = Math.floor(index / cols);
    const hue = (index / total) * 360;
    return {
        id: player.id,
        name: player.name,
        country: player.baseTeam || player.logo || '',
        x: margin + spacingX * (col + 1),
        y: margin + spacingY * (row + 1),
        vx: (Math.random() - 0.5) * 6,
        vy: (Math.random() - 0.5) * 6,
        radius: BALL_RADIUS,
        selected: false,
        removed: false,
        glowPhase: 0,
        hue,
        trail: [],
    };
}

export function stepPhysics(balls, W, H) {
    for (const b of balls) {
        if (b.removed) continue;
        b.vx += (Math.random() - 0.5) * WOBBLE;
        b.vy += (Math.random() - 0.5) * WOBBLE;
        const spd = Math.sqrt(b.vx * b.vx + b.vy * b.vy);
        if (spd > MAX_SPEED) { b.vx = (b.vx / spd) * MAX_SPEED; b.vy = (b.vy / spd) * MAX_SPEED; }
        if (spd < 1.5) { b.vx += (Math.random() - 0.5) * 2; b.vy += (Math.random() - 0.5) * 2; }
        b.vx *= FRICTION; b.vy *= FRICTION;
        // Trail
        if (b.selected) {
            b.trail.push({ x: b.x, y: b.y, life: 1.0 });
            if (b.trail.length > 18) b.trail.shift();
        } else {
            if (Math.random() < 0.15) {
                b.trail.push({ x: b.x, y: b.y, life: 0.5 });
                if (b.trail.length > 5) b.trail.shift();
            }
        }
        for (let i = b.trail.length - 1; i >= 0; i--) {
            b.trail[i].life -= 0.06;
            if (b.trail[i].life <= 0) b.trail.splice(i, 1);
        }
        b.x += b.vx; b.y += b.vy;
        // walls
        if (b.x - b.radius < 0) { b.x = b.radius; b.vx = Math.abs(b.vx) * 0.9; }
        if (b.x + b.radius > W) { b.x = W - b.radius; b.vx = -Math.abs(b.vx) * 0.9; }
        if (b.y - b.radius < 0) { b.y = b.radius; b.vy = Math.abs(b.vy) * 0.9; }
        if (b.y + b.radius > H) { b.y = H - b.radius; b.vy = -Math.abs(b.vy) * 0.9; }
        if (b.selected) b.glowPhase += 0.08;
    }
    // elastic collisions
    const active = balls.filter(b => !b.removed);
    for (let i = 0; i < active.length; i++) {
        for (let j = i + 1; j < active.length; j++) {
            const a = active[i], bb = active[j];
            const dx = bb.x - a.x, dy = bb.y - a.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            const minD = a.radius + bb.radius;
            if (dist < minD && dist > 0) {
                const nx = dx / dist, ny = dy / dist;
                const overlap = (minD - dist) / 2;
                a.x -= nx * overlap; a.y -= ny * overlap;
                bb.x += nx * overlap; bb.y += ny * overlap;
                const dvx = a.vx - bb.vx, dvy = a.vy - bb.vy;
                const dvn = dvx * nx + dvy * ny;
                if (dvn > 0) {
                    a.vx -= dvn * nx * 0.95; a.vy -= dvn * ny * 0.95;
                    bb.vx += dvn * nx * 0.95; bb.vy += dvn * ny * 0.95;
                }
            }
        }
    }
}

const FLAG_CODES = {};
function getCountryCode(name) {
    if (!name) return null;
    if (FLAG_CODES[name]) return FLAG_CODES[name];
    const map = {
        'cambodia': 'kh', 'thailand': 'th', 'vietnam': 'vn', 'japan': 'jp', 'south korea': 'kr',
        'korea republic': 'kr', 'brazil': 'br', 'argentina': 'ar', 'france': 'fr', 'germany': 'de',
        'spain': 'es', 'england': 'gb-eng', 'italy': 'it', 'portugal': 'pt', 'netherlands': 'nl',
        'belgium': 'be', 'croatia': 'hr', 'uruguay': 'uy', 'colombia': 'co', 'mexico': 'mx',
        'usa': 'us', 'united states': 'us', 'canada': 'ca', 'australia': 'au', 'china': 'cn',
        'indonesia': 'id', 'malaysia': 'my', 'philippines': 'ph', 'india': 'in', 'egypt': 'eg',
        'nigeria': 'ng', 'ghana': 'gh', 'senegal': 'sn', 'morocco': 'ma', 'cameroon': 'cm',
        'ivory coast': 'ci', 'chile': 'cl', 'peru': 'pe', 'ecuador': 'ec', 'paraguay': 'py',
        'bolivia': 'bo', 'venezuela': 've', 'costa rica': 'cr', 'panama': 'pa', 'honduras': 'hn',
        'el salvador': 'sv', 'guatemala': 'gt', 'jamaica': 'jm', 'trinidad and tobago': 'tt',
        'cuba': 'cu', 'haiti': 'ht', 'dominican republic': 'do', 'puerto rico': 'pr',
        'sweden': 'se', 'norway': 'no', 'denmark': 'dk', 'finland': 'fi', 'iceland': 'is',
        'ireland': 'ie', 'scotland': 'gb-sct', 'wales': 'gb-wls', 'poland': 'pl', 'czechia': 'cz',
        'czech republic': 'cz', 'austria': 'at', 'switzerland': 'ch', 'hungary': 'hu', 'romania': 'ro',
        'bulgaria': 'bg', 'greece': 'gr', 'turkey': 'tr', 'russia': 'ru', 'ukraine': 'ua',
        'serbia': 'rs', 'bosnia': 'ba', 'slovenia': 'si', 'slovakia': 'sk', 'north macedonia': 'mk',
        'albania': 'al', 'montenegro': 'me', 'kosovo': 'xk', 'myanmar': 'mm', 'laos': 'la',
        'singapore': 'sg', 'brunei': 'bn', 'timor-leste': 'tl', 'new zealand': 'nz',
        'saudi arabia': 'sa', 'iran': 'ir', 'iraq': 'iq', 'qatar': 'qa', 'uae': 'ae',
        'united arab emirates': 'ae', 'kuwait': 'kw', 'bahrain': 'bh', 'oman': 'om', 'jordan': 'jo',
        'lebanon': 'lb', 'syria': 'sy', 'palestine': 'ps', 'israel': 'il', 'uzbekistan': 'uz',
        'kazakhstan': 'kz', 'tajikistan': 'tj', 'kyrgyzstan': 'kg', 'turkmenistan': 'tm',
    };
    const code = map[name.toLowerCase()] || null;
    FLAG_CODES[name] = code;
    return code;
}

const flagImgCache = {};
function getFlagImg(country) {
    const code = getCountryCode(country);
    if (!code) return null;
    if (flagImgCache[code]) return flagImgCache[code].complete ? flagImgCache[code] : null;
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = `https://flagcdn.com/w80/${code}.png`;
    flagImgCache[code] = img;
    return img.complete ? img : null;
}

export function drawBalls(ctx, balls, W, H, time) {
    // --- Background ---
    const bgGrad = ctx.createLinearGradient(0, 0, 0, H);
    bgGrad.addColorStop(0, '#05081a');
    bgGrad.addColorStop(0.5, '#0a0f2e');
    bgGrad.addColorStop(1, '#050818');
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, W, H);

    // Subtle grid lines
    ctx.strokeStyle = 'rgba(100,140,255,0.018)';
    ctx.lineWidth = 1;
    for (let gx = 0; gx < W; gx += 50) {
        ctx.beginPath(); ctx.moveTo(gx, 0); ctx.lineTo(gx, H); ctx.stroke();
    }
    for (let gy = 0; gy < H; gy += 50) {
        ctx.beginPath(); ctx.moveTo(0, gy); ctx.lineTo(W, gy); ctx.stroke();
    }

    // Starfield
    const starSeed = 42;
    for (let i = 0; i < 80; i++) {
        const sx = ((starSeed * (i + 1) * 7919) % W);
        const sy = ((starSeed * (i + 1) * 6271) % H);
        const brightness = 0.12 + 0.08 * Math.sin(time * 0.0015 + i * 0.7);
        const sz = 0.6 + 0.4 * Math.sin(time * 0.001 + i * 1.3);
        ctx.fillStyle = `rgba(180,200,255,${brightness})`;
        ctx.beginPath();
        ctx.arc(sx, sy, sz, 0, Math.PI * 2);
        ctx.fill();
    }

    // Chamber border glow
    const borderGrad = ctx.createLinearGradient(0, 0, W, 0);
    borderGrad.addColorStop(0, 'rgba(100,140,255,0.08)');
    borderGrad.addColorStop(0.5, 'rgba(200,160,255,0.06)');
    borderGrad.addColorStop(1, 'rgba(100,140,255,0.08)');
    ctx.strokeStyle = borderGrad;
    ctx.lineWidth = 1.5;
    ctx.strokeRect(1, 1, W - 2, H - 2);

    // --- Draw each ball ---
    for (const b of balls) {
        if (b.removed) continue;
        const { x, y, radius, name, country, selected, glowPhase, hue, trail } = b;
        const flagR = radius * 0.72;

        ctx.save();

        // --- Trail particles ---
        for (const t of trail) {
            const alpha = t.life * (selected ? 0.5 : 0.12);
            const tSize = (selected ? 4 : 2) * t.life;
            const tHue = selected ? 45 : hue;
            ctx.fillStyle = `hsla(${tHue}, 90%, 65%, ${alpha})`;
            ctx.beginPath();
            ctx.arc(t.x, t.y, tSize, 0, Math.PI * 2);
            ctx.fill();
        }

        // --- Selected glow (pulsing golden) ---
        if (selected) {
            const pulseR = flagR + 10 + Math.sin(glowPhase) * 6;
            const glow = ctx.createRadialGradient(x, y, flagR * 0.3, x, y, pulseR + 16);
            glow.addColorStop(0, 'rgba(255,215,0,0.5)');
            glow.addColorStop(0.4, 'rgba(255,180,0,0.15)');
            glow.addColorStop(1, 'rgba(255,215,0,0)');
            ctx.fillStyle = glow;
            ctx.beginPath(); ctx.arc(x, y, pulseR + 16, 0, Math.PI * 2); ctx.fill();

            // Spinning ring
            ctx.save();
            ctx.translate(x, y);
            ctx.rotate(glowPhase * 0.5);
            ctx.strokeStyle = 'rgba(255,215,0,0.3)';
            ctx.lineWidth = 1.5;
            ctx.setLineDash([4, 8]);
            ctx.beginPath(); ctx.arc(0, 0, flagR + 6, 0, Math.PI * 2); ctx.stroke();
            ctx.setLineDash([]);
            ctx.restore();
        }

        // --- Circular flag as the ball ---
        const flagImg = getFlagImg(country);
        if (flagImg && flagImg.complete) {
            ctx.save();
            ctx.beginPath();
            ctx.arc(x, y, flagR, 0, Math.PI * 2);
            ctx.clip();
            const imgAspect = flagImg.naturalWidth / flagImg.naturalHeight;
            let drawW, drawH;
            if (imgAspect > 1) {
                drawH = flagR * 2;
                drawW = drawH * imgAspect;
            } else {
                drawW = flagR * 2;
                drawH = drawW / imgAspect;
            }
            ctx.drawImage(flagImg, x - drawW / 2, y - drawH / 2, drawW, drawH);
            ctx.restore();

            // Ring border
            ctx.strokeStyle = selected ? 'rgba(255,215,0,0.8)' : 'rgba(255,255,255,0.25)';
            ctx.lineWidth = selected ? 2.5 : 1.5;
            ctx.beginPath(); ctx.arc(x, y, flagR, 0, Math.PI * 2); ctx.stroke();

            // Glass shine
            const shine = ctx.createRadialGradient(
                x - flagR * 0.3, y - flagR * 0.35, 1,
                x - flagR * 0.2, y - flagR * 0.2, flagR * 0.6
            );
            shine.addColorStop(0, 'rgba(255,255,255,0.25)');
            shine.addColorStop(0.5, 'rgba(255,255,255,0.06)');
            shine.addColorStop(1, 'rgba(255,255,255,0)');
            ctx.fillStyle = shine;
            ctx.beginPath(); ctx.arc(x, y, flagR, 0, Math.PI * 2); ctx.fill();
        } else {
            // Fallback: hollow circle with initials
            ctx.strokeStyle = selected ? 'rgba(255,215,0,0.6)' : `hsla(${hue}, 50%, 50%, 0.4)`;
            ctx.lineWidth = 2;
            ctx.beginPath(); ctx.arc(x, y, flagR, 0, Math.PI * 2); ctx.stroke();
            ctx.fillStyle = selected ? '#ffd700' : `hsl(${hue}, 50%, 65%)`;
            ctx.font = `bold 14px "Outfit", "Inter", sans-serif`;
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(name.slice(0, 2).toUpperCase(), x, y);
        }

        // --- Player name below the flag circle ---
        const nameY = y + flagR + 12;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        const fontSize = Math.min(10, radius * 0.32);
        const displayName = name.length > 9 ? name.slice(0, 8) + '…' : name;
        ctx.font = `bold ${fontSize}px "Inter", "Outfit", sans-serif`;
        ctx.fillStyle = 'rgba(0,0,0,0.6)';
        ctx.fillText(displayName, x + 0.5, nameY + 0.5, radius * 2);
        ctx.fillStyle = selected ? '#ffd700' : 'rgba(255,255,255,0.9)';
        ctx.fillText(displayName, x, nameY, radius * 2);

        ctx.restore();
    }
}
