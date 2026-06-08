/**
 * Centralized navigation configuration.
 * Single source of truth for all route definitions used by Navbar and App.
 */
import { Home, BarChart3, Gamepad2, BookOpen, UserPlus, Trophy } from 'lucide-react';

/**
 * Build the list of visible nav items based on tournament state.
 * @param {{ tournamentStarted: boolean, isAdmin: boolean, votingEnabled: boolean }} opts
 * @returns {Array<{ id: string, icon: import('lucide-react').LucideIcon, label: string }>}
 */
export const getNavItems = ({ tournamentStarted, isAdmin, votingEnabled, registrationOpen }) => {
    const isVotingLocked = !isAdmin && votingEnabled;
    if (isVotingLocked) return [];

    const items = [
        { id: 'home', icon: Home, label: 'Home' },
    ];

    if (registrationOpen || isAdmin) {
        items.push({ id: 'register', icon: UserPlus, label: 'Register' });
    }

    if (tournamentStarted || isAdmin) {
        items.push({ id: 'standings', icon: BarChart3, label: 'Standings' });
        items.push({ id: 'matches', icon: Gamepad2, label: 'Schedule' });
        items.push({ id: 'knockout', icon: Trophy, label: 'Bracket' });
    }

    items.push({ id: 'rules', icon: BookOpen, label: 'Rules' });

    return items;
};
