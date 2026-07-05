import { createEmptyBracketMatch } from './matchFactory';

export const getSeriesResult = (match) => {
    let p1Wins = 0;
    let p2Wins = 0;
    let p1Goals = 0;
    let p2Goals = 0;

    const games = ['g1', 'g2', 'g3'];
    games.forEach(g => {
        const gameData = match[g] || {};
        if (gameData.p1 !== null && gameData.p1 !== undefined && gameData.p2 !== null && gameData.p2 !== undefined) {
            p1Goals += Number(gameData.p1);
            p2Goals += Number(gameData.p2);
            if (Number(gameData.p1) > Number(gameData.p2)) p1Wins++;
            if (Number(gameData.p2) > Number(gameData.p1)) p2Wins++;
        }
    });

    const isFinished = p1Wins === 2 || p2Wins === 2;

    let p1Pts = 0;
    let p2Pts = 0;
    if (isFinished) {
        if (p1Wins === 2 && p2Wins === 0) { p1Pts = 3; p2Pts = 0; }
        if (p1Wins === 2 && p2Wins === 1) { p1Pts = 2; p2Pts = 1; }
        if (p2Wins === 2 && p1Wins === 0) { p2Pts = 3; p1Pts = 0; }
        if (p2Wins === 2 && p1Wins === 1) { p2Pts = 2; p1Pts = 1; }
    }

    return { p1Wins, p2Wins, p1Goals, p2Goals, isFinished, p1Pts, p2Pts };
};

export const calculateStandings = (players, matches) => {
    let stats = {};
    players.forEach(p => {
        stats[p.id] = { ...p, played: 0, w: 0, l: 0, gf: 0, ga: 0, gd: 0, pts: 0 };
    });

    matches.forEach(m => {
        if (m.played) {
            const res = getSeriesResult(m);
            if (res.isFinished) {
                stats[m.p1Id].played++;
                stats[m.p2Id].played++;

                if (res.p1Wins > res.p2Wins) { stats[m.p1Id].w++; stats[m.p2Id].l++; }
                else { stats[m.p2Id].w++; stats[m.p1Id].l++; }

                stats[m.p1Id].gf += res.p1Goals;
                stats[m.p1Id].ga += res.p2Goals;
                stats[m.p1Id].gd = stats[m.p1Id].gf - stats[m.p1Id].ga;
                stats[m.p1Id].pts += res.p1Pts;

                stats[m.p2Id].gf += res.p2Goals;
                stats[m.p2Id].ga += res.p1Goals;
                stats[m.p2Id].gd = stats[m.p2Id].gf - stats[m.p2Id].ga;
                stats[m.p2Id].pts += res.p2Pts;
            }
        }
    });

    const sortFn = (a, b) => {
        if (b.pts !== a.pts) return b.pts - a.pts;
        if (b.gd !== a.gd) return b.gd - a.gd;
        if (b.gf !== a.gf) return b.gf - a.gf;
        return a.name.localeCompare(b.name);
    };

    const groups = {};
    Object.values(stats).forEach(p => {
        if (!groups[p.group]) groups[p.group] = [];
        groups[p.group].push(p);
    });

    Object.keys(groups).forEach(g => {
        groups[g].sort(sortFn);
    });

    let qualified = [];
    // To ensure exactly 8 players advance to QF regardless of number of groups:
    const allPlayers = Object.values(groups).flat();

    // Assign a local standing rank within their own group
    Object.values(groups).forEach(grpPlayers => {
        grpPlayers.forEach((p, idx) => { p.groupRank = idx + 1; });
    });

    // Sort globally: Group Rank first, then pts, gd, gf
    allPlayers.sort((a, b) => {
        if (a.groupRank !== b.groupRank) return a.groupRank - b.groupRank;
        if (b.pts !== a.pts) return b.pts - a.pts;
        if (b.gd !== a.gd) return b.gd - a.gd;
        if (b.gf !== a.gf) return b.gf - a.gf;
        return a.name.localeCompare(b.name);
    });

    qualified = allPlayers.filter(p => p.groupRank <= 3).map(p => ({ ...p, seedType: `Seed ${p.groupRank}` }));

    const thirds = Object.values(groups).map(g => g[2]).filter(Boolean).sort(sortFn);

    qualified.sort(sortFn);

    return { groups, thirds, qualified };
};


export const getBracketMatchWinner = (match) => {
    if (!match || !match.played) return null;
    const res = getSeriesResult(match);
    if (res.p1Wins > res.p2Wins) return { id: match.p1Id, name: match.p1Name, logo: match.p1Logo };
    if (res.p2Wins > res.p1Wins) return { id: match.p2Id, name: match.p2Name, logo: match.p2Logo };
    return null;
};

export const processBracket = (bracket) => {
    if (!bracket || bracket.length === 0) return [];

    let fullBracket = [...bracket];

    const hasPO = fullBracket.some(m => m.id.startsWith('PO'));
    const hasQF = fullBracket.some(m => m.id.startsWith('QF'));
    const hasSF = fullBracket.some(m => m.id.startsWith('SF'));
    const hasF  = fullBracket.some(m => m.id.startsWith('F'));

    // Auto-scaffold missing rounds
    // If we have PO but no QF, create QF shells
    if (hasPO && !hasQF) {
        for (let i = 1; i <= 4; i++) {
            fullBracket.push(createEmptyBracketMatch(`QF-${i}`, 'QF', `TBD`, `TBD (PO${i})`));
        }
    }
    // If we have QF but no SF, create SF shells
    if ((hasQF || hasPO) && !hasSF) {
        fullBracket.push(createEmptyBracketMatch('SF-1', 'SF', 'TBD (QF1)', 'TBD (QF2)'));
        fullBracket.push(createEmptyBracketMatch('SF-2', 'SF', 'TBD (QF3)', 'TBD (QF4)'));
    }
    // If we have SF but no F, create F shell
    if ((hasSF || hasQF || hasPO) && !hasF) {
        fullBracket.push(createEmptyBracketMatch('F-1', 'F', 'TBD (SF1)', 'TBD (SF2)'));
    }

    // Legacy: if exactly 4 QF matches and no SF/F (old format), scaffold those
    if (!hasPO && hasQF && fullBracket.filter(m => m.id.startsWith('QF')).length === 4 && !hasSF) {
        fullBracket.push(createEmptyBracketMatch('SF-1', 'SF', 'TBD (QF1)', 'TBD (QF2)'));
        fullBracket.push(createEmptyBracketMatch('SF-2', 'SF', 'TBD (QF3)', 'TBD (QF4)'));
        fullBracket.push(createEmptyBracketMatch('F-1', 'F', 'TBD (SF1)', 'TBD (SF2)'));
    }

    const getM = id => fullBracket.find(m => m.id === id);
    const updateM = (id, changes) => {
        const idx = fullBracket.findIndex(m => m.id === id);
        if (idx !== -1) fullBracket[idx] = { ...fullBracket[idx], ...changes };
    };

    // Propagate PO winners → QF AWAY (p2) slots
    for (let i = 1; i <= 4; i++) {
        const poMatch = getM(`PO-${i}`);
        const qfMatch = getM(`QF-${i}`);
        if (poMatch && qfMatch) {
            const poWinner = getBracketMatchWinner(poMatch);
            updateM(`QF-${i}`, {
                p2Id: poWinner ? poWinner.id : null,
                p2Name: poWinner ? poWinner.name : `TBD (PO${i})`,
                p2Logo: poWinner ? poWinner.logo : ''
            });
        }
    }

    // Propagate QF winners → SF slots
    const qf1W = getBracketMatchWinner(getM('QF-1'));
    const qf2W = getBracketMatchWinner(getM('QF-2'));
    const qf3W = getBracketMatchWinner(getM('QF-3'));
    const qf4W = getBracketMatchWinner(getM('QF-4'));

    updateM('SF-1', {
        p1Id: qf1W ? qf1W.id : null, p1Name: qf1W ? qf1W.name : 'TBD (QF1)', p1Logo: qf1W ? qf1W.logo : '',
        p2Id: qf2W ? qf2W.id : null, p2Name: qf2W ? qf2W.name : 'TBD (QF2)', p2Logo: qf2W ? qf2W.logo : ''
    });
    updateM('SF-2', {
        p1Id: qf3W ? qf3W.id : null, p1Name: qf3W ? qf3W.name : 'TBD (QF3)', p1Logo: qf3W ? qf3W.logo : '',
        p2Id: qf4W ? qf4W.id : null, p2Name: qf4W ? qf4W.name : 'TBD (QF4)', p2Logo: qf4W ? qf4W.logo : ''
    });

    // Propagate SF winners → Final
    const sf1W = getBracketMatchWinner(getM('SF-1'));
    const sf2W = getBracketMatchWinner(getM('SF-2'));

    updateM('F-1', {
        p1Id: sf1W ? sf1W.id : null, p1Name: sf1W ? sf1W.name : 'TBD (SF1)', p1Logo: sf1W ? sf1W.logo : '',
        p2Id: sf2W ? sf2W.id : null, p2Name: sf2W ? sf2W.name : 'TBD (SF2)', p2Logo: sf2W ? sf2W.logo : ''
    });

    return fullBracket;
};

export const assignSchedules = (matches, players) => {
    if (!matches || matches.length === 0) return;

    // Determine the group
    let group = matches[0].groupId;
    if (!group && matches[0].id) {
        const matchResult = matches[0].id.match(/M-([A-D])/);
        if (matchResult) group = matchResult[1];
    }
    if (!group && players && players.length > 0) {
        group = players[0].group;
    }
    if (!group) group = 'A'; // fallback

    let dayText = 'DAY 1 (SAT)';
    let times = ['18:00', '19:00'];

    if (group === 'A') {
        dayText = 'DAY 1 (SAT)';
        times = ['18:00', '19:00'];
    } else if (group === 'B') {
        dayText = 'DAY 1 (SAT)';
        times = ['20:00', '21:00'];
    } else if (group === 'C') {
        dayText = 'DAY 2 (SUN)';
        times = ['18:00', '19:00'];
    } else if (group === 'D') {
        dayText = 'DAY 2 (SUN)';
        times = ['20:00', '21:00'];
    }

    // Now assign schedules to matches.
    // The matches are ordered round by round.
    // Since there are 2 matches per round:
    // week = Math.floor(idx / 2) + 1
    // matchInWeek = idx % 2
    matches.forEach((m, idx) => {
        const w = Math.floor(idx / 2) + 1;
        const time = times[idx % 2];
        m.schedule = `WEEK ${w} • ${dayText} @ ${time}`;
    });
};

export const generateSkeletonBracket = () => {
    let dummy = [];
    for (let i = 1; i <= 4; i++) {
        dummy.push(createEmptyBracketMatch(`PO-${i}`, 'PO', `N/A`, `N/A`));
    }
    for (let i = 1; i <= 4; i++) {
        dummy.push(createEmptyBracketMatch(`QF-${i}`, 'QF', `N/A`, `N/A`));
    }
    dummy.push(createEmptyBracketMatch('SF-1', 'SF', `N/A`, `N/A`));
    dummy.push(createEmptyBracketMatch('SF-2', 'SF', `N/A`, `N/A`));
    dummy.push(createEmptyBracketMatch('F-1', 'F', `N/A`, `N/A`));
    return dummy;
};

/**
 * Categorize qualified players into Auto-Qualifiers (Rank 1) and Playoffs (Rank 2 & 3).
 * Returns both flat pools and per-group breakdown for the spinner draw system.
 * @param {object} standingsData - The standings data from calculateStandings
 * @returns {object} { aq: Array, po: Array, perGroup: { A: { aq, rank2, rank3 }, ... } }
 */
export const categorizeQualified = (standingsData) => {
    if (!standingsData || !standingsData.qualified || !standingsData.groups) {
        return { aq: [], po: [], perGroup: {} };
    }
    const aq = standingsData.qualified.filter(p => p.groupRank === 1);
    const po = standingsData.qualified.filter(p => p.groupRank === 2 || p.groupRank === 3);

    // Build per-group breakdown from the sorted group standings
    const perGroup = {};
    Object.keys(standingsData.groups).sort().forEach(grpKey => {
        const grpPlayers = standingsData.groups[grpKey];
        perGroup[grpKey] = {
            aq: grpPlayers[0] || null,    // Rank 1 — Auto-Quarterfinalist
            rank2: grpPlayers[1] || null,  // Rank 2 — Playoff HOME
            rank3: grpPlayers[2] || null,  // Rank 3 — Playoff AWAY
        };
    });

    return { aq, po, perGroup };
};
