/**
 * api.js — Centralized API client for the Laravel backend.
 *
 * All HTTP requests to the PESTOUR API go through this module.
 * Handles token management, base URL config, and error normalization.
 */

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api/v1';

/**
 * Get the stored auth token
 */
const getToken = () => localStorage.getItem('pestour_token');

/**
 * Store auth token
 */
const setToken = (token) => localStorage.setItem('pestour_token', token);

/**
 * Remove auth token
 */
const clearToken = () => localStorage.removeItem('pestour_token');

/**
 * Build headers with optional auth
 */
const buildHeaders = (includeAuth = true) => {
    const headers = {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    };

    if (includeAuth) {
        const token = getToken();
        if (token) {
            headers['Authorization'] = `Bearer ${token}`;
        }
    }

    return headers;
};

/**
 * Generic fetch wrapper with error handling
 */
const apiFetch = async (endpoint, options = {}) => {
    const { includeAuth = true, ...fetchOptions } = options;

    const url = `${API_BASE_URL}${endpoint}`;

    const response = await fetch(url, {
        ...fetchOptions,
        headers: {
            ...buildHeaders(includeAuth),
            ...fetchOptions.headers,
        },
    });

    // Handle 401 — token expired or invalid
    if (response.status === 401) {
        clearToken();
        // Don't throw for auth check endpoints
        if (!endpoint.includes('/me')) {
            window.dispatchEvent(new CustomEvent('auth:unauthorized'));
        }
    }

    // Parse response
    const data = await response.json().catch(() => null);

    if (!response.ok) {
        const error = new Error(data?.message || `API Error: ${response.status}`);
        error.status = response.status;
        error.data = data;
        throw error;
    }

    return data;
};

/* ═══════════════════════════════════════════════════════
 * AUTH ENDPOINTS
 * ═══════════════════════════════════════════════════════ */

export const authApi = {
    login: async (email, password) => {
        const data = await apiFetch('/login', {
            method: 'POST',
            body: JSON.stringify({ email, password }),
            includeAuth: false,
        });
        setToken(data.token);
        return data;
    },

    logout: async () => {
        try {
            await apiFetch('/logout', { method: 'POST' });
        } finally {
            clearToken();
        }
    },

    me: async () => {
        return apiFetch('/me');
    },

    isAuthenticated: () => !!getToken(),
};

/* ═══════════════════════════════════════════════════════
 * TOURNAMENT ENDPOINTS
 * ═══════════════════════════════════════════════════════ */

export const tournamentApi = {
    // Public
    list: (status) => {
        const params = status ? `?status=${status}` : '';
        return apiFetch(`/tournaments${params}`, { includeAuth: false });
    },

    get: (id) => apiFetch(`/tournaments/${id}`, { includeAuth: false }),

    // Admin
    create: (data) => apiFetch('/admin/tournaments', {
        method: 'POST',
        body: JSON.stringify(data),
    }),

    update: (id, data) => apiFetch(`/admin/tournaments/${id}`, {
        method: 'PUT',
        body: JSON.stringify(data),
    }),

    delete: (id) => apiFetch(`/admin/tournaments/${id}`, {
        method: 'DELETE',
    }),
};

/* ═══════════════════════════════════════════════════════
 * PLAYER ENDPOINTS
 * ═══════════════════════════════════════════════════════ */

export const playerApi = {
    // Public
    list: (activeOnly) => {
        const params = activeOnly !== undefined ? `?active=${activeOnly}` : '';
        return apiFetch(`/players${params}`, { includeAuth: false });
    },

    get: (id) => apiFetch(`/players/${id}`, { includeAuth: false }),

    // Admin
    create: (data) => apiFetch('/admin/players', {
        method: 'POST',
        body: JSON.stringify(data),
    }),

    update: (id, data) => apiFetch(`/admin/players/${id}`, {
        method: 'PUT',
        body: JSON.stringify(data),
    }),

    delete: (id) => apiFetch(`/admin/players/${id}`, {
        method: 'DELETE',
    }),
};

/* ═══════════════════════════════════════════════════════
 * MATCH ENDPOINTS
 * ═══════════════════════════════════════════════════════ */

export const matchApi = {
    // Public
    list: (filters = {}) => {
        const params = new URLSearchParams();
        if (filters.tournament_id) params.set('tournament_id', filters.tournament_id);
        if (filters.status) params.set('status', filters.status);
        const query = params.toString();
        return apiFetch(`/matches${query ? `?${query}` : ''}`, { includeAuth: false });
    },

    get: (id) => apiFetch(`/matches/${id}`, { includeAuth: false }),

    // Admin
    create: (data) => apiFetch('/admin/matches', {
        method: 'POST',
        body: JSON.stringify(data),
    }),

    update: (id, data) => apiFetch(`/admin/matches/${id}`, {
        method: 'PUT',
        body: JSON.stringify(data),
    }),

    updateScore: (id, homeScore, awayScore) => apiFetch(`/admin/matches/${id}/score`, {
        method: 'PUT',
        body: JSON.stringify({ home_score: homeScore, away_score: awayScore }),
    }),

    delete: (id) => apiFetch(`/admin/matches/${id}`, {
        method: 'DELETE',
    }),
};

/* ═══════════════════════════════════════════════════════
 * STANDINGS ENDPOINTS
 * ═══════════════════════════════════════════════════════ */

export const standingsApi = {
    // Public
    get: (tournamentId) => apiFetch(`/standings?tournament_id=${tournamentId}`, { includeAuth: false }),

    live: (tournamentId) => apiFetch(`/standings/live/${tournamentId}`, { includeAuth: false }),

    // Admin
    initialize: (tournamentId, playerIds) => apiFetch('/admin/standings/initialize', {
        method: 'POST',
        body: JSON.stringify({ tournament_id: tournamentId, player_ids: playerIds }),
    }),
};

export default {
    auth: authApi,
    tournaments: tournamentApi,
    players: playerApi,
    matches: matchApi,
    standings: standingsApi,
};
