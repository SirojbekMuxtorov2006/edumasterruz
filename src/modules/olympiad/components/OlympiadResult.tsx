import { useParams, useNavigate } from 'react-router-dom';
import { activeOlympiads } from '../data/olympiadData';
import { useOlympiadLogic } from '../hooks/useOlympiadLogic';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Trophy, CheckCircle, XCircle, Home } from 'lucide-react';

const OlympiadResult = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const foundOlympiad = activeOlympiads.find(o => o.id === id);
    // Fallback for hook
    const olympiad = foundOlympiad || activeOlympiads[0];

    // We can re-use the hook here to get the state from localStorage
    const { score, correctCount, incorrectCount, totalQuestions } = useOlympiadLogic({ olympiad });

    if (!foundOlympiad) {
        return <div className="text-center p-8">Olympiad not found</div>;
    }

    const percentage = Math.round((correctCount / totalQuestions) * 100);

    return (
        <div className="container mx-auto p-4 max-w-md h-screen flex flex-col justify-center">
            <Card className="text-center shadow-lg border-indigo-100">
                <CardHeader>
                    <div className="mx-auto bg-yellow-100 p-4 rounded-full w-fit mb-4">
                        <Trophy className="w-10 h-10 text-yellow-600" />
                    </div>
                    <CardTitle className="text-3xl text-indigo-900">Quiz Completed!</CardTitle>
                    <CardDescription>You have finished {olympiad.title}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="text-5xl font-bold text-indigo-600 mb-2">
                        {percentage}%
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                        <div className="bg-green-50 p-3 rounded-lg border border-green-100">
                            <div className="flex items-center justify-center text-green-700 font-semibold mb-1">
                                <CheckCircle className="w-4 h-4 mr-1" /> Correct
                            </div>
                            <div className="text-2xl font-bold text-green-800">{correctCount}</div>
                        </div>
                        <div className="bg-red-50 p-3 rounded-lg border border-red-100">
                            <div className="flex items-center justify-center text-red-700 font-semibold mb-1">
                                <XCircle className="w-4 h-4 mr-1" /> Incorrect
                            </div>
                            <div className="text-2xl font-bold text-red-800">{incorrectCount}</div>
                        </div>
                    </div>

                    <div className="text-gray-500 text-sm">
                        Total Score: {score} points
                    </div>
                </CardContent>
                <CardFooter>
                    <Button 
                        className="w-full bg-gray-900 text-white hover:bg-gray-800"
                        onClick={() => navigate('/olympiad')}
                    >
                        <Home className="w-4 h-4 mr-2" /> Back to Olympiads
                    </Button>
                </CardFooter>
            </Card>
        </div>
    );
};

export default OlympiadResult;
