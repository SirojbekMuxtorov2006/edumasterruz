import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { LogIn, Loader2, AlertCircle } from 'lucide-react';

const Login = () => {
	const navigate = useNavigate();
	const { signIn } = useAuth();
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [submitting, setSubmitting] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setError(null);
		setSubmitting(true);
		try {
			await signIn(email.trim(), password);
			navigate('/dashboard'); // Muvaffaqiyatli bo'lsa dashboardga
		} catch (err) {
			setError(err.message || 'Email yoki parol xato');
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
					<CardDescription>Tizimga kirish uchun ma'lumotlarni kiriting</CardDescription>
				</CardHeader>
				<CardContent>
					<form onSubmit={handleSubmit} className='space-y-4'>
						<div className='space-y-2'>
							<Label>Elektron pochta</Label>
							<Input
								type='email'
								placeholder='admin@example.uz'
								value={email}
								onChange={e => setEmail(e.target.value)}
								required
							/>
						</div>
						<div className='space-y-2'>
							<Label>Parol</Label>
							<Input
								type='password'
								value={password}
								onChange={e => setPassword(e.target.value)}
								required
							/>
						</div>
						{error && (
							<div className='flex items-center gap-2 text-sm text-red-600 bg-red-50 p-3 rounded-lg'>
								<AlertCircle className='w-5 h-5' /> {error}
							</div>
						)}
						<Button type='submit' disabled={submitting} className='w-full bg-indigo-600'>
							{submitting ? <Loader2 className='animate-spin' /> : 'Kirish'}
						</Button>
						<p className='text-center text-sm'>
							Hisobingiz yo'qmi?{' '}
							<Link to='/register' className='text-indigo-600 font-bold'>
								Ro'yxatdan o'tish
							</Link>
						</p>
					</form>
				</CardContent>
			</Card>
		</div>
	);
};

export default Login;
