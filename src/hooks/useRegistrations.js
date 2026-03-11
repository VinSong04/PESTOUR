import { useState, useEffect } from 'react';
import { db } from '../firebase';
import { ref, onValue } from 'firebase/database';

/**
 * Custom hook for listening to Firebase registrations.
 * Shared between AdminView and RegisterView to avoid duplicate subscriptions
 * when both mount simultaneously (and deduplicate code).
 */
export default function useRegistrations() {
    const [registrations, setRegistrations] = useState([]);

    useEffect(() => {
        const regRef = ref(db, 'registrations');
        const unsubscribe = onValue(regRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                const parsed = Object.keys(data).map(key => ({
                    id: key,
                    ...data[key]
                })).sort((a, b) => (b.timestamp || 0) - (a.timestamp || 0));
                setRegistrations(parsed);
            } else {
                setRegistrations([]);
            }
        });
        return () => unsubscribe();
    }, []);

    return registrations;
}
