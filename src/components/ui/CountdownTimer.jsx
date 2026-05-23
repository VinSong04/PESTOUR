import { useState, useEffect } from 'react';
import { Clock } from 'lucide-react';

export default function CountdownTimer({ deadline, title = "Registration Ends In" }) {
    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

    function calculateTimeLeft() {
        const difference = +new Date(deadline) - +new Date();
        let timeLeft = {};

        if (difference > 0) {
            timeLeft = {
                days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                minutes: Math.floor((difference / 1000 / 60) % 60),
                seconds: Math.floor((difference / 1000) % 60),
            };
        }

        return timeLeft;
    }

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);

        return () => clearInterval(timer);
    }, [deadline]);

    const timerComponents = [];

    Object.keys(timeLeft).forEach((interval) => {
        timerComponents.push(
            <div key={interval} className="flex flex-col items-center">
                <div className="glass-card-hover rounded-xl w-14 h-14 sm:w-16 sm:h-16 flex items-center justify-center mb-2 border-white/[0.05] group">
                    <span className="text-xl sm:text-2xl font-outfit font-black text-white group-hover:text-[#f5c518] transition-colors">
                        {timeLeft[interval].toString().padStart(2, '0')}
                    </span>
                </div>
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{interval}</span>
            </div>
        );
    });

    if (timerComponents.length === 0) {
        return null;
    }

    return (
        <div className="flex flex-col items-center gap-4">
            {title && (
                <div className="flex items-center gap-2 mb-2">
                    <Clock className="w-4 h-4 text-[#f5c518]/60" />
                    <span className="text-[11px] font-bold text-slate-500 uppercase tracking-[0.2em]">{title}</span>
                </div>
            )}
            <div className="flex gap-3 sm:gap-4">
                {timerComponents[0]}
                <div className="pt-5 text-slate-700 font-bold">:</div>
                {timerComponents[1]}
                <div className="pt-5 text-slate-700 font-bold">:</div>
                {timerComponents[2]}
                <div className="pt-5 text-slate-700 font-bold">:</div>
                {timerComponents[3]}
            </div>
        </div>
    );
}
