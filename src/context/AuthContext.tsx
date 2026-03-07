/**
 * Authentication context and provider.
 *
 * Single source of truth for auth state. Exposes signIn, signUp,
 * signOut, verifyEmail, and checkAuth. On mount, attempts a token
 * refresh then falls back to /auth/me to rehydrate the session.
 */

import {
	createContext,
	useCallback,
	useContext,
	useEffect,
	useMemo,
	useState,
	type ReactNode,
} from 'react';
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
	message: string;
	user: User | null;
};

// /auth/me may return the user directly OR wrapped in { user }
type MeResponse = User | AuthResponse;

type AuthContextType = {
	user: User | null;
	loading: boolean;
	error: string | null;
	isAuthenticated: boolean;
	signIn: (email: string, password: string) => Promise<AuthResponse>;
	signUp: (email: string, password: string, fullName: string) => Promise<AuthResponse>;
	signOut: () => Promise<void>;
	verifyEmail: (token: string) => Promise<AuthResponse>;
	checkAuth: () => Promise<void>;
};

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

/** Normalize /auth/me response — backend may return User directly or { user } */
const extractUser = (data: MeResponse): User | null => {
	if (!data) return null;
	// If response has an `email` field at top level → it's a User object directly
	if ('email' in data && 'id' in data) return data as User;
	// Otherwise it's wrapped: { message, user }
	return (data as AuthResponse).user ?? null;
};

// ---------------------------------------------------------------------------
// Context
// ---------------------------------------------------------------------------

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// ---------------------------------------------------------------------------
// Provider
// ---------------------------------------------------------------------------

export const AuthProvider = ({ children }: { children: ReactNode }) => {
	const [user, setUser] = useState<User | null>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	// -----------------------------------------------------------------------
	// checkAuth — runs on mount to rehydrate session
	//
	// Strategy:
	//   1. POST /auth/refresh  → updates the access token cookie
	//   2. GET  /auth/me       → returns the current user
	//
	// /auth/refresh never returns a user body (see backend), so we always
	// follow up with /auth/me. If either call fails the user is logged out.
	// -----------------------------------------------------------------------
	const checkAuth = useCallback(async () => {
		setLoading(true);
		try {
			await api.post('/auth/refresh');
			const { data } = await api.get<MeResponse>('/auth/me');
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
	// -----------------------------------------------------------------------

	const signIn = useCallback(async (email: string, password: string): Promise<AuthResponse> => {
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

	// FIX: argument order was (email, password, fullName) in context type
	// but Register.tsx called signUp(email.trim(), password, fullName.trim())
	// — now signatures are consistent everywhere.
	const signUp = useCallback(
		async (email: string, password: string, fullName: string): Promise<AuthResponse> => {
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
		},
		[],
	);

	const verifyEmail = useCallback(
		async (token: string): Promise<AuthResponse> => {
			setError(null);
			try {
				const { data } = await api.get<AuthResponse>('/auth/verify', { params: { token } });
				// After verification the backend sets a fresh session cookie.
				// Re-run checkAuth so the user state is populated via /auth/me.
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

	const signOut = useCallback(async (): Promise<void> => {
		try {
			await api.post('/auth/logout');
		} finally {
			// Clear local state regardless of server response
			setUser(null);
		}
	}, []);

	// -----------------------------------------------------------------------
	// Context value
	// -----------------------------------------------------------------------

	const value = useMemo<AuthContextType>(
		() => ({
			user,
			loading,
			error,
			isAuthenticated: !!user,
			signIn,
			signUp,
			signOut,
			verifyEmail,
			checkAuth,
		}),
		[user, loading, error, signIn, signUp, signOut, verifyEmail, checkAuth],
	);

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// ---------------------------------------------------------------------------
// Hook
// ---------------------------------------------------------------------------

export const useAuth = (): AuthContextType => {
	const context = useContext(AuthContext);
	if (!context) {
		throw new Error('useAuth must be used within an <AuthProvider>');
	}
	return context;
};
