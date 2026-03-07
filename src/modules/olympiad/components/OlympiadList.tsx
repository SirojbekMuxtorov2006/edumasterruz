// src/modules/olympiad/components/OlympiadList.tsx
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
	Clock,
	Users,
	BookOpen,
	Calculator,
	CalendarDays,
	ChevronRight,
	Lock,
	Search,
	CreditCard,
	Ticket,
	CheckCircle2,
} from 'lucide-react';
import { activeOlympiads, Olympiad } from '../data/olympiadData';
import PaymentModal from './PaymentModal';

// ─── Helpers ──────────────────────────────────────────────────────────────────
const formatDate = (iso: string) =>
	new Date(iso).toLocaleDateString('uz-UZ', {
		day: 'numeric',
		month: 'long',
		year: 'numeric',
		hour: '2-digit',
		minute: '2-digit',
	});

const isLocked = (iso: string) => new Date() < new Date(iso);
const formatPrice = (p: number) => (p === 0 ? 'Bepul' : p.toLocaleString('uz-UZ') + " so'm");

// ─── Filter tiplari ───────────────────────────────────────────────────────────
type SubjectFilter = 'Barchasi' | 'Matematika' | 'Ingliz tili';
type GradeFilter = 'Barchasi' | '5–6 sinf' | '7–8 sinf' | '9–11 sinf';

const SUBJECTS: SubjectFilter[] = ['Barchasi', 'Matematika', 'Ingliz tili'];
const GRADES: GradeFilter[] = ['Barchasi', '5–6 sinf', '7–8 sinf', '9–11 sinf'];

// ─── OlympiadCard ─────────────────────────────────────────────────────────────
const OlympiadCard = ({ o, onClick }: { o: Olympiad; onClick: () => void }) => {
	const locked = isLocked(o.startTime);
	const isMath = o.subject === 'Math';
	const isFree = o.price === 0;
	const spotsLeft = o.spotsTotal - o.spotsTaken;
	const spotsPercent = Math.round((o.spotsTaken / o.spotsTotal) * 100);
	const almostFull = spotsLeft <= 30;

	const themeGrad = isMath ? 'from-blue-500 to-cyan-500' : 'from-orange-500 to-amber-500';
	const themeBadge = isMath
		? 'bg-blue-50 text-blue-700 border-blue-200'
		: 'bg-orange-50 text-orange-700 border-orange-200';
	const themeBtn = isMath ? 'bg-blue-600 hover:bg-blue-700' : 'bg-orange-500 hover:bg-orange-600';

	return (
		<Card
			className={`relative overflow-hidden border transition-all duration-200 ${
				locked
					? 'opacity-75 border-gray-200'
					: 'hover:shadow-lg hover:-translate-y-0.5 cursor-pointer border-gray-200'
			}`}
		>
			{/* Rang chizig'i */}
			<div className={`h-1.5 bg-gradient-to-r ${themeGrad}`} />

			<CardHeader className='pb-3 pt-4 px-5'>
				<div className='flex items-start justify-between gap-3'>
					<div className='flex-1 min-w-0'>
						{/* Fan + Sinf badgelari */}
						<div className='flex flex-wrap items-center gap-1.5 mb-2'>
							<Badge variant='outline' className={`text-xs font-semibold ${themeBadge}`}>
								{isMath ? (
									<>
										<Calculator className='w-3 h-3 mr-1 inline-block' />
										Matematika
									</>
								) : (
									<>
										<BookOpen className='w-3 h-3 mr-1 inline-block' />
										Ingliz tili
									</>
								)}
							</Badge>
							<Badge variant='outline' className='text-xs bg-gray-50 text-gray-600 border-gray-200'>
								{o.grade}
							</Badge>
							<Badge
								variant='outline'
								className='text-xs bg-indigo-50 text-indigo-600 border-indigo-200'
							>
								{o.targetLevel} daraja
							</Badge>
						</div>

						{/* Sarlavha */}
						<h3 className='font-bold text-gray-900 text-base leading-snug'>{o.title}</h3>
					</div>

					{/* Narx */}
					<div className='flex-shrink-0 text-right'>
						{isFree ? (
							<span className='inline-flex items-center gap-1 bg-green-100 text-green-700 text-xs font-bold px-2.5 py-1 rounded-full border border-green-200'>
								<CheckCircle2 className='w-3 h-3' /> Bepul
							</span>
						) : (
							<div>
								<div className='flex items-center gap-1 justify-end text-indigo-700 font-extrabold text-sm'>
									<CreditCard className='w-3.5 h-3.5' />
									{formatPrice(o.price)}
								</div>
							</div>
						)}
					</div>
				</div>
			</CardHeader>

			<CardContent className='px-5 pb-3 space-y-3'>
				{/* Ma'lumotlar qatori */}
				<div className='flex flex-wrap gap-x-4 gap-y-1.5 text-xs text-gray-500'>
					<span className='flex items-center gap-1'>
						<CalendarDays className='w-3.5 h-3.5 text-gray-400' />
						{formatDate(o.startTime)}
					</span>
					<span className='flex items-center gap-1'>
						<Clock className='w-3.5 h-3.5 text-gray-400' />
						{o.duration} daqiqa
					</span>
					<span className='flex items-center gap-1'>
						<Users className='w-3.5 h-3.5 text-gray-400' />
						{o.participantCount.toLocaleString()} ishtirokchi
					</span>
					<span className='flex items-center gap-1'>
						<Ticket className='w-3.5 h-3.5 text-gray-400' />
						{o.questions.length} ta savol
					</span>
				</div>

				{/* Joylar progress */}
				<div>
					<div className='flex items-center justify-between text-xs mb-1'>
						<span className='text-gray-500'>Band qilingan joylar</span>
						<span className={`font-bold ${almostFull ? 'text-red-600' : 'text-gray-700'}`}>
							{o.spotsTaken} / {o.spotsTotal}
							{almostFull && <span className='ml-1 text-red-500'>· Kam qoldi!</span>}
						</span>
					</div>
					<div className='w-full bg-gray-100 rounded-full h-2 overflow-hidden'>
						<div
							className={`h-2 rounded-full transition-all ${
								almostFull
									? 'bg-gradient-to-r from-red-400 to-red-500'
									: 'bg-gradient-to-r from-indigo-400 to-indigo-500'
							}`}
							style={{ width: `${spotsPercent}%` }}
						/>
					</div>
					<p className='text-xs text-gray-400 mt-1'>{o.spotsTotal - o.spotsTaken} ta joy qoldi</p>
				</div>
			</CardContent>

			<CardFooter className='px-5 pb-4 pt-1'>
				{locked ? (
					<Button
						variant='outline'
						className='w-full border-gray-200 text-gray-400 cursor-not-allowed'
						disabled
					>
						<Lock className='w-4 h-4 mr-2' />
						{formatDate(o.startTime)} da boshlanadi
					</Button>
				) : (
					<Button
						className={`w-full text-white font-semibold flex items-center justify-center gap-2 ${themeBtn}`}
						onClick={onClick}
					>
						{isFree ? 'Testni Boshlash' : `Ro'yxatdan o'tish — ${formatPrice(o.price)}`}
						<ChevronRight className='w-4 h-4' />
					</Button>
				)}
			</CardFooter>
		</Card>
	);
};

// ─── OlympiadList ─────────────────────────────────────────────────────────────
const OlympiadList = () => {
	const [subject, setSubject] = useState<SubjectFilter>('Barchasi');
	const [grade, setGrade] = useState<GradeFilter>('Barchasi');
	const [search, setSearch] = useState('');
	const [selected, setSelected] = useState<Olympiad | null>(null);

	// ── Filtrlash ──────────────────────────────────────────────────────────────
	const filtered = activeOlympiads.filter(o => {
		const matchSubject =
			subject === 'Barchasi' ||
			(subject === 'Matematika' && o.subject === 'Math') ||
			(subject === 'Ingliz tili' && o.subject === 'English');
		const matchGrade = grade === 'Barchasi' || o.grade === grade;
		const matchSearch =
			search.trim() === '' ||
			o.title.toLowerCase().includes(search.toLowerCase()) ||
			o.grade.includes(search);
		return matchSubject && matchGrade && matchSearch;
	});

	const active = filtered.filter(o => !isLocked(o.startTime));
	const upcoming = filtered.filter(o => isLocked(o.startTime));

	return (
		<div className='min-h-screen bg-gray-50 flex flex-col'>
			{/* ── Hero ─────────────────────────────────────────────────────── */}
			<div className='bg-gradient-to-br from-indigo-900 via-indigo-800 to-blue-900 text-white py-12 px-4'>
				<div className='max-w-5xl mx-auto text-center'>
					<h1 className='text-3xl sm:text-4xl font-extrabold mb-3 tracking-tight'>
						🏆 Turon International Olympiad
					</h1>
					<p className='text-indigo-200 text-base sm:text-lg max-w-xl mx-auto'>
						Bilimingizni sinab ko'ring. Matematika va Ingliz tili bo'yicha xalqaro darajadagi
						olimpiadalar.
					</p>

					{/* Statistika */}
					<div className='flex flex-wrap justify-center gap-6 mt-8'>
						{[
							{ label: 'Olimpiada', value: activeOlympiads.length },
							{
								label: 'Ishtirokchi',
								value: activeOlympiads.reduce((s, o) => s + o.participantCount, 0).toLocaleString(),
							},
							{ label: 'Fan', value: '2' },
							{ label: 'Sinf darajasi', value: '3' },
						].map(({ label, value }) => (
							<div key={label} className='text-center'>
								<div className='text-2xl font-extrabold text-white'>{value}</div>
								<div className='text-xs text-indigo-300 mt-0.5'>{label}</div>
							</div>
						))}
					</div>
				</div>
			</div>

			{/* ── Filterlar ─────────────────────────────────────────────────── */}
			<div className='sticky top-0 z-30 bg-white border-b border-gray-200 shadow-sm'>
				<div className='max-w-5xl mx-auto px-4 py-3 flex flex-col sm:flex-row gap-3 items-stretch sm:items-center'>
					{/* Qidiruv */}
					<div className='relative flex-1 min-w-0'>
						<Search className='absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400' />
						<Input
							placeholder='Olimpiada qidirish...'
							value={search}
							onChange={e => setSearch(e.target.value)}
							className='pl-9 h-9 text-sm border-gray-200 bg-gray-50 focus:bg-white'
						/>
					</div>

					{/* Fan filteri */}
					<div className='flex gap-1 bg-gray-100 rounded-xl p-1'>
						{SUBJECTS.map(s => (
							<button
								key={s}
								onClick={() => setSubject(s)}
								className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all whitespace-nowrap ${
									subject === s
										? 'bg-white text-indigo-700 shadow-sm'
										: 'text-gray-500 hover:text-gray-700'
								}`}
							>
								{s === 'Matematika' && <Calculator className='w-3 h-3 inline mr-1' />}
								{s === 'Ingliz tili' && <BookOpen className='w-3 h-3 inline mr-1' />}
								{s}
							</button>
						))}
					</div>

					{/* Sinf filteri */}
					<div className='flex gap-1 bg-gray-100 rounded-xl p-1'>
						{GRADES.map(g => (
							<button
								key={g}
								onClick={() => setGrade(g)}
								className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all whitespace-nowrap ${
									grade === g
										? 'bg-white text-indigo-700 shadow-sm'
										: 'text-gray-500 hover:text-gray-700'
								}`}
							>
								{g}
							</button>
						))}
					</div>
				</div>
			</div>

			{/* ── Kontent ───────────────────────────────────────────────────── */}
			<div className='flex-1 max-w-5xl mx-auto w-full px-4 py-8 space-y-10'>
				{/* Hozir Faol */}
				{active.length > 0 && (
					<section>
						<div className='flex items-center gap-2 mb-4'>
							<span className='relative flex h-3 w-3'>
								<span className='animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75' />
								<span className='relative inline-flex rounded-full h-3 w-3 bg-green-500' />
							</span>
							<h2 className='text-lg font-bold text-gray-800'>Hozir Faol</h2>
							<Badge className='bg-green-100 text-green-700 border-green-200 text-xs'>
								{active.length} ta
							</Badge>
						</div>
						<div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-3'>
							{active.map(o => (
								<OlympiadCard key={o.id} o={o} onClick={() => setSelected(o)} />
							))}
						</div>
					</section>
				)}

				{/* Tez Kunda */}
				{upcoming.length > 0 && (
					<section>
						<div className='flex items-center gap-2 mb-4'>
							<span className='w-3 h-3 rounded-full bg-amber-400' />
							<h2 className='text-lg font-bold text-gray-800'>Tez Kunda</h2>
							<Badge className='bg-amber-100 text-amber-700 border-amber-200 text-xs'>
								{upcoming.length} ta
							</Badge>
						</div>
						<div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-3'>
							{upcoming.map(o => (
								<OlympiadCard key={o.id} o={o} onClick={() => setSelected(o)} />
							))}
						</div>
					</section>
				)}

				{/* Natija yo'q */}
				{filtered.length === 0 && (
					<div className='flex flex-col items-center justify-center py-24 text-center'>
						<div className='text-5xl mb-4'>🔍</div>
						<p className='text-gray-500 font-medium'>Olimpiada topilmadi</p>
						<p className='text-gray-400 text-sm mt-1'>Filter yoki qidiruvni o'zgartiring</p>
						<Button
							variant='outline'
							className='mt-4'
							onClick={() => {
								setSubject('Barchasi');
								setGrade('Barchasi');
								setSearch('');
							}}
						>
							Filterlarni tozalash
						</Button>
					</div>
				)}
			</div>

			{/* ── PaymentModal ──────────────────────────────────────────────── */}
			{selected && <PaymentModal olympiad={selected} onClose={() => setSelected(null)} />}
		</div>
	);
};

export default OlympiadList;
