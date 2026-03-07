import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, XCircle, Loader2 } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

type Status = 'loading' | 'success' | 'error';

const Verify = () => {
	const navigate = useNavigate();
	const [searchParams] = useSearchParams();
	const { verifyEmail } = useAuth();

	const [status, setStatus] = useState<Status>('loading');
	const [message, setMessage] = useState('');

	useEffect(() => {
		const token = searchParams.get('token');

		if (!token) {
			setStatus('error');
			setMessage("Tasdiqlash kodi topilmadi. Havola noto'g'ri.");
			return;
		}

		const processVerification = async () => {
			try {
				await verifyEmail(token);
				setStatus('success');
				setMessage('Emailingiz muvaffaqiyatli tasdiqlandi!');

				setTimeout(() => {
					navigate('/dashboard', { replace: true });
				}, 1500);
			} catch (err: unknown) {
				setStatus('error');

				if (err instanceof Error) {
					setMessage(err.message);
				} else {
					setMessage('Tasdiqlashda xatolik yuz berdi.');
				}
			}
		};

		processVerification();
	}, [navigate, searchParams, verifyEmail]);

	return (
		<div className='min-h-screen bg-slate-50 flex items-center justify-center p-4'>
			<Card className='w-full max-w-md shadow-2xl text-center border-indigo-100'>
				<CardHeader>
					<div className='mx-auto mb-4'>
						{status === 'loading' && <Loader2 className='w-16 h-16 text-indigo-600 animate-spin' />}
						{status === 'success' && <CheckCircle className='w-16 h-16 text-green-600' />}
						{status === 'error' && <XCircle className='w-16 h-16 text-red-600' />}
					</div>

					<CardTitle className='text-2xl font-bold'>
						{status === 'loading'
							? 'Tasdiqlanmoqda...'
							: status === 'success'
								? 'Tasdiqlandi!'
								: 'Xatolik!'}
					</CardTitle>

					<CardDescription className='text-lg mt-2 text-slate-600'>
						{message || 'Iltimos, kuting...'}
					</CardDescription>
				</CardHeader>

				<CardContent className='space-y-4'>
					{status === 'success' && (
						<Button
							onClick={() => navigate('/dashboard')}
							className='w-full bg-indigo-600 hover:bg-indigo-700'
						>
							Dashboardga o&apos;tish
						</Button>
					)}

					{status === 'error' && (
						<div className='flex flex-col gap-2'>
							<Button onClick={() => navigate('/register')} className='w-full bg-indigo-600'>
								Qayta ro&apos;yxatdan o&apos;tish
							</Button>
							<Button variant='outline' onClick={() => navigate('/login')} className='w-full'>
								Kirishga o&apos;tish
							</Button>
						</div>
					)}
				</CardContent>
			</Card>
		</div>
	);
};

export default Verify;
