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
console.log('Signed in anonymously');

// Read current tournament data
const tournamentSnap = await get(ref(db, 'tournament'));
const data = tournamentSnap.val();

// Exact groups matching the admin lottery draw
const groupAssignments = {
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

// Build players array
const newPlayers = [];
Object.entries(groupAssignments).forEach(([group, players]) => {
    players.forEach((p, i) => {
        newPlayers.push({ group, id: `${group}${i + 1}`, name: p.name, logo: p.logo });
    });
});

console.log('=== GROUP ASSIGNMENTS ===');
Object.entries(groupAssignments).forEach(([g, players]) => {
    console.log(`\nGroup ${g}:`);
    players.forEach((p, i) => console.log(`  ${i + 1}. ${p.name} (${p.logo})`));
});

// Generate round-robin matches
const createEmptyGame = () => ({ p1: null, p2: null });
const createEmptyMatch = (id, groupId, p1Id, p2Id) => ({
    id, groupId, p1Id, p2Id, played: false,
    g1: createEmptyGame(), g2: createEmptyGame(), g3: createEmptyGame()
});

const assignSchedules = (matches, group) => {
    let dayText = 'DAY 1 (SAT)';
    let times = ['18:00', '19:00'];
    if (group === 'A') { dayText = 'DAY 1 (SAT)'; times = ['18:00', '19:00']; }
    else if (group === 'B') { dayText = 'DAY 1 (SAT)'; times = ['20:00', '21:00']; }
    else if (group === 'C') { dayText = 'DAY 2 (SUN)'; times = ['18:00', '19:00']; }
    else if (group === 'D') { dayText = 'DAY 2 (SUN)'; times = ['20:00', '21:00']; }
    matches.forEach((m, idx) => {
        const w = Math.floor(idx / 2) + 1;
        const time = times[idx % 2];
        m.schedule = `WEEK ${w} • ${dayText} @ ${time}`;
    });
};

const newMatches = [];
['A', 'B', 'C', 'D'].forEach(g => {
    const gp = newPlayers.filter(p => p.group === g);
    const list = [...gp];
    if (list.length % 2 !== 0) {
        list.push({ id: 'BYE', isBye: true });
    }
    const n = list.length;
    let matchCounter = 1;
    const groupMatches = [];

    for (let r = 0; r < n - 1; r++) {
        for (let i = 0; i < n / 2; i++) {
            const p1 = list[i];
            const p2 = list[n - 1 - i];
            if (p1.id !== 'BYE' && p2.id !== 'BYE') {
                groupMatches.push(createEmptyMatch(`M-${g}${matchCounter++}`, g, p1.id, p2.id));
            }
        }
        list.splice(1, 0, list.pop());
    }

    assignSchedules(groupMatches, g);
    newMatches.push(...groupMatches);
});

console.log(`\nGenerated ${newMatches.length} matches`);

// Write to Firebase
const newData = {
    ...data,
    players: newPlayers,
    matches: newMatches,
    bracket: [],
    lastUpdated: new Date().toISOString()
};

await set(ref(db, 'tournament'), newData);
console.log('\n✅ Done! Groups saved to Firebase matching your lottery draw.');

process.exit(0);
