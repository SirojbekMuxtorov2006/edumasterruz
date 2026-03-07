import { Navigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { Loader2 } from 'lucide-react';

interface ProtectedRouteProps {
	children: React.ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
	const { user, loading } = useAuth();

	// Auth tekshirilayotganda spinner ko'rsatish
	if (loading) {
		return (
			<div className='min-h-screen flex items-center justify-center bg-slate-50'>
				<div className='flex flex-col items-center gap-3'>
					<Loader2 className='w-10 h-10 text-indigo-600 animate-spin' />
					<p className='text-slate-500 text-sm'>Yuklanmoqda...</p>
				</div>
			</div>
		);
	}

	// Login qilmagan bo'lsa, login sahifasiga yo'naltirish
	if (!user) {
		return <Navigate to='/dashboard' replace />;
	}

	return <>{children}</>;
};

export default ProtectedRoute;
