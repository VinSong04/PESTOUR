export const getSeriesResult = (match) => {
    let p1Wins = 0;
    let p2Wins = 0;
    let p1Goals = 0;
    let p2Goals = 0;

    const games = ['g1', 'g2', 'g3'];
    games.forEach(g => {
        if (match[g] && match[g].p1 !== null && match[g].p2 !== null) {
            p1Goals += Number(match[g].p1);
            p2Goals += Number(match[g].p2);
            if (Number(match[g].p1) > Number(match[g].p2)) p1Wins++;
            if (Number(match[g].p2) > Number(match[g].p1)) p2Wins++;
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

    const groups = { A: [], B: [], C: [] };
    Object.values(stats).forEach(p => groups[p.group].push(p));

    groups.A.sort(sortFn);
    groups.B.sort(sortFn);
    groups.C.sort(sortFn);

    const thirds = [groups.A[2], groups.B[2], groups.C[2]].filter(Boolean).sort(sortFn);

    let qualified = [];
    ['A', 'B', 'C'].forEach(g => {
        if (groups[g][0]) qualified.push({ ...groups[g][0], seedType: `${g}1` });
        if (groups[g][1]) qualified.push({ ...groups[g][1], seedType: `${g}2` });
    });

    if (thirds[0]) qualified.push({ ...thirds[0], seedType: 'Best3' });
    if (thirds[1]) qualified.push({ ...thirds[1], seedType: 'Best3' });

    qualified.sort(sortFn);

    return { groups, thirds, qualified };
};

export const getBracketMatchWinner = (match) => {
    if (!match || !match.played) return null;
    const res = getSeriesResult(match);
    if (res.p1Wins > res.p2Wins) return { id: match.p1Id, name: match.p1Name };
    if (res.p2Wins > res.p1Wins) return { id: match.p2Id, name: match.p2Name };
    return null;
};

export const processBracket = (bracket) => {
    if (!bracket || bracket.length === 0) return [];

    let fullBracket = [...bracket];
    if (fullBracket.length === 4) {
        fullBracket.push({ id: 'SF-1', round: 'SF', p1Id: null, p1Name: 'TBD (QF1)', p2Id: null, p2Name: 'TBD (QF2)', played: false, g1: { p1: null, p2: null }, g2: { p1: null, p2: null }, g3: { p1: null, p2: null } });
        fullBracket.push({ id: 'SF-2', round: 'SF', p1Id: null, p1Name: 'TBD (QF3)', p2Id: null, p2Name: 'TBD (QF4)', played: false, g1: { p1: null, p2: null }, g2: { p1: null, p2: null }, g3: { p1: null, p2: null } });
        fullBracket.push({ id: 'F-1', round: 'F', p1Id: null, p1Name: 'TBD (SF1)', p2Id: null, p2Name: 'TBD (SF2)', played: false, g1: { p1: null, p2: null }, g2: { p1: null, p2: null }, g3: { p1: null, p2: null } });
    }

    const getM = id => fullBracket.find(m => m.id === id);
    const updateM = (id, changes) => {
        const idx = fullBracket.findIndex(m => m.id === id);
        if (idx !== -1) fullBracket[idx] = { ...fullBracket[idx], ...changes };
    };

    const qf1W = getBracketMatchWinner(getM('QF-1'));
    const qf2W = getBracketMatchWinner(getM('QF-2'));
    const qf3W = getBracketMatchWinner(getM('QF-3'));
    const qf4W = getBracketMatchWinner(getM('QF-4'));

    updateM('SF-1', {
        p1Id: qf1W ? qf1W.id : null, p1Name: qf1W ? qf1W.name : 'TBD (QF1)',
        p2Id: qf2W ? qf2W.id : null, p2Name: qf2W ? qf2W.name : 'TBD (QF2)'
    });
    updateM('SF-2', {
        p1Id: qf3W ? qf3W.id : null, p1Name: qf3W ? qf3W.name : 'TBD (QF3)',
        p2Id: qf4W ? qf4W.id : null, p2Name: qf4W ? qf4W.name : 'TBD (QF4)'
    });

    const sf1W = getBracketMatchWinner(getM('SF-1'));
    const sf2W = getBracketMatchWinner(getM('SF-2'));

    updateM('F-1', {
        p1Id: sf1W ? sf1W.id : null, p1Name: sf1W ? sf1W.name : 'TBD (SF1)',
        p2Id: sf2W ? sf2W.id : null, p2Name: sf2W ? sf2W.name : 'TBD (SF2)'
    });

    return fullBracket;
};
