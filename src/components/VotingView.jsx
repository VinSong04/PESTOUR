import { motion, AnimatePresence } from 'framer-motion';
import { ThumbsUp, Trophy, RefreshCw } from 'lucide-react';
import useVoting from '../hooks/useVoting';

const VotingView = ({ data, onAdminAccess }) => {
    const votingEnabled = data?.settings?.votingEnabled || false;
    const votingStatus = data?.settings?.votingStatus || 'starting';
    const votingTitle = data?.settings?.votingTitle || "COMMUNITY VOTE";
    const votingOptions = data?.settings?.votingOptions || [];

    const { votes, loading, castVote, userVote, hasVoted } = useVoting('primary_poll');
    const totalVotes = Object.values(votes).reduce((sum, v) => sum + v, 0);

    const handleClearLocalVote = () => {
        localStorage.removeItem('voted_primary_poll');
        window.location.reload();
    };
    const isFinished = votingStatus === 'finished';

    // Find the winner
    let maxVotes = -1;
    let winnerId = null;
    Object.entries(votes).forEach(([id, count]) => {
        if (count > maxVotes) {
            maxVotes = count;
            winnerId = id;
        }
    });

    const colors = [
        'bg-blue-500',    // Matches selected state
        'bg-emerald-400', // Matches the green 40% bar in the image
        'bg-purple-500',
        'bg-amber-500',
    ];

    if (loading) {
        return (
            <div className="flex items-center justify-center py-32 text-slate-500">
                <div className="w-8 h-8 border-4 border-blue-500/20 border-t-blue-500 rounded-full animate-spin"></div>
            </div>
        );
    }

    return (
        <div className="max-w-3xl mx-auto space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700 font-sans">
            {/* Header Section */}
            <div className="text-center space-y-6">
                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className={`inline-flex items-center gap-2 px-5 py-2 rounded-full border text-[10px] font-black uppercase tracking-[0.2em] ${isFinished
                        ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
                        : hasVoted
                            ? 'bg-[#1a233a] border-blue-900/50 text-blue-400'
                            : 'bg-slate-800/50 border-white/5 text-slate-400'
                        }`}
                >
                    {isFinished ? 'Results Finalized' : hasVoted ? 'Vote Recorded' : 'Community Poll'}
                </motion.div>

                {hasVoted && !isFinished && (
                    <div className="flex justify-center mt-2">
                        <button
                            onClick={handleClearLocalVote}
                            className="text-[9px] font-black text-blue-400/50 hover:text-blue-400 uppercase tracking-widest transition-colors flex items-center gap-2"
                        >
                            <RefreshCw className="w-3 h-3" /> Change My Vote
                        </button>
                    </div>
                )}

                <h1 className="text-3xl md:text-5xl font-black text-[#4b70db] tracking-wide leading-tight">
                    {votingTitle}
                </h1>
            </div>

            {/* Voting Options List */}
            <div className="space-y-4">
                <AnimatePresence>
                    {votingOptions.map((option, index) => {
                        const voteId = option.id;
                        const voteCount = votes[voteId] || 0;
                        const percentage = totalVotes === 0 ? 0 : (voteCount / totalVotes) * 100;
                        const optionColor = colors[index % colors.length];

                        const isUserChoice = userVote === voteId;
                        const isWinner = isFinished && winnerId === voteId;
                        const isDisabled = isFinished || !votingEnabled || hasVoted;

                        // Extracted Classes for better readability
                        const cardClasses = `
                            w-full text-left bg-[#0a0c10] border rounded-2xl p-5 sm:p-6 
                            flex items-center gap-5 transition-all relative overflow-hidden group
                            ${hasVoted && !isUserChoice ? 'opacity-60' : ''}
                            ${!isDisabled ? 'hover:border-blue-500/40 hover:bg-slate-900/60 active:scale-[0.99] cursor-pointer' : 'cursor-default'}
                            ${isUserChoice ? 'border-blue-500/50 shadow-[0_0_30px_rgba(59,130,246,0.05)]' : 'border-white/5'}
                            ${isWinner ? 'border-emerald-500/40 shadow-[0_0_30px_rgba(16,185,129,0.05)]' : ''}
                        `;

                        const iconContainerClasses = `
                            w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-all
                            ${isWinner ? 'bg-emerald-500 text-slate-950' : ''}
                            ${isUserChoice && !isWinner ? 'bg-blue-500 text-white' : ''}
                            ${!isUserChoice && !isWinner ? 'bg-[#13151A] border border-white/5 group-hover:border-blue-500/30' : ''}
                        `;

                        const titleClasses = `
                            text-lg sm:text-xl font-black uppercase tracking-tight transition-colors
                            ${isWinner ? 'text-emerald-400' : isUserChoice ? 'text-[#5a8af2]' : 'text-white'}
                        `;

                        const percentageClasses = `
                            text-3xl sm:text-4xl font-black leading-none tracking-tighter
                            ${isWinner ? 'text-emerald-400' : isUserChoice ? 'text-[#5a8af2]' : 'text-white'}
                        `;

                        return (
                            <motion.div
                                key={voteId}
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: index * 0.1 }}
                            >
                                <button
                                    onClick={() => !isDisabled && castVote(voteId)}
                                    disabled={isDisabled}
                                    className={cardClasses}
                                >
                                    {/* Left Icon */}
                                    <div className={iconContainerClasses}>
                                        {isWinner ? (
                                            <Trophy className="w-5 h-5" />
                                        ) : isUserChoice ? (
                                            <ThumbsUp className="w-5 h-5" />
                                        ) : (
                                            <div className="w-3 h-3 rounded-[4px] bg-white/10" />
                                        )}
                                    </div>

                                    {/* Middle: Title & Progress */}
                                    <div className="flex-1 space-y-3">
                                        <div className="flex items-center gap-3">
                                            <h3 className={titleClasses}>
                                                {option.label || `Option ${index + 1}`}
                                            </h3>
                                            {isUserChoice && (
                                                <span className="text-[9px] font-bold bg-[#1e2b4a] px-2.5 py-1 rounded-full tracking-[0.15em] text-[#5a8af2]">
                                                    YOUR VOTE
                                                </span>
                                            )}
                                        </div>

                                        {/* Progress Bar */}
                                        <div className="relative h-1 w-full bg-[#13151A] rounded-full overflow-hidden">
                                            <motion.div
                                                initial={{ width: 0 }}
                                                animate={{ width: `${percentage}%` }}
                                                transition={{ duration: 1.5, ease: "easeOut" }}
                                                className={`absolute inset-y-0 left-0 ${isUserChoice ? 'bg-blue-400' : optionColor} ${isWinner ? 'bg-emerald-400' : ''}`}
                                            />
                                        </div>
                                    </div>

                                    {/* Right: Stats */}
                                    <div className="text-right min-w-[80px] shrink-0">
                                        <div className={percentageClasses}>
                                            {Math.round(percentage)}%
                                        </div>
                                        <div className="text-[9px] font-bold text-slate-500 uppercase tracking-widest mt-1.5">
                                            {voteCount.toLocaleString()} Votes
                                        </div>
                                    </div>
                                </button>
                            </motion.div>
                        );
                    })}
                </AnimatePresence>
            </div>

            {/* Admin Access Footer */}
            {onAdminAccess && (
                <div className="pt-16 pb-8 text-center">
                    <button
                        onClick={onAdminAccess}
                        className="text-[10px] font-black text-slate-600 uppercase tracking-[0.3em] hover:text-slate-300 hover:tracking-[0.4em] transition-all duration-500 py-3 px-8 rounded-full hover:bg-white/5"
                    >
                        Admin Portal Access
                    </button>
                </div>
            )}
        </div>
    );
};

export default VotingView;