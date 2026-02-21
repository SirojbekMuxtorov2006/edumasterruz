import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { LogOut, User, Award, Download, Printer, Copy } from 'lucide-react';

const ProfilePage = () => {
    const navigate = useNavigate();
    const { user, logout } = useAuth();

    if (!user) {
        navigate('/');
        return null;
    }

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    const handlePrint = () => {
        window.print();
    };

    return (
        <div className="min-h-screen bg-gray-50 p-4 pb-24">
            <div className="max-w-md mx-auto space-y-6">
                
                {/* Header */}
                <div className="flex justify-between items-center py-4">
                    <h1 className="text-2xl font-bold text-gray-900">My Profile</h1>
                    <div className="flex items-center gap-3">
                        <div className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-sm font-semibold flex items-center">
                            🪙 {user.coins}
                        </div>
                        <Button variant="destructive" size="icon" onClick={handleLogout} className="rounded-full w-8 h-8">
                            <LogOut className="w-4 h-4" />
                        </Button>
                    </div>
                </div>

                {/* Section A: Digital ID Card */}
                <Card className="border-none shadow-xl overflow-hidden relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 via-blue-600 to-indigo-900 opacity-90" />
                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10" />
                    
                    <CardContent className="relative z-10 p-6 text-white">
                        <div className="flex justify-between items-start mb-6">
                            <div className="flex items-center gap-2">
                                <TrophyIcon className="w-6 h-6 text-yellow-400" />
                                <span className="font-bold tracking-wider text-sm opacity-90">TURON OLYMPIAD</span>
                            </div>
                            <div className="text-xs font-mono opacity-70 bg-black/20 px-2 py-1 rounded">
                                ID: {user.id}
                            </div>
                        </div>

                        <div className="flex items-center gap-4">
                            <div className="w-16 h-16 bg-white/20 backdrop-blur rounded-full flex items-center justify-center border-2 border-white/30">
                                <User className="w-8 h-8 text-white" />
                            </div>
                            <div>
                                <h2 className="text-xl font-bold">{user.name}</h2>
                                <p className="text-indigo-200 text-sm">Student • Level {user.level}</p>
                            </div>
                        </div>

                        <div className="mt-6 flex justify-between items-end">
                            <div className="text-xs text-indigo-200">
                                Valid thru: 2026
                            </div>
                            <Badge className="bg-yellow-400 hover:bg-yellow-500 text-yellow-900 border-none px-3">
                                Official Participant
                            </Badge>
                        </div>
                    </CardContent>
                </Card>

                {/* Section B: Analytics */}
                <Card className="border-indigo-100 shadow-sm">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-lg flex items-center gap-2">
                            <Award className="w-5 h-5 text-indigo-600" />
                            Subject Mastery
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {user.stats?.map((stat, index) => (
                            <div key={index} className="space-y-1">
                                <div className="flex justify-between text-sm">
                                    <span className="font-medium text-gray-700">{stat.subject}</span>
                                    <span className="text-gray-500">{stat.percentage}%</span>
                                </div>
                                <Progress value={stat.percentage} className="h-2 bg-gray-100" indicatorClassName={stat.color} />
                            </div>
                        ))}
                    </CardContent>
                </Card>

                {/* Section C: Certificates */}
                <div className="space-y-3">
                    <h3 className="font-semibold text-gray-900 ml-1">Certificates & History</h3>
                    {user.history?.map((item) => (
                        <Card key={item.id} className="border-gray-200 hover:border-indigo-300 transition-colors">
                            <CardContent className="p-4 flex justify-between items-center">
                                <div>
                                    <h4 className="font-medium text-gray-900">{item.title}</h4>
                                    <p className="text-xs text-gray-500">{item.date} • Score: {item.score}</p>
                                </div>
                                {item.hasCertificate ? (
                                    <Dialog>
                                        <DialogTrigger asChild>
                                            <Button variant="outline" size="sm" className="gap-2 text-indigo-600 border-indigo-200 hover:bg-indigo-50">
                                                <Download className="w-4 h-4" /> Download
                                            </Button>
                                        </DialogTrigger>
                                        <DialogContent className="max-w-lg">
                                            <DialogHeader>
                                                <DialogTitle>Certificate Preview</DialogTitle>
                                            </DialogHeader>
                                            
                                            {/* Certificate Template */}
                                            <div id="certificate-print" className="border-8 border-double border-indigo-900 p-8 bg-cream min-h-[400px] flex flex-col items-center justify-center text-center space-y-6 relative overflow-hidden bg-[#fffdf5]">
                                                <div className="absolute top-0 left-0 w-24 h-24 border-t-4 border-l-4 border-yellow-600 m-4"></div>
                                                <div className="absolute bottom-0 right-0 w-24 h-24 border-b-4 border-r-4 border-yellow-600 m-4"></div>
                                                
                                                <TrophyIcon className="w-16 h-16 text-yellow-600" />
                                                
                                                <div>
                                                    <h2 className="text-4xl font-serif text-indigo-900 font-bold mb-2">Certificate</h2>
                                                    <p className="text-gray-500 uppercase tracking-widest text-sm">of Achievement</p>
                                                </div>

                                                <div className="w-full border-b border-gray-300"></div>

                                                <p className="text-lg text-gray-600">This certifies that</p>
                                                <h3 className="text-3xl font-cursive text-indigo-800 my-2 font-bold italic">{user.name}</h3>
                                                <p className="text-gray-600">has successfully completed the <strong>{item.title}</strong></p>

                                                <div className="flex justify-between w-full px-8 mt-8 pt-8">
                                                    <div className="text-center">
                                                        <div className="border-b border-gray-400 w-32 mb-1"></div>
                                                        <p className="text-xs text-gray-400">Date</p>
                                                    </div>
                                                    <Badge className="bg-yellow-500 hover:bg-yellow-600">Official</Badge>
                                                    <div className="text-center">
                                                        <div className="border-b border-gray-400 w-32 mb-1"></div>
                                                        <p className="text-xs text-gray-400">Director</p>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="flex justify-end gap-2 mt-4 print:hidden">
                                                <Button onClick={handlePrint}>
                                                    <Printer className="w-4 h-4 mr-2" /> Print Certificate
                                                </Button>
                                            </div>
                                        </DialogContent>
                                    </Dialog>
                                ) : (
                                    <Badge variant="secondary" className="bg-gray-100 text-gray-500">
                                        Pending
                                    </Badge>
                                )}
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    );
};

// Helper Icon
const TrophyIcon = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path fillRule="evenodd" d="M5.166 2.621v.858c-1.035.148-2.059.33-3.071.543a.75.75 0 00-.584.859 6.753 6.753 0 006.138 5.6 6.73 6.73 0 002.743 1.346A6.707 6.707 0 019.279 15H8.54c-1.036 0-1.875.84-1.875 1.875V19.5h-.75a2.25 2.25 0 00-2.25 2.25c0 .414.336.75.75.75h14a.75.75 0 00.75-.75 2.25 2.25 0 00-2.25-2.25h-.75v-2.625c0-1.036-.84-1.875-1.875-1.875h-.739a6.706 6.706 0 01-1.612-3.177l-.004-.001a6.73 6.73 0 002.743-1.346 6.753 6.753 0 006.139-5.6.75.75 0 00-.585-.858 47.077 47.077 0 00-3.07-.543V2.62a.75.75 0 00-.658-.744 49.22 49.22 0 00-6.093-.377c-2.063 0-4.096.128-6.093.377a.75.75 0 00-.657.744zm0 2.629c0 1.196.312 2.32.857 3.294A5.266 5.266 0 013.16 5.337a45.6 45.6 0 012.006-.348zm7.92 7.249a5.25 5.25 0 003.06-4.225 31.868 31.868 0 01-6.292 0 5.25 5.25 0 003.06 4.225q.114.032.228.06c-.076-.027-.152-.055-.228-.084-.011.006-.023.012-.034.017a5.27 5.27 0 003.06 4.225zm-6.293-4.225a5.25 5.25 0 003.06 4.225c.012-.005.023-.011.035-.017-.076.029-.152.057-.228.084.114-.029.228-.06.341-.091a5.25 5.25 0 003.06-4.225 31.87 31.87 0 01-6.268 0z" clipRule="evenodd" />
    </svg>
);

export default ProfilePage;
