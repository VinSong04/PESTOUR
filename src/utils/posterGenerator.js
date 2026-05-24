import { getFlagUrl } from '../constants/countries';

const preloadFlags = async (data) => {
    if (!data || !data.players) return;
    const promises = data.players.map(async (p) => {
        if (!p.logo || p._flagImg) return;
        const url = getFlagUrl(p.logo);
        if (url) {
            const img = new Image();
            img.crossOrigin = 'anonymous';
            await new Promise((resolve) => {
                img.onload = resolve;
                img.onerror = resolve;
                img.src = url;
            });
            if (img.complete && img.naturalWidth > 0) {
                p._flagImg = img;
            }
        }
    });
    await Promise.all(promises);
};
const drawCircleImage = (ctx, img, x, y, radius) => {
    ctx.save();
    ctx.beginPath();
    ctx.arc(x + radius, y + radius, radius, 0, Math.PI * 2);
    ctx.clip();
    
    const imgRatio = img.width / img.height;
    let drawW, drawH, drawX, drawY;
    if (imgRatio > 1) { 
        drawH = radius * 2;
        drawW = drawH * imgRatio;
        drawX = x + radius - drawW / 2;
        drawY = y;
    } else {
        drawW = radius * 2;
        drawH = drawW / imgRatio;
        drawX = x;
        drawY = y + radius - drawH / 2;
    }
    ctx.drawImage(img, drawX, drawY, drawW, drawH);
    ctx.restore();
    
    ctx.beginPath();
    ctx.arc(x + radius, y + radius, radius, 0, Math.PI * 2);
    ctx.strokeStyle = 'rgba(255,255,255,0.2)';
    ctx.lineWidth = 1;
};
const truncateText = (ctx, text, maxWidth) => {
    if (!text) return '';
    if (ctx.measureText(text).width <= maxWidth) return text;
    let temp = text;
    while (temp.length > 0 && ctx.measureText(temp + '...').width > maxWidth) {
        temp = temp.slice(0, -1);
    }
    return temp + '...';
};


export const renderClassicPoster = async (ctx, W, H, logo, type, data, config) => {
    await preloadFlags(data);
    const { posterTitle, posterSubtitle, posterFooter, posterAccent, posterDate, posterMatchTime = 'WEEKEND PLAYED' } = config;

    // === BACKGROUND GRADIENT (CPL-style maroon/red) ===
    const bg = ctx.createLinearGradient(0, 0, W, H);
    bg.addColorStop(0, '#5b1a1a');
    bg.addColorStop(0.3, '#8b2525');
    bg.addColorStop(0.6, '#6b2020');
    bg.addColorStop(1, '#3a0f0f');
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, W, H);

    // Subtle overlay pattern (diagonal lines)
    ctx.globalAlpha = 0.04;
    for (let i = -H; i < W + H; i += 30) {
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(i, 0);
        ctx.lineTo(i + H, H);
        ctx.stroke();
    }
    ctx.globalAlpha = 1;

    // Light gradient on top
    const topGlow = ctx.createRadialGradient(W / 2, 0, 0, W / 2, 0, W);
    topGlow.addColorStop(0, 'rgba(255,200,150,0.12)');
    topGlow.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = topGlow;
    ctx.fillRect(0, 0, W, H);

    // === HELPER FUNCTIONS ===
    const roundRect = (x, y, w, h, r) => {
        ctx.beginPath();
        ctx.moveTo(x + r, y);
        ctx.lineTo(x + w - r, y);
        ctx.quadraticCurveTo(x + w, y, x + w, y + r);
        ctx.lineTo(x + w, y + h - r);
        ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
        ctx.lineTo(x + r, y + h);
        ctx.quadraticCurveTo(x, y + h, x, y + h - r);
        ctx.lineTo(x, y + r);
        ctx.quadraticCurveTo(x, y, x + r, y);
        ctx.closePath();
    };

    const drawSkewedBanner = (x, y, w, h, color) => {
        const skew = 15;
        ctx.save();
        ctx.beginPath();
        ctx.moveTo(x + skew, y);
        ctx.lineTo(x + w, y);
        ctx.lineTo(x + w - skew, y + h);
        ctx.lineTo(x, y + h);
        ctx.closePath();
        ctx.fillStyle = color;
        ctx.fill();
        ctx.restore();
    };

    // === HEADER (Logo + Title) ===
    if (logo) {
        ctx.save();
        ctx.shadowColor = 'rgba(0,0,0,0.4)';
        ctx.shadowBlur = 10;
        ctx.shadowOffsetX = 2;
        ctx.shadowOffsetY = 4;
        roundRect(40, 30, 100, 100, 12);
        ctx.clip();
        ctx.drawImage(logo, 40, 30, 100, 100);
        ctx.restore();

        // Premium gold/white border
        ctx.strokeStyle = '#fbbf24'; // Gold color
        ctx.lineWidth = 3.5;
        roundRect(40, 30, 100, 100, 12);
        ctx.stroke();
        
        ctx.strokeStyle = 'rgba(255,255,255,0.2)';
        ctx.lineWidth = 1;
        roundRect(38, 28, 104, 104, 14);
        ctx.stroke();
    }

    const formattedDate = posterDate
        ? new Date(posterDate).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })
        : new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

    ctx.save();
    ctx.textBaseline = 'middle';
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 44px Arial, sans-serif';
    ctx.textAlign = 'left';
    ctx.shadowColor = 'rgba(0,0,0,0.5)';
    ctx.shadowBlur = 8;
    ctx.fillText(posterTitle.toUpperCase(), 160, 68);
    
    ctx.font = 'bold 20px Arial, sans-serif';
    ctx.fillStyle = '#fbbf24';
    ctx.fillText(posterSubtitle.toUpperCase(), 160, 105);
    ctx.restore();

    ctx.save();
    ctx.textAlign = 'right';
    ctx.textBaseline = 'middle';
    ctx.shadowColor = 'rgba(0,0,0,0.5)';
    ctx.shadowBlur = 6;
    
    ctx.font = 'bold 18px Arial, sans-serif';
    ctx.fillStyle = '#fbbf24';
    const typeLabel = type === 'schedule' ? 'FIXTURE LIVE' : type === 'results' ? 'MATCH RESULTS' : 'LEADERBOARD';
    ctx.fillText(typeLabel, W - 50, 62);
    
    ctx.font = 'bold 13px Arial, sans-serif';
    ctx.fillStyle = 'rgba(255,255,255,0.6)';
    ctx.fillText(formattedDate.toUpperCase(), W - 50, 95);
    ctx.restore();

    // Elegant gradient divider line
    const dividerGrad = ctx.createLinearGradient(40, 0, W - 40, 0);
    dividerGrad.addColorStop(0, 'rgba(251,191,36,0.15)');
    dividerGrad.addColorStop(0.5, '#fbbf24');
    dividerGrad.addColorStop(1, 'rgba(251,191,36,0.15)');
    ctx.fillStyle = dividerGrad;
    ctx.fillRect(40, 150, W - 80, 3);

    let sectionTitle = '';
    if (type === 'schedule') sectionTitle = '⚽  UPCOMING MATCHES';
    else if (type === 'results') sectionTitle = '🏆  LATEST RESULTS';
    else sectionTitle = '📊  GROUP STANDINGS';

    drawSkewedBanner(40, 180, 480, 55, posterAccent);
    ctx.save();
    ctx.textBaseline = 'middle';
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 24px Arial, sans-serif';
    ctx.fillText(sectionTitle, 75, 209);
    ctx.restore();

    let startY = 280;

    if (type === 'schedule') {
        const upNext = data.matches.filter(m => !m.played);
        if (upNext.length === 0) {
            ctx.fillStyle = '#ffffff';
            ctx.textAlign = 'center';
            ctx.font = 'bold 32px Arial, sans-serif';
            ctx.fillText('No upcoming matches', W / 2, startY + 100);
        } else {
            upNext.forEach((m, i) => {
                const y = startY + i * 170;
                const p1 = data.players.find(p => p.id === m.p1Id);
                const p2 = data.players.find(p => p.id === m.p2Id);
                const p1Name = p1?.name || m.p1Id;
                const p2Name = p2?.name || m.p2Id;
                const group = m.groupId ? `GROUP ${m.groupId}` : 'KNOCKOUT';

                // Card bg
                roundRect(50, y, W - 100, 150, 16);
                ctx.fillStyle = i % 2 === 0 ? 'rgba(0,0,0,0.35)' : 'rgba(0,0,0,0.25)';
                ctx.fill();
                ctx.strokeStyle = 'rgba(255,255,255,0.08)';
                ctx.lineWidth = 1;
                ctx.stroke();

                // Group badge
                ctx.globalAlpha = 0.8;
                drawSkewedBanner(50, y, 200, 30, posterAccent);
                ctx.globalAlpha = 1.0;
                ctx.fillStyle = '#ffffff';
                ctx.font = 'bold 14px Arial, sans-serif';
                ctx.textAlign = 'left';
                ctx.fillText(group, 75, y + 22);

                // Fixed layout zones
                const flagR = 32;
                const cardCY = y + 90;
                const badgeW = 130;
                const badgeL = W / 2 - badgeW / 2;   // left edge of center badge
                const badgeR = W / 2 + badgeW / 2;   // right edge of center badge
                const nameGap = 25;                   // gap between name and badge
                const leftFlagCX = 100;               // P1 flag center X
                const rightFlagCX = W - 100;          // P2 flag center X
                const p1NameRight = badgeL - nameGap; // P1 name right edge
                const p2NameLeft = badgeR + nameGap;  // P2 name left edge
                const p1NameMaxW = p1NameRight - (leftFlagCX + flagR + 12);
                const p2NameMaxW = (rightFlagCX - flagR - 12) - p2NameLeft;

                // P1 flag (fixed left)
                if (p1?._flagImg) {
                    drawCircleImage(ctx, p1._flagImg, leftFlagCX - flagR, cardCY - flagR, flagR);
                }
                // P1 name (right-aligned before center badge)
                ctx.fillStyle = '#ffffff';
                ctx.font = 'bold 24px Arial, sans-serif';
                ctx.textAlign = 'right';
                ctx.fillText(truncateText(ctx, p1Name.toUpperCase(), p1NameMaxW), p1NameRight, cardCY + 8);

                // Center time badge
                ctx.save();
                roundRect(badgeL, y + 55, badgeW, 65, 12);
                ctx.globalAlpha = 0.9;
                ctx.fillStyle = posterAccent;
                ctx.fill();
                ctx.restore();

                ctx.save();
                ctx.fillStyle = '#ffffff';
                let fontSize = 32;
                ctx.font = `bold ${fontSize}px Arial, sans-serif`;
                while (ctx.measureText(posterMatchTime).width > badgeW - 12 && fontSize > 12) {
                    fontSize -= 2;
                    ctx.font = `bold ${fontSize}px Arial, sans-serif`;
                }
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                ctx.fillText(posterMatchTime, W / 2, y + 87.5);
                ctx.restore();

                // P2 name (left-aligned after center badge)
                ctx.fillStyle = '#ffffff';
                ctx.font = 'bold 24px Arial, sans-serif';
                ctx.textAlign = 'left';
                ctx.fillText(truncateText(ctx, p2Name.toUpperCase(), p2NameMaxW), p2NameLeft, cardCY + 8);

                // P2 flag (fixed right)
                if (p2?._flagImg) {
                    drawCircleImage(ctx, p2._flagImg, rightFlagCX - flagR, cardCY - flagR, flagR);
                }
            });
        }
    } else if (type === 'results') {
        const recent = data.matches.filter(m => m.played);
        if (recent.length === 0) {
            ctx.fillStyle = '#ffffff';
            ctx.textAlign = 'center';
            ctx.font = 'bold 32px Arial, sans-serif';
            ctx.fillText('No results yet', W / 2, startY + 100);
        } else {
            recent.forEach((m, i) => {
                const y = startY + i * 170;
                const p1 = data.players.find(p => p.id === m.p1Id);
                const p2 = data.players.find(p => p.id === m.p2Id);
                const p1Name = p1?.name || m.p1Id;
                const p2Name = p2?.name || m.p2Id;
                let s1 = 0, s2 = 0;
                [m.g1, m.g2, m.g3].forEach(g => {
                    if (g && g.p1 > g.p2) s1++;
                    if (g && g.p2 > g.p1) s2++;
                });

                roundRect(50, y, W - 100, 150, 16);
                ctx.fillStyle = i % 2 === 0 ? 'rgba(0,0,0,0.35)' : 'rgba(0,0,0,0.25)';
                ctx.fill();
                ctx.strokeStyle = 'rgba(255,255,255,0.08)';
                ctx.lineWidth = 1;
                ctx.stroke();

                const winner = s1 > s2 ? 'p1' : s2 > s1 ? 'p2' : 'draw';

                // Fixed layout zones
                const flagR = 32;
                const cardCY = y + 90;
                const badgeW = 140;
                const badgeL = W / 2 - badgeW / 2;   // left edge of center badge
                const badgeR = W / 2 + badgeW / 2;   // right edge of center badge
                const nameGap = 25;                   // gap between name and badge
                const leftFlagCX = 100;               // P1 flag center X
                const rightFlagCX = W - 100;          // P2 flag center X
                const p1NameRight = badgeL - nameGap; // P1 name right edge
                const p2NameLeft = badgeR + nameGap;  // P2 name left edge
                const p1NameMaxW = p1NameRight - (leftFlagCX + flagR + 12);
                const p2NameMaxW = (rightFlagCX - flagR - 12) - p2NameLeft;

                // P1 flag
                if (p1?._flagImg) {
                    drawCircleImage(ctx, p1._flagImg, leftFlagCX - flagR, cardCY - flagR, flagR);
                }
                // P1 name
                ctx.fillStyle = winner === 'p1' ? '#fbbf24' : '#ffffff';
                ctx.font = 'bold 24px Arial, sans-serif';
                ctx.textAlign = 'right';
                ctx.fillText(truncateText(ctx, p1Name.toUpperCase(), p1NameMaxW), p1NameRight, cardCY + 8);

                // Score badge
                roundRect(badgeL, y + 52, badgeW, 66, 12);
                ctx.fillStyle = 'rgba(0,0,0,0.5)';
                ctx.fill();
                ctx.strokeStyle = posterAccent;
                ctx.lineWidth = 2;
                ctx.stroke();
                ctx.fillStyle = '#ffffff';
                ctx.font = 'bold 38px Arial, sans-serif';
                ctx.textAlign = 'center';
                ctx.fillText(`${s1} - ${s2}`, W / 2, y + 98);

                // P2 name
                ctx.fillStyle = winner === 'p2' ? '#fbbf24' : '#ffffff';
                ctx.font = 'bold 24px Arial, sans-serif';
                ctx.textAlign = 'left';
                ctx.fillText(truncateText(ctx, p2Name.toUpperCase(), p2NameMaxW), p2NameLeft, cardCY + 8);

                // P2 flag
                if (p2?._flagImg) {
                    drawCircleImage(ctx, p2._flagImg, rightFlagCX - flagR, cardCY - flagR, flagR);
                }
            });
        }
    } else if (type === 'standings') {
        const groups = {};
        data.players.filter(p => p.group).forEach(p => {
            if (!groups[p.group]) groups[p.group] = [];
            groups[p.group].push(p);
        });

        const sortFn = (a, b) => {
            const ptsA = (a.w || 0) * 3 + (a.d || 0);
            const ptsB = (b.w || 0) * 3 + (b.d || 0);
            if (ptsB !== ptsA) return ptsB - ptsA;
            const gdA = (a.gf || 0) - (a.ga || 0);
            const gdB = (b.gf || 0) - (b.ga || 0);
            return gdB - gdA;
        };

        const groupKeys = Object.keys(groups).sort();
        let gy = startY;

        groupKeys.forEach((gKey, gi) => {
            const players = groups[gKey].sort(sortFn);
            const groupColor = [posterAccent, '#2563eb', '#16a34a', '#9333ea', '#ea580c', '#0891b2'][gi % 6];

            drawSkewedBanner(50, gy, 250, 40, groupColor);
            ctx.fillStyle = '#ffffff';
            ctx.font = 'bold 22px Arial, sans-serif';
            ctx.textAlign = 'left';
            ctx.fillText(`GROUP ${gKey}`, 80, gy + 30);

            gy += 50;
            ctx.fillStyle = 'rgba(255,255,255,0.15)';
            ctx.fillRect(50, gy, W - 100, 35);
            ctx.fillStyle = 'rgba(255,255,255,0.6)';
            ctx.font = 'bold 14px Arial, sans-serif';
            
            ctx.textAlign = 'center';
            ctx.fillText('#', 75, gy + 24);
            
            ctx.textAlign = 'left';
            ctx.fillText('PLAYER', 110, gy + 24);
            
            ctx.textAlign = 'center';
            ctx.fillText('MP', 580, gy + 24);
            ctx.fillText('W-L', 665, gy + 24);
            ctx.fillText('GF', 745, gy + 24);
            ctx.fillText('GA', 825, gy + 24);
            ctx.fillText('GD', 905, gy + 24);
            ctx.fillText('PTS', 985, gy + 24);

            gy += 40;
            players.forEach((p, pi) => {
                const pts = (p.w || 0) * 3 + (p.d || 0);
                const gd = (p.gf || 0) - (p.ga || 0);
                const played = (p.w || 0) + (p.d || 0) + (p.l || 0);

                ctx.fillStyle = pi % 2 === 0 ? 'rgba(0,0,0,0.25)' : 'rgba(0,0,0,0.15)';
                ctx.fillRect(50, gy, W - 100, 40);

                if (pi < 2) {
                    ctx.fillStyle = groupColor;
                    ctx.fillRect(50, gy, 4, 40);
                }

                // Rank
                ctx.fillStyle = '#ffffff';
                ctx.font = 'bold 18px Arial, sans-serif';
                ctx.textAlign = 'center';
                ctx.fillText(pi + 1, 75, gy + 27);

                // Flag
                const flagRadius = 14;
                if (p._flagImg) {
                    drawCircleImage(ctx, p._flagImg, 110, gy + 20 - flagRadius, flagRadius);
                }

                // Player name
                ctx.fillStyle = '#ffffff';
                ctx.font = 'bold 20px Arial, sans-serif';
                ctx.textAlign = 'left';
                ctx.fillText(p.name || '—', 150, gy + 27);

                // Stats columns
                ctx.font = '18px Arial, sans-serif';
                ctx.textAlign = 'center';
                ctx.fillText(played, 580, gy + 27);
                ctx.fillText(`${p.w || 0}-${p.l || 0}`, 665, gy + 27);
                ctx.fillText(p.gf || 0, 745, gy + 27);
                ctx.fillText(p.ga || 0, 825, gy + 27);
                
                ctx.fillStyle = gd > 0 ? '#4ade80' : gd < 0 ? '#f87171' : '#ffffff';
                ctx.fillText(gd > 0 ? `+${gd}` : gd, 905, gy + 27);
                
                ctx.fillStyle = '#fbbf24';
                ctx.font = 'bold 22px Arial, sans-serif';
                ctx.fillText(pts, 985, gy + 27);

                gy += 42;
            });
            gy += 25;
        });
    }

    ctx.fillStyle = 'rgba(0,0,0,0.6)';
    ctx.fillRect(0, H - 70, W, 70);
    ctx.fillStyle = posterAccent;
    ctx.fillRect(0, H - 70, W, 3);
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 20px Arial, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(posterFooter, W / 2, H - 30);
};


export const renderNeonPoster = async (ctx, W, H, logo, type, data, config) => {
    await preloadFlags(data);
    const { posterTitle, posterSubtitle, posterFooter, posterDate, posterMatchTime = 'WEEKEND PLAYED' } = config;

    // ========== PREMIUM DARK NAVY BACKGROUND ==========
    const bg = ctx.createLinearGradient(0, 0, W * 0.4, H);
    bg.addColorStop(0, '#070b14');
    bg.addColorStop(0.3, '#0a1020');
    bg.addColorStop(0.6, '#0d1428');
    bg.addColorStop(1, '#060a12');
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, W, H);

    // Hexagonal mesh pattern overlay
    ctx.globalAlpha = 0.035;
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 0.8;
    const hexSize = 40;
    const hexH = hexSize * Math.sqrt(3);
    for (let row = -1; row < H / hexH + 2; row++) {
        for (let col = -1; col < W / (hexSize * 1.5) + 2; col++) {
            const cx = col * hexSize * 1.5;
            const cy = row * hexH + (col % 2 === 0 ? 0 : hexH / 2);
            ctx.beginPath();
            for (let i = 0; i < 6; i++) {
                const angle = (Math.PI / 3) * i - Math.PI / 6;
                const hx = cx + hexSize * Math.cos(angle);
                const hy = cy + hexSize * Math.sin(angle);
                i === 0 ? ctx.moveTo(hx, hy) : ctx.lineTo(hx, hy);
            }
            ctx.closePath();
            ctx.stroke();
        }
    }
    ctx.globalAlpha = 1;

    // Top-center cyan radial glow
    const topGlow = ctx.createRadialGradient(W / 2, -100, 0, W / 2, -100, 700);
    topGlow.addColorStop(0, 'rgba(0,212,255,0.12)');
    topGlow.addColorStop(0.5, 'rgba(0,212,255,0.04)');
    topGlow.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = topGlow;
    ctx.fillRect(0, 0, W, H);

    // Bottom ambient glow (gold)
    const botGlow = ctx.createRadialGradient(W / 2, H + 100, 0, W / 2, H + 100, 600);
    botGlow.addColorStop(0, 'rgba(251,191,36,0.06)');
    botGlow.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = botGlow;
    ctx.fillRect(0, 0, W, H);

    // ========== HELPER FUNCTIONS ==========
    const roundRect = (x, y, w, h, r) => {
        ctx.beginPath();
        ctx.moveTo(x + r, y);
        ctx.lineTo(x + w - r, y);
        ctx.quadraticCurveTo(x + w, y, x + w, y + r);
        ctx.lineTo(x + w, y + h - r);
        ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
        ctx.lineTo(x + r, y + h);
        ctx.quadraticCurveTo(x, y + h, x, y + h - r);
        ctx.lineTo(x, y + r);
        ctx.quadraticCurveTo(x, y, x + r, y);
        ctx.closePath();
    };

    const drawGlassCard = (x, y, w, h, r, borderColor) => {
        roundRect(x, y, w, h, r);
        ctx.fillStyle = 'rgba(15,20,35,0.65)';
        ctx.fill();
        const innerGrad = ctx.createLinearGradient(x, y, x, y + h);
        innerGrad.addColorStop(0, 'rgba(255,255,255,0.06)');
        innerGrad.addColorStop(0.5, 'rgba(255,255,255,0)');
        innerGrad.addColorStop(1, 'rgba(255,255,255,0.02)');
        roundRect(x, y, w, h, r);
        ctx.fillStyle = innerGrad;
        ctx.fill();
        roundRect(x, y, w, h, r);
        ctx.strokeStyle = borderColor || 'rgba(0,212,255,0.15)';
        ctx.lineWidth = 1.5;
        ctx.stroke();
    };

    const drawNeonLine = (x1, y1, x2, y2, color, width) => {
        ctx.save();
        ctx.shadowColor = color;
        ctx.shadowBlur = 12;
        ctx.strokeStyle = color;
        ctx.lineWidth = width || 2;
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
        ctx.shadowBlur = 0;
        ctx.restore();
    };

    const drawVsBadge = (cx, cy, text = 'VS') => {
        ctx.save();
        const isVS = text === 'VS';
        const badgeW = isVS ? 76 : Math.max(90, ctx.measureText(text).width + 24);
        
        ctx.shadowColor = '#00d4ff';
        ctx.shadowBlur = 25;
        if (isVS) {
            ctx.beginPath();
            ctx.arc(cx, cy, 38, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(0,212,255,0.12)';
            ctx.fill();
        } else {
            roundRect(cx - badgeW / 2, cy - 25, badgeW, 50, 12);
            ctx.fillStyle = 'rgba(0,212,255,0.12)';
            ctx.fill();
        }
        ctx.shadowBlur = 0;

        if (isVS) {
            ctx.beginPath();
            ctx.moveTo(cx, cy - 32);
            ctx.lineTo(cx + 32, cy);
            ctx.lineTo(cx, cy + 32);
            ctx.lineTo(cx - 32, cy);
            ctx.closePath();
        } else {
            roundRect(cx - badgeW / 2, cy - 25, badgeW, 50, 12);
        }
        const dGrad = ctx.createLinearGradient(cx, cy - 32, cx, cy + 32);
        dGrad.addColorStop(0, 'rgba(0,212,255,0.3)');
        dGrad.addColorStop(1, 'rgba(0,140,200,0.15)');
        ctx.fillStyle = dGrad;
        ctx.fill();
        ctx.strokeStyle = 'rgba(0,212,255,0.6)';
        ctx.lineWidth = 1.5;
        ctx.stroke();

        let fontSize = 26;
        if (!isVS) {
            fontSize = 18;
            ctx.font = `bold ${fontSize}px Arial, sans-serif`;
            while (ctx.measureText(text).width > badgeW - 16 && fontSize > 10) {
                fontSize -= 1;
                ctx.font = `bold ${fontSize}px Arial, sans-serif`;
            }
        } else {
            ctx.font = 'bold 26px Arial, sans-serif';
        }
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.shadowColor = '#fbbf24';
        ctx.shadowBlur = 15;
        ctx.fillStyle = '#fbbf24';
        ctx.fillText(text, cx, cy + 1);
        ctx.shadowBlur = 0;
        ctx.textBaseline = 'alphabetic';
        ctx.restore();
    };

    // ========== HEADER SECTION ==========
    drawNeonLine(0, 4, W * 0.35, 4, '#00d4ff', 3);
    drawNeonLine(W * 0.65, 4, W, 4, '#fbbf24', 3);
    drawGlassCard(40, 25, W - 80, 140, 20, 'rgba(0,212,255,0.12)');

    if (logo) {
        ctx.save();
        ctx.shadowColor = '#00d4ff';
        ctx.shadowBlur = 15;
        roundRect(60, 40, 110, 110, 14);
        ctx.clip();
        ctx.drawImage(logo, 60, 40, 110, 110);
        ctx.restore();
        
        ctx.save();
        ctx.strokeStyle = 'rgba(0,212,255,0.6)';
        ctx.lineWidth = 3;
        roundRect(60, 40, 110, 110, 14);
        ctx.stroke();
        ctx.restore();
    }

    ctx.save();
    ctx.shadowColor = '#00d4ff';
    ctx.shadowBlur = 20;
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 46px Arial, sans-serif';
    ctx.textAlign = 'left';
    ctx.fillText(posterTitle, 190, 90);
    ctx.shadowBlur = 0;
    ctx.shadowColor = '#fbbf24';
    ctx.shadowBlur = 10;
    ctx.font = 'bold 22px Arial, sans-serif';
    ctx.fillStyle = '#fbbf24';
    ctx.fillText(posterSubtitle, 190, 125);
    ctx.shadowBlur = 0;
    ctx.restore();

    const typeLabel = type === 'schedule' ? 'FIXTURE LIVE' : type === 'results' ? 'MATCH RESULTS' : 'LEADERBOARD';
    const typeBadgeColor = type === 'schedule' ? '#00d4ff' : type === 'results' ? '#4ade80' : '#c084fc';
    ctx.save();
    roundRect(W - 280, 45, 220, 38, 19);
    ctx.fillStyle = `${typeBadgeColor}15`;
    ctx.fill();
    roundRect(W - 280, 45, 220, 38, 19);
    ctx.strokeStyle = `${typeBadgeColor}40`;
    ctx.lineWidth = 1;
    ctx.stroke();
    ctx.shadowColor = typeBadgeColor;
    ctx.shadowBlur = 8;
    ctx.fillStyle = typeBadgeColor;
    ctx.font = 'bold 14px Arial, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(typeLabel, W - 170, 69);
    ctx.shadowBlur = 0;
    ctx.restore();

    ctx.fillStyle = 'rgba(255,255,255,0.35)';
    ctx.font = 'bold 13px Arial, sans-serif';
    ctx.textAlign = 'right';
    const formattedDate = posterDate
        ? new Date(posterDate).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })
        : new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
    ctx.fillText(formattedDate, W - 60, 110);

    const divY = 190;
    ctx.save();
    const divGrad = ctx.createLinearGradient(40, 0, W - 40, 0);
    divGrad.addColorStop(0, '#00d4ff');
    divGrad.addColorStop(0.5, 'rgba(0,212,255,0.2)');
    divGrad.addColorStop(1, '#fbbf24');
    ctx.shadowColor = '#00d4ff';
    ctx.shadowBlur = 10;
    ctx.strokeStyle = divGrad;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(40, divY);
    ctx.lineTo(W - 40, divY);
    ctx.stroke();
    ctx.shadowBlur = 0;
    ctx.restore();

    // ========== SECTION TITLE ==========
    const secY = 210;
    let sectionEmoji = '';
    let sectionLabel = '';
    if (type === 'schedule') { sectionEmoji = '⚽'; sectionLabel = 'UPCOMING MATCHES'; }
    else if (type === 'results') { sectionEmoji = '🏆'; sectionLabel = 'LATEST RESULTS'; }
    else { sectionEmoji = '📊'; sectionLabel = 'GROUP STANDINGS'; }

    ctx.save();
    ctx.font = 'bold 28px Arial, sans-serif';
    ctx.textAlign = 'left';
    ctx.fillStyle = '#ffffff';
    ctx.shadowColor = '#00d4ff';
    ctx.shadowBlur = 10;
    ctx.fillText(`${sectionEmoji}  ${sectionLabel}`, 55, secY + 32);
    ctx.shadowBlur = 0;
    const textW = ctx.measureText(`${sectionEmoji}  ${sectionLabel}`).width;
    drawNeonLine(55, secY + 42, 55 + textW, secY + 42, '#00d4ff', 2);
    ctx.restore();

    let startY = 290;

    if (type === 'schedule') {
        const upNext = data.matches.filter(m => !m.played);
        if (upNext.length === 0) {
            ctx.fillStyle = 'rgba(255,255,255,0.4)';
            ctx.textAlign = 'center';
            ctx.font = 'bold 30px Arial, sans-serif';
            ctx.fillText('No upcoming matches', W / 2, startY + 120);
        } else {
            upNext.forEach((m, i) => {
                const cardH = 155;
                const y = startY + i * (cardH + 18);
                const p1 = data.players.find(p => p.id === m.p1Id);
                const p2 = data.players.find(p => p.id === m.p2Id);
                const p1Name = p1?.name || m.p1Id;
                const p2Name = p2?.name || m.p2Id;
                const group = m.groupId ? `GROUP ${m.groupId}` : 'KNOCKOUT';

                drawGlassCard(50, y, W - 100, cardH, 18, 'rgba(0,212,255,0.12)');

                ctx.save();
                ctx.shadowColor = '#00d4ff';
                ctx.shadowBlur = 8;
                roundRect(50, y, 4, cardH, 2);
                ctx.fillStyle = '#00d4ff';
                ctx.fill();
                ctx.shadowBlur = 0;
                ctx.restore();

                ctx.save();
                ctx.shadowColor = '#fbbf24';
                ctx.shadowBlur = 8;
                roundRect(W - 54, y, 4, cardH, 2);
                ctx.fillStyle = '#fbbf24';
                ctx.fill();
                ctx.shadowBlur = 0;
                ctx.restore();

                roundRect(70, y + 12, 140, 28, 14);
                ctx.fillStyle = 'rgba(0,212,255,0.12)';
                ctx.fill();
                roundRect(70, y + 12, 140, 28, 14);
                ctx.strokeStyle = 'rgba(0,212,255,0.3)';
                ctx.lineWidth = 1;
                ctx.stroke();
                ctx.fillStyle = '#00d4ff';
                ctx.font = 'bold 13px Arial, sans-serif';
                ctx.textAlign = 'center';
                ctx.fillText(group, 140, y + 31);

                ctx.fillStyle = 'rgba(255,255,255,0.15)';
                ctx.font = 'bold 12px Arial, sans-serif';
                ctx.textAlign = 'right';
                ctx.fillText(`MATCH ${i + 1}`, W - 80, y + 30);

                // Fixed layout zones
                const flagR = 32;
                const cardCY = y + 90;
                const badgeW = 90;
                const badgeL = W / 2 - badgeW / 2;   // left edge of VS badge zone
                const badgeR = W / 2 + badgeW / 2;   // right edge of VS badge zone
                const nameGap = 25;                   // gap between name and VS badge
                const leftFlagCX = 100;               // P1 flag center X
                const rightFlagCX = W - 100;          // P2 flag center X
                const p1NameRight = badgeL - nameGap; // P1 name right edge
                const p2NameLeft = badgeR + nameGap;  // P2 name left edge
                const p1NameMaxW = p1NameRight - (leftFlagCX + flagR + 12);
                const p2NameMaxW = (rightFlagCX - flagR - 12) - p2NameLeft;

                // P1 flag (fixed left)
                if (p1?._flagImg) {
                    drawCircleImage(ctx, p1._flagImg, leftFlagCX - flagR, cardCY - flagR, flagR);
                }
                // P1 name
                ctx.fillStyle = '#ffffff';
                ctx.font = 'bold 24px Arial, sans-serif';
                ctx.textAlign = 'right';
                ctx.fillText(truncateText(ctx, p1Name.toUpperCase(), p1NameMaxW), p1NameRight, cardCY + 8);

                drawVsBadge(W / 2, y + 85, posterMatchTime);

                // P2 name
                ctx.fillStyle = '#ffffff';
                ctx.font = 'bold 24px Arial, sans-serif';
                ctx.textAlign = 'left';
                ctx.fillText(truncateText(ctx, p2Name.toUpperCase(), p2NameMaxW), p2NameLeft, cardCY + 8);

                // P2 flag (fixed right)
                if (p2?._flagImg) {
                    drawCircleImage(ctx, p2._flagImg, rightFlagCX - flagR, cardCY - flagR, flagR);
                }
            });
        }
    } else if (type === 'results') {
        const recent = data.matches.filter(m => m.played);
        if (recent.length === 0) {
            ctx.fillStyle = 'rgba(255,255,255,0.4)';
            ctx.textAlign = 'center';
            ctx.font = 'bold 30px Arial, sans-serif';
            ctx.fillText('No results yet', W / 2, startY + 120);
        } else {
            recent.forEach((m, i) => {
                const cardH = 155;
                const y = startY + i * (cardH + 18);
                const p1 = data.players.find(p => p.id === m.p1Id);
                const p2 = data.players.find(p => p.id === m.p2Id);
                const p1Name = p1?.name || m.p1Id;
                const p2Name = p2?.name || m.p2Id;
                let s1 = 0, s2 = 0;
                [m.g1, m.g2, m.g3].forEach(g => {
                    if (g && g.p1 > g.p2) s1++;
                    if (g && g.p2 > g.p1) s2++;
                });
                const winner = s1 > s2 ? 'p1' : s2 > s1 ? 'p2' : 'draw';

                const borderCol = winner === 'p1' ? 'rgba(0,212,255,0.2)' : winner === 'p2' ? 'rgba(251,191,36,0.2)' : 'rgba(255,255,255,0.1)';
                drawGlassCard(50, y, W - 100, cardH, 18, borderCol);

                if (winner !== 'draw') {
                    ctx.save();
                    const wColor = winner === 'p1' ? '#00d4ff' : '#fbbf24';
                    ctx.shadowColor = wColor;
                    ctx.shadowBlur = 12;
                    if (winner === 'p1') {
                        roundRect(50, y, 4, cardH, 2);
                    } else {
                        roundRect(W - 54, y, 4, cardH, 2);
                    }
                    ctx.fillStyle = wColor;
                    ctx.fill();
                    ctx.shadowBlur = 0;
                    ctx.restore();
                }

                const group = m.groupId ? `GROUP ${m.groupId}` : 'KNOCKOUT';
                roundRect(70, y + 12, 140, 28, 14);
                ctx.fillStyle = 'rgba(74,222,128,0.1)';
                ctx.fill();
                roundRect(70, y + 12, 140, 28, 14);
                ctx.strokeStyle = 'rgba(74,222,128,0.3)';
                ctx.lineWidth = 1;
                ctx.stroke();
                ctx.fillStyle = '#4ade80';
                ctx.font = 'bold 13px Arial, sans-serif';
                ctx.textAlign = 'center';
                ctx.fillText(group, 140, y + 31);

                ctx.fillStyle = 'rgba(74,222,128,0.3)';
                ctx.font = 'bold 11px Arial, sans-serif';
                ctx.textAlign = 'right';
                ctx.fillText('FULL TIME', W - 80, y + 30);

                // Fixed layout zones
                const flagR = 32;
                const cardCY = y + 90;
                const badgeW = 160;
                const badgeL = W / 2 - badgeW / 2;   // left edge of score badge
                const badgeR = W / 2 + badgeW / 2;   // right edge of score badge
                const nameGap = 25;                   // gap between name and score badge
                const leftFlagCX = 100;               // P1 flag center X
                const rightFlagCX = W - 100;          // P2 flag center X
                const p1NameRight = badgeL - nameGap; // P1 name right edge
                const p2NameLeft = badgeR + nameGap;  // P2 name left edge
                const p1NameMaxW = p1NameRight - (leftFlagCX + flagR + 12);
                const p2NameMaxW = (rightFlagCX - flagR - 12) - p2NameLeft;

                // P1 flag (fixed left)
                if (p1?._flagImg) {
                    drawCircleImage(ctx, p1._flagImg, leftFlagCX - flagR, cardCY - flagR, flagR);
                }
                // P1 name
                ctx.fillStyle = winner === 'p1' ? '#00d4ff' : 'rgba(255,255,255,0.85)';
                ctx.font = 'bold 24px Arial, sans-serif';
                ctx.textAlign = 'right';
                if (winner === 'p1') { ctx.save(); ctx.shadowColor = '#00d4ff'; ctx.shadowBlur = 10; }
                ctx.fillText(truncateText(ctx, p1Name.toUpperCase(), p1NameMaxW), p1NameRight, cardCY + 8);
                if (winner === 'p1') ctx.restore();

                // Score badge
                roundRect(badgeL, y + 55, badgeW, 70, 14);
                ctx.fillStyle = 'rgba(0,0,0,0.5)';
                ctx.fill();
                ctx.save();
                ctx.shadowColor = winner === 'draw' ? '#ffffff' : (winner === 'p1' ? '#00d4ff' : '#fbbf24');
                ctx.shadowBlur = 12;
                roundRect(badgeL, y + 55, badgeW, 70, 14);
                ctx.strokeStyle = winner === 'draw' ? 'rgba(255,255,255,0.3)' : (winner === 'p1' ? 'rgba(0,212,255,0.5)' : 'rgba(251,191,36,0.5)');
                ctx.lineWidth = 2;
                ctx.stroke();
                ctx.shadowBlur = 0;
                ctx.restore();

                ctx.font = 'bold 42px Arial, sans-serif';
                ctx.textAlign = 'center';
                ctx.fillStyle = '#ffffff';
                ctx.fillText(`${s1}`, W / 2 - 30, y + 102);
                ctx.fillStyle = 'rgba(255,255,255,0.3)';
                ctx.fillText('–', W / 2, y + 100);
                ctx.fillStyle = '#ffffff';
                ctx.fillText(`${s2}`, W / 2 + 30, y + 102);

                // P2 name
                ctx.fillStyle = winner === 'p2' ? '#fbbf24' : 'rgba(255,255,255,0.85)';
                ctx.font = 'bold 24px Arial, sans-serif';
                ctx.textAlign = 'left';
                if (winner === 'p2') { ctx.save(); ctx.shadowColor = '#fbbf24'; ctx.shadowBlur = 10; }
                ctx.fillText(truncateText(ctx, p2Name.toUpperCase(), p2NameMaxW), p2NameLeft, cardCY + 8);
                if (winner === 'p2') ctx.restore();

                // P2 flag (fixed right)
                if (p2?._flagImg) {
                    drawCircleImage(ctx, p2._flagImg, rightFlagCX - flagR, cardCY - flagR, flagR);
                }
            });
        }
    } else if (type === 'standings') {
        const groups = {};
        data.players.filter(p => p.group).forEach(p => {
            if (!groups[p.group]) groups[p.group] = [];
            groups[p.group].push(p);
        });

        const sortFn = (a, b) => {
            const ptsA = (a.w || 0) * 3 + (a.d || 0);
            const ptsB = (b.w || 0) * 3 + (b.d || 0);
            if (ptsB !== ptsA) return ptsB - ptsA;
            const gdA = (a.gf || 0) - (a.ga || 0);
            const gdB = (b.gf || 0) - (b.ga || 0);
            return gdB - gdA;
        };

        const groupKeys = Object.keys(groups).sort();
        const groupColors = ['#00d4ff', '#fbbf24', '#c084fc', '#4ade80', '#f97316', '#f472b6'];
        let gy = startY;

        groupKeys.forEach((gKey, gi) => {
            const grpPlayers = groups[gKey].sort(sortFn);
            const gColor = groupColors[gi % groupColors.length];

            ctx.save();
            roundRect(50, gy, W - 100, 48, 12);
            const ghGrad = ctx.createLinearGradient(50, gy, W - 50, gy);
            ghGrad.addColorStop(0, `${gColor}20`);
            ghGrad.addColorStop(1, 'rgba(0,0,0,0)');
            ctx.fillStyle = ghGrad;
            ctx.fill();
            ctx.shadowColor = gColor;
            ctx.shadowBlur = 10;
            ctx.fillStyle = gColor;
            ctx.fillRect(50, gy, 5, 48);
            ctx.shadowBlur = 0;
            ctx.font = 'bold 24px Arial, sans-serif';
            ctx.textAlign = 'left';
            ctx.fillStyle = gColor;
            ctx.fillText(`GROUP ${gKey}`, 75, gy + 33);
            ctx.restore();

            gy += 58;
            roundRect(50, gy, W - 100, 32, 0);
            ctx.fillStyle = 'rgba(255,255,255,0.04)';
            ctx.fill();
            ctx.fillStyle = 'rgba(255,255,255,0.35)';
            ctx.font = 'bold 12px Arial, sans-serif';
            
            ctx.textAlign = 'center';
            ctx.fillText('#', 75, gy + 20);
            
            ctx.textAlign = 'left';
            ctx.fillText('PLAYER', 110, gy + 20);
            
            ctx.textAlign = 'center';
            ctx.fillText('MP', 580, gy + 20);
            ctx.fillText('W-L', 665, gy + 20);
            ctx.fillText('GF', 745, gy + 20);
            ctx.fillText('GA', 825, gy + 20);
            ctx.fillText('GD', 905, gy + 20);
            ctx.fillText('PTS', 985, gy + 20);

            gy += 36;
            grpPlayers.forEach((p, pi) => {
                const pts = (p.w || 0) * 3 + (p.d || 0);
                const gd = (p.gf || 0) - (p.ga || 0);
                const played = (p.w || 0) + (p.d || 0) + (p.l || 0);
                const rowH = 44;

                roundRect(50, gy, W - 100, rowH, pi === grpPlayers.length - 1 ? 10 : 0);
                ctx.fillStyle = pi % 2 === 0 ? 'rgba(15,20,35,0.5)' : 'rgba(20,28,50,0.3)';
                ctx.fill();

                if (pi < 2) {
                    ctx.save();
                    ctx.shadowColor = gColor;
                    ctx.shadowBlur = 8;
                    ctx.fillStyle = gColor;
                    ctx.fillRect(50, gy, 4, rowH);
                    ctx.shadowBlur = 0;
                    ctx.restore();
                }

                // Rank
                ctx.fillStyle = pi < 2 ? gColor : 'rgba(255,255,255,0.4)';
                ctx.font = pi < 2 ? 'bold 18px Arial, sans-serif' : '16px Arial, sans-serif';
                ctx.textAlign = 'center';
                ctx.fillText(`${pi + 1}`, 75, gy + 28);

                // Flag
                const flagRadius = 14;
                if (p._flagImg) {
                    drawCircleImage(ctx, p._flagImg, 110, gy + rowH / 2 - flagRadius, flagRadius);
                }

                // Player name
                ctx.fillStyle = pi < 2 ? '#ffffff' : 'rgba(255,255,255,0.7)';
                ctx.font = 'bold 20px Arial, sans-serif';
                ctx.textAlign = 'left';
                ctx.fillText(p.name || '—', 150, gy + 28);

                // Stats columns
                ctx.font = '17px Arial, sans-serif';
                ctx.textAlign = 'center';
                ctx.fillStyle = 'rgba(255,255,255,0.6)';
                ctx.fillText(played, 580, gy + 28);
                ctx.fillText(`${p.w || 0}-${p.l || 0}`, 665, gy + 28);
                ctx.fillText(p.gf || 0, 745, gy + 28);
                ctx.fillText(p.ga || 0, 825, gy + 28);

                ctx.fillStyle = gd > 0 ? '#4ade80' : gd < 0 ? '#f87171' : 'rgba(255,255,255,0.4)';
                ctx.font = 'bold 17px Arial, sans-serif';
                ctx.fillText(gd > 0 ? `+${gd}` : `${gd}`, 905, gy + 28);

                ctx.save();
                ctx.shadowColor = '#fbbf24';
                ctx.shadowBlur = pi < 2 ? 8 : 0;
                ctx.fillStyle = '#fbbf24';
                ctx.font = 'bold 22px Arial, sans-serif';
                ctx.fillText(pts, 985, gy + 29);
                ctx.shadowBlur = 0;
                ctx.restore();

                gy += rowH - 2;
            });
            gy += 28;
        });
    }

    const footH = 80;
    const footY = H - footH;
    const metalGrad = ctx.createLinearGradient(0, footY, 0, H);
    metalGrad.addColorStop(0, '#1a1f2e');
    metalGrad.addColorStop(0.3, '#252b3d');
    metalGrad.addColorStop(0.5, '#2a3142');
    metalGrad.addColorStop(0.7, '#252b3d');
    metalGrad.addColorStop(1, '#181d2a');
    ctx.fillStyle = metalGrad;
    ctx.fillRect(0, footY, W, footH);

    ctx.save();
    const footBorderGrad = ctx.createLinearGradient(0, 0, W, 0);
    footBorderGrad.addColorStop(0, '#00d4ff');
    footBorderGrad.addColorStop(0.5, 'rgba(255,255,255,0.2)');
    footBorderGrad.addColorStop(1, '#fbbf24');
    ctx.shadowColor = '#00d4ff';
    ctx.shadowBlur = 8;
    ctx.fillStyle = footBorderGrad;
    ctx.fillRect(0, footY, W, 2);
    ctx.shadowBlur = 0;
    ctx.restore();

    ctx.fillStyle = 'rgba(255,255,255,0.7)';
    ctx.font = 'bold 18px Arial, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(posterFooter, W / 2, footY + 48);
};
