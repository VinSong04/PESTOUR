import { db } from '../firebase';

// Replace deep nested Firestore path with a simpler one
const tournamentRef = doc(db, 'tournament', 'main');

// Function to fetch public tournament data
const fetchPublicTournamentData = async () => {
    try {
        const data = await getDoc(tournamentRef);
        console.log(data);
        // Handle data here
    } catch (error) {
        console.error('Failed to fetch tournament data:', error);
    }
};

// Initializing fetch on component mount
useEffect(() => {
    fetchPublicTournamentData();
}, []);