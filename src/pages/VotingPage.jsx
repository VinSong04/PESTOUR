import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ThumbsUp, Trophy, RefreshCw } from 'lucide-react';
import useVoting from '../hooks/useVoting';

const VotingView = ({ data, onAdminAccess }) => {
    const votingEnabled = data?.settings?.votingEnabled || false;
    const votingStatus = data?.settings?.votingStatus || 'starting';
    const votingTitle = data?.settings?.votingTitle || "COMMUNITY VOTE";
    const votingOptions = data?.settings?.votingOptions || [];

    const { votes, loading, castVote, clearVote, userVote, hasVoted } = useVoting('primary_poll');
    const [selectedOption, setSelectedOption] = useState(null);
    const totalVotes = Object.values(votes).reduce((sum, v) => sum + v, 0);

    const [showConfirm, setShowConfirm] = useState(false);
    const handleClearLocalVote = () => setShowConfirm(true);
    const confirmClearVote = () => { clearVote(); setSelectedOption(null); setShowConfirm(false); };
    const cancelClearVote = () => setShowConfirm(false);

    const handleSelectOption = (optionId) => {
        if (!hasVoted && votingEnabled && !isFinished) {
            setSelectedOption(optionId);
        }
    };
    const handleSubmitVote = () => {
        if (selectedOption) { castVote(selectedOption); setSelectedOption(null); }
    };
    const handleCancelVote = () => setSelectedOption(null);

    const isFinished = votingStatus === 'finished';

    let maxVotes = -1;
    let winnerId = null;
    Object.entries(votes).forEach(([id, count]) => {
        if (count > maxVotes) { maxVotes = count; winnerId = id; }
    });

    const colors = ['bg-cyan-500', 'bg-emerald-400', 'bg-purple-500', 'bg-amber-500'];

    if (loading) {
        return (
            <div className="flex items-center justify-center py-32 text-slate-500">
                <div className="w-8 h-8 border-2 border-cyan-500/20 border-t-cyan-500 rounded-full animate-spin"></div>
            </div>
        );
    }

    return (
        <div className="max-w-3xl mx-auto space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700 font-sans pb-24">

            {/* Header */}
            <div className="text-center space-y-5">
                <h1 className="text-4xl md:text-5xl font-outfit font-black flex justify-center py-4">
                    <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-emerald-400 bg-clip-text text-transparent inline-block py-6 px-4 -my-6 leading-[1.6]">
                        {votingTitle}
                    </span>
                </h1>

                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full border text-[10px] font-semibold uppercase tracking-[0.15em] ${isFinished
                        ? 'bg-emerald-500/8 border-emerald-500/15 text-emerald-400'
                        : hasVoted
                            ? 'bg-cyan-500/8 border-cyan-500/15 text-cyan-400'
                            : 'bg-white/[0.03] border-white/[0.04] text-slate-500'
                        }`}
                >
                    {isFinished ? 'Results Finalized' : hasVoted ? 'Vote Recorded' : 'Community Poll'}
                </motion.div>

                {hasVoted && !isFinished && (
                    <div className="flex justify-center mt-1">
                        <button
                            onClick={handleClearLocalVote}
                            className="text-[9px] font-semibold text-cyan-400/40 hover:text-cyan-400 uppercase tracking-widest transition-colors flex items-center gap-1.5"
                        >
                            <RefreshCw className="w-3 h-3" /> Change My Vote
                        </button>
                    </div>
                )}
            </div>

            {/* Voting Options */}
            <div className="space-y-3 max-w-2xl mx-auto">
                <AnimatePresence>
                    {votingOptions.map((option, index) => {
                        const voteId = option.id;
                        const voteCount = votes[voteId] || 0;
                        const percentage = totalVotes === 0 ? 0 : (voteCount / totalVotes) * 100;
                        const optionColor = colors[index % colors.length];

                        const isUserChoice = userVote === voteId;
                        const isWinner = isFinished && winnerId === voteId;
                        const isDisabled = isFinished || !votingEnabled || hasVoted;
                        const isSelected = selectedOption === voteId;

                        const avatarUrl = option.avatar || option.image || null;

                        return (
                            <motion.div
                                key={voteId}
                                initial={{ y: 15, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: index * 0.08 }}
                            >
                                <button
                                    onClick={() => handleSelectOption(voteId)}
                                    disabled={isDisabled}
                                    className={`w-full text-left glass-card rounded-2xl p-5 flex items-center gap-5 transition-all relative overflow-hidden group
                                        ${hasVoted && !isUserChoice ? 'opacity-35' : ''}
                                        ${isSelected ? 'ring-1 ring-cyan-500/30 shadow-[0_0_20px_rgba(34,211,238,0.08)]' : ''}
                                        ${!isDisabled ? 'hover:border-cyan-500/15 hover:bg-white/[0.03] hover-lift cursor-pointer' : 'cursor-default'}
                                        ${isUserChoice ? 'border-cyan-500/20 bg-cyan-500/[0.03] pulse-glow' : ''}
                                        ${isWinner ? 'border-emerald-500/20 bg-emerald-500/[0.04]' : ''}
                                    `}
                                >
                                    {/* Avatar/Icon */}
                                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 border transition-all ${isWinner ? 'bg-emerald-500 border-emerald-400 text-slate-950' : isUserChoice ? 'bg-cyan-500 border-cyan-400 text-white' : 'bg-white/[0.03] border-white/[0.06] text-white group-hover:border-cyan-500/15'}`}>
                                        {avatarUrl ? (
                                            <img src={avatarUrl} alt={option.label} className="w-full h-full object-cover rounded-xl" />
                                        ) : isWinner ? (
                                            <Trophy className="w-6 h-6" />
                                        ) : isUserChoice ? (
                                            <ThumbsUp className="w-6 h-6" />
                                        ) : (
                                            <div className="w-2.5 h-2.5 rounded bg-current opacity-15" />
                                        )}
                                    </div>

                                    {/* Content */}
                                    <div className="flex-1 space-y-2.5">
                                        <div className="flex items-center gap-2.5">
                                            <h3 className={`text-lg sm:text-xl font-bold leading-tight transition-colors ${isWinner ? 'text-emerald-400' : isUserChoice ? 'text-cyan-400' : 'text-white'}`}>
                                                {option.label || `Option ${index + 1}`}
                                            </h3>
                                            {isUserChoice && (
                                                <span className="text-[8px] font-semibold bg-cyan-400/10 px-2 py-0.5 rounded-full tracking-wider text-cyan-400">
                                                    YOUR VOTE
                                                </span>
                                            )}
                                        </div>

                                        {/* Progress Bar */}
                                        <div className="relative h-1.5 w-full bg-white/[0.03] rounded-full overflow-hidden border border-white/[0.03]">
                                            <motion.div
                                                initial={{ width: 0 }}
                                                animate={{ width: `${percentage}%` }}
                                                transition={{ duration: 1.5, ease: "easeOut" }}
                                                className={`absolute inset-y-0 left-0 ${isUserChoice ? 'bg-cyan-400' : optionColor} ${isWinner ? 'bg-emerald-400' : ''}`}
                                            >
                                                {voteId === winnerId && totalVotes > 0 && (
                                                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent translate-x-[-100%] animate-[shimmer_2s_infinite]"></div>
                                                )}
                                            </motion.div>
                                        </div>
                                    </div>

                                    {/* Stats */}
                                    <div className="text-right min-w-[70px] shrink-0">
                                        <div className={`text-2xl sm:text-3xl font-black leading-none tracking-tighter ${isWinner ? 'text-emerald-400' : isUserChoice ? 'text-cyan-400' : 'text-white'}`}>
                                            {Math.round(percentage)}%
                                        </div>
                                        <div className="text-[8px] font-semibold text-slate-600 uppercase tracking-wider mt-1">
                                            {voteCount.toLocaleString()} Votes
                                        </div>
                                    </div>
                                </button>

                                {/* Confirm inline */}
                                <AnimatePresence>
                                    {isSelected && !hasVoted && !isFinished && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: 'auto', opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ type: "spring", stiffness: 200, damping: 20 }}
                                            className="overflow-hidden"
                                        >
                                            <div className="mt-2.5 bg-cyan-500/[0.05] border border-cyan-500/10 rounded-xl p-3.5 flex items-center justify-between gap-4">
                                                <div className="text-sm font-semibold text-cyan-400 px-1">Ready to submit?</div>
                                                <div className="flex gap-2">
                                                    <button onClick={handleSubmitVote} className="px-5 py-1.5 rounded-lg bg-cyan-500 text-white font-bold text-[10px] uppercase tracking-wider hover:bg-cyan-400 transition">Confirm</button>
                                                    <button onClick={handleCancelVote} className="px-5 py-1.5 rounded-lg bg-white/[0.04] text-slate-400 font-bold text-[10px] uppercase tracking-wider hover:bg-white/[0.06] transition">Cancel</button>
                                                </div>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.div>
                        );
                    })}
                </AnimatePresence>
            </div>

            {/* Change Vote Confirm Dialog */}
            <AnimatePresence>
                {showConfirm && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 flex items-center justify-center z-50 bg-[#060a13]/85 backdrop-blur-md p-6"
                    >
                        <motion.div
                            initial={{ scale: 0.9, y: 20, opacity: 0 }}
                            animate={{ scale: 1, y: 0, opacity: 1 }}
                            exit={{ scale: 0.9, y: 20, opacity: 0 }}
                            transition={{ type: "spring", stiffness: 350, damping: 25 }}
                            className="glass-card rounded-3xl p-8 shadow-2xl max-w-md w-full text-center"
                        >
                            <div className="w-16 h-16 bg-cyan-500/8 rounded-2xl flex items-center justify-center mx-auto mb-5">
                                <RefreshCw className="w-8 h-8 text-cyan-400" />
                            </div>
                            <h2 className="text-xl font-bold text-white uppercase tracking-tight mb-3">Change Your Vote?</h2>
                            <p className="text-slate-500 mb-7 leading-relaxed text-sm">This will remove your current selection and allow you to pick another option.</p>
                            <div className="flex gap-3">
                                <button
                                    onClick={confirmClearVote}
                                    className="flex-1 py-3.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-white font-bold uppercase tracking-wider transition-all"
                                >Yes, Reset</button>
                                <button
                                    onClick={cancelClearVote}
                                    className="flex-1 py-3.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.06] text-slate-400 font-bold uppercase tracking-wider transition-all border border-white/[0.04]"
                                >Cancel</button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Admin Access */}
            {onAdminAccess && (
                <div className="pt-20 pb-8 text-center">
                    <button
                        onClick={onAdminAccess}
                        className="text-[10px] font-semibold text-slate-700 uppercase tracking-[0.3em] hover:text-slate-400 transition-all duration-500 py-2.5 px-6 rounded-full hover:bg-white/[0.02] border border-transparent hover:border-white/[0.04]"
                    >
                        Admin Portal Access
                    </button>
                </div>
            )}
        </div>
    );
};

export default VotingView;