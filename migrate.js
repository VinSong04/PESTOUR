const fs = require('fs');

const oldPlayers = [
    { "group": "A", "id": "A1", "name": "Dra-Gon" },
    { "group": "A", "id": "A2", "name": "Jak-Kroval" },
    { "group": "A", "id": "A3", "name": "Max-88" },
    { "group": "A", "id": "A4", "name": "Petter-027" },
    { "group": "B", "id": "B1", "name": "MengZzz" },
    { "group": "B", "id": "B2", "name": "Reach OMG" },
    { "group": "B", "id": "B3", "name": "Si Dav" },
    { "group": "B", "id": "B4", "name": "SO-R3spec1" },
    { "group": "C", "id": "C1", "name": "1AUTO1" },
    { "group": "C", "id": "C2", "name": "Glanelalala" },
    { "group": "C", "id": "C3", "name": "Win Me Lbey" },
    { "group": "C", "id": "C4", "name": "K-Vinn" }
];

const oldMatches = [
    { "away": "A2", "group": "A", "home": "A1", "id": "GA1", "played": false },
    { "away": "A4", "games": [{ "awayGoals": 1, "homeGoals": 3 }, { "awayGoals": 0, "homeGoals": 2 }], "group": "A", "home": "A3", "id": "GA2", "played": true },
    { "away": "A3", "games": [{ "awayGoals": 0, "homeGoals": 3 }, { "awayGoals": 1, "homeGoals": 3 }], "group": "A", "home": "A1", "id": "GA3", "played": true },
    { "away": "A4", "games": [{ "awayGoals": 4, "homeGoals": 5 }, { "awayGoals": 6, "homeGoals": 1 }, { "awayGoals": 4, "homeGoals": 1 }], "group": "A", "home": "A2", "id": "GA4", "played": true },
    { "away": "A4", "games": [{ "awayGoals": 1, "homeGoals": 3 }, { "awayGoals": 2, "homeGoals": 7 }], "group": "A", "home": "A1", "id": "GA5", "played": true },
    { "away": "A3", "games": [{ "awayGoals": 3, "homeGoals": 1 }, { "awayGoals": 7, "homeGoals": 3 }], "group": "A", "home": "A2", "id": "GA6", "played": true },
    { "away": "B2", "games": [{ "awayGoals": 5, "homeGoals": 6 }, { "awayGoals": 8, "homeGoals": 1 }, { "awayGoals": 6, "homeGoals": 1 }], "group": "B", "home": "B1", "id": "GB1", "played": true },
    { "away": "B4", "games": [{ "awayGoals": 5, "homeGoals": 2 }, { "awayGoals": 4, "homeGoals": 2 }], "group": "B", "home": "B3", "id": "GB2", "played": true },
    { "away": "B3", "games": [{ "awayGoals": 4, "homeGoals": 1 }, { "awayGoals": 5, "homeGoals": 0 }], "group": "B", "home": "B1", "id": "GB3", "played": true },
    { "away": "B4", "games": [{ "awayGoals": 1, "homeGoals": 2 }, { "awayGoals": 3, "homeGoals": 0 }, { "awayGoals": 3, "homeGoals": 9 }], "group": "B", "home": "B2", "id": "GB4", "played": true },
    { "away": "B4", "games": [{ "awayGoals": 4, "homeGoals": 1 }, { "awayGoals": 5, "homeGoals": 0 }], "group": "B", "home": "B1", "id": "GB5", "played": true },
    { "away": "B3", "games": [{ "awayGoals": 3, "homeGoals": 1 }, { "awayGoals": 3, "homeGoals": 2 }], "group": "B", "home": "B2", "id": "GB6", "played": true },
    { "away": "C2", "games": [{ "awayGoals": 3, "homeGoals": 1 }, { "awayGoals": 5, "homeGoals": 1 }], "group": "C", "home": "C1", "id": "GC1", "played": true },
    { "away": "C4", "games": [{ "awayGoals": 4, "homeGoals": 7 }, { "awayGoals": 5, "homeGoals": 0 }, { "awayGoals": 6, "homeGoals": 4 }], "group": "C", "home": "C3", "id": "GC2", "played": true },
    { "away": "C3", "games": [{ "awayGoals": 3, "homeGoals": 0 }, { "awayGoals": 3, "homeGoals": 0 }], "group": "C", "home": "C1", "id": "GC3", "played": true },
    { "away": "C4", "games": [{ "awayGoals": 3, "homeGoals": 7 }, { "awayGoals": 5, "homeGoals": 3 }, { "awayGoals": 1, "homeGoals": 3 }], "group": "C", "home": "C2", "id": "GC4", "played": true },
    { "away": "C4", "games": [{ "awayGoals": 5, "homeGoals": 4 }, { "awayGoals": 4, "homeGoals": 3 }], "group": "C", "home": "C1", "id": "GC5", "played": true },
    { "away": "C3", "games": [{ "awayGoals": 5, "homeGoals": 2 }, { "awayGoals": 4, "homeGoals": 5 }, { "awayGoals": 5, "homeGoals": 4 }], "group": "C", "home": "C2", "id": "GC6", "played": true }
];

const qfData = [
    { "away": "Max-88", "home": "SO-R3spec1", "id": "qf1", "played": false },
    { "away": "Si Dav", "home": "Glanelalala", "id": "qf2", "played": false },
    { "away": "Win Me Lbey", "home": "Reach OMG", "id": "qf3", "played": false },
    { "away": "K-Vinn", "home": "Dra-Gon", "id": "qf4", "played": false }
];

const newMatches = oldMatches.map(m => {
    const g1 = m.games && m.games[0] ? { p1: m.games[0].homeGoals, p2: m.games[0].awayGoals } : { p1: null, p2: null };
    const g2 = m.games && m.games[1] ? { p1: m.games[1].homeGoals, p2: m.games[1].awayGoals } : { p1: null, p2: null };
    const g3 = m.games && m.games[2] ? { p1: m.games[2].homeGoals, p2: m.games[2].awayGoals } : { p1: null, p2: null };
    const isGA4Obj = (m.id === 'GA4'); // Hardcoded fixed property seen in log

    return {
        id: `M-${m.id.substring(1)}`,
        groupId: m.group,
        p1Id: m.home,
        p2Id: m.away,
        played: m.played || isGA4Obj, // GA4 had games but was played: false in original map
        g1, g2, g3
    };
});

const getPlayerId = name => {
    const p = oldPlayers.find(p => p.name === name);
    return p ? p.id : null;
};

const bracket = qfData.map(q => {
    return {
        id: `QF-${q.id.replace('qf', '')}`,
        round: 'QF',
        p1Id: getPlayerId(q.home),
        p1Name: q.home,
        p2Id: getPlayerId(q.away),
        p2Name: q.away,
        played: q.played,
        g1: { p1: null, p2: null }, g2: { p1: null, p2: null }, g3: { p1: null, p2: null }
    }
});

const fileContent = `export const INITIAL_SETTINGS = {
    name: "Pallet Pes Tour",
    season: "Spring 2026",
    tagline: "Legends Start Here"
};

export const INITIAL_PLAYERS = ${JSON.stringify(oldPlayers, null, 4)};

export const INITIAL_MATCHES = ${JSON.stringify(newMatches, null, 4)};

export const INITIAL_DATA = {
    settings: INITIAL_SETTINGS,
    players: INITIAL_PLAYERS,
    matches: INITIAL_MATCHES,
    bracket: ${JSON.stringify(bracket, null, 4)}
};
`;

fs.writeFileSync('src/utils/initialData.js', fileContent);
console.log('Migration Complete.');
