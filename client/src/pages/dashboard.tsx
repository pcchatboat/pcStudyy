import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Header from "@/components/layout/header";
import Sidebar from "@/components/layout/sidebar";
import ChatbotWidget from "@/components/chatbot/chatbot-widget";
import SubjectCard from "@/components/subject-card";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Bot, Brain, HelpCircle, Palette, Lightbulb, CheckCircle, 
  Globe, Rocket, Heart, Trophy, Clock 
} from "lucide-react";
import { Link } from "wouter";

export default function Dashboard() {
  const [selectedGrade, setSelectedGrade] = useState("8");

  // Fetch subjects
  const { data: subjects = [] } = useQuery({
    queryKey: ["/api/subjects"],
  });

  // Fetch daily life questions
  const { data: dailyLifeQuestions = [] } = useQuery({
    queryKey: ["/api/daily-life-questions"],
  });

  // Mock progress data - in real app this would come from user data
  const subjectProgress = {
    1: 65, // Mathematics
    2: 78, // Science  
    3: 45, // Social Science
    4: 82, // English
    5: 58, // Hindi
    6: 35, // Sanskrit
  };

  const recentActivities = [
    {
      id: 1,
      type: "quiz",
      title: "Completed Math Quiz: Algebra Basics",
      score: "85%",
      time: "2 hours ago",
      status: "Excellent",
      icon: Brain,
      color: "blue"
    },
    {
      id: 2,
      type: "challenge",
      title: "Solved Brain Teaser: Future City Design",
      time: "5 hours ago",
      status: "Creative",
      icon: Lightbulb,
      color: "purple"
    },
    {
      id: 3,
      type: "doubt",
      title: "Asked Doubt: Photosynthesis Process",
      time: "Yesterday",
      status: "Resolved",
      icon: HelpCircle,
      color: "green"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header selectedGrade={selectedGrade} onGradeChange={setSelectedGrade} />
      
      <div className="flex">
        <Sidebar 
          dailyQuizzes={3}
          studyStreak={7}
          weeklyProgress="7/10"
          accuracy="87%"
        />
        
        <main className="flex-1 p-6">
          {/* Welcome Section */}
          <div className="mb-8">
            <Card className="gradient-primary text-white border-0 relative overflow-hidden">
              <CardContent className="p-8 relative z-10">
                <h1 className="text-4xl font-bold mb-2">Welcome back, Alex! 🎓</h1>
                <p className="text-xl opacity-90 mb-6">Ready to explore and learn something amazing today?</p>
                <Button className="bg-white text-primary hover:bg-gray-100 font-semibold">
                  Start Learning Journey
                </Button>
              </CardContent>
              <div className="absolute top-4 right-4 opacity-20">
                <Rocket size={120} />
              </div>
            </Card>
          </div>

          {/* Quick Access Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Link href="/quiz">
              <Card className="hover-lift cursor-pointer border border-gray-100">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                    <Bot className="text-primary text-xl" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">AI Study Buddy</h3>
                  <p className="text-gray-600 text-sm mb-4">Ask me anything about your subjects!</p>
                  <div className="flex items-center text-primary text-sm font-medium">
                    <span>Chat Now</span>
                    <span className="ml-2">→</span>
                  </div>
                </CardContent>
              </Card>
            </Link>

            <Link href="/quiz">
              <Card className="hover-lift cursor-pointer border border-gray-100">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center mb-4">
                    <Brain className="text-secondary text-xl" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">Quick Quiz</h3>
                  <p className="text-gray-600 text-sm mb-4">Test your knowledge in 5 minutes</p>
                  <div className="flex items-center text-secondary text-sm font-medium">
                    <span>Start Quiz</span>
                    <span className="ml-2">→</span>
                  </div>
                </CardContent>
              </Card>
            </Link>

            <Link href="/doubt-center">
              <Card className="hover-lift cursor-pointer border border-gray-100">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4">
                    <HelpCircle className="text-accent text-xl" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">Doubt Center</h3>
                  <p className="text-gray-600 text-sm mb-4">Get help with tricky questions</p>
                  <div className="flex items-center text-accent text-sm font-medium">
                    <span>Ask Doubt</span>
                    <span className="ml-2">→</span>
                  </div>
                </CardContent>
              </Card>
            </Link>

            <Link href="/creativity-hub">
              <Card className="hover-lift cursor-pointer border border-gray-100">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                    <Palette className="text-purple-600 text-xl" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">Creativity Hub</h3>
                  <p className="text-gray-600 text-sm mb-4">Explore creative projects & ideas</p>
                  <div className="flex items-center text-purple-600 text-sm font-medium">
                    <span>Explore</span>
                    <span className="ml-2">→</span>
                  </div>
                </CardContent>
              </Card>
            </Link>
          </div>

          {/* Subject Cards Grid */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">NCERT Subjects</h2>
              <Link href="/subjects">
                <Button variant="ghost" className="text-primary font-medium">
                  View All Subjects
                </Button>
              </Link>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {subjects.map((subject: any) => (
                <SubjectCard
                  key={subject.id}
                  subject={subject}
                  progress={subjectProgress[subject.id as keyof typeof subjectProgress] || 0}
                />
              ))}
            </div>
          </div>

          {/* Special Learning Sections */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {/* Think Beyond the Box */}
            <Link href="/think-beyond">
              <Card className="bg-gradient-to-br from-purple-50 to-pink-50 border-purple-100 hover-lift cursor-pointer">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center mr-3">
                      <Lightbulb className="text-purple-600" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900">Think Beyond the Box</h3>
                  </div>
                  <p className="text-gray-600 mb-4">Challenge your mind with innovative thinking puzzles and brain teasers!</p>
                  
                  <div className="space-y-3 mb-4">
                    <div className="bg-white rounded-lg p-3 border border-purple-100">
                      <h4 className="font-semibold text-sm text-gray-900 mb-1">Today's Brain Teaser</h4>
                      <p className="text-sm text-gray-600">"If you could design a school on Mars, what would be different?"</p>
                    </div>
                    <div className="bg-white rounded-lg p-3 border border-purple-100">
                      <h4 className="font-semibold text-sm text-gray-900 mb-1">Lateral Thinking Puzzle</h4>
                      <p className="text-sm text-gray-600">"Why might a mirror be the most honest teacher?"</p>
                    </div>
                  </div>
                  
                  <Button className="w-full bg-purple-600 hover:bg-purple-700">
                    Explore More Challenges
                  </Button>
                </CardContent>
              </Card>
            </Link>

            {/* Myth vs Truth */}
            <Link href="/myth-truth">
              <Card className="bg-gradient-to-br from-red-50 to-orange-50 border-red-100 hover-lift cursor-pointer">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center mr-3">
                      <CheckCircle className="text-red-600" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900">Myth vs Truth</h3>
                  </div>
                  <p className="text-gray-600 mb-4">Bust common myths and discover fascinating truths!</p>
                  
                  <div className="space-y-3 mb-4">
                    <div className="bg-white rounded-lg p-3 border border-red-100">
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="font-semibold text-sm text-gray-900">Lightning Never Strikes Twice?</h4>
                        <Badge variant="destructive" className="text-xs">MYTH</Badge>
                      </div>
                      <p className="text-sm text-gray-600">Empire State Building gets struck 25 times per year!</p>
                    </div>
                    <div className="bg-white rounded-lg p-3 border border-red-100">
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="font-semibold text-sm text-gray-900">Goldfish Memory is 3 Seconds?</h4>
                        <Badge variant="destructive" className="text-xs">MYTH</Badge>
                      </div>
                      <p className="text-sm text-gray-600">They can remember things for months!</p>
                    </div>
                  </div>
                  
                  <Button className="w-full bg-red-600 hover:bg-red-700">
                    Discover More Facts
                  </Button>
                </CardContent>
              </Card>
            </Link>
          </div>

          {/* Daily Life Questions Section */}
          <Card className="mb-8 border-gray-100">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mr-4">
                    <Globe className="text-green-600 text-xl" />
                  </div>
                  <div>
                    <CardTitle className="text-2xl">Daily Life Questions</CardTitle>
                    <p className="text-gray-600">Connect your studies to the real world!</p>
                  </div>
                </div>
                <Link href="/daily-life">
                  <Button variant="ghost" className="text-green-600 font-medium">
                    See All Questions
                  </Button>
                </Link>
              </div>
            </CardHeader>

            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {dailyLifeQuestions.slice(0, 3).map((question: any, index: number) => (
                  <Card key={question.id || index} className="bg-gradient-to-br from-green-50 to-blue-50 border-green-100">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-2">
                        <Badge className="bg-green-100 text-green-800">Mathematics</Badge>
                        <Heart className="text-gray-400 hover:text-red-500 cursor-pointer" size={16} />
                      </div>
                      <h4 className="font-semibold text-gray-900 mb-2">{question.question || "Why do pizza slices use geometry?"}</h4>
                      <p className="text-sm text-gray-600 mb-3">{question.realWorldConnection || "Discover how angles and circles make perfect pizza cuts!"}</p>
                      <Button variant="ghost" size="sm" className="text-green-600 p-0">
                        Explore Answer
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recent Activity & Statistics */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Recent Activity */}
            <Card className="lg:col-span-2 border-gray-100">
              <CardHeader>
                <CardTitle className="text-xl">Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivities.map((activity) => {
                    const Icon = activity.icon;
                    return (
                      <div key={activity.id} className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg">
                        <div className={`w-10 h-10 bg-${activity.color}-100 rounded-full flex items-center justify-center`}>
                          <Icon className={`text-${activity.color}-600`} size={20} />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-900 text-sm">{activity.title}</h4>
                          <p className="text-gray-600 text-xs">{activity.score ? `Scored ${activity.score} • ` : ''}{activity.time}</p>
                        </div>
                        <Badge variant="secondary" className="text-xs">
                          {activity.status}
                        </Badge>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Learning Statistics */}
            <Card className="border-gray-100">
              <CardHeader>
                <CardTitle className="text-xl">Learning Stats</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium text-gray-600">Weekly Target</span>
                      <span className="text-sm font-bold text-primary">7/10</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-primary h-2 rounded-full w-3/4"></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium text-gray-600">Quiz Accuracy</span>
                      <span className="text-sm font-bold text-secondary">87%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-secondary h-2 rounded-full w-5/6"></div>
                    </div>
                  </div>

                  <div className="pt-4 border-t">
                    <h4 className="font-semibold text-gray-900 mb-3">Achievements</h4>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Trophy className="text-yellow-500" size={16} />
                        <span className="text-sm text-gray-600">Math Wizard</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Clock className="text-orange-500" size={16} />
                        <span className="text-sm text-gray-600">7-Day Streak</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Lightbulb className="text-purple-500" size={16} />
                        <span className="text-sm text-gray-600">Creative Thinker</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
      
      <ChatbotWidget />
    </div>
  );
}
