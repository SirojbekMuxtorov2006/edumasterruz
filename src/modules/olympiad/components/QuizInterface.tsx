import { useParams, useNavigate } from 'react-router-dom';
import { activeOlympiads } from '../data/olympiadData';
import { useOlympiadLogic } from '../hooks/useOlympiadLogic';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import {
	Clock,
	ChevronLeft,
	ChevronRight,
	CheckCircle2,
	AlertTriangle,
	Calculator,
	BookOpen,
	Flag,
} from 'lucide-react';

// ── Wrapper: olympiad topilmasa hook chaqirilmasin ──────────────────────────
const QuizInterface = () => {
	const { id } = useParams<{ id: string }>();
	const navigate = useNavigate();

	const olympiad = activeOlympiads.find(o => o.id === id);

	if (!olympiad) {
		return (
			<div className='flex flex-col items-center justify-center h-screen gap-4 bg-gray-50'>
				<p className='text-gray-600 text-lg'>Olimpiada topilmadi.</p>
				<Button
					className='bg-indigo-600 hover:bg-indigo-700'
					onClick={() => navigate('/olympiads')}
				>
					Orqaga
				</Button>
			</div>
		);
	}

	// olympiad topildi — hook ni alohida componentga o'tkazamiz
	return <QuizContent olympiad={olympiad} />;
};

// ── Inner component: hook shart yuqorida ─────────────────────────────────────
import type { Olympiad } from '../data/olympiadData';

const QuizContent = ({ olympiad }: { olympiad: Olympiad }) => {
	const navigate = useNavigate();

	// ✅ Hook har doim, hech qanday shartdan oldin chaqiriladi
	const {
		currentQuestionIndex,
		currentQuestion,
		answers,
		timeLeft,
		totalQuestions,
		formatTime,
		selectAnswer,
		nextQuestion,
		prevQuestion,
		finishQuiz,
	} = useOlympiadLogic({ olympiad });

	const isMath = olympiad.subject === 'Math';
	const answeredCount = Object.keys(answers).length;
	const progressPercent = Math.round((answeredCount / totalQuestions) * 100);
	const isLowTime = timeLeft < 60;
	const isAnswered = (optId: string) => answers[currentQuestion.id] === optId;

	const themeBar = isMath
		? 'bg-gradient-to-r from-blue-500 to-cyan-500'
		: 'bg-gradient-to-r from-orange-500 to-amber-500';

	const themeBtn = isMath
		? 'bg-blue-600 hover:bg-blue-700 text-white'
		: 'bg-orange-600 hover:bg-orange-700 text-white';

	const optionColors = (optId: string) => {
		if (!answers[currentQuestion.id]) {
			return 'border-gray-200 bg-white hover:border-indigo-400 hover:bg-indigo-50 text-gray-800';
		}
		if (isAnswered(optId)) {
			return 'border-indigo-500 bg-indigo-50 text-indigo-800 font-semibold shadow-sm';
		}
		return 'border-gray-100 bg-gray-50 text-gray-400';
	};

	return (
		<div className='min-h-screen bg-gray-50 flex flex-col'>
			{/* ── Top bar ── */}
			<div
				className={`${themeBar} text-white px-4 py-3 flex items-center justify-between shadow-md`}
			>
				<div className='flex items-center gap-2'>
					{isMath ? <Calculator className='w-5 h-5' /> : <BookOpen className='w-5 h-5' />}
					<span className='font-bold text-sm truncate max-w-[160px] sm:max-w-xs'>
						{olympiad.title}
					</span>
				</div>

				{/* Timer */}
				<div
					className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full font-mono font-bold text-sm ${
						isLowTime ? 'bg-red-500/90 animate-pulse' : 'bg-white/20 backdrop-blur'
					}`}
				>
					{isLowTime ? <AlertTriangle className='w-4 h-4' /> : <Clock className='w-4 h-4' />}
					{formatTime(timeLeft)}
				</div>
			</div>

			{/* ── Progress ── */}
			<div className='bg-white border-b border-gray-100 px-4 py-2.5'>
				<div className='flex items-center justify-between text-xs text-gray-500 mb-1.5'>
					<span>
						Savol <span className='font-bold text-gray-800'>{currentQuestionIndex + 1}</span>
						{' / '}
						<span className='font-bold text-gray-800'>{totalQuestions}</span>
					</span>
					<span>
						Javob berilgan: <span className='font-bold text-indigo-600'>{answeredCount}</span> ta
					</span>
				</div>
				<Progress value={progressPercent} className='h-2' />
			</div>

			{/* ── Main content ── */}
			<div className='flex-1 flex flex-col max-w-2xl mx-auto w-full px-4 py-6 gap-5'>
				{/* Question number dots */}
				<div className='flex flex-wrap gap-1.5 justify-center'>
					{olympiad.questions.map((q, i) => (
						<button
							key={q.id}
							onClick={() => {
								const diff = i - currentQuestionIndex;
								if (diff > 0) for (let x = 0; x < diff; x++) nextQuestion();
								else for (let x = 0; x < -diff; x++) prevQuestion();
							}}
							className={`w-7 h-7 rounded-full text-xs font-bold transition-all border ${
								i === currentQuestionIndex
									? 'bg-indigo-600 text-white border-indigo-600 scale-110'
									: answers[q.id]
										? 'bg-green-500 text-white border-green-500'
										: 'bg-white text-gray-500 border-gray-200 hover:border-indigo-300'
							}`}
						>
							{i + 1}
						</button>
					))}
				</div>

				{/* Question card */}
				<div className='bg-white rounded-2xl border border-gray-200 shadow-sm p-5'>
					<div className='flex items-center gap-2 mb-3'>
						<Badge
							variant='outline'
							className='text-indigo-600 border-indigo-200 bg-indigo-50 text-xs'
						>
							{currentQuestion.type === 'formula' ? '📐 Formula' : '📝 Matn'}
						</Badge>
						{answers[currentQuestion.id] && (
							<Badge
								variant='outline'
								className='text-green-600 border-green-200 bg-green-50 text-xs'
							>
								<CheckCircle2 className='w-3 h-3 mr-1' /> Javob berildi
							</Badge>
						)}
					</div>
					<p className='text-gray-900 font-medium leading-relaxed whitespace-pre-line text-base'>
						{currentQuestion.text}
					</p>
				</div>

				{/* Options */}
				<div className='space-y-3'>
					{currentQuestion.options.map(opt => (
						<button
							key={opt.id}
							onClick={() => selectAnswer(currentQuestion.id, opt.id)}
							className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl border-2 transition-all text-left ${optionColors(opt.id)}`}
						>
							<span className='w-7 h-7 flex-shrink-0 rounded-full border-2 border-current flex items-center justify-center text-xs font-bold'>
								{opt.id}
							</span>
							<span className='text-sm leading-snug'>{opt.text}</span>
						</button>
					))}
				</div>

				{/* Navigation */}
				<div className='flex items-center justify-between gap-3 mt-auto pt-2'>
					<Button
						variant='outline'
						className='flex-1 border-gray-200'
						onClick={prevQuestion}
						disabled={currentQuestionIndex === 0}
					>
						<ChevronLeft className='w-4 h-4 mr-1' /> Oldingi
					</Button>

					{currentQuestionIndex === totalQuestions - 1 ? (
						<Button
							className='flex-1 bg-green-600 hover:bg-green-700 text-white font-bold'
							onClick={finishQuiz}
						>
							<Flag className='w-4 h-4 mr-2' />
							Tugatish ({answeredCount}/{totalQuestions})
						</Button>
					) : (
						<Button className={`flex-1 ${themeBtn}`} onClick={nextQuestion}>
							Keyingi <ChevronRight className='w-4 h-4 ml-1' />
						</Button>
					)}
				</div>
			</div>
		</div>
	);
};

export default QuizInterface;
