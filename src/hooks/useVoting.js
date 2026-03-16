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
        if (userVote) return; // Prevent double voting

        const votesRef = ref(db, `votes/${pollId}`);
        update(votesRef, {
            [optionId]: increment(1)
        });
        localStorage.setItem(`voted_${pollId}`, optionId);
        setUserVote(optionId);
    };

    return { votes, loading, castVote, userVote, hasVoted: !!userVote };
};

export default useVoting;
