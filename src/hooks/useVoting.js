import { useState, useEffect } from 'react';
import { db } from '../firebase';
import { ref, onValue, update, increment } from 'firebase/database';

const useVoting = (pollId = 'primary_poll') => {
    const [votes, setVotes] = useState({});
    const [loading, setLoading] = useState(true);

    const [userVote, setUserVote] = useState(null);

    useEffect(() => {
        const savedVote = localStorage.getItem(`voted_${pollId}`);
        if (savedVote) setUserVote(savedVote);

        const votesRef = ref(db, `votes/${pollId}`);
        const unsubscribe = onValue(votesRef, (snapshot) => {
            setVotes(snapshot.val() || {});
            setLoading(false);
        });
        return () => unsubscribe();
    }, [pollId]);


    const castVote = (optionId) => {
        if (userVote === optionId) return; // Prevent voting same option

        const votesRef = ref(db, `votes/${pollId}`);
        // If user has already voted, decrement previous vote
        if (userVote) {
            update(votesRef, {
                [userVote]: increment(-1),
                [optionId]: increment(1)
            });
        } else {
            update(votesRef, {
                [optionId]: increment(1)
            });
        }
        localStorage.setItem(`voted_${pollId}`, optionId);
        setUserVote(optionId);
    };

    const clearVote = () => {
        if (!userVote) return;
        const votesRef = ref(db, `votes/${pollId}`);
        update(votesRef, {
            [userVote]: increment(-1)
        });
        localStorage.removeItem(`voted_${pollId}`);
        setUserVote(null);
    };

    return { votes, loading, castVote, clearVote, userVote, hasVoted: !!userVote };
};

export default useVoting;
