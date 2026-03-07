import { useNavigate } from 'react-router-dom';
import { activeOlympiads } from '../data/olympiadData';
import { useAuth } from '../hooks/useAuth';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
	Clock,
	Calculator,
	BookOpen,
	ChevronRight,
	Lock,
	User,
	LogOut,
	CheckCircle2,
	CreditCard,
	Users,
} from 'lucide-react';
import { toast } from 'sonner';

const formatPrice = (p: number) => (p === 0 ? 'Bepul' : p.toLocaleString('uz-UZ') + " so'm");

const OlympiadDashboard = () => {
	const navigate = useNavigate();
	const { user, isAuthenticated, logout } = useAuth();

	if (!isAuthenticated || !user) {
		return (
			<div className='min-h-screen flex flex-col items-center justify-center bg-gray-50 gap-4'>
				<p className='text-gray-600 text-lg'>Iltimos, avval tizimga kiring.</p>
				<Button className='bg-indigo-600 hover:bg-indigo-700' onClick={() => navigate('/login')}>
					Kirish
				</Button>
			</div>
		);
	}

	const myOlympiads = activeOlympiads.filter(o => o.targetLevel === user.level);

	const handleParticipate = (olympiadId: string, startTime: string) => {
		const now = new Date();
		const start = new Date(startTime);
		if (now < start) {
			toast.error('Olimpiada boshlanish vaqti kelmadi!', {
				description: `Boshlanish: ${start.toLocaleString('uz-UZ')}`,
			});
		} else {
			navigate(`/quiz/${olympiadId}`);
		}
	};

	return (
		<div className='min-h-screen bg-gray-50'>
			{/* ── Header ── */}
			<div className='bg-indigo-900 text-white px-4 py-6'>
				<div className='max-w-2xl mx-auto flex items-center justify-between'>
					<div>
						<h1 className='text-2xl font-bold'>Olimpiadalar</h1>
						<div className='flex items-center gap-2 mt-1'>
							<span className='text-indigo-300 text-sm'>Xush kelibsiz, {user.name}</span>
							<Badge
								variant='outline'
								className='border-indigo-400 text-indigo-200 bg-indigo-800 text-xs'
							>
								Level {user.level}
							</Badge>
						</div>
					</div>
					<div className='flex gap-2'>
						<Button
							variant='ghost'
							size='icon'
							className='text-indigo-300 hover:text-white hover:bg-indigo-800'
							onClick={() => navigate('/profile')}
						>
							<User className='w-5 h-5' />
						</Button>
						<Button
							variant='ghost'
							size='icon'
							className='text-indigo-300 hover:text-white hover:bg-indigo-800'
							onClick={() => {
								logout();
								navigate('/');
							}}
						>
							<LogOut className='w-5 h-5' />
						</Button>
					</div>
				</div>
			</div>

			{/* ── Cards ── */}
			<div className='max-w-2xl mx-auto px-4 py-6 space-y-4'>
				{myOlympiads.length === 0 ? (
					<div className='text-center py-16 text-gray-400'>
						<p className='text-base'>Sizning darajangiz uchun faol olimpiada yo'q.</p>
						<Button
							variant='outline'
							className='mt-4 border-indigo-200 text-indigo-600'
							onClick={() => navigate('/olympiads')}
						>
							Barcha olimpiadalar
						</Button>
					</div>
				) : (
					myOlympiads.map(olympiad => {
						const isMath = olympiad.subject === 'Math';
						const now = new Date();
						const start = new Date(olympiad.startTime);
						const locked = now < start;
						const isFree = olympiad.price === 0;

						const themeBar = isMath ? 'from-blue-400 to-cyan-400' : 'from-orange-400 to-amber-400';
						const cardBorder = isMath ? 'border-blue-200' : 'border-orange-200';
						const badgeClass = isMath
							? 'bg-blue-50 text-blue-700 border-blue-200'
							: 'bg-orange-50 text-orange-700 border-orange-200';
						const iconColor = isMath ? 'text-blue-600' : 'text-orange-600';
						const btnClass = isMath
							? 'bg-blue-600 hover:bg-blue-700 shadow-blue-200'
							: 'bg-orange-600 hover:bg-orange-700 shadow-orange-200';

						return (
							<Card
								key={olympiad.id}
								className={`border ${cardBorder} overflow-hidden hover:shadow-lg transition-all`}
							>
								<div className={`h-1.5 bg-gradient-to-r ${themeBar}`} />

								<CardHeader className='pb-2 pt-4'>
									<div className='flex items-start justify-between gap-2'>
										<div className='flex items-center gap-3'>
											<div className={`p-2 rounded-lg ${isMath ? 'bg-blue-50' : 'bg-orange-50'}`}>
												{isMath ? (
													<Calculator className={`w-5 h-5 ${iconColor}`} />
												) : (
													<BookOpen className={`w-5 h-5 ${iconColor}`} />
												)}
											</div>
											<div>
												<Badge variant='outline' className={`${badgeClass} text-xs mb-1`}>
													{isMath ? 'Matematika' : 'Ingliz tili'}
												</Badge>
												<CardTitle className='text-base text-gray-900 leading-snug'>
													{olympiad.title}
												</CardTitle>
											</div>
										</div>

										{/* Narx badge */}
										{isFree ? (
											<span className='inline-flex items-center gap-1 text-xs font-semibold text-green-700 bg-green-50 border border-green-200 px-2 py-0.5 rounded-full flex-shrink-0'>
												<CheckCircle2 className='w-3 h-3' />
												Bepul
											</span>
										) : (
											<span className='inline-flex items-center gap-1 text-xs font-semibold text-indigo-700 bg-indigo-50 border border-indigo-200 px-2 py-0.5 rounded-full flex-shrink-0'>
												<CreditCard className='w-3 h-3' />
												{formatPrice(olympiad.price)}
											</span>
										)}
									</div>
								</CardHeader>

								<CardContent className='pb-3 pt-1'>
									<div className='flex flex-wrap gap-2 text-xs text-gray-500'>
										<span className='bg-gray-50 border border-gray-100 rounded-full px-2.5 py-0.5 font-medium text-gray-700'>
											{olympiad.grade}
										</span>
										<span className='flex items-center gap-1 bg-gray-50 border border-gray-100 rounded-full px-2.5 py-0.5'>
											<Clock className='w-3 h-3 text-gray-400' />
											{olympiad.duration} daqiqa
										</span>
										<span className='flex items-center gap-1 bg-gray-50 border border-gray-100 rounded-full px-2.5 py-0.5'>
											<BookOpen className='w-3 h-3 text-gray-400' />
											{olympiad.questions.length} savol
										</span>
										<span className='flex items-center gap-1 bg-gray-50 border border-gray-100 rounded-full px-2.5 py-0.5'>
											<Users className='w-3 h-3 text-gray-400' />
											{olympiad.participantCount.toLocaleString()}
										</span>
									</div>
								</CardContent>

								<CardFooter className='pt-1 pb-4'>
									<Button
										className={`w-full text-white shadow-md flex justify-between items-center group transition-all ${
											locked
												? 'bg-gray-300 hover:bg-gray-400 shadow-none cursor-not-allowed'
												: btnClass
										}`}
										onClick={() => handleParticipate(olympiad.id, olympiad.startTime)}
										disabled={locked}
									>
										<span className='flex items-center gap-2'>
											{locked && <Lock className='w-4 h-4' />}
											{locked ? 'Tez kunda boshlanadi' : 'Qatnashish →'}
										</span>
										{!locked && (
											<ChevronRight className='w-4 h-4 group-hover:translate-x-1 transition-transform' />
										)}
									</Button>
								</CardFooter>
							</Card>
						);
					})
				)}
			</div>

			<div className='text-center text-xs text-gray-400 py-6'>
				Turon International Olympiad Platform
			</div>
		</div>
	);
};

export default OlympiadDashboard;
