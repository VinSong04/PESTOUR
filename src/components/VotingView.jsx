import React, { useState, useEffect } from 'react';

const VotingView = () => {
    const [options, setOptions] = useState([]);

    useEffect(() => {
        // Fetch voting options from an API or database
        const fetchOptions = async () => {
            // Mock data; replace with actual API call
            const mockData = [
                { id: 1, option: 'Option 1', votes: 0 },
                { id: 2, option: 'Option 2', votes: 0 },
                { id: 3, option: 'Option 3', votes: 0 },
            ];
            setOptions(mockData);
        };

        fetchOptions();
    }, []);

    const handleVote = (id) => {
        setOptions((prevOptions) => {
            return prevOptions.map((option) => {
                if (option.id === id) {
                    return { ...option, votes: option.votes + 1 };
                }
                return option;
            });
        });
    };

    const totalVotes = options.reduce((sum, option) => sum + option.votes, 0);

    return (
        <div>
            <h1>Voting Page</h1>
            <div>
                {options.map((option) => {
                    const progress = totalVotes > 0 ? (option.votes / totalVotes) * 100 : 0;
                    return (
                        <div key={option.id} style={{ margin: '10px 0' }}>
                            <button onClick={() => handleVote(option.id)}>{option.option}</button>
                            <div style={{ background: '#e0e0e0', borderRadius: '5px', overflow: 'hidden' }}>
                                <div style={{ width: `${progress}%`, background: '#76c7c0', height: '20px' }}></div>
                            </div>
                            <span>{option.votes} votes</span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default VotingView;