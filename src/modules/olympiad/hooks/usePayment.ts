// src/modules/olympiad/hooks/usePayment.ts
// Backend tayyor bo'lgach VITE_API_URL qo'shilsa real API ga o'tadi
import { useState, useCallback, useRef } from 'react';

export type PaymentProvider = 'payme' | 'click' | 'uzum';
export type PaymentStatus = 'idle' | 'pending' | 'paid' | 'failed';

interface PaymentState {
	status: PaymentStatus;
	ticketCode: string | null;
	error: string | null;
}

// Unikal chipta kodi generatsiya
const genTicket = (olympiadId: string) => {
	const rand = Math.random().toString(36).slice(2, 8).toUpperCase();
	return `TRN-${olympiadId.slice(0, 4).toUpperCase()}-${rand}`;
};

export const usePayment = () => {
	const [state, setState] = useState<PaymentState>({
		status: 'idle',
		ticketCode: null,
		error: null,
	});
	const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

	const pay = useCallback((olympiadId: string, _provider: PaymentProvider) => {
		setState({ status: 'pending', ticketCode: null, error: null });

		// Backend tayyor bo'lgach shu yerga fetch() qo'shiladi:
		// const res = await fetch(`${import.meta.env.VITE_API_URL}/api/v1/payment/init`, {...})

		// Hozircha 3 soniya simulation
		timerRef.current = setTimeout(() => {
			const ticket = genTicket(olympiadId);
			localStorage.setItem(`ticket_${olympiadId}`, ticket);
			setState({ status: 'paid', ticketCode: ticket, error: null });
		}, 3000);
	}, []);

	const reset = useCallback(() => {
		if (timerRef.current) clearTimeout(timerRef.current);
		setState({ status: 'idle', ticketCode: null, error: null });
	}, []);

	return { ...state, pay, reset };
};
