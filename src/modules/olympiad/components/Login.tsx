import { useState } from 'react';
import type { FormEvent } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { LogIn, Loader2 } from 'lucide-react';

const Login = () => {
	const navigate = useNavigate();
	const { signIn } = useAuth();
	const { t } = useTranslation();

	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [submitting, setSubmitting] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault();
		setError(null);
		setSubmitting(true);

		try {
			await signIn(email.trim(), password);
			navigate('/dashboard');
		} catch (err: unknown) {
			const message =
				err instanceof Error
					? err.message
					: t('errors.loginFailed', { defaultValue: 'Login failed' });
			setError(message);
		} finally {
			setSubmitting(false);
		}
	};

	return (
		<div className='min-h-screen bg-gray-50 flex items-center justify-center p-4'>
			<Card className='w-full max-w-md shadow-xl border-indigo-100'>
				<CardHeader className='text-center'>
					<div className='mx-auto bg-indigo-100 p-3 rounded-full w-fit mb-4'>
						<LogIn className='w-8 h-8 text-indigo-600' />
					</div>

					<CardTitle className='text-2xl text-indigo-900'>{t('auth.login.title')}</CardTitle>
					<CardDescription>{t('auth.login.description')}</CardDescription>
				</CardHeader>

				<CardContent>
					<form onSubmit={handleSubmit} className='space-y-4'>
						<div className='space-y-2'>
							<Label htmlFor='email'>{t('auth.login.email')}</Label>
							<Input
								id='email'
								type='email'
								placeholder={t('auth.login.emailPlaceholder')}
								value={email}
								onChange={e => setEmail(e.target.value)}
								required
							/>
						</div>

						<div className='space-y-2'>
							<Label htmlFor='password'>{t('auth.login.password')}</Label>
							<Input
								id='password'
								type='password'
								placeholder={t('auth.login.passwordPlaceholder')}
								value={password}
								onChange={e => setPassword(e.target.value)}
								required
							/>
						</div>

						{error && (
							<div className='text-sm text-red-600 bg-red-50 border border-red-100 rounded-md p-3'>
								{error}
							</div>
						)}

						<Button
							type='submit'
							disabled={submitting}
							className='w-full bg-indigo-600 hover:bg-indigo-700 text-white mt-6'
						>
							{submitting ? (
								<span className='inline-flex items-center gap-2'>
									<Loader2 className='w-4 h-4 animate-spin' />
									{t('auth.login.loggingIn')}
								</span>
							) : (
								t('auth.login.submit')
							)}
						</Button>

						<p className='text-sm text-gray-600 text-center'>
							{t('auth.login.noAccount')}{' '}
							<Link to='/register' className='text-indigo-700 hover:underline font-medium'>
								{t('auth.login.createOne')}
							</Link>
						</p>
					</form>
				</CardContent>
			</Card>
		</div>
	);
};

export default Login;
