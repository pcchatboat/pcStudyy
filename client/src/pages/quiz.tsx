import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Header from "@/components/layout/header";
import Sidebar from "@/components/layout/sidebar";
import ChatbotWidget from "@/components/chatbot/chatbot-widget";
import QuizGenerator from "@/components/quiz-generator";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Brain, Trophy, Clock, Target, TrendingUp } from "lucide-react";

export default function Quiz() {
  const [selectedGrade, setSelectedGrade] = useState("8");
  const [selectedSubject, setSelectedSubject] = useState("");
  const [selectedChapter, setSelectedChapter] = useState("");
  const [showQuiz, setShowQuiz] = useState(false);

  // Fetch subjects
  const { data: subjects = [] } = useQuery({
    queryKey: ["/api/subjects"],
  });

  const handleStartCustomQuiz = () => {
    if (selectedSubject) {
      setShowQuiz(true);
    }
  };

  // Mock quiz history data
  const recentQuizzes = [
    {
      id: 1,
      subject: "Mathematics",
      score: 85,
      totalQuestions: 10,
      timeSpent: "8:30",
      date: "2 hours ago",
    },
    {
      id: 2,
      subject: "Science",
      score: 92,
      totalQuestions: 8,
      timeSpent: "6:45",
      date: "Yesterday",
    },
    {
      id: 3,
      subject: "English",
      score: 78,
      totalQuestions: 12,
      timeSpent: "12:15",
      date: "2 days ago",
    },
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
          {/* Header Section */}
          <div className="mb-8">
            <div className="flex items-center space-x-3 mb-2">
              <Brain className="text-primary" size={32} />
              <h1 className="text-3xl font-bold text-gray-900">Quiz Center</h1>
            </div>
            <p className="text-gray-600">Test your knowledge with AI-generated quizzes</p>
          </div>

          {!showQuiz ? (
            <>
              {/* Quiz Options */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                {/* Quick Quiz */}
                <Card className="border-2 border-primary/20 hover:border-primary/40 transition-colors">
                  <CardHeader>
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                        <Brain className="text-primary" size={24} />
                      </div>
                      <div>
                        <CardTitle>Quick Quiz</CardTitle>
                        <p className="text-sm text-gray-600">5 random questions from mixed topics</p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="font-medium">Duration:</span>
                          <p className="text-gray-600">5-10 minutes</p>
                        </div>
                        <div>
                          <span className="font-medium">Difficulty:</span>
                          <p className="text-gray-600">Mixed</p>
                        </div>
                      </div>
                      <Button 
                        className="w-full" 
                        onClick={() => {
                          setSelectedSubject("General");
                          setSelectedChapter("Mixed Topics");
                          setShowQuiz(true);
                        }}
                      >
                        Start Quick Quiz
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                {/* Custom Quiz */}
                <Card className="border-2 border-secondary/20 hover:border-secondary/40 transition-colors">
                  <CardHeader>
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center">
                        <Target className="text-secondary" size={24} />
                      </div>
                      <div>
                        <CardTitle>Custom Quiz</CardTitle>
                        <p className="text-sm text-gray-600">Choose your subject and chapter</p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <Select value={selectedSubject} onValueChange={setSelectedSubject}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select Subject" />
                        </SelectTrigger>
                        <SelectContent>
                          {subjects.map((subject: any) => (
                            <SelectItem key={subject.id} value={subject.name}>
                              {subject.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>

                      <Select value={selectedChapter} onValueChange={setSelectedChapter}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select Chapter (Optional)" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Chapter 1">Chapter 1</SelectItem>
                          <SelectItem value="Chapter 2">Chapter 2</SelectItem>
                          <SelectItem value="Chapter 3">Chapter 3</SelectItem>
                          <SelectItem value="Mixed">Mixed Chapters</SelectItem>
                        </SelectContent>
                      </Select>

                      <Button 
                        className="w-full" 
                        onClick={handleStartCustomQuiz}
                        disabled={!selectedSubject}
                      >
                        Create Custom Quiz
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Quiz Statistics */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                <Card>
                  <CardContent className="p-6 text-center">
                    <Trophy className="mx-auto h-8 w-8 text-yellow-500 mb-2" />
                    <div className="text-2xl font-bold text-gray-900">87%</div>
                    <p className="text-sm text-gray-600">Average Score</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6 text-center">
                    <Target className="mx-auto h-8 w-8 text-green-500 mb-2" />
                    <div className="text-2xl font-bold text-gray-900">24</div>
                    <p className="text-sm text-gray-600">Quizzes Taken</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6 text-center">
                    <Clock className="mx-auto h-8 w-8 text-blue-500 mb-2" />
                    <div className="text-2xl font-bold text-gray-900">8:45</div>
                    <p className="text-sm text-gray-600">Avg. Time</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6 text-center">
                    <TrendingUp className="mx-auto h-8 w-8 text-purple-500 mb-2" />
                    <div className="text-2xl font-bold text-gray-900">+12%</div>
                    <p className="text-sm text-gray-600">Improvement</p>
                  </CardContent>
                </Card>
              </div>

              {/* Recent Quiz History */}
              <Card>
                <CardHeader>
                  <CardTitle>Recent Quizzes</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentQuizzes.map((quiz) => (
                      <div key={quiz.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div className="flex items-center space-x-4">
                          <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                            <Brain className="text-primary" size={20} />
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-900">{quiz.subject} Quiz</h4>
                            <p className="text-sm text-gray-600">
                              {quiz.totalQuestions} questions • {quiz.timeSpent} • {quiz.date}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-lg font-bold text-primary">{quiz.score}%</div>
                          <Badge variant={quiz.score >= 80 ? "default" : quiz.score >= 60 ? "secondary" : "destructive"}>
                            {quiz.score >= 80 ? "Excellent" : quiz.score >= 60 ? "Good" : "Needs Work"}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </>
          ) : (
            <div className="max-w-3xl mx-auto">
              <div className="mb-6">
                <Button 
                  variant="ghost" 
                  onClick={() => setShowQuiz(false)}
                  className="mb-4"
                >
                  ← Back to Quiz Options
                </Button>
              </div>
              
              <QuizGenerator 
                subject={selectedSubject}
                grade={parseInt(selectedGrade)}
                chapter={selectedChapter || "General"}
              />
            </div>
          )}
        </main>
      </div>
      
      <ChatbotWidget />
    </div>
  );
}
