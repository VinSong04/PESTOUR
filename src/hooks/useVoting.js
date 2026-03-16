import { useState, useEffect } from 'react';
import { db } from '../../firebase'; // Import Firebase configuration

const useVoting = (pollId) => {
    const [votes, setVotes] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = db.collection('polls').doc(pollId)
            .onSnapshot((doc) => {
                if (doc.exists) {
                    setVotes(doc.data().votes);
                }
                setLoading(false);
            });

        return () => unsubscribe(); // Cleanup on unmount
    }, [pollId]);

    const castVote = async (option) => {
        // Prevent duplicate votes by checking if the user already voted
        if (votes && votes[option]) {
            console.error('Duplicate vote detected!');
            return;
        }

        try {
            await db.collection('polls').doc(pollId).update({
                [`votes.${option}`]: (votes[option] || 0) + 1
            });
        } catch (error) {
            console.error('Error casting vote: ', error);
        }
    };

    return { votes, loading, castVote };
};

export default useVoting;