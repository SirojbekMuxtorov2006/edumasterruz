import { useParams, useNavigate } from 'react-router-dom';
import { activeOlympiads } from '../data/olympiadData';
import { useOlympiadLogic } from '../hooks/useOlympiadLogic';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Clock, ChevronLeft, ChevronRight, CheckCircle, Calculator, BookOpen } from 'lucide-react';

const QuizInterface = () => {
    const { id } = useParams();
    const navigate = useNavigate();
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
        return (
            <div className="flex flex-col items-center justify-center h-screen bg-gray-50 text-center p-4">
                <h2 className="text-xl font-bold text-gray-800 mb-2">Olympiad Not Found</h2>
                <Button onClick={() => navigate('/')}>Return Home</Button>
            </div>
        );
    }

    const isMath = foundOlympiad.subject === 'Math';
    const progress = ((currentQuestionIndex + 1) / totalQuestions) * 100;
    const isLastQuestion = currentQuestionIndex === totalQuestions - 1;
    
    // Theme colors based on subject
    const themeColor = isMath ? 'blue' : 'orange';
    const bgColor = isMath ? 'bg-blue-50' : 'bg-orange-50';
    const progressColor = isMath ? 'bg-blue-600' : 'bg-orange-600';
    const textColor = isMath ? 'text-blue-700' : 'text-orange-700';

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            {/* Top Bar */}
            <div className="bg-white shadow-sm border-b sticky top-0 z-10 px-4 py-3 flex justify-between items-center">
                 <div className="flex items-center gap-2">
                    {isMath ? <Calculator className="w-5 h-5 text-blue-600" /> : <BookOpen className="w-5 h-5 text-orange-600" />}
                    <span className="font-semibold text-gray-900 hidden sm:inline">{foundOlympiad.title}</span>
                 </div>
                 <div className={`flex items-center font-mono font-bold text-lg ${timeLeft < 60 ? 'text-red-500 animate-pulse' : 'text-gray-700'}`}>
                    <Clock className="w-5 h-5 mr-2 opacity-70" />
                    {formatTime(timeLeft)}
                 </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 container mx-auto p-4 max-w-lg flex flex-col gap-4">
                {/* Progress */}
                <div className="space-y-1">
                    <div className="flex justify-between text-xs text-gray-500 uppercase font-medium">
                        <span>Progress</span>
                        <span>Question {currentQuestionIndex + 1}/{totalQuestions}</span>
                    </div>
                    <Progress value={progress} className={`h-2 ${isMath ? 'bg-blue-100' : 'bg-orange-100'}`} indicatorClassName={progressColor} />
                </div>

                {/* Question Card */}
                <Card className="flex-1 flex flex-col shadow-md border-0 overflow-hidden">
                    <CardHeader className={`${bgColor} pb-6 pt-6 border-b border-gray-100`}>
                         {/* Question Text with customized rendering */}
                         <div className={`text-lg md:text-xl font-medium text-gray-800 leading-relaxed ${isMath ? 'font-mono' : 'font-serif'}`}>
                            {currentQuestion.type === 'formula' ? (
                                <div className="bg-white p-4 rounded-lg border border-blue-200 shadow-inner text-center text-blue-900">
                                    {currentQuestion.text}
                                </div>
                            ) : (
                                <span className="whitespace-pre-wrap">{currentQuestion.text}</span>
                            )}
                         </div>
                    </CardHeader>
                    <CardContent className="flex-1 p-4 space-y-3 bg-white">
                        <div className="grid gap-3">
                            {currentQuestion.options.map((option) => {
                                const isSelected = answers[currentQuestion.id] === option.id;
                                let optionStyle = "border-gray-200 hover:bg-gray-50 text-gray-700";
                                
                                if (isSelected) {
                                    optionStyle = isMath 
                                        ? "bg-blue-600 hover:bg-blue-700 border-blue-600 text-white shadow-md ring-2 ring-blue-200"
                                        : "bg-orange-600 hover:bg-orange-700 border-orange-600 text-white shadow-md ring-2 ring-orange-200";
                                }

                                return (
                                    <Button
                                        key={option.id}
                                        variant="outline"
                                        className={`w-full justify-start text-left py-4 px-4 h-auto text-base transition-all border ${optionStyle}`}
                                        onClick={() => selectAnswer(currentQuestion.id, option.id)}
                                    >
                                        <Badge variant="outline" className={`mr-3 w-8 h-8 rounded-full flex items-center justify-center p-0 text-sm shrink-0 ${isSelected ? 'bg-white/20 text-white border-white/40' : 'bg-gray-100 border-gray-200 text-gray-500'}`}>
                                            {option.id}
                                        </Badge>
                                        <span className={isMath ? 'font-mono' : ''}>{option.text}</span>
                                    </Button>
                                );
                            })}
                        </div>
                    </CardContent>
                </Card>

                {/* Navigation Footer */}
                <div className="grid grid-cols-2 gap-4 mt-auto pt-2">
                    <Button 
                        variant="ghost" 
                        onClick={prevQuestion} 
                        disabled={currentQuestionIndex === 0}
                        className="text-gray-500 hover:text-gray-900"
                    >
                        <ChevronLeft className="w-4 h-4 mr-1" /> Previous
                    </Button>
                    
                    {isLastQuestion ? (
                        <Button 
                            className={`text-white ${isMath ? 'bg-green-600 hover:bg-green-700' : 'bg-green-600 hover:bg-green-700'}`}
                            onClick={finishQuiz}
                        >
                            Finish Olympiad <CheckCircle className="w-4 h-4 ml-2" />
                        </Button>
                    ) : (
                        <Button 
                            className={`text-white ${isMath ? 'bg-blue-600 hover:bg-blue-700' : 'bg-orange-600 hover:bg-orange-700'}`}
                            onClick={nextQuestion}
                        >
                            Next Question <ChevronRight className="w-4 h-4 ml-1" />
                        </Button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default QuizInterface;
