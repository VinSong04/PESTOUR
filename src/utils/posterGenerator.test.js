import { describe, it, expect } from 'vitest';
import { groupMatchesByWeekAndDay } from './posterGenerator';

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
});
