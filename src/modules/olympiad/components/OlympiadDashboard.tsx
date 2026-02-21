import { activeOlympiads } from '../data/olympiadData';
import { useAuth } from '../hooks/useAuth';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Clock, Calculator, BookOpen, ChevronRight, Lock, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

const OlympiadDashboard = () => {
    const navigate = useNavigate();
    const { user, isAuthenticated } = useAuth();

    // If not authenticated, we shouldn't be here (ideally protected by route wrapper, but safety check)
    if (!isAuthenticated || !user) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <Button onClick={() => navigate('/register')}>Please Register First</Button>
            </div>
        );
    }

    // Filter by Level
    const filteredOlympiads = activeOlympiads.filter(o => o.targetLevel === user.level);

    const handleParticipate = (olympiadId: string, startTime: string) => {
        const now = new Date();
        const start = new Date(startTime);

        if (now < start) {
            toast.error(`Olimpiada boshlanish vaqti kelmadi!`, {
                description: `Boshlanish vaqti: ${start.toLocaleString()}`,
            });
        } else {
            navigate(`/quiz/${olympiadId}`);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 p-4">
            <div className="max-w-md mx-auto space-y-6">
                <header className="py-6 flex flex-col items-center relative">
                    <Button 
                        variant="ghost" 
                        className="absolute right-0 top-6" 
                        onClick={() => navigate('/profile')}
                    >
                        <User className="w-6 h-6 text-gray-600" />
                    </Button>
                    <h1 className="text-3xl font-bold text-gray-900 text-center">National Olympiads</h1>
                    <div className="mt-2 flex items-center gap-2">
                         <span className="text-gray-500">Welcome, {user.name}</span>
                         <Badge variant="outline" className="border-indigo-200 text-indigo-700 bg-indigo-50">
                            Level {user.level}
                         </Badge>
                    </div>
                </header>

                <div className="grid gap-4">
                    {filteredOlympiads.length === 0 ? (
                        <div className="text-center py-10 text-gray-500">
                            No active olympiads found for your level.
                        </div>
                    ) : filteredOlympiads.map((olympiad) => {
                        const isMath = olympiad.subject === 'Math';
                        
                        // Dynamic Styles based on Subject
                        const cardBorder = isMath ? 'border-blue-200' : 'border-orange-200';
                        const badgeBg = isMath ? 'bg-blue-100 text-blue-700' : 'bg-orange-100 text-orange-700';
                        const iconColor = isMath ? 'text-blue-600' : 'text-orange-600';
                        const buttonClass = isMath 
                            ? 'bg-blue-600 hover:bg-blue-700 shadow-blue-200' 
                            : 'bg-orange-600 hover:bg-orange-700 shadow-orange-200';
                        
                        const now = new Date();
                        const start = new Date(olympiad.startTime);
                        const isLocked = now < start;

                        return (
                            <Card key={olympiad.id} className={`hover:shadow-lg transition-all border ${cardBorder} overflow-hidden`}>
                                <div className={`h-2 w-full ${isMath ? 'bg-gradient-to-r from-blue-400 to-cyan-400' : 'bg-gradient-to-r from-orange-400 to-red-400'}`} />
                                <CardHeader className="pb-2 relative">
                                    <div className="flex justify-between items-start">
                                        <div className="flex items-center gap-3">
                                            <div className={`p-2 rounded-lg ${isMath ? 'bg-blue-50' : 'bg-orange-50'}`}>
                                                {isMath ? <Calculator className={`w-6 h-6 ${iconColor}`} /> : <BookOpen className={`w-6 h-6 ${iconColor}`} />}
                                            </div>
                                            <div>
                                                <Badge variant="secondary" className={`${badgeBg} border-none mb-1`}>
                                                    {olympiad.subject}
                                                </Badge>
                                                <CardTitle className="text-xl text-gray-900">{olympiad.title}</CardTitle>
                                            </div>
                                        </div>
                                    </div>
                                </CardHeader>
                                <CardContent className="pb-4 pt-2">
                                    <div className="flex flex-wrap gap-4 text-sm text-gray-500 ml-1">
                                         <div className="flex items-center bg-gray-100 px-3 py-1 rounded-full">
                                            <span className="font-semibold text-gray-700 mr-1">{olympiad.grade}</span>
                                        </div>
                                        <div className="flex items-center">
                                            <Clock className="w-4 h-4 mr-1 text-gray-400" />
                                            {olympiad.duration} mins
                                        </div>
                                    </div>
                                </CardContent>
                                <CardFooter>
                                    <Button 
                                        className={`w-full text-white shadow-lg ${isLocked ? 'bg-gray-400 hover:bg-gray-500' : buttonClass} flex justify-between items-center group transition-colors`}
                                        onClick={() => handleParticipate(olympiad.id, olympiad.startTime)}
                                    >
                                        <span className="flex items-center">
                                            {isLocked && <Lock className="w-4 h-4 mr-2" />}
                                            {isLocked ? 'Coming Soon' : 'Participate'}
                                        </span>
                                        {!isLocked && <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />}
                                    </Button>
                                </CardFooter>
                            </Card>
                        );
                    })}
                </div>
                
                <div className="text-center text-xs text-gray-400 mt-8">
                     Turon International Olympiad Platform
                </div>
            </div>
        </div>
    );
};

export default OlympiadDashboard;
