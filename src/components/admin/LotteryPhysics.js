// Antigravity physics engine for lottery draw
const BALL_RADIUS = 32;
const FRICTION = 0.999;
const WOBBLE = 0.015;
const MAX_SPEED = 3;

export function createBall(player, canvasW, canvasH, index, total) {
    const margin = BALL_RADIUS + 10;
    const cols = Math.ceil(Math.sqrt(total));
    const spacingX = (canvasW - margin * 2) / (cols + 1);
    const spacingY = (canvasH - margin * 2) / (Math.ceil(total / cols) + 1);
    const col = index % cols;
    const row = Math.floor(index / cols);
    return {
        id: player.id,
        name: player.name,
        country: player.baseTeam || player.logo || '',
        x: margin + spacingX * (col + 1),
        y: margin + spacingY * (row + 1),
        vx: (Math.random() - 0.5) * 2,
        vy: (Math.random() - 0.5) * 2,
        radius: BALL_RADIUS,
        selected: false,
        removed: false,
        glowPhase: 0,
    };
}

export function stepPhysics(balls, W, H) {
    for (const b of balls) {
        if (b.removed) continue;
        // wobble
        b.vx += (Math.random() - 0.5) * WOBBLE;
        b.vy += (Math.random() - 0.5) * WOBBLE;
        // clamp speed
        const spd = Math.sqrt(b.vx * b.vx + b.vy * b.vy);
        if (spd > MAX_SPEED) { b.vx = (b.vx / spd) * MAX_SPEED; b.vy = (b.vy / spd) * MAX_SPEED; }
        if (spd < 0.3) { b.vx += (Math.random() - 0.5) * 0.5; b.vy += (Math.random() - 0.5) * 0.5; }
        b.vx *= FRICTION; b.vy *= FRICTION;
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
        'cambodia':'kh','thailand':'th','vietnam':'vn','japan':'jp','south korea':'kr',
        'korea republic':'kr','brazil':'br','argentina':'ar','france':'fr','germany':'de',
        'spain':'es','england':'gb-eng','italy':'it','portugal':'pt','netherlands':'nl',
        'belgium':'be','croatia':'hr','uruguay':'uy','colombia':'co','mexico':'mx',
        'usa':'us','united states':'us','canada':'ca','australia':'au','china':'cn',
        'indonesia':'id','malaysia':'my','philippines':'ph','india':'in','egypt':'eg',
        'nigeria':'ng','ghana':'gh','senegal':'sn','morocco':'ma','cameroon':'cm',
        'ivory coast':'ci','chile':'cl','peru':'pe','ecuador':'ec','paraguay':'py',
        'bolivia':'bo','venezuela':'ve','costa rica':'cr','panama':'pa','honduras':'hn',
        'el salvador':'sv','guatemala':'gt','jamaica':'jm','trinidad and tobago':'tt',
        'cuba':'cu','haiti':'ht','dominican republic':'do','puerto rico':'pr',
        'sweden':'se','norway':'no','denmark':'dk','finland':'fi','iceland':'is',
        'ireland':'ie','scotland':'gb-sct','wales':'gb-wls','poland':'pl','czechia':'cz',
        'czech republic':'cz','austria':'at','switzerland':'ch','hungary':'hu','romania':'ro',
        'bulgaria':'bg','greece':'gr','turkey':'tr','russia':'ru','ukraine':'ua',
        'serbia':'rs','bosnia':'ba','slovenia':'si','slovakia':'sk','north macedonia':'mk',
        'albania':'al','montenegro':'me','kosovo':'xk','myanmar':'mm','laos':'la',
        'singapore':'sg','brunei':'bn','timor-leste':'tl','new zealand':'nz',
        'saudi arabia':'sa','iran':'ir','iraq':'iq','qatar':'qa','uae':'ae',
        'united arab emirates':'ae','kuwait':'kw','bahrain':'bh','oman':'om','jordan':'jo',
        'lebanon':'lb','syria':'sy','palestine':'ps','israel':'il','uzbekistan':'uz',
        'kazakhstan':'kz','tajikistan':'tj','kyrgyzstan':'kg','turkmenistan':'tm',
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
    // bg
    ctx.fillStyle = '#080c18';
    ctx.fillRect(0, 0, W, H);
    // starfield
    const starSeed = 42;
    for (let i = 0; i < 60; i++) {
        const sx = ((starSeed * (i + 1) * 7919) % W);
        const sy = ((starSeed * (i + 1) * 6271) % H);
        const brightness = 0.15 + 0.1 * Math.sin(time * 0.002 + i);
        ctx.fillStyle = `rgba(255,255,255,${brightness})`;
        ctx.beginPath();
        ctx.arc(sx, sy, 1, 0, Math.PI * 2);
        ctx.fill();
    }
    // chamber border
    ctx.strokeStyle = 'rgba(255,255,255,0.06)';
    ctx.lineWidth = 2;
    ctx.strokeRect(1, 1, W - 2, H - 2);

    for (const b of balls) {
        if (b.removed) continue;
        const { x, y, radius, name, country, selected, glowPhase } = b;

        ctx.save();
        // glow
        if (selected) {
            const pulseR = radius + 8 + Math.sin(glowPhase) * 6;
            const glow = ctx.createRadialGradient(x, y, radius * 0.5, x, y, pulseR + 15);
            glow.addColorStop(0, 'rgba(255,215,0,0.5)');
            glow.addColorStop(0.5, 'rgba(255,215,0,0.15)');
            glow.addColorStop(1, 'rgba(255,215,0,0)');
            ctx.fillStyle = glow;
            ctx.beginPath(); ctx.arc(x, y, pulseR + 15, 0, Math.PI * 2); ctx.fill();
        }
        // ball body
        const grad = ctx.createRadialGradient(x - radius * 0.3, y - radius * 0.3, radius * 0.1, x, y, radius);
        grad.addColorStop(0, selected ? '#fff8dc' : '#334477');
        grad.addColorStop(0.4, selected ? '#ffd700' : '#1e293b');
        grad.addColorStop(1, selected ? '#b8860b' : '#0f172a');
        ctx.fillStyle = grad;
        ctx.beginPath(); ctx.arc(x, y, radius, 0, Math.PI * 2); ctx.fill();
        // rim
        ctx.strokeStyle = selected ? 'rgba(255,215,0,0.8)' : 'rgba(255,255,255,0.12)';
        ctx.lineWidth = selected ? 2.5 : 1.5;
        ctx.stroke();
        // shine
        const shine = ctx.createRadialGradient(x - radius * 0.35, y - radius * 0.35, 1, x - radius * 0.3, y - radius * 0.3, radius * 0.5);
        shine.addColorStop(0, 'rgba(255,255,255,0.35)');
        shine.addColorStop(1, 'rgba(255,255,255,0)');
        ctx.fillStyle = shine;
        ctx.beginPath(); ctx.arc(x - radius * 0.3, y - radius * 0.3, radius * 0.5, 0, Math.PI * 2); ctx.fill();

        // flag
        const flagImg = getFlagImg(country);
        if (flagImg && flagImg.complete) {
            const fw = 18, fh = 13;
            ctx.save();
            ctx.beginPath();
            const rx = x - fw / 2, ry = y - radius * 0.25 - fh / 2;
            ctx.roundRect(rx, ry, fw, fh, 2);
            ctx.clip();
            ctx.drawImage(flagImg, rx, ry, fw, fh);
            ctx.restore();
            ctx.strokeStyle = 'rgba(255,255,255,0.2)';
            ctx.lineWidth = 0.5;
            ctx.beginPath(); ctx.roundRect(rx, ry, fw, fh, 2); ctx.stroke();
        }
        // name
        ctx.fillStyle = selected ? '#fff' : 'rgba(255,255,255,0.85)';
        ctx.font = `bold ${Math.min(9, radius * 0.32)}px "Inter", "Outfit", sans-serif`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        const nameY = flagImg ? y + radius * 0.28 : y + 2;
        const maxW = radius * 1.6;
        const displayName = name.length > 8 ? name.slice(0, 7) + '…' : name;
        ctx.fillText(displayName, x, nameY, maxW);
        ctx.restore();
    }
}
