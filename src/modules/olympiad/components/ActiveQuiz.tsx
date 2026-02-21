import { useParams } from 'react-router-dom';
import { activeOlympiads } from '../data/olympiadData';
import { useOlympiadLogic } from '../hooks/useOlympiadLogic';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Clock, ChevronLeft, ChevronRight, CheckCircle } from 'lucide-react';

const ActiveQuiz = () => {
    const { id } = useParams();
    const foundOlympiad = activeOlympiads.find(o => o.id === id);
    // Fallback to first olympiad to satisfy hook requirement if not found (we return early anyway)
    const olympiad = foundOlympiad || activeOlympiads[0]; 

    const {
        currentQuestionIndex,
        currentQuestion,
        answers,
        timeLeft,
        totalQuestions,
        formatTime,
        selectAnswer,
        nextQuestion,
        prevQuestion,
        finishQuiz
    } = useOlympiadLogic({ olympiad });

    if (!foundOlympiad) {
        return <div className="text-center p-8">Olympiad not found</div>;
    }

    const progress = ((currentQuestionIndex + 1) / totalQuestions) * 100;
    const isLastQuestion = currentQuestionIndex === totalQuestions - 1;

    return (
        <div className="container mx-auto p-4 max-w-md h-[calc(100vh-2rem)] flex flex-col">
            {/* Header / Timer */}
            <div className="flex justify-between items-center mb-4 bg-white p-3 rounded-lg shadow-sm border">
                <div className="flex flex-col">
                    <span className="text-xs text-gray-500 font-medium uppercase tracking-wider">Time Remaining</span>
                    <div className="flex items-center text-indigo-600 font-bold text-xl">
                        <Clock className="w-5 h-5 mr-1" />
                        {formatTime(timeLeft)}
                    </div>
                </div>
                <Badge variant="outline" className="text-base px-3 py-1">
                    Q {currentQuestionIndex + 1} <span className="text-gray-400 mx-1">/</span> {totalQuestions}
                </Badge>
            </div>

            {/* Progress Bar */}
            <div className="mb-6">
                <Progress value={progress} className="h-2 bg-indigo-100" />
            </div>

            {/* Question Card */}
            <Card className="flex-1 flex flex-col mb-4 overflow-hidden border-indigo-100 shadow-md">
                <CardHeader className="bg-indigo-50/50 pb-4">
                     <p className="text-lg font-semibold text-gray-800 leading-relaxed whitespace-pre-wrap">
                        {currentQuestion.text}
                     </p>
                </CardHeader>
                <CardContent className="flex-1 overflow-y-auto p-4 space-y-3">
                    {currentQuestion.options.map((option) => {
                        const isSelected = answers[currentQuestion.id] === option.id;
                        return (
                            <Button
                                key={option.id}
                                variant={isSelected ? "default" : "outline"}
                                className={`w-full justify-start text-left py-6 px-4 h-auto text-base transition-all
                                    ${isSelected 
                                        ? 'bg-indigo-600 hover:bg-indigo-700 border-indigo-600 text-white shadow-md' 
                                        : 'hover:bg-indigo-50 hover:border-indigo-300 text-gray-700'
                                    }
                                `}
                                onClick={() => selectAnswer(currentQuestion.id, option.id)}
                            >
                                <div className={`
                                    w-8 h-8 rounded-full flex items-center justify-center mr-3 font-bold border shrink-0
                                    ${isSelected ? 'bg-white text-indigo-600 border-white' : 'bg-gray-100 text-gray-500 border-gray-200'}
                                `}>
                                    {option.id}
                                </div>
                                <span className="leading-tight">{option.text}</span>
                            </Button>
                        );
                    })}
                </CardContent>
                <CardFooter className="pt-2 pb-4 bg-white border-t flex justify-between gap-3">
                    <Button 
                        variant="outline" 
                        onClick={prevQuestion} 
                        disabled={currentQuestionIndex === 0}
                        className="flex-1"
                    >
                        <ChevronLeft className="w-4 h-4 mr-1" /> Prev
                    </Button>
                    
                    {isLastQuestion ? (
                        <Button 
                            className="flex-1 bg-green-600 hover:bg-green-700 text-white"
                            onClick={finishQuiz}
                        >
                            Finish <CheckCircle className="w-4 h-4 ml-1" />
                        </Button>
                    ) : (
                        <Button 
                            className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white"
                            onClick={nextQuestion}
                        >
                            Next <ChevronRight className="w-4 h-4 ml-1" />
                        </Button>
                    )}
                </CardFooter>
            </Card>
        </div>
    );
};

export default ActiveQuiz;
