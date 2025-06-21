import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider, useAuth } from "@/hooks/useAuth";
import Login from "@/pages/login";
import Dashboard from "@/pages/dashboard";
import Subjects from "@/pages/subjects";
import Quiz from "@/pages/quiz";
import DoubtCenter from "@/pages/doubt-center";
import CreativityHub from "@/pages/creativity-hub";
import ThinkBeyond from "@/pages/think-beyond";
import MythTruth from "@/pages/myth-truth";
import DailyLife from "@/pages/daily-life";
import PerformanceAnalyzer from "@/pages/performance-analyzer";
import ReasoningIQ from "@/pages/reasoning-iq";
import Leaderboard from "@/pages/leaderboard";
import NotFound from "@/pages/not-found";

function Router() {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Login />;
  }

  return (
    <Switch>
      <Route path="/" component={Dashboard} />
      <Route path="/subjects" component={Subjects} />
      <Route path="/quiz" component={Quiz} />
      <Route path="/doubt-center" component={DoubtCenter} />
      <Route path="/creativity-hub" component={CreativityHub} />
      <Route path="/think-beyond" component={ThinkBeyond} />
      <Route path="/myth-truth" component={MythTruth} />
      <Route path="/daily-life" component={DailyLife} />
      <Route path="/performance-analyzer" component={PerformanceAnalyzer} />
      <Route path="/reasoning-iq" component={ReasoningIQ} />
      <Route path="/leaderboard" component={Leaderboard} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <AuthProvider>
          <Toaster />
          <Router />
        </AuthProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
