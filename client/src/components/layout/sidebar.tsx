import { Link, useLocation } from "wouter";
import { 
  Home, Book, Brain, HelpCircle, Palette, Lightbulb, 
  CheckCircle, Globe, ClipboardList, Flame, Medal, Star, TrendingUp, Trophy 
} from "lucide-react";
import { cn } from "@/lib/utils";

const navigationItems = [
  { href: "/", icon: Home, label: "Dashboard" },
  { href: "/subjects", icon: Book, label: "Subjects" },
  { href: "/quiz", icon: Brain, label: "Quiz Center" },
  { href: "/doubt-center", icon: HelpCircle, label: "Doubt Center" },
  { href: "/creativity-hub", icon: Palette, label: "Creativity Hub" },
  { href: "/think-beyond", icon: Lightbulb, label: "Think Beyond" },
  { href: "/myth-truth", icon: CheckCircle, label: "Myth vs Truth" },
  { href: "/daily-life", icon: Globe, label: "Daily Life Q&A" },
  { href: "/reasoning-iq", icon: Brain, label: "Reasoning & IQ" },
  { href: "/performance-analyzer", icon: TrendingUp, label: "Performance" },
  { href: "/leaderboard", icon: Trophy, label: "Leaderboard" },
];

interface SidebarProps {
  dailyQuizzes: number;
  studyStreak: number;
  weeklyProgress: string;
  accuracy: string;
}

export default function Sidebar({ dailyQuizzes, studyStreak, weeklyProgress, accuracy }: SidebarProps) {
  const [location] = useLocation();

  return (
    <aside className="w-64 bg-white shadow-sm border-r hidden lg:block">
      <div className="p-6">
        <div className="space-y-6">
          {/* Quick Stats */}
          <div className="gradient-primary rounded-xl p-4 text-white">
            <h3 className="font-semibold mb-2">Today's Progress</h3>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="opacity-90">Quizzes Completed</span>
                <span className="font-semibold">{dailyQuizzes}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="opacity-90">Study Streak</span>
                <span className="font-semibold">{studyStreak} days</span>
              </div>
            </div>
          </div>

          {/* Navigation Menu */}
          <nav className="space-y-2">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              const isActive = location === item.href;
              
              return (
                <Link key={item.href} href={item.href} className={cn(
                  "flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors",
                  isActive 
                    ? "bg-primary/10 text-primary font-medium" 
                    : "text-gray-600 hover:bg-gray-50 hover:text-primary"
                )}>
                  <Icon size={18} />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* Learning Statistics */}
          <div className="border-t pt-4">
            <h4 className="font-semibold text-gray-900 mb-3">Learning Stats</h4>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-gray-600">Weekly Target</span>
                  <span className="text-sm font-bold text-primary">{weeklyProgress}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-primary h-2 rounded-full w-3/4"></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-gray-600">Quiz Accuracy</span>
                  <span className="text-sm font-bold text-secondary">{accuracy}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-secondary h-2 rounded-full w-5/6"></div>
                </div>
              </div>

              <div className="pt-4 border-t">
                <h4 className="font-semibold text-gray-900 mb-3">Achievements</h4>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Medal className="text-yellow-500" size={16} />
                    <span className="text-sm text-gray-600">Math Wizard</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Flame className="text-orange-500" size={16} />
                    <span className="text-sm text-gray-600">{studyStreak}-Day Streak</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Star className="text-purple-500" size={16} />
                    <span className="text-sm text-gray-600">Creative Thinker</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Star className="text-blue-500" size={16} />
                    <span className="text-sm text-gray-600">Innovator</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Star className="text-green-500" size={16} />
                    <span className="text-sm text-gray-600">Language Master</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
