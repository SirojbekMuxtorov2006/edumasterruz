import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/AuthContext';

const AuthButtons = () => {
	const navigate = useNavigate();
	const { user, isAuthenticated, signOut } = useAuth();

	const handleLogout = async () => {
		await signOut();
		navigate('/login');
	};

	if (!isAuthenticated) {
		return (
			<div className='flex items-center gap-2'>
				<Button variant='outline' onClick={() => navigate('/login')}>
					Kirish
				</Button>
				<Button onClick={() => navigate('/register')}>Ro&apos;yxatdan o&apos;tish</Button>
			</div>
		);
	}

	return (
		<div className='flex items-center gap-2'>
			<Button variant='outline' onClick={() => navigate('/profile')}>
				{user?.email}
			</Button>
			<Button variant='destructive' onClick={handleLogout}>
				Chiqish
			</Button>
		</div>
	);
};

export default AuthButtons;
