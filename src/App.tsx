import { Toaster } from '@/components/ui/toaster';
import { Toaster as Sonner } from '@/components/ui/sonner';
import { TooltipProvider } from '@/components/ui/tooltip';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { AuthProvider } from '@/context/AuthContext';
import NotFound from './pages/NotFound';
import OlympiadResult from './modules/olympiad/components/OlympiadResult';
import OlympiadDashboard from './modules/olympiad/components/OlympiadDashboard';
import OlympiadList from './modules/olympiad/components/OlympiadList';
import QuizInterface from './modules/olympiad/components/QuizInterface';
import LandingPage from './modules/olympiad/components/LandingPage';
import Registration from './modules/olympiad/components/Registration';
import ProfilePage from './modules/olympiad/components/ProfilePage';
import About from './modules/olympiad/components/About';
import Rules from './modules/olympiad/components/Rules';
import BoardMembers from './modules/olympiad/components/BoardMembers';
import Contact from './modules/olympiad/components/Contact';
import Gallery from './modules/olympiad/components/Gallery';
import Login from './modules/olympiad/components/Login';
import Register from './modules/olympiad/components/Register';
import ProtectedRoute from './modules/olympiad/components/ProtectedRoute';
import Verify from './modules/olympiad/components/Register';

const queryClient = new QueryClient();

const App = () => (
	<QueryClientProvider client={queryClient}>
		<AuthProvider>
			<TooltipProvider>
				<Toaster />
				<Sonner />

				<BrowserRouter>
					<Routes>
						{/* Home */}
						<Route path='/' element={<LandingPage />} />

						{/* Public Pages */}
						<Route path='/about' element={<About />} />
						<Route path='/board-members' element={<BoardMembers />} />
						<Route path='/rules' element={<Rules />} />
						<Route path='/gallery' element={<Gallery />} />
						<Route path='/contact' element={<Contact />} />
						<Route path='/olympiads' element={<OlympiadList />} />
						<Route path='/register-olympiad' element={<Registration />} />

						{/* Auth */}
						<Route path='/login' element={<Login />} />
						<Route path='/register' element={<Register />} />
						<Route path='/verify' element={<Verify />} />

						{/* Protected Routes */}
						<Route element={<ProtectedRoute />}>
							<Route path='/dashboard' element={<OlympiadDashboard />} />
							<Route path='/profile' element={<ProfilePage />} />
							<Route path='/quiz/:id' element={<QuizInterface />} />
							<Route path='/olympiad/:id/result' element={<OlympiadResult />} />
						</Route>

						{/* 404 */}
						<Route path='*' element={<NotFound />} />
					</Routes>
				</BrowserRouter>
			</TooltipProvider>
		</AuthProvider>
	</QueryClientProvider>
);

export default App;
