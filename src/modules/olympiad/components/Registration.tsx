import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { OlympiadLevel } from '../data/olympiadData';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { Trophy } from 'lucide-react';

const Registration = () => {
	const navigate = useNavigate();
	const { register } = useAuth();

	const [formData, setFormData] = useState({
		name: '',
		phone: '',
		level: '' as OlympiadLevel | '',
	});

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		if (formData.name && formData.phone && formData.level) {
			register({
				name: formData.name,
				phone: formData.phone,
				level: formData.level as OlympiadLevel,
			});
			navigate('/dashboard');
		}
	};

	return (
		<div className='min-h-screen bg-gray-50 flex items-center justify-center p-4'>
			<Card className='w-full max-w-md shadow-xl border-indigo-100'>
				<CardHeader className='text-center'>
					<div className='mx-auto bg-indigo-100 p-3 rounded-full w-fit mb-4'>
						<Trophy className='w-8 h-8 text-indigo-600' />
					</div>
					<CardTitle className='text-2xl text-indigo-900'>Join the Olympiad</CardTitle>
					<CardDescription>Enter your details to start competing</CardDescription>
				</CardHeader>
				<CardContent>
					<form onSubmit={handleSubmit} className='space-y-4'>
						<div className='space-y-2'>
							<Label htmlFor='name'>Full Name</Label>
							<Input
								id='name'
								placeholder='John Doe'
								value={formData.name}
								onChange={e => setFormData({ ...formData, name: e.target.value })}
								required
							/>
						</div>

						<div className='space-y-2'>
							<Label htmlFor='phone'>Phone Number</Label>
							<Input
								id='phone'
								type='tel'
								placeholder='+998 90 123 45 67'
								value={formData.phone}
								onChange={e => setFormData({ ...formData, phone: e.target.value })}
								required
							/>
						</div>

						<div className='space-y-2'>
							<Label htmlFor='level'>Select Category</Label>
							<Select
								onValueChange={value => setFormData({ ...formData, level: value as OlympiadLevel })}
								required
							>
								<SelectTrigger>
									<SelectValue placeholder='Choose your level' />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value='A'>
										<div className='flex flex-col text-left'>
											<span className='font-semibold'>Level A</span>
											<span className='text-xs text-gray-500'>Grades 9-10-11 (Senior)</span>
										</div>
									</SelectItem>
									<SelectItem value='B'>
										<div className='flex flex-col text-left'>
											<span className='font-semibold'>Level B</span>
											<span className='text-xs text-gray-500'>Grades 7-8 (Intermediate)</span>
										</div>
									</SelectItem>
									<SelectItem value='C'>
										<div className='flex flex-col text-left'>
											<span className='font-semibold'>Level C</span>
											<span className='text-xs text-gray-500'>Grades 5-6 (Junior)</span>
										</div>
									</SelectItem>
								</SelectContent>
							</Select>
						</div>

						<Button
							type='submit'
							className='w-full bg-indigo-600 hover:bg-indigo-700 text-white mt-6'
						>
							Register & Continue
						</Button>
					</form>
				</CardContent>
			</Card>
		</div>
	);
};

export default Registration;
