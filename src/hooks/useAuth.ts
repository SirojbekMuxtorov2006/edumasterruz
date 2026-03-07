import { useState, useEffect, useCallback } from 'react';
import axios, { AxiosError } from 'axios';

// Backend manzili (.env faylidan olish tavsiya etiladi)
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api/auth';

// Axios obyektini cookie-lar bilan ishlash uchun sozlaymiz
const api = axios.create({
	baseURL: API_URL,
	withCredentials: true, // Cookie-larni (JWT) yuborish va qabul qilish uchun
});

export interface User {
	id: number;
	email: string;
	is_verified: boolean;
	created_at: string;
}

export const useAuth = () => {
	const [user, setUser] = useState<User | null>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	/**
	 * 1. LOGIN (Kirish)
	 */
	const signIn = async (email: string, password: string) => {
		setError(null);
		try {
			const response = await api.post('/login', { email, password });
			// Bekendingiz login paytida AuthResponse(user=UserResponse) qaytaradi
			if (response.data.user) {
				setUser(response.data.user);
			}
			return response.data;
		} catch (err) {
			const msg = err.response?.data?.detail || 'Login amalga oshmadi';
			setError(msg);
			throw new Error(msg);
		}
	};

	/**
	 * 2. REGISTER (Ro'yxatdan o'tish)
	 */
	const signUp = async (email: string, password: string, fullName: string) => {
		setError(null);
		try {
			// Bekendingiz RegisterRequest modeliga moslab 'full_name' yuboramiz
			const response = await api.post('/register', {
				email,
				password,
				full_name: fullName, // Backend-dagi modelga mos kelishi shart
			});

			return response.data;
		} catch (err) {
			// Axios xatoligidan xabarni sug'urib olish
			const msg = err.response?.data?.detail || "Ro'yxatdan o'tishda xatolik yuz berdi";
			setError(msg);
			throw new Error(msg);
		}
	};

	/**
	 * 3. VERIFY (Emailni tasdiqlash)
	 * Bu Verify.tsx sahifasida ishlatiladi
	 */
	const verifyEmail = async (token: string) => {
		try {
			const response = await api.get('/verify', { params: { token } });
			// Tasdiqlangandan so'ng user ma'lumotlarini yangilaymiz
			await checkAuth();
			return response.data;
		} catch (err) {
			const msg = err.response?.data?.detail || 'Tasdiqlashda xatolik yuz berdi';
			throw new Error(msg);
		}
	};

	/**
	 * 4. LOGOUT (Chiqish)
	 */
	const signOut = async () => {
		try {
			await api.post('/logout');
		} catch (err) {
			console.error('Logout error:', err);
		} finally {
			setUser(null); // Cookie o'chirilmasa ham state tozalanishi kerak
		}
	};

	/**
	 * 5. CHECK AUTH (Token yangilash va Userni yuklash)
	 * Sahifa yangilanganda yoki ilova yuklanganda avtomatik ishlaydi
	 */
	const checkAuth = useCallback(async () => {
		setLoading(true);
		try {
			// Bekendingizdagi /refresh endpointi cookiedagi refresh_tokenni tekshiradi
			const response = await api.post('/refresh');

			// Agar bekendingiz refreshda user qaytarsa:
			if (response.data.user) {
				setUser(response.data.user);
			} else {
				// Agar qaytarmasa, login orqali user ma'lumotini olish kerak bo'ladi
				setUser(null);
			}
		} catch (err) {
			setUser(null);
		} finally {
			setLoading(false);
		}
	}, []);

	// Ilova yuklanganda bir marta tekshirish
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
