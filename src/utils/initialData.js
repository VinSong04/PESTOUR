export const INITIAL_SETTINGS = {
    name: "Pallet Pes Tour",
    season: "Spring 2026",
    tagline: "Legends Start Here"
};

export const INITIAL_PLAYERS = [
    { id: 'A1', name: '1AUTO1', group: 'A' },
    { id: 'A2', name: 'Dra-Gon', group: 'A' },
    { id: 'A3', name: 'Glanelalala', group: 'A' },
    { id: 'A4', name: 'WinMeLbey', group: 'A' },
    { id: 'B1', name: 'K-Vinn', group: 'B' },
    { id: 'B2', name: 'Max-88', group: 'B' },
    { id: 'B3', name: 'Reach OMG', group: 'B' },
    { id: 'B4', name: 'so respec1', group: 'B' },
    { id: 'C1', name: 'Petter-027', group: 'C' },
    { id: 'C2', name: 'Player C2', group: 'C' },
    { id: 'C3', name: 'Player C3', group: 'C' },
    { id: 'C4', name: 'Player C4', group: 'C' },
];

const generateGroupMatches = (group) => [
    { id: `M-${group}1`, groupId: group, p1Id: `${group}1`, p2Id: `${group}2`, played: false, g1: { p1: null, p2: null }, g2: { p1: null, p2: null }, g3: { p1: null, p2: null } },
    { id: `M-${group}2`, groupId: group, p1Id: `${group}3`, p2Id: `${group}4`, played: false, g1: { p1: null, p2: null }, g2: { p1: null, p2: null }, g3: { p1: null, p2: null } },
    { id: `M-${group}3`, groupId: group, p1Id: `${group}1`, p2Id: `${group}3`, played: false, g1: { p1: null, p2: null }, g2: { p1: null, p2: null }, g3: { p1: null, p2: null } },
    { id: `M-${group}4`, groupId: group, p1Id: `${group}2`, p2Id: `${group}4`, played: false, g1: { p1: null, p2: null }, g2: { p1: null, p2: null }, g3: { p1: null, p2: null } },
    { id: `M-${group}5`, groupId: group, p1Id: `${group}1`, p2Id: `${group}4`, played: false, g1: { p1: null, p2: null }, g2: { p1: null, p2: null }, g3: { p1: null, p2: null } },
    { id: `M-${group}6`, groupId: group, p1Id: `${group}2`, p2Id: `${group}3`, played: false, g1: { p1: null, p2: null }, g2: { p1: null, p2: null }, g3: { p1: null, p2: null } },
];

export const INITIAL_MATCHES = [
    ...generateGroupMatches('A'),
    ...generateGroupMatches('B'),
    ...generateGroupMatches('C'),
];

export const INITIAL_DATA = {
    settings: INITIAL_SETTINGS,
    players: INITIAL_PLAYERS,
    matches: INITIAL_MATCHES,
    bracket: []
};
