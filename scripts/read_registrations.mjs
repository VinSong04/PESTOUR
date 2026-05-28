import { initializeApp } from 'firebase/app';
import { getDatabase, ref, get } from 'firebase/database';
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

// Sign in anonymously (like normal users do)
await signInAnonymously(auth);
console.log('Signed in anonymously');

// Read current tournament data
try {
    const tournamentSnap = await get(ref(db, 'tournament'));
    const tournament = tournamentSnap.val();
    console.log('\n=== CURRENT TOURNAMENT DATA ===');
    console.log('Players:', JSON.stringify(tournament?.players, null, 2));
    console.log('\nSettings:', JSON.stringify(tournament?.settings, null, 2));
    console.log('\nMatches count:', tournament?.matches?.length || 0);
    if (tournament?.matches) {
        console.log('First 3 matches:', JSON.stringify(tournament.matches.slice(0, 3), null, 2));
    }
    console.log('\nHistory keys:', Object.keys(tournament?.history || {}));
} catch(e) {
    console.log('Cannot read tournament:', e.message);
}

// Read registrations
try {
    const regSnap = await get(ref(db, 'registrations'));
    const regs = regSnap.val();
    console.log('\n=== REGISTRATIONS ===');
    if (regs) {
        Object.entries(regs).forEach(([key, val]) => {
            console.log(`  ${key} | ${val.name} | team: ${val.baseTeam || val.logo || 'N/A'} | status: ${val.status}`);
        });
    } else {
        console.log('  No registrations found');
    }
} catch(e) {
    console.log('Cannot read registrations:', e.message);
}

process.exit(0);
