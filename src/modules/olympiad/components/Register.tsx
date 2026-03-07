import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { UserPlus, Loader2, MailCheck, AlertCircle, User } from 'lucide-react';

const Register = () => {
	const { signUp } = useAuth();

	const [fullName, setFullName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [submitting, setSubmitting] = useState(false);
	const [isSuccess, setIsSuccess] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setError(null);
		setSubmitting(true);

		try {
			await signUp(email.trim(), password, fullName.trim());
			setIsSuccess(true);
		} catch (err: unknown) {
			if (err instanceof Error) {
				setError(err.message);
			} else {
				setError("Ro'yxatdan o'tishda xatolik yuz berdi");
			}
		} finally {
			setSubmitting(false);
		}
	};

	if (isSuccess) {
		return (
			<div className='min-h-screen bg-slate-50 flex items-center justify-center p-4'>
				<Card className='w-full max-w-md shadow-2xl text-center p-8 border-green-100'>
					<div className='mx-auto bg-green-50 p-4 rounded-full w-fit mb-4'>
						<MailCheck className='w-12 h-12 text-green-600' />
					</div>

					<CardTitle className='text-2xl font-bold text-slate-900'>
						Pochtangizni tekshiring
					</CardTitle>

					<CardDescription className='mt-4 text-base'>
						Hurmatli <b>{fullName}</b>, biz <b>{email}</b> manziliga tasdiqlash xatini yubordik.
						Iltimos, pochtangizdagi havola orqali hisobingizni faollashtiring.
					</CardDescription>

					<Button
						onClick={() => (window.location.href = '/login')}
						className='w-full mt-8 bg-indigo-600 hover:bg-indigo-700 h-11'
					>
						Kirish sahifasiga o&apos;tish
					</Button>
				</Card>
			</div>
		);
	}

	return (
		<div className='min-h-screen bg-slate-50 flex items-center justify-center p-4'>
			<Card className='w-full max-w-md shadow-xl border-indigo-100 bg-white'>
				<CardHeader className='text-center'>
					<div className='mx-auto bg-indigo-50 p-3 rounded-full w-fit mb-2'>
						<UserPlus className='w-8 h-8 text-indigo-600' />
					</div>
					<CardTitle className='text-2xl font-bold'>Ro&apos;yxatdan o&apos;tish</CardTitle>
					<CardDescription>Turon Olimpiadasi tizimida hisob yarating</CardDescription>
				</CardHeader>

				<CardContent>
					<form onSubmit={handleSubmit} className='space-y-4'>
						<div className='space-y-2'>
							<Label htmlFor='fullName'>To&apos;liq ism va familiyangiz</Label>
							<div className='relative'>
								<User className='absolute left-3 top-3 w-4 h-4 text-slate-400' />
								<Input
									id='fullName'
									placeholder='Ali Valiyev'
									className='pl-10'
									value={fullName}
									onChange={e => setFullName(e.target.value)}
									required
								/>
							</div>
						</div>

						<div className='space-y-2'>
							<Label htmlFor='email'>Elektron pochta</Label>
							<Input
								id='email'
								type='email'
								placeholder='misol@gmail.com'
								value={email}
								onChange={e => setEmail(e.target.value)}
								required
							/>
						</div>

						<div className='space-y-2'>
							<Label htmlFor='password'>Parol</Label>
							<Input
								id='password'
								type='password'
								placeholder='••••••••'
								value={password}
								onChange={e => setPassword(e.target.value)}
								required
							/>
							<p className='text-[11px] text-slate-500 italic'>
								Kamida 8 ta belgidan iborat bo&apos;lsin
							</p>
						</div>

						{error && (
							<div className='flex items-center gap-2 text-sm text-red-600 bg-red-50 p-3 rounded-lg border border-red-100'>
								<AlertCircle className='w-5 h-5 flex-shrink-0' />
								<span>{error}</span>
							</div>
						)}

						<Button
							type='submit'
							disabled={submitting}
							className='w-full bg-indigo-600 hover:bg-indigo-700 h-11 text-white font-semibold'
						>
							{submitting ? (
								<div className='flex items-center gap-2'>
									<Loader2 className='w-4 h-4 animate-spin' />
									<span>Yaratilmoqda...</span>
								</div>
							) : (
								"Ro'yxatdan o'tish"
							)}
						</Button>

						<div className='text-center text-sm text-slate-600 pt-2'>
							Hisobingiz bormi?{' '}
							<Link to='/login' className='text-indigo-600 font-bold hover:underline'>
								Kirish
							</Link>
						</div>
					</form>
				</CardContent>
			</Card>
		</div>
	);
};

export default Register;
