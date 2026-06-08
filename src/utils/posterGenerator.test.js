import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { groupMatchesByWeekAndDay, renderClassicPoster, renderNeonPoster } from './posterGenerator';

describe('Poster Generator Utils', () => {
    describe('groupMatchesByWeekAndDay', () => {
        it('groups matches by WEEK and DAY correctly from schedule property', () => {
            const matches = [
                { id: '1', schedule: 'WEEK 1 • DAY 1 (SAT)', p1Id: 'A', p2Id: 'B' },
                { id: '2', schedule: 'WEEK 1 • DAY 1 (SAT)', p1Id: 'C', p2Id: 'D' },
                { id: '3', schedule: 'WEEK 1 • DAY 2 (SUN)', p1Id: 'A', p2Id: 'C' },
                { id: '4', schedule: 'WEEK 2 • DAY 1 (SAT)', p1Id: 'B', p2Id: 'D' }
            ];

            const grouped = groupMatchesByWeekAndDay(matches);

            expect(grouped.length).toBe(2); // Week 1 and Week 2
            
            // Week 1 check
            expect(grouped[0].week).toBe(1);
            expect(grouped[0].days.length).toBe(2); // Day 1 and Day 2
            expect(grouped[0].days[0].day).toBe(1);
            expect(grouped[0].days[0].dayLabel).toBe('DAY 1 (SAT)');
            expect(grouped[0].days[0].matches.length).toBe(2);
            expect(grouped[0].days[1].day).toBe(2);
            expect(grouped[0].days[1].dayLabel).toBe('DAY 2 (SUN)');
            expect(grouped[0].days[1].matches.length).toBe(1);

            // Week 2 check
            expect(grouped[1].week).toBe(2);
            expect(grouped[1].days.length).toBe(1); // Day 1 only
            expect(grouped[1].days[0].day).toBe(1);
            expect(grouped[1].days[0].dayLabel).toBe('DAY 1 (SAT)');
            expect(grouped[1].days[0].matches.length).toBe(1);
        });

        it('falls back to balanced scheduling when schedule is missing', () => {
            const players = ['A', 'B', 'C', 'D', 'E'];
            const matches = [];
            let idCounter = 1;
            for (let i = 0; i < players.length; i++) {
                for (let j = i + 1; j < players.length; j++) {
                    matches.push({
                        id: String(idCounter++),
                        p1Id: players[i],
                        p2Id: players[j],
                        groupId: 'A'
                    });
                }
            }

            const grouped = groupMatchesByWeekAndDay(matches);

            // Grouped structure should have weeks and days
            expect(grouped.length).toBeGreaterThan(0);

            // Verify that for each player, they play exactly 2 Day 1 matches and 2 Day 2 matches
            const counts = {};
            players.forEach(p => { counts[p] = { 1: 0, 2: 0 }; });

            grouped.forEach(w => {
                w.days.forEach(d => {
                    d.matches.forEach(m => {
                        counts[m.p1Id][d.day]++;
                        counts[m.p2Id][d.day]++;
                    });
                });
            });

            // Each player in Group A should have all their matches on Day 1 (SAT) and none on Day 2 (SUN)
            players.forEach(p => {
                expect(counts[p][1]).toBe(4);
                expect(counts[p][2]).toBe(0);
            });
        });
    });

    describe('renderPoster knockout type', () => {
        beforeAll(() => {
            global.Image = class {
                constructor() {
                    setTimeout(() => {
                        this.complete = true;
                        this.naturalWidth = 10;
                        if (this.onload) this.onload();
                    }, 5);
                }
            };
        });

        afterAll(() => {
            delete global.Image;
        });

        const mockData = {
            players: [
                { id: 'A1', name: 'Alpha 1st', logo: 'Brazil', group: 'A', pts: 9, gd: 5, gf: 10 },
                { id: 'A2', name: 'Alpha 2nd', logo: 'Japan', group: 'A', pts: 6, gd: 2, gf: 7 },
                { id: 'B1', name: 'Bravo 1st', logo: 'Germany', group: 'B', pts: 9, gd: 4, gf: 8 },
                { id: 'B2', name: 'Bravo 2nd', logo: 'Italy', group: 'B', pts: 6, gd: 1, gf: 6 },
                { id: 'C1', name: 'Charlie 1st', logo: 'Argentina', group: 'C', pts: 9, gd: 6, gf: 11 },
                { id: 'C2', name: 'Charlie 2nd', logo: 'France', group: 'C', pts: 5, gd: 0, gf: 5 },
                { id: 'D1', name: 'Delta 1st', logo: 'Portugal', group: 'D', pts: 8, gd: 3, gf: 9 },
                { id: 'D2', name: 'Delta 2nd', logo: 'Korea Republic', group: 'D', pts: 6, gd: 2, gf: 7 },
            ],
            matches: [],
            bracket: [
                {
                    id: 'QF-1', round: 'QF',
                    p1Id: 'A1', p1Name: 'Alpha 1st', p1Logo: 'Brazil',
                    p2Id: 'D2', p2Name: 'Delta 2nd', p2Logo: 'Korea Republic',
                    played: true,
                    g1: { p1: 2, p2: 0 },
                    g2: { p1: 2, p2: 1 },
                    g3: { p1: null, p2: null }
                },
                {
                    id: 'QF-2', round: 'QF',
                    p1Id: 'B1', p1Name: 'Bravo 1st', p1Logo: 'Germany',
                    p2Id: 'C2', p2Name: 'Charlie 2nd', p2Logo: 'France',
                    played: false,
                    g1: { p1: null, p2: null },
                    g2: { p1: null, p2: null },
                    g3: { p1: null, p2: null }
                },
                {
                    id: 'QF-3', round: 'QF',
                    p1Id: 'C1', p1Name: 'Charlie 1st', p1Logo: 'Argentina',
                    p2Id: 'B2', p2Name: 'Bravo 2nd', p2Logo: 'Italy',
                    played: false,
                    g1: { p1: null, p2: null },
                    g2: { p1: null, p2: null },
                    g3: { p1: null, p2: null }
                },
                {
                    id: 'QF-4', round: 'QF',
                    p1Id: 'D1', p1Name: 'Delta 1st', p1Logo: 'Portugal',
                    p2Id: 'A2', p2Name: 'Alpha 2nd', p2Logo: 'Japan',
                    played: false,
                    g1: { p1: null, p2: null },
                    g2: { p1: null, p2: null },
                    g3: { p1: null, p2: null }
                }
            ]
        };

        const mockConfig = {
            posterTitle: 'TEST TOUR',
            posterSubtitle: 'KNOCKOUTS',
            posterFooter: 'TEST FOOTER',
            posterAccent: '#e63946',
            posterDate: '2026-06-02'
        };

        const makeMockCtx = () => {
            const mockGradient = { addColorStop: () => {} };
            return {
                createLinearGradient: () => mockGradient,
                createRadialGradient: () => mockGradient,
                fillRect: () => {},
                save: () => {},
                restore: () => {},
                beginPath: () => {},
                moveTo: () => {},
                lineTo: () => {},
                quadraticCurveTo: () => {},
                closePath: () => {},
                clip: () => {},
                drawImage: () => {},
                stroke: () => {},
                fill: () => {},
                arc: () => {},
                measureText: () => ({ width: 100 }),
                fillText: () => {},
                globalAlpha: 1,
                fillStyle: '',
                strokeStyle: '',
                lineWidth: 1,
                font: '',
                textAlign: '',
                textBaseline: '',
                shadowColor: '',
                shadowBlur: 0,
                shadowOffsetX: 0,
                shadowOffsetY: 0
            };
        };

        it('renders classic poster without errors', async () => {
            const ctx = makeMockCtx();
            await expect(renderClassicPoster(ctx, 1080, 1200, null, 'knockout', mockData, mockConfig)).resolves.not.toThrow();
        });

        it('renders neon poster without errors', async () => {
            const ctx = makeMockCtx();
            await expect(renderNeonPoster(ctx, 1080, 1200, null, 'knockout', mockData, mockConfig)).resolves.not.toThrow();
        });
    });
});
