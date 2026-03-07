import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import api from '@/lib/api';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface User {
	id: number;
	email: string;
	is_verified: boolean;
	created_at: string;
	full_name?: string;
}

type AuthResponse = {
	user?: User;
	message?: string;
};

// /auth/me may return the user directly OR wrapped in { user }
type MeResponse = User | AuthResponse;

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/**
 * Extract a human-readable error message from any thrown value.
 *
 * FIX: FastAPI validation errors return `detail` as an array of objects
 * e.g. [{ loc, msg, type }]. The original code only handled string detail,
 * so validation errors silently fell through to the generic fallback.
 */
const getErrorMessage = (err: unknown, fallback: string): string => {
	if (axios.isAxiosError(err)) {
		const detail = err.response?.data?.detail;
		if (typeof detail === 'string') return detail;
		// FastAPI 422 validation errors: detail is an array of { loc, msg, type }
		if (Array.isArray(detail) && detail.length > 0) {
			return detail.map((d: { msg?: string }) => d.msg ?? fallback).join(', ');
		}
	}
	if (err instanceof Error) return err.message;
	return fallback;
};

/**
 * Normalize /auth/me response — backend may return a User directly or { user }.
 */
const extractUser = (data: MeResponse): User | null => {
	if (!data) return null;
	if ('email' in data && 'id' in data) return data as User;
	return (data as AuthResponse).user ?? null;
};

// ---------------------------------------------------------------------------
// Hook
// ---------------------------------------------------------------------------

export const useAuth = () => {
	const [user, setUser] = useState<User | null>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	// -----------------------------------------------------------------------
	// checkAuth — runs on mount to rehydrate the session.
	//
	// Strategy:
	//   1. POST /auth/refresh  → rotates the access token cookie
	//   2. GET  /auth/me       → returns the current user
	//
	// Only 401 is expected when no session exists. Any other error is logged
	// so it doesn't disappear silently during debugging.
	// -----------------------------------------------------------------------
	const checkAuth = useCallback(async () => {
		setLoading(true);
		// FIX: reset error state so stale errors don't persist across re-checks
		setError(null);
		try {
			await api.post('/auth/refresh');
			const { data } = await api.get<MeResponse>('/auth/me');
			setUser(extractUser(data));
		} catch (err) {
			// FIX: only log unexpected errors — a 401 on refresh is normal
			// when the user isn't logged in yet and shouldn't pollute the console.
			if (axios.isAxiosError(err) && err.response?.status === 401) {
				// Expected: no active session
			} else {
				console.error('checkAuth: unexpected error', err);
			}
			setUser(null);
		} finally {
			setLoading(false);
		}
	}, []);

	useEffect(() => {
		checkAuth();
	}, [checkAuth]);

	// -----------------------------------------------------------------------
	// Auth actions — all wrapped in useCallback for referential stability.
	// -----------------------------------------------------------------------

	const signIn = useCallback(async (email: string, password: string) => {
		setError(null);
		try {
			const { data } = await api.post<AuthResponse>('/auth/login', { email, password });
			if (data.user) setUser(data.user);
			return data;
		} catch (err) {
			const msg = getErrorMessage(err, 'Login amalga oshmadi');
			setError(msg);
			throw new Error(msg);
		}
	}, []);

	const signUp = useCallback(async (email: string, password: string, fullName: string) => {
		setError(null);
		try {
			const { data } = await api.post<AuthResponse>('/auth/register', {
				email,
				password,
				full_name: fullName,
			});
			return data;
		} catch (err) {
			const msg = getErrorMessage(err, "Ro'yxatdan o'tishda xatolik yuz berdi");
			setError(msg);
			throw new Error(msg);
		}
	}, []);

	const verifyEmail = useCallback(
		async (token: string) => {
			setError(null);
			try {
				const { data } = await api.get<AuthResponse>('/auth/verify', { params: { token } });
				// Re-run checkAuth so user state is populated via /auth/me.
				await checkAuth();
				return data;
			} catch (err) {
				const msg = getErrorMessage(err, 'Tasdiqlashda xatolik yuz berdi');
				setError(msg);
				throw new Error(msg);
			}
		},
		[checkAuth],
	);

	const signOut = useCallback(async () => {
		// FIX: clear error state on sign-out so stale errors don't bleed
		// into the next login attempt's UI.
		setError(null);
		try {
			await api.post('/auth/logout');
		} catch (err) {
			// Log but don't surface — the user is signing out regardless.
			console.error('signOut: server error (ignored)', err);
		} finally {
			// Clear local state regardless of server response.
			setUser(null);
		}
	}, []);

	return {
		user,
		loading,
		error,
		isAuthenticated: !!user,
		signIn,
		signUp,
		signOut,
		verifyEmail,
		checkAuth,
	};
};
