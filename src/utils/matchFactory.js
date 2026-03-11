/**
 * Factory functions for creating match/game data objects.
 * Eliminates the duplicate { p1: null, p2: null } pattern used in 5+ places.
 */

/** Create an empty game score object */
export const createEmptyGame = () => ({ p1: null, p2: null });

/** Create a full empty match with 3 games */
export const createEmptyMatch = (id, groupId, p1Id, p2Id) => ({
    id,
    groupId,
    p1Id,
    p2Id,
    played: false,
    g1: createEmptyGame(),
    g2: createEmptyGame(),
    g3: createEmptyGame()
});

/** Create an empty bracket match with player names/logos */
export const createEmptyBracketMatch = (id, round, p1Name = 'TBD', p2Name = 'TBD') => ({
    id,
    round,
    p1Id: null,
    p1Name,
    p1Logo: '',
    p2Id: null,
    p2Name,
    p2Logo: '',
    played: false,
    g1: createEmptyGame(),
    g2: createEmptyGame(),
    g3: createEmptyGame()
});
