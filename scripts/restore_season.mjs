/**
 * Restore tournament data to match the screenshot groups.
 * Uses anonymous auth (same as the app does).
 */
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, get, set } from 'firebase/database';
import { getAuth, signInAnonymously } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyD4E1mAaY4HkId_h41YQz_kijN4R_h3In8",
    authDomain: "pestour-965ff.firebaseapp.com",
    databaseURL: "https://pestour-965ff-default-rtdb.firebaseio.com",
    projectId: "pestour-965ff",
    storageBucket: "pestour-965ff.firebasestorage.app",
    messagingSenderId: "518176676119",
    appId: "1:518176676119:web:a21a447983ba8deb297f52"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const auth = getAuth(app);

await signInAnonymously(auth);
console.log('✅ Signed in');

// Exact groups from the screenshot
const groupsData = {
    A: [
        { name: 'Sao Ling FC', logo: 'Kuwait' },
        { name: 'JaKroVal v2', logo: 'Kosovo' },
        { name: 'AUTO', logo: 'Cambodia' },
        { name: 'Ka', logo: 'Indonesia' },
        { name: 'Neang Meng Heng', logo: 'Netherlands' },
    ],
    B: [
        { name: 'Rath Smos', logo: 'Japan' },
        { name: 'RITH', logo: 'Cambodia' },
        { name: 'Nit', logo: 'Portugal' },
        { name: 'Chhorn Vinsong', logo: 'Germany' },
        { name: 'Long sombo', logo: 'Cape Verde' },
    ],
    C: [
        { name: 'PLE.Nxzro', logo: 'Argentina' },
        { name: 'Chea', logo: 'Italy' },
        { name: 'Som Camrin', logo: 'Korea Republic' },
        { name: 'Vinn', logo: 'Bangladesh' },
        { name: 'POV dararithy sak', logo: 'England' },
    ],
    D: [
        { name: 'Nick', logo: 'Brazil' },
        { name: 'Seakleng', logo: 'Cambodia' },
        { name: 'Vann Dararith', logo: 'Colombia' },
        { name: 'Bunlong zz', logo: 'Japan' },
        { name: 'Tra tra', logo: 'Cambodia' },
    ],
};

// Build players
const newPlayers = [];
Object.entries(groupsData).forEach(([group, players]) => {
    players.forEach((p, idx) => {
        newPlayers.push({ group, id: `${group}${idx + 1}`, name: p.name, logo: p.logo });
    });
});

// Generate round-robin matches (Berger schedule)
const createEmptyGame = () => ({ p1: null, p2: null });
const createEmptyMatch = (id, groupId, p1Id, p2Id) => ({
    id, groupId, p1Id, p2Id, played: false,
    g1: createEmptyGame(), g2: createEmptyGame(), g3: createEmptyGame(),
});

const newMatches = [];
['A', 'B', 'C', 'D'].forEach(g => {
    const gp = newPlayers.filter(p => p.group === g);
    const list = [...gp];
    if (list.length % 2 !== 0) list.push({ id: 'BYE', isBye: true });
    const n = list.length;
    let mc = 1;
    const groupMatches = [];

    for (let r = 0; r < n - 1; r++) {
        for (let i = 0; i < n / 2; i++) {
            const p1 = list[i], p2 = list[n - 1 - i];
            if (p1.id !== 'BYE' && p2.id !== 'BYE') {
                groupMatches.push(createEmptyMatch(`M-${g}${mc++}`, g, p1.id, p2.id));
            }
        }
        list.splice(1, 0, list.pop());
    }

    // Schedule assignment
    let dayText, times;
    if (g === 'A') { dayText = 'DAY 1 (SAT)'; times = ['18:00', '19:00']; }
    else if (g === 'B') { dayText = 'DAY 1 (SAT)'; times = ['20:00', '21:00']; }
    else if (g === 'C') { dayText = 'DAY 2 (SUN)'; times = ['18:00', '19:00']; }
    else { dayText = 'DAY 2 (SUN)'; times = ['20:00', '21:00']; }

    groupMatches.forEach((m, idx) => {
        m.schedule = `WEEK ${Math.floor(idx / 2) + 1} • ${dayText} @ ${times[idx % 2]}`;
    });
    newMatches.push(...groupMatches);
});

// Read current data to preserve settings & history
const snap = await get(ref(db, 'tournament'));
const current = snap.val();

const restored = {
    ...current,
    players: newPlayers,
    matches: newMatches,
    bracket: [],
    lastUpdated: new Date().toISOString(),
};

// Preview
console.log('\n=== RESTORING GROUPS ===');
Object.entries(groupsData).forEach(([g, players]) => {
    console.log(`Group ${g}: ${players.map(p => p.name).join(', ')}`);
});
console.log(`\n${newPlayers.length} players, ${newMatches.length} matches`);

// Write
console.log('\n⏳ Writing to Firebase...');
await set(ref(db, 'tournament'), restored);
console.log('✅ Done! Refresh your app.');

process.exit(0);
