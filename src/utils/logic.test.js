import { describe, it, expect } from 'vitest';
import { getSeriesResult, assignSchedules, generateKnockoutSeedings } from './logic';

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

    describe('generateKnockoutSeedings', () => {
        const makeStandingsData = () => ({
            groups: {
                A: [
                    { id: 'A1', name: 'Alpha 1st', logo: 'Brazil', group: 'A', pts: 9, gd: 5, gf: 10 },
                    { id: 'A2', name: 'Alpha 2nd', logo: 'Japan', group: 'A', pts: 6, gd: 2, gf: 7 },
                    { id: 'A3', name: 'Alpha 3rd', logo: '', group: 'A', pts: 3, gd: -1, gf: 4 },
                    { id: 'A4', name: 'Alpha 4th', logo: '', group: 'A', pts: 0, gd: -6, gf: 2 },
                    { id: 'A5', name: 'Alpha 5th', logo: '', group: 'A', pts: 0, gd: -6, gf: 1 },
                ],
                B: [
                    { id: 'B1', name: 'Bravo 1st', logo: 'Germany', group: 'B', pts: 9, gd: 4, gf: 8 },
                    { id: 'B2', name: 'Bravo 2nd', logo: 'Italy', group: 'B', pts: 6, gd: 1, gf: 6 },
                    { id: 'B3', name: 'Bravo 3rd', logo: '', group: 'B', pts: 3, gd: -2, gf: 3 },
                    { id: 'B4', name: 'Bravo 4th', logo: '', group: 'B', pts: 0, gd: -3, gf: 2 },
                    { id: 'B5', name: 'Bravo 5th', logo: '', group: 'B', pts: 0, gd: -5, gf: 1 },
                ],
                C: [
                    { id: 'C1', name: 'Charlie 1st', logo: 'Argentina', group: 'C', pts: 9, gd: 6, gf: 11 },
                    { id: 'C2', name: 'Charlie 2nd', logo: 'France', group: 'C', pts: 5, gd: 0, gf: 5 },
                    { id: 'C3', name: 'Charlie 3rd', logo: '', group: 'C', pts: 3, gd: -1, gf: 3 },
                    { id: 'C4', name: 'Charlie 4th', logo: '', group: 'C', pts: 1, gd: -2, gf: 2 },
                    { id: 'C5', name: 'Charlie 5th', logo: '', group: 'C', pts: 0, gd: -3, gf: 1 },
                ],
                D: [
                    { id: 'D1', name: 'Delta 1st', logo: 'Portugal', group: 'D', pts: 8, gd: 3, gf: 9 },
                    { id: 'D2', name: 'Delta 2nd', logo: 'Korea Republic', group: 'D', pts: 6, gd: 2, gf: 7 },
                    { id: 'D3', name: 'Delta 3rd', logo: '', group: 'D', pts: 4, gd: 0, gf: 5 },
                    { id: 'D4', name: 'Delta 4th', logo: '', group: 'D', pts: 0, gd: -2, gf: 2 },
                    { id: 'D5', name: 'Delta 5th', logo: '', group: 'D', pts: 0, gd: -3, gf: 1 },
                ],
            }
        });

        it('generates 4 QF matches with correct cross-group seedings', () => {
            const data = makeStandingsData();
            const bracket = generateKnockoutSeedings(data);

            expect(bracket).toHaveLength(4);

            // QF-1: A1 vs D2
            expect(bracket[0].id).toBe('QF-1');
            expect(bracket[0].p1Name).toBe('Alpha 1st');
            expect(bracket[0].p2Name).toBe('Delta 2nd');

            // QF-2: B1 vs C2
            expect(bracket[1].id).toBe('QF-2');
            expect(bracket[1].p1Name).toBe('Bravo 1st');
            expect(bracket[1].p2Name).toBe('Charlie 2nd');

            // QF-3: C1 vs B2
            expect(bracket[2].id).toBe('QF-3');
            expect(bracket[2].p1Name).toBe('Charlie 1st');
            expect(bracket[2].p2Name).toBe('Bravo 2nd');

            // QF-4: D1 vs A2
            expect(bracket[3].id).toBe('QF-4');
            expect(bracket[3].p1Name).toBe('Delta 1st');
            expect(bracket[3].p2Name).toBe('Alpha 2nd');
        });

        it('produces correctly structured bracket match objects', () => {
            const data = makeStandingsData();
            const bracket = generateKnockoutSeedings(data);

            bracket.forEach(m => {
                expect(m.round).toBe('QF');
                expect(m.played).toBe(false);
                expect(m.g1).toEqual({ p1: null, p2: null });
                expect(m.g2).toEqual({ p1: null, p2: null });
                expect(m.g3).toEqual({ p1: null, p2: null });
                expect(m.p1Id).toBeTruthy();
                expect(m.p2Id).toBeTruthy();
                expect(m.p1Name).toBeTruthy();
                expect(m.p2Name).toBeTruthy();
                expect(typeof m.p1Logo).toBe('string');
                expect(typeof m.p2Logo).toBe('string');
            });
        });

        it('preserves player logos from standings', () => {
            const data = makeStandingsData();
            const bracket = generateKnockoutSeedings(data);

            expect(bracket[0].p1Logo).toBe('Brazil');   // A1
            expect(bracket[0].p2Logo).toBe('Korea Republic'); // D2
            expect(bracket[1].p1Logo).toBe('Germany');   // B1
            expect(bracket[2].p1Logo).toBe('Argentina'); // C1
        });

        it('throws an error if a group has fewer than 2 players', () => {
            const data = makeStandingsData();
            data.groups['B'] = [data.groups['B'][0]]; // Only 1 player in group B

            expect(() => generateKnockoutSeedings(data)).toThrow('Group B does not have enough players');
        });

        it('throws an error if a group is missing', () => {
            const data = makeStandingsData();
            delete data.groups['C'];

            expect(() => generateKnockoutSeedings(data)).toThrow('Group C does not have enough players');
        });
    });
});
