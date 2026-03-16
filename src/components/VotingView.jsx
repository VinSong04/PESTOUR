import React, { useState } from 'react';
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
    const [showModal, setShowModal] = useState(false);
    const totalVotes = Object.values(votes).reduce((sum, v) => sum + v, 0);

    const [showConfirm, setShowConfirm] = useState(false);
    const handleClearLocalVote = () => {
        setShowConfirm(true);
    };
    const confirmClearVote = () => {
        clearVote();
        setSelectedOption(null);
        setShowConfirm(false);
    };
    const cancelClearVote = () => {
        setShowConfirm(false);
    };

    const handleSelectOption = (optionId) => {
        if (!hasVoted && votingEnabled && !isFinished) {
            setSelectedOption(optionId);
            setShowModal(true);
        }
    };
    const handleSubmitVote = () => {
        if (selectedOption) {
            castVote(selectedOption);
            setSelectedOption(null);
            setShowModal(false);
        }
    };
    const handleCancelVote = () => {
        setSelectedOption(null);
        setShowModal(false);
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
        <div className="max-w-4xl mx-auto space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700 font-sans pb-24">


            {/* Header Section */}
            <div className="text-center space-y-6">
                <h1 className="text-4xl md:text-6xl font-black flex justify-center py-8">
                    <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-emerald-400 bg-clip-text text-transparent inline-block py-12 px-6 -my-12 leading-[1.8]">
                        {votingTitle}
                    </span>
                </h1>

                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className={`inline-flex items-center gap-2 px-5 py-2 rounded-full border text-[10px] font-black uppercase tracking-[0.2em] ${isFinished
                        ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
                        : hasVoted
                            ? 'bg-blue-500/10 border-blue-500/20 text-blue-400'
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
            </div>

            {/* Voting Options List */}
            <div className="space-y-4 max-w-3xl mx-auto">
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

                        // Card classes for glassmorphism and expansion
                        const cardClasses = `
                            w-full text-left bg-slate-900/40 backdrop-blur-3xl border rounded-3xl p-6 flex items-center gap-6 transition-all relative overflow-hidden group
                            ${hasVoted && !isUserChoice ? 'opacity-40 grayscale-[0.3]' : ''}
                            ${isSelected ? 'ring-2 ring-blue-500/50 shadow-[0_0_30px_rgba(59,130,246,0.2)]' : 'border-white/5'}
                            ${!isDisabled ? 'hover:border-blue-500/30 hover:bg-slate-900/60 active:scale-[0.99] cursor-pointer' : 'cursor-default'}
                            ${isUserChoice ? 'border-blue-500/40 bg-blue-500/5 shadow-[0_0_30px_rgba(59,130,246,0.1)]' : ''}
                            ${isWinner ? 'border-emerald-500/40 bg-emerald-500/10' : ''}
                        `;

                        // Avatar/image support
                        const avatarUrl = option.avatar || option.image || null;

                        return (
                            <motion.div
                                key={voteId}
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: index * 0.1 }}
                            >
                                <button
                                    onClick={() => handleSelectOption(voteId)}
                                    disabled={isDisabled}
                                    className={cardClasses}
                                >
                                    {/* Avatar/Icon */}
                                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 border transition-all ${isWinner ? 'bg-emerald-500 border-emerald-400 text-slate-950' : isUserChoice ? 'bg-blue-600 border-blue-400 text-white' : 'bg-slate-950/50 border-white/10 text-white group-hover:border-blue-500/30'}`}>
                                        {avatarUrl ? (
                                            <img src={avatarUrl} alt={option.label} className="w-full h-full object-cover rounded-2xl" />
                                        ) : isWinner ? (
                                            <Trophy className="w-7 h-7" />
                                        ) : isUserChoice ? (
                                            <ThumbsUp className="w-7 h-7" />
                                        ) : (
                                            <div className="w-3 h-3 rounded-[4px] bg-current opacity-20" />
                                        )}
                                    </div>

                                    {/* Main content */}
                                    <div className="flex-1 space-y-3">
                                        <div className="flex items-center gap-3">
                                            <h3 className={`text-xl sm:text-2xl font-black leading-relaxed transition-colors break-words ${isWinner ? 'text-emerald-400' : isUserChoice ? 'text-blue-400' : 'text-white'}`}>
                                                {option.label || `Option ${index + 1}`}
                                            </h3>
                                            {isUserChoice && (
                                                <span className="text-[9px] font-bold bg-blue-400/10 px-2.5 py-1 rounded-full tracking-[0.15em] text-blue-400">
                                                    YOUR VOTE
                                                </span>
                                            )}
                                        </div>

                                        {/* Progress Bar */}
                                        <div className="relative h-2 w-full bg-slate-950 rounded-full overflow-hidden border border-white/5">
                                            <motion.div
                                                initial={{ width: 0 }}
                                                animate={{ width: `${percentage}%` }}
                                                transition={{ duration: 1.5, ease: "easeOut" }}
                                                className={`absolute inset-y-0 left-0 ${isUserChoice ? 'bg-blue-400' : optionColor} ${isWinner ? 'bg-emerald-400' : ''}`}
                                            />
                                        </div>
                                    </div>

                                    {/* Stats */}
                                    <div className="text-right min-w-[80px] shrink-0">
                                        <div className={`text-3xl sm:text-4xl font-black leading-none tracking-tighter ${isWinner ? 'text-emerald-400' : isUserChoice ? 'text-blue-400' : 'text-white'}`}>
                                            {Math.round(percentage)}%
                                        </div>
                                        <div className="text-[9px] font-bold text-slate-500 uppercase tracking-widest mt-1.5">
                                            {voteCount.toLocaleString()} Votes
                                        </div>
                                    </div>
                                </button>

                                {/* Confirmation Overlay inside card list */}
                                <AnimatePresence>
                                    {isSelected && !hasVoted && !isFinished && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: 'auto', opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            className="overflow-hidden"
                                        >
                                            <div className="mt-4 bg-blue-500/10 border border-blue-500/20 rounded-2xl p-4 flex items-center justify-between gap-4">
                                                <div className="text-sm font-bold text-blue-400 px-2">Ready to submit?</div>
                                                <div className="flex gap-2">
                                                    <button
                                                        onClick={handleSubmitVote}
                                                        className="px-6 py-2 rounded-xl bg-blue-500 text-white font-black text-[10px] uppercase tracking-widest hover:bg-blue-400 transition"
                                                    >Confirm</button>
                                                    <button
                                                        onClick={handleCancelVote}
                                                        className="px-6 py-2 rounded-xl bg-slate-800 text-slate-400 font-black text-[10px] uppercase tracking-widest hover:bg-slate-700 transition"
                                                    >Cancel</button>
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



            {/* Confirm dialog for changing vote */}
            <AnimatePresence>
                {showConfirm && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 flex items-center justify-center z-50 bg-slate-950/80 backdrop-blur-md p-6"
                    >
                        <motion.div
                            initial={{ scale: 0.9, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.9, y: 20 }}
                            className="bg-slate-900 border border-white/10 rounded-[40px] p-10 shadow-2xl max-w-md w-full text-center"
                        >
                            <div className="w-20 h-20 bg-blue-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
                                <RefreshCw className="w-10 h-10 text-blue-400" />
                            </div>
                            <h2 className="text-2xl font-black text-white uppercase tracking-tight mb-4">Change Your Vote?</h2>
                            <p className="text-slate-400 mb-8 leading-relaxed">This will remove your current selection and allow you to pick another candidate. Are you sure?</p>
                            <div className="flex gap-4">
                                <button
                                    onClick={confirmClearVote}
                                    className="flex-1 py-4 rounded-2xl bg-blue-500 hover:bg-blue-400 text-white font-black uppercase tracking-widest transition-all"
                                >Yes, Reset</button>
                                <button
                                    onClick={cancelClearVote}
                                    className="flex-1 py-4 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-400 font-black uppercase tracking-widest transition-all border border-white/5"
                                >Cancel</button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Admin Access Footer */}
            {onAdminAccess && (
                <div className="pt-24 pb-8 text-center">
                    <button
                        onClick={onAdminAccess}
                        className="text-[10px] font-black text-slate-600 uppercase tracking-[0.4em] hover:text-slate-300 transition-all duration-500 py-3 px-8 rounded-full hover:bg-white/5 border border-transparent hover:border-white/5"
                    >
                        Admin Portal Access
                    </button>
                </div>
            )}
        </div>
    );
};

export default VotingView;