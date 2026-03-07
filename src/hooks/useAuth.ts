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

const getErrorMessage = (err: unknown, fallback: string): string => {
	if (axios.isAxiosError(err)) {
		const detail = err.response?.data?.detail;
		if (typeof detail === 'string') return detail;
	}
	if (err instanceof Error) return err.message;
	return fallback;
};

/**
 * Normalize /auth/me response — backend may return a User directly or { user }.
 * FIX: Ported from AuthContext.tsx to handle both shapes correctly.
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
	// checkAuth — declared first so verifyEmail can reference it safely.
	//
	// FIX: checkAuth was declared *after* verifyEmail in the original file.
	// Because const is not hoisted, verifyEmail's useCallback captured an
	// undefined reference to checkAuth (temporal dead zone bug).
	// -----------------------------------------------------------------------
	const checkAuth = useCallback(async () => {
		setLoading(true);
		try {
			await api.post('/auth/refresh');
			const { data } = await api.get<MeResponse>('/auth/me');
			// FIX: use extractUser to handle both { user } and bare User shapes.
			setUser(extractUser(data));
		} catch {
			setUser(null);
		} finally {
			setLoading(false);
		}
	}, []);

	useEffect(() => {
		checkAuth();
	}, [checkAuth]);

	// -----------------------------------------------------------------------
	// Auth actions
	// FIX: all four were plain async functions — recreated on every render.
	// Wrapped in useCallback for referential stability.
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

	// FIX: checkAuth is now declared above, so this reference is safe.
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
		try {
			await api.post('/auth/logout');
		} catch (err) {
			console.error('Logout error:', err);
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
