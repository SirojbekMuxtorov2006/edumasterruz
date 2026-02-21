import { activeOlympiads } from '../data/olympiadData';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Clock, Users, BookOpen } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const OlympiadList = () => {
    const navigate = useNavigate();

    return (
        <div className="container mx-auto p-4 space-y-6 max-w-2xl">
            <h1 className="text-3xl font-bold text-center text-primary mb-6">Active Olympiads</h1>
            <div className="grid gap-4">
                {activeOlympiads.map((olympiad) => (
                    <Card key={olympiad.id} className="hover:shadow-lg transition-shadow border-primary/20">
                        <CardHeader className="pb-2">
                            <div className="flex justify-between items-start">
                                <div>
                                    <Badge variant="secondary" className="mb-2 bg-indigo-100 text-indigo-700 hover:bg-indigo-200">
                                        {olympiad.subject}
                                    </Badge>
                                    <CardTitle className="text-xl text-primary">{olympiad.title}</CardTitle>
                                    <CardDescription>Class: {olympiad.classLevel}</CardDescription>
                                </div>
                                {/* <Badge variant="outline" className="border-green-500 text-green-600">Active</Badge> */}
                            </div>
                        </CardHeader>
                        <CardContent className="pb-2">
                            <div className="flex items-center space-x-4 text-sm text-gray-500">
                                <div className="flex items-center">
                                    <Clock className="w-4 h-4 mr-1" />
                                    {olympiad.duration} mins
                                </div>
                                <div className="flex items-center">
                                    <Users className="w-4 h-4 mr-1" />
                                    {olympiad.participantCount} joined
                                </div>
                                <div className="flex items-center">
                                    <BookOpen className="w-4 h-4 mr-1" />
                                    {olympiad.questions.length} Qs
                                </div>
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Button 
                                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white"
                                onClick={() => navigate(`/olympiad/${olympiad.id}/intro`)}
                            >
                                Start Challenge
                            </Button>
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </div>
    );
};

export default OlympiadList;
