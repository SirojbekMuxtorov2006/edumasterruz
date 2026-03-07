import { useState } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { LogIn, Loader2, AlertCircle } from 'lucide-react';

const Login = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const { signIn } = useAuth();

	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [submitting, setSubmitting] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const from = (location.state as { from?: { pathname?: string } })?.from?.pathname || '/dashboard';

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setError(null);
		setSubmitting(true);

		try {
			await signIn(email.trim(), password);
			navigate(from, { replace: true });
		} catch (err: unknown) {
			if (err instanceof Error) {
				setError(err.message);
			} else {
				setError('Email yoki parol xato');
			}
		} finally {
			setSubmitting(false);
		}
	};

	return (
		<div className='min-h-screen bg-slate-50 flex items-center justify-center p-4'>
			<Card className='w-full max-w-md shadow-2xl border-indigo-100'>
				<CardHeader className='text-center'>
					<LogIn className='w-10 h-10 text-indigo-600 mx-auto mb-2' />
					<CardTitle className='text-2xl'>Xush kelibsiz</CardTitle>
					<CardDescription>Tizimga kirish uchun ma&apos;lumotlarni kiriting</CardDescription>
				</CardHeader>

				<CardContent>
					<form onSubmit={handleSubmit} className='space-y-4'>
						<div className='space-y-2'>
							<Label htmlFor='email'>Elektron pochta</Label>
							<Input
								id='email'
								type='email'
								placeholder='admin@example.uz'
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
								value={password}
								onChange={e => setPassword(e.target.value)}
								required
							/>
						</div>

						{error && (
							<div className='flex items-center gap-2 text-sm text-red-600 bg-red-50 p-3 rounded-lg'>
								<AlertCircle className='w-5 h-5' />
								<span>{error}</span>
							</div>
						)}

						<Button type='submit' disabled={submitting} className='w-full bg-indigo-600'>
							{submitting ? <Loader2 className='w-4 h-4 animate-spin' /> : 'Kirish'}
						</Button>

						<p className='text-center text-sm'>
							Hisobingiz yo&apos;qmi?{' '}
							<Link to='/register' className='text-indigo-600 font-bold'>
								Ro&apos;yxatdan o&apos;tish
							</Link>
						</p>
					</form>
				</CardContent>
			</Card>
		</div>
	);
};

export default Login;
