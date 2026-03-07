import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import api from '@/lib/api';

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

const getErrorMessage = (err: unknown, fallback: string) => {
	if (axios.isAxiosError(err)) {
		return err.response?.data?.detail || fallback;
	}
	if (err instanceof Error) {
		return err.message;
	}
	return fallback;
};

export const useAuth = () => {
	const [user, setUser] = useState<User | null>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	const signIn = async (email: string, password: string) => {
		setError(null);

		try {
			const response = await api.post<AuthResponse>('/auth/login', {
				email,
				password,
			});

			if (response.data.user) {
				setUser(response.data.user);
			}

			return response.data;
		} catch (err: unknown) {
			const msg = getErrorMessage(err, 'Login amalga oshmadi');
			setError(msg);
			throw new Error(msg);
		}
	};

	const signUp = async (email: string, password: string, fullName: string) => {
		setError(null);

		try {
			const response = await api.post('/auth/register', {
				email,
				password,
				full_name: fullName,
			});

			return response.data;
		} catch (err: unknown) {
			const msg = getErrorMessage(err, "Ro'yxatdan o'tishda xatolik yuz berdi");
			setError(msg);
			throw new Error(msg);
		}
	};

	const verifyEmail = async (token: string) => {
		try {
			const response = await api.get('/auth/verify', {
				params: { token },
			});

			// Agar backend verify paytida user qaytarsa:
			if (response.data?.user) {
				setUser(response.data.user);
			} else {
				// aks holda authni qayta tekshirib ko'ramiz
				await checkAuth();
			}

			return response.data;
		} catch (err: unknown) {
			const msg = getErrorMessage(err, 'Tasdiqlashda xatolik yuz berdi');
			throw new Error(msg);
		}
	};

	const signOut = async () => {
		try {
			await api.post('/auth/logout');
		} catch (err) {
			console.error('Logout error:', err);
		} finally {
			setUser(null);
		}
	};

	const checkAuth = useCallback(async () => {
		setLoading(true);

		try {
			// Variant 1: refresh user qaytaradi
			const response = await api.post<AuthResponse>('/auth/refresh');

			if (response.data.user) {
				setUser(response.data.user);
			} else {
				// Agar refresh user qaytarmasa, /auth/me endpoint qilish kerak
				// Backendda /auth/me bo'lsa shuni ishlating:
				try {
					const me = await api.get<User>('/auth/me');
					setUser(me.data);
				} catch {
					setUser(null);
				}
			}
		} catch {
			setUser(null);
		} finally {
			setLoading(false);
		}
	}, []);

	useEffect(() => {
		checkAuth();
	}, [checkAuth]);

	return {
		user,
		loading,
		error,
		signIn,
		signUp,
		signOut,
		verifyEmail,
		checkAuth,
		isAuthenticated: !!user,
	};
};
