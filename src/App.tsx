import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NotFound from "./pages/NotFound";
import OlympiadResult from "./modules/olympiad/components/OlympiadResult";
import OlympiadDashboard from "./modules/olympiad/components/OlympiadDashboard";
import QuizInterface from "./modules/olympiad/components/QuizInterface";
import LandingPage from "./modules/olympiad/components/LandingPage";
import Registration from "./modules/olympiad/components/Registration";
import ProfilePage from "./modules/olympiad/components/ProfilePage";
import About from "./modules/olympiad/components/About";
import Rules from "./modules/olympiad/components/Rules";
import BoardMembers from "./modules/olympiad/components/BoardMembers";
import Contact from "./modules/olympiad/components/Contact";
import Gallery from "./modules/olympiad/components/Gallery";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* ========================================================================================= */}
          {/* OLYMPIAD MVP ROUTES - All other features disabled for MVP phase */}
          {/* ========================================================================================= */}

          {/* New Home: Landing Page */}
          <Route path="/" element={<LandingPage />} />

          {/* Public Pages */}
          <Route path="/about" element={<About />} />
          <Route path="/board-members" element={<BoardMembers />} />
          <Route path="/rules" element={<Rules />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/contact" element={<Contact />} />

          {/* Registration */}
          <Route path="/register" element={<Registration />} />

          {/* Protected Dashboard */}
          <Route path="/dashboard" element={<OlympiadDashboard />} />
          <Route path="/profile" element={<ProfilePage />} />

          {/* Dedicated Quiz Interface */}
          <Route path="/quiz/:id" element={<QuizInterface />} />
          <Route path="/olympiad/:id/result" element={<OlympiadResult />} />

          {/* ========================================================================================= */}

          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
