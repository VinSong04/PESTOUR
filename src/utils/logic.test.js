import { describe, it, expect } from 'vitest';
import { getSeriesResult, assignSchedules } from './logic';

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

    describe('assignSchedules', () => {
        it('assigns deterministic day and times based on group', () => {
            // Group A
            const playersA = [
                { id: 'A1', group: 'A' }, { id: 'A2', group: 'A' }, { id: 'A3', group: 'A' }, { id: 'A4', group: 'A' }, { id: 'A5', group: 'A' }
            ];
            const matchesA = [];
            let matchCounter = 1;
            for (let i = 0; i < playersA.length; i++) {
                for (let j = i + 1; j < playersA.length; j++) {
                    matchesA.push({
                        id: `M-A${matchCounter++}`,
                        groupId: 'A',
                        p1Id: playersA[i].id,
                        p2Id: playersA[j].id
                    });
                }
            }
            assignSchedules(matchesA, playersA);
            matchesA.forEach((m, idx) => {
                expect(m.schedule).toBeDefined();
                expect(m.schedule).toContain('DAY 1 (SAT)');
                const expectedTime = idx % 2 === 0 ? '18:00' : '19:00';
                expect(m.schedule).toContain(expectedTime);
            });

            // Group C
            const playersC = [
                { id: 'C1', group: 'C' }, { id: 'C2', group: 'C' }, { id: 'C3', group: 'C' }, { id: 'C4', group: 'C' }, { id: 'C5', group: 'C' }
            ];
            const matchesC = [];
            matchCounter = 1;
            for (let i = 0; i < playersC.length; i++) {
                for (let j = i + 1; j < playersC.length; j++) {
                    matchesC.push({
                        id: `M-C${matchCounter++}`,
                        groupId: 'C',
                        p1Id: playersC[i].id,
                        p2Id: playersC[j].id
                    });
                }
            }
            assignSchedules(matchesC, playersC);
            matchesC.forEach((m, idx) => {
                expect(m.schedule).toBeDefined();
                expect(m.schedule).toContain('DAY 2 (SUN)');
                const expectedTime = idx % 2 === 0 ? '18:00' : '19:00';
                expect(m.schedule).toContain(expectedTime);
            });
        });
    });
});
