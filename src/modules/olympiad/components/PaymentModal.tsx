// src/modules/olympiad/components/PaymentModal.tsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
	X,
	CreditCard,
	CheckCircle2,
	AlertCircle,
	Ticket,
	ShieldCheck,
	ArrowRight,
	Loader2,
	BookOpen,
	Calculator,
	XCircle,
} from 'lucide-react';
import { Olympiad } from '../data/olympiadData';
import { usePayment, PaymentProvider } from '../hooks/usePayment';

// ─── Helpers ─────────────────────────────────────────────────────────────────
const fmt = (p: number) => (p === 0 ? 'Bepul' : p.toLocaleString('uz-UZ') + " so'm");

const fmtDate = (iso: string) =>
	new Date(iso).toLocaleDateString('uz-UZ', {
		day: 'numeric',
		month: 'long',
		year: 'numeric',
		hour: '2-digit',
		minute: '2-digit',
	});

// ─── Provayderlar ─────────────────────────────────────────────────────────────
const PROVIDERS: { id: PaymentProvider; label: string; bg: string; logo: string }[] = [
	{
		id: 'payme',
		label: 'Payme',
		bg: 'border-blue-300 bg-blue-50 text-blue-700 hover:bg-blue-100',
		logo: '💳',
	},
	{
		id: 'click',
		label: 'Click',
		bg: 'border-green-300 bg-green-50 text-green-700 hover:bg-green-100',
		logo: '🟢',
	},
	{
		id: 'uzum',
		label: 'Uzum',
		bg: 'border-purple-300 bg-purple-50 text-purple-700 hover:bg-purple-100',
		logo: '🟣',
	},
];

// ─── Props ────────────────────────────────────────────────────────────────────
interface Props {
	olympiad: Olympiad;
	onClose: () => void;
}

// ─────────────────────────────────────────────────────────────────────────────
const PaymentModal = ({ olympiad, onClose }: Props) => {
	const navigate = useNavigate();
	const { status, ticketCode, pay, reset } = usePayment();

	const [provider, setProvider] = useState<PaymentProvider | null>(null);
	const [agreed, setAgreed] = useState(false);

	const isMath = olympiad.subject === 'Math';
	const isFree = olympiad.price === 0;
	const isPending = status === 'pending';
	const isPaid = status === 'paid';
	const isFailed = status === 'failed';

	const handleClose = () => {
		reset();
		onClose();
	};

	const handlePay = () => {
		if (isFree) {
			navigate(`/quiz/${olympiad.id}`);
			return;
		}
		if (!provider) return;
		pay(olympiad.id, provider);
	};

	// ── Chipta ekrani ─────────────────────────────────────────────────────────
	if (isPaid && ticketCode) {
		return (
			<div className='fixed inset-0 z-50 flex items-center justify-center px-4'>
				<div className='absolute inset-0 bg-black/60 backdrop-blur-sm' onClick={handleClose} />
				<div className='relative bg-white rounded-2xl shadow-2xl w-full max-w-sm overflow-hidden'>
					<div className='h-2 bg-gradient-to-r from-green-400 to-emerald-500' />
					<div className='p-8 text-center'>
						{/* Icon */}
						<div className='w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4'>
							<CheckCircle2 className='w-8 h-8 text-green-600' />
						</div>
						<h2 className='text-xl font-bold text-gray-900 mb-1'>To'lov Muvaffaqiyatli!</h2>
						<p className='text-sm text-gray-500 mb-6'>{olympiad.title}</p>

						{/* Chipta */}
						<div className='bg-indigo-50 border-2 border-dashed border-indigo-300 rounded-xl p-5 mb-6'>
							<div className='flex items-center justify-center gap-2 mb-2'>
								<Ticket className='w-5 h-5 text-indigo-600' />
								<span className='text-sm font-bold text-indigo-800'>Sizning Chipta ID</span>
							</div>
							<div className='font-mono text-2xl font-extrabold text-indigo-700 tracking-widest'>
								{ticketCode}
							</div>
							<p className='text-xs text-indigo-400 mt-2'>
								Bu kodni saqlang — testga kirish uchun kerak
							</p>
						</div>

						<Button
							className='w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold'
							onClick={() => {
								handleClose();
								navigate(`/quiz/${olympiad.id}`);
							}}
						>
							Testni Boshlash <ArrowRight className='w-4 h-4 ml-2' />
						</Button>
						<button
							onClick={handleClose}
							className='mt-3 text-xs text-gray-400 hover:text-gray-600 underline'
						>
							Keyinroq boshlash
						</button>
					</div>
				</div>
			</div>
		);
	}

	// ── Asosiy modal ──────────────────────────────────────────────────────────
	return (
		<div className='fixed inset-0 z-50 flex items-center justify-center px-4'>
			<div
				className='absolute inset-0 bg-black/50 backdrop-blur-sm'
				onClick={!isPending ? handleClose : undefined}
			/>

			<div className='relative bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden'>
				{/* Rang chizig'i */}
				<div
					className={`h-2 bg-gradient-to-r ${
						isMath ? 'from-blue-400 to-cyan-400' : 'from-orange-400 to-amber-400'
					}`}
				/>

				{/* Header */}
				<div className='px-6 pt-5 pb-3 flex items-start justify-between'>
					<div>
						<div className='flex items-center gap-2 mb-1'>
							<Badge
								variant='outline'
								className={
									isMath
										? 'bg-blue-50 text-blue-700 border-blue-200 text-xs'
										: 'bg-orange-50 text-orange-700 border-orange-200 text-xs'
								}
							>
								{isMath ? (
									<>
										<Calculator className='w-3 h-3 mr-1 inline' />
										Matematika
									</>
								) : (
									<>
										<BookOpen className='w-3 h-3 mr-1 inline' />
										Ingliz tili
									</>
								)}
							</Badge>
							<Badge variant='outline' className='text-gray-500 border-gray-200 bg-gray-50 text-xs'>
								{olympiad.grade}
							</Badge>
						</div>
						<h2 className='text-lg font-bold text-gray-900 leading-snug'>{olympiad.title}</h2>
					</div>
					{!isPending && (
						<button onClick={handleClose} className='text-gray-400 hover:text-gray-600 ml-3 mt-1'>
							<X className='w-5 h-5' />
						</button>
					)}
				</div>

				<div className='px-6 pb-6 space-y-4'>
					{/* Olimpiada ma'lumotlari */}
					<div className='bg-gray-50 rounded-xl border border-gray-100 divide-y divide-gray-100'>
						{[
							['📅 Boshlanish', fmtDate(olympiad.startTime)],
							['⏱ Davomiyligi', `${olympiad.duration} daqiqa`],
							['📝 Savollar', `${olympiad.questions.length} ta`],
							['👥 Ishtirokchilar', olympiad.participantCount.toLocaleString() + ' kishi'],
						].map(([label, val]) => (
							<div key={label} className='flex justify-between items-center px-4 py-2 text-sm'>
								<span className='text-gray-500'>{label}</span>
								<span className='font-semibold text-gray-800'>{val}</span>
							</div>
						))}
					</div>

					{/* To'lov bo'limi */}
					<div className='rounded-xl border-2 border-dashed border-indigo-200 bg-indigo-50/40 px-4 py-4'>
						<div className='flex items-center justify-between mb-3'>
							<div className='flex items-center gap-2'>
								<CreditCard className='w-4 h-4 text-indigo-500' />
								<span className='text-sm font-bold text-indigo-800'>To'lov</span>
							</div>
							<span className='text-lg font-extrabold text-indigo-700'>{fmt(olympiad.price)}</span>
						</div>

						{/* ── BEPUL ── */}
						{isFree && (
							<div className='flex items-center gap-2 bg-green-50 border border-green-200 rounded-lg px-3 py-2'>
								<CheckCircle2 className='w-4 h-4 text-green-600 flex-shrink-0' />
								<span className='text-sm font-semibold text-green-700'>
									Bepul ishtirok — to'lov talab etilmaydi
								</span>
							</div>
						)}

						{/* ── KUTISH ── */}
						{!isFree && isPending && (
							<div className='flex flex-col items-center gap-3 py-4'>
								<Loader2 className='w-9 h-9 text-indigo-500 animate-spin' />
								<p className='text-sm font-semibold text-indigo-700'>
									To'lov amalga oshirilmoqda...
								</p>
								<p className='text-xs text-gray-400 text-center'>
									Iltimos kuting. Sahifani yopmang.
								</p>
								{/* Animatsiyali progress */}
								<div className='w-full bg-gray-200 rounded-full h-1.5 overflow-hidden'>
									<div className='bg-indigo-500 h-1.5 rounded-full animate-pulse w-2/3' />
								</div>
							</div>
						)}

						{/* ── XATO ── */}
						{!isFree && isFailed && (
							<div className='space-y-3'>
								<div className='flex items-center gap-2 bg-red-50 border border-red-200 rounded-lg px-3 py-2.5'>
									<XCircle className='w-4 h-4 text-red-500 flex-shrink-0' />
									<span className='text-sm text-red-700'>
										To'lov amalga oshmadi. Qayta urinib ko'ring.
									</span>
								</div>
								<Button
									variant='outline'
									className='w-full border-indigo-200 text-indigo-600'
									onClick={reset}
								>
									Qayta urinish
								</Button>
							</div>
						)}

						{/* ── PROVAYDERLAR ── */}
						{!isFree && !isPending && !isFailed && (
							<div className='space-y-3'>
								<p className='text-xs text-gray-500 font-medium'>To'lov usulini tanlang:</p>
								<div className='grid grid-cols-3 gap-2'>
									{PROVIDERS.map(p => (
										<button
											key={p.id}
											onClick={() => setProvider(p.id)}
											className={`relative border-2 rounded-xl px-2 py-3 text-center text-xs font-bold transition-all ${p.bg} ${
												provider === p.id ? 'ring-2 ring-indigo-500 ring-offset-1 scale-[1.04]' : ''
											}`}
										>
											<span className='text-xl block mb-1'>{p.logo}</span>
											{p.label}
											{provider === p.id && (
												<span className='absolute -top-2 -right-2 w-5 h-5 bg-indigo-600 rounded-full flex items-center justify-center shadow'>
													<CheckCircle2 className='w-3 h-3 text-white' />
												</span>
											)}
										</button>
									))}
								</div>

								<div className='flex items-start gap-2 bg-amber-50 border border-amber-200 rounded-lg px-3 py-2.5'>
									<AlertCircle className='w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5' />
									<p className='text-xs text-amber-700 leading-relaxed'>
										<span className='font-bold'>Xavfsiz to'lov.</span> Barcha tranzaksiyalar
										shifrlangan.
									</p>
								</div>
							</div>
						)}
					</div>

					{/* Shartlar checkbox */}
					{!isFree && !isPending && !isFailed && (
						<label className='flex items-start gap-2 cursor-pointer select-none'>
							<input
								type='checkbox'
								checked={agreed}
								onChange={e => setAgreed(e.target.checked)}
								className='mt-0.5 w-4 h-4 accent-indigo-600'
							/>
							<span className='text-xs text-gray-500 leading-relaxed'>
								Men{' '}
								<span
									className='text-indigo-600 underline cursor-pointer'
									onClick={e => {
										e.preventDefault();
										window.open('/rules', '_blank');
									}}
								>
									shartlar va qoidalar
								</span>{' '}
								bilan tanishdim va rozilik bildiraman.
							</span>
						</label>
					)}

					{/* Chipta eslatma */}
					<div className='flex items-center gap-2 bg-indigo-50 border border-indigo-100 rounded-lg px-3 py-2'>
						<Ticket className='w-4 h-4 text-indigo-500 flex-shrink-0' />
						<span className='text-xs text-indigo-700'>
							To'lovdan so'ng sizga <span className='font-bold'>unikal chipta ID</span> beriladi.
						</span>
					</div>

					{/* Kafolat */}
					<div className='flex items-start gap-2 text-xs text-gray-500'>
						<ShieldCheck className='w-4 h-4 text-green-500 flex-shrink-0 mt-0.5' />
						<span>To'lov xavfsizligi Payme/Click/Uzum tomonidan kafolatlangan.</span>
					</div>

					{/* CTA tugma */}
					{!isPending && !isFailed && (
						<Button
							className='w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 text-base flex items-center justify-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed'
							onClick={handlePay}
							disabled={!isFree && (!provider || !agreed)}
						>
							{isFree ? (
								<>
									Testni Boshlash <ArrowRight className='w-4 h-4' />
								</>
							) : (
								<>
									{fmt(olympiad.price)} — To'lash <ArrowRight className='w-4 h-4' />
								</>
							)}
						</Button>
					)}
				</div>
			</div>
		</div>
	);
};

export default PaymentModal;
