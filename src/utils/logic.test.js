import { describe, it, expect } from 'vitest';
import { getSeriesResult, processBracket } from './logic';

describe('Logic Utils', () => {
    describe('getSeriesResult', () => {
        it('calculates the match winner correctly based on BO3', () => {
            const match = {
                g1: { p1: 2, p2: 1 },
                g2: { p1: null, p2: null }, // unplayed game
                g3: { p1: 3, p2: 0 }
            };
            const result = getSeriesResult(match);

            expect(result.p1Wins).toBe(2);
            expect(result.p2Wins).toBe(0);
            expect(result.p1Goals).toBe(5);
            expect(result.p2Goals).toBe(1);
            expect(result.isFinished).toBe(true);
            expect(result.p1Pts).toBe(3); // 2-0 win gets 3 points
            expect(result.p2Pts).toBe(0);
        });

        it('calculates points correctly for a 2-1 win', () => {
            const match = {
                g1: { p1: 1, p2: 2 },
                g2: { p1: 2, p2: 0 },
                g3: { p1: 1, p2: 0 }
            };
            const result = getSeriesResult(match);

            expect(result.p1Wins).toBe(2);
            expect(result.p2Wins).toBe(1);
            expect(result.isFinished).toBe(true);
            expect(result.p1Pts).toBe(2); // 2-1 win gets 2 points
            expect(result.p2Pts).toBe(1); // 1-2 loss gets 1 point
        });
    });
});
