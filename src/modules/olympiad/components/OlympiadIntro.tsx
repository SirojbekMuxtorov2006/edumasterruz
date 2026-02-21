import { useParams, useNavigate } from 'react-router-dom';
import { activeOlympiads } from '../data/olympiadData';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle2, AlertCircle } from 'lucide-react';

const OlympiadIntro = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const olympiad = activeOlympiads.find(o => o.id === id);

    if (!olympiad) {
        return <div className="text-center p-8">Olympiad not found</div>;
    }

    return (
        <div className="container mx-auto p-4 max-w-md h-screen flex flex-col justify-center">
            <Card className="border-indigo-100 shadow-xl">
                <CardHeader className="text-center pb-2">
                    <div className="mx-auto bg-indigo-50 p-3 rounded-full w-fit mb-3">
                        <AlertCircle className="w-8 h-8 text-indigo-600" />
                    </div>
                    <CardTitle className="text-2xl text-indigo-900">{olympiad.title}</CardTitle>
                    <p className="text-gray-500">{olympiad.subject} - {olympiad.classLevel}</p>
                </CardHeader>
                <CardContent className="space-y-4 pt-4">
                    <h3 className="font-semibold text-gray-700">Rules & Instructions:</h3>
                    <ul className="space-y-3 text-sm text-gray-600">
                        <li className="flex items-start">
                            <CheckCircle2 className="w-5 h-5 text-green-500 mr-2 mt-0.5 shrink-0" />
                            <span>You have <strong>{olympiad.duration} minutes</strong> to complete the quiz.</span>
                        </li>
                        <li className="flex items-start">
                            <CheckCircle2 className="w-5 h-5 text-green-500 mr-2 mt-0.5 shrink-0" />
                            <span>There are <strong>{olympiad.questions.length} questions</strong> in total.</span>
                        </li>
                        <li className="flex items-start">
                            <CheckCircle2 className="w-5 h-5 text-green-500 mr-2 mt-0.5 shrink-0" />
                            <span>Once you start, the timer cannot be paused.</span>
                        </li>
                        <li className="flex items-start">
                            <CheckCircle2 className="w-5 h-5 text-green-500 mr-2 mt-0.5 shrink-0" />
                            <span>Ensure you have a stable internet connection.</span>
                        </li>
                    </ul>
                </CardContent>
                <CardFooter>
                    <Button 
                        className="w-full text-lg py-6 bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg shadow-indigo-200"
                        onClick={() => navigate(`/olympiad/${id}/start`)}
                    >
                        Start Now
                    </Button>
                </CardFooter>
            </Card>
        </div>
    );
};

export default OlympiadIntro;
