import { useState, useEffect } from 'react';
import { db } from '../firebase';
import { ref, onValue } from 'firebase/database';

/**
 * Real-time Firebase listener for a specific transaction's payment status.
 * Replaces the polling-based approach used in the BakongPaymentModal.
 * 
 * When admin confirms payment in the dashboard, this fires instantly
 * instead of waiting for the next 3s poll cycle.
 *
 * @param {string|null} transactionRef - The tran_id to watch
 * @param {boolean} active - Whether to activate the listener
 * @returns {{ isPaid: boolean, status: string|null, loading: boolean }}
 */
export default function usePaymentStatus(transactionRef, active = true) {
    const [isPaid, setIsPaid] = useState(false);
    const [status, setStatus] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!transactionRef || !active) {
            setLoading(false);
            return;
        }

        setLoading(true);
        setIsPaid(false);
        setStatus(null);

        // Listen to all registrations and find the one matching our tran_id
        const regRef = ref(db, 'registrations');
        const unsubscribe = onValue(regRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                const match = Object.values(data).find(
                    entry => entry.tran_id === transactionRef
                );
                if (match) {
                    const paid = match.status === 'paid' || match.status === 'approved';
                    setIsPaid(paid);
                    setStatus(match.status);
                }
            }
            setLoading(false);
        });

        return () => unsubscribe();
    }, [transactionRef, active]);

    return { isPaid, status, loading };
}
