import { useParams, useNavigate } from 'react-router-dom';
import { activeOlympiads } from '../data/olympiadData';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Trophy, CheckCircle, XCircle, Home, RotateCcw, MinusCircle } from 'lucide-react';

const RESULT_KEY = (id: string) => `turon_result_${id}`;

const OlympiadResult = () => {
	const { id } = useParams<{ id: string }>();
	const navigate = useNavigate();

	const olympiad = activeOlympiads.find(o => o.id === id);

	if (!olympiad) {
		return (
			<div className='flex flex-col items-center justify-center h-screen gap-4 bg-gray-50'>
				<p className='text-gray-600'>Olimpiada topilmadi.</p>
				<Button
					className='bg-indigo-600 hover:bg-indigo-700'
					onClick={() => navigate('/dashboard')}
				>
					Dashboardga qaytish
				</Button>
			</div>
		);
	}

	const raw = localStorage.getItem(RESULT_KEY(olympiad.id));
	const result = raw ? JSON.parse(raw) : null;

	const correctCount: number = result?.correctCount ?? 0;
	const incorrectCount: number = result?.incorrectCount ?? 0;
	const unanswered: number = olympiad.questions.length - correctCount - incorrectCount;
	const score: number = result?.score ?? 0;
	const percentage: number = result?.percentage ?? 0;
	const savedAnswers: Record<string, string> = result?.answers ?? {};

	const emoji =
		percentage === 100 ? '🏆' : percentage >= 70 ? '🥇' : percentage >= 50 ? '🥈' : '📝';

	const resultLabel =
		percentage === 100
			? 'Mukammal natija!'
			: percentage >= 70
				? 'Ajoyib! Davom eting!'
				: percentage >= 50
					? 'Yaxshi, lekin yaxshilanish mumkin'
					: "Ko'proq mashq qiling";

	const resultColor =
		percentage >= 70 ? 'text-green-600' : percentage >= 50 ? 'text-amber-600' : 'text-red-500';

	const isMath = olympiad.subject === 'Math';

	return (
		<div className='min-h-screen bg-gray-50 py-8 px-4'>
			<div className='max-w-lg mx-auto space-y-5'>
				{/* ── Score Card ── */}
				<Card className='shadow-xl border-indigo-100 overflow-hidden text-center'>
					<div
						className={`h-2 bg-gradient-to-r ${
							isMath ? 'from-blue-500 to-cyan-500' : 'from-orange-500 to-amber-500'
						}`}
					/>
					<CardHeader className='pt-8 pb-2'>
						<div className='text-5xl mb-2'>{emoji}</div>
						<CardTitle className='text-2xl text-indigo-900'>Test Yakunlandi!</CardTitle>
						<p className='text-gray-500 text-sm mt-1'>{olympiad.title}</p>
					</CardHeader>

					<CardContent className='space-y-5 pb-8'>
						{/* Big % */}
						<div className='text-6xl font-extrabold text-indigo-600'>{percentage}%</div>

						{/* Stats grid */}
						<div className='grid grid-cols-3 gap-3'>
							<div className='bg-green-50 p-3 rounded-xl border border-green-100 text-center'>
								<CheckCircle className='w-5 h-5 text-green-500 mx-auto mb-1' />
								<div className='text-2xl font-bold text-green-700'>{correctCount}</div>
								<div className='text-xs text-green-600 font-medium'>To'g'ri</div>
							</div>
							<div className='bg-red-50 p-3 rounded-xl border border-red-100 text-center'>
								<XCircle className='w-5 h-5 text-red-400 mx-auto mb-1' />
								<div className='text-2xl font-bold text-red-600'>{incorrectCount}</div>
								<div className='text-xs text-red-500 font-medium'>Noto'g'ri</div>
							</div>
							<div className='bg-gray-50 p-3 rounded-xl border border-gray-200 text-center'>
								<MinusCircle className='w-5 h-5 text-gray-400 mx-auto mb-1' />
								<div className='text-2xl font-bold text-gray-500'>{unanswered}</div>
								<div className='text-xs text-gray-400 font-medium'>Javobsiz</div>
							</div>
						</div>

						<div className='text-sm text-gray-400'>
							Umumiy ball: <span className='font-bold text-gray-700'>{score} ball</span>
							{' · '}
							Jami:{' '}
							<span className='font-bold text-gray-700'>{olympiad.questions.length} savol</span>
						</div>

						<div className={`text-base font-semibold ${resultColor}`}>
							<Trophy className='w-4 h-4 inline mr-1' />
							{resultLabel}
						</div>
					</CardContent>
				</Card>

				{/* ── Answer Review ── */}
				{result && (
					<Card className='shadow-md border-gray-100'>
						<CardHeader className='pb-2'>
							<CardTitle className='text-base text-gray-800'>Javoblar Tahlili</CardTitle>
						</CardHeader>
						<CardContent className='space-y-4 pb-5'>
							{olympiad.questions.map((q, idx) => {
								const userAnswer = savedAnswers[q.id];
								// ← correctAnswerId ishlatilmoqda (to'g'ri)
								const isCorrect = userAnswer === q.correctAnswerId;
								const notAnswered = !userAnswer;

								return (
									<div
										key={q.id}
										className={`rounded-xl p-3 border text-sm ${
											notAnswered
												? 'bg-gray-50 border-gray-200'
												: isCorrect
													? 'bg-green-50 border-green-200'
													: 'bg-red-50 border-red-200'
										}`}
									>
										{/* Question text */}
										<div className='flex items-start gap-2 mb-2'>
											{notAnswered ? (
												<MinusCircle className='w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0' />
											) : isCorrect ? (
												<CheckCircle className='w-4 h-4 text-green-500 mt-0.5 flex-shrink-0' />
											) : (
												<XCircle className='w-4 h-4 text-red-400 mt-0.5 flex-shrink-0' />
											)}
											<span className='text-gray-700 leading-snug'>
												<span className='font-semibold text-gray-400 mr-1'>{idx + 1}.</span>
												{q.text.split('\n')[0]}
											</span>
										</div>

										{/* Options */}
										<div className='flex flex-wrap gap-2 ml-6'>
											{q.options.map(opt => {
												let style = 'bg-gray-100 text-gray-500 border-gray-200';
												if (opt.id === q.correctAnswerId)
													style = 'bg-green-100 text-green-700 border-green-300 font-semibold';
												else if (opt.id === userAnswer && !isCorrect)
													style = 'bg-red-100 text-red-600 border-red-300 line-through';
												return (
													<span
														key={opt.id}
														className={`px-2 py-0.5 rounded-md border text-xs ${style}`}
													>
														{opt.id}: {opt.text}
													</span>
												);
											})}
										</div>
									</div>
								);
							})}
						</CardContent>
					</Card>
				)}

				{/* ── Buttons ── */}
				<div className='flex gap-3'>
					<Button
						className='flex-1 bg-indigo-600 hover:bg-indigo-700 text-white'
						onClick={() => navigate(`/quiz/${olympiad.id}`)}
					>
						<RotateCcw className='w-4 h-4 mr-2' /> Qayta urinish
					</Button>
					<Button
						variant='outline'
						className='flex-1 border-gray-200'
						onClick={() => navigate('/dashboard')}
					>
						<Home className='w-4 h-4 mr-2' /> Dashboard
					</Button>
				</div>
			</div>
		</div>
	);
};

export default OlympiadResult;
