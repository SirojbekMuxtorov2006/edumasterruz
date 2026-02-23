import { z } from 'zod';

export const phoneSchema = z
	.string()
	.min(9, 'Telefon noto‘g‘ri')
	.transform(v => v.trim())
	.transform(v => v.replace(/[^\d+]/g, ''))
	.transform(v => {
		// +998 90 123 45 67 -> +998901234567
		if (v.startsWith('998')) return '+' + v;
		if (v.startsWith('9') && v.length === 9) return '+998' + v;
		return v.startsWith('+') ? v : '+' + v;
	})
	.refine(v => /^\+998\d{9}$/.test(v), 'Telefon formati: +998901234567');

export const registerSchema = z
	.object({
		firstName: z.string().min(2, 'Ism kamida 2 ta harf').max(50),
		lastName: z.string().min(2, 'Familiya kamida 2 ta harf').max(50),
		phone: phoneSchema,
		password: z.string().min(6, 'Parol kamida 6 ta belgidan iborat bo‘lsin').max(100),
		confirmPassword: z.string().min(6),
	})
	.refine(d => d.password === d.confirmPassword, {
		message: 'Parollar mos emas',
		path: ['confirmPassword'],
	});

export const loginSchema = z.object({
	phone: phoneSchema,
	password: z.string().min(6, 'Parol kamida 6 ta'),
});

export const otpRequestSchema = z.object({
	phone: phoneSchema,
});

export const otpVerifySchema = z.object({
	phone: phoneSchema,
	otp: z.string().regex(/^\d{4,6}$/, 'OTP 4-6 xonali bo‘lsin'),
});

export const resetPasswordSchema = z
	.object({
		phone: phoneSchema,
		otp: z.string().regex(/^\d{4,6}$/, 'OTP 4-6 xonali bo‘lsin'),
		newPassword: z.string().min(6, 'Yangi parol kamida 6 ta'),
		confirmNewPassword: z.string().min(6),
	})
	.refine(d => d.newPassword === d.confirmNewPassword, {
		message: 'Parollar mos emas',
		path: ['confirmNewPassword'],
	});

export type RegisterInput = z.infer<typeof registerSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
export type OtpRequestInput = z.infer<typeof otpRequestSchema>;
export type OtpVerifyInput = z.infer<typeof otpVerifySchema>;
export type ResetPasswordInput = z.infer<typeof resetPasswordSchema>;
