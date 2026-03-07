import { useState, useEffect, useCallback } from 'react';
import { OlympiadLevel } from '../data/olympiadData';

// ─── Types ────────────────────────────────────────────────────────────────────
export interface UserStats {
	subject: string;
	percentage: number;
	color: string;
}

export interface HistoryItem {
	id: string;
	title: string;
	date: string;
	score: string;
	hasCertificate: boolean;
}

export interface User {
	id: string;
	name: string;
	email: string;
	phone?: string;
	level: OlympiadLevel;
	coins: number;
	stats?: UserStats[];
	history?: HistoryItem[];
}

interface AuthState {
	user: User | null;
	loading: boolean;
}

const STORAGE_KEY = 'turon_user';

// ─── Hook ─────────────────────────────────────────────────────────────────────
export const useAuth = () => {
	const [state, setState] = useState<AuthState>({ user: null, loading: true });

	// Load user from localStorage on mount
	useEffect(() => {
		try {
			const raw = localStorage.getItem(STORAGE_KEY);
			if (raw) {
				setState({ user: JSON.parse(raw), loading: false });
			} else {
				setState({ user: null, loading: false });
			}
		} catch {
			setState({ user: null, loading: false });
		}
	}, []);

	// ── signUp ──
	const signUp = useCallback(async (email: string, password: string, fullName: string) => {
		if (!email || !password || !fullName) {
			throw new Error("Barcha maydonlarni to'ldiring");
		}
		if (password.length < 8) {
			throw new Error("Parol kamida 8 ta belgidan iborat bo'lsin");
		}

		// Level auto-detect (simple rule — can be expanded)
		const level: OlympiadLevel = 'A';

		const newUser: User = {
			id: `u_${Date.now()}`,
			name: fullName,
			email,
			level,
			coins: 100,
			stats: [
				{ subject: 'Matematika', percentage: 0, color: 'bg-blue-500' },
				{ subject: 'Ingliz tili', percentage: 0, color: 'bg-orange-500' },
			],
			history: [],
		};

		localStorage.setItem(STORAGE_KEY, JSON.stringify(newUser));
		setState({ user: newUser, loading: false });
	}, []);

	// ── signIn ──
	const signIn = useCallback(async (email: string, password: string) => {
		if (!email || !password) {
			throw new Error('Email va parolni kiriting');
		}

		const raw = localStorage.getItem(STORAGE_KEY);
		if (!raw) {
			throw new Error("Foydalanuvchi topilmadi. Avval ro'yxatdan o'ting.");
		}

		const saved: User = JSON.parse(raw);

		// Simple check: email must match
		if (saved.email !== email) {
			throw new Error("Email yoki parol noto'g'ri");
		}

		setState({ user: saved, loading: false });
	}, []);

	// ── register (legacy — Registration component uchun) ──
	const register = useCallback(
		({ name, phone, level }: { name: string; phone: string; level: OlympiadLevel }) => {
			const newUser: User = {
				id: `u_${Date.now()}`,
				name,
				email: `${phone}@turon.uz`,
				phone,
				level,
				coins: 100,
				stats: [
					{ subject: 'Matematika', percentage: 0, color: 'bg-blue-500' },
					{ subject: 'Ingliz tili', percentage: 0, color: 'bg-orange-500' },
				],
				history: [],
			};
			localStorage.setItem(STORAGE_KEY, JSON.stringify(newUser));
			setState({ user: newUser, loading: false });
		},
		[],
	);

	// ── logout ──
	const logout = useCallback(() => {
		localStorage.removeItem(STORAGE_KEY);
		setState({ user: null, loading: false });
	}, []);

	// ── verifyEmail (stub) ──
	const verifyEmail = useCallback(async (_token: string) => {
		// In real app: call backend API to verify token
		// Here: just resolve
		await new Promise(r => setTimeout(r, 800));
	}, []);

	// ── updateUserHistory ──
	const updateUserHistory = useCallback((item: HistoryItem, mathPct?: number, engPct?: number) => {
		setState(prev => {
			if (!prev.user) return prev;
			const updated: User = {
				...prev.user,
				history: [item, ...(prev.user.history || [])],
				stats: prev.user.stats?.map(s => {
					if (s.subject === 'Matematika' && mathPct !== undefined) {
						return { ...s, percentage: Math.max(s.percentage, mathPct) };
					}
					if (s.subject === 'Ingliz tili' && engPct !== undefined) {
						return { ...s, percentage: Math.max(s.percentage, engPct) };
					}
					return s;
				}),
			};
			localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
			return { user: updated, loading: false };
		});
	}, []);

	return {
		user: state.user,
		loading: state.loading,
		isAuthenticated: !!state.user,
		signUp,
		signIn,
		register,
		logout,
		verifyEmail,
		updateUserHistory,
	};
};
