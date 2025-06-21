import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import Header from "@/components/layout/header";
import Sidebar from "@/components/layout/sidebar";
import ChatbotWidget from "@/components/chatbot/chatbot-widget";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { 
  Globe, Search, RefreshCw, Heart, MessageCircle, 
  Calculator, FlaskRound, BookOpen, Languages, Target, TrendingUp 
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function DailyLife() {
  const [selectedGrade, setSelectedGrade] = useState("8");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("all");
  const [likedQuestions, setLikedQuestions] = useState<Record<string, boolean>>({});
  const { toast } = useToast();

  // Fetch subjects
  const { data: subjects = [] } = useQuery({
    queryKey: ["/api/subjects"],
  });

  // Fetch daily life questions
  const { data: dailyLifeQuestions = [], refetch: refetchQuestions } = useQuery({
    queryKey: ["/api/daily-life-questions", selectedSubject],
    queryFn: () => {
      const url = selectedSubject === "all" 
        ? "/api/daily-life-questions" 
        : `/api/daily-life-questions?subjectId=${selectedSubject}`;
      return fetch(url).then(res => res.json());
    },
  });

  // Generate new daily life question
  const generateQuestionMutation = useMutation({
    mutationFn: async () => {
      const subject = subjects.find((s: any) => s.id.toString() === selectedSubject);
      const response = await apiRequest("POST", "/api/generate-daily-life-question", {
        subject: subject?.name || "General",
        subjectId: selectedSubject === "all" ? subjects[0]?.id || 1 : parseInt(selectedSubject)
      });
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "New Question Generated!",
        description: "Discover how your studies connect to everyday life.",
      });
      refetchQuestions();
      queryClient.invalidateQueries({ queryKey: ["/api/daily-life-questions"] });
    },
  });

  const sampleQuestions = [
    {
      id: 1,
      question: "Why do pizza slices use geometry?",
      answer: "Pizza cutting is actually a perfect example of geometry in action! When we cut a pizza, we're creating sectors of a circle. The equal distribution of slices uses the concept of angles - if you want 8 equal slices, each slice represents 45 degrees (360° ÷ 8 = 45°). The crust forms the arc of each sector, and the cuts from center to edge are the radii. This is why pizza boxes are square but pizzas are round - it's the most efficient way to package a circular object while minimizing waste space.",
      subjectId: 1,
      realWorldConnection: "Geometry isn't just theoretical - it's used in food service, architecture, art, and even in satellite dishes and radar systems. Understanding angles and circles helps in everything from interior design to engineering.",
      subject: "Mathematics",
      likes: 42,
      discussions: 12
    },
    {
      id: 2,
      question: "Why do leaves change colors in autumn?",
      answer: "Leaf color change is a fascinating chemistry lesson! Leaves are green because of chlorophyll, which absorbs red and blue light for photosynthesis but reflects green light. In autumn, as daylight decreases and temperatures drop, trees stop producing chlorophyll. As the green chlorophyll breaks down, other pigments become visible: carotenoids (yellows and oranges) and anthocyanins (reds and purples). These pigments were always there, just hidden by the dominant green chlorophyll. It's like removing a green filter to reveal the other colors underneath!",
      subjectId: 2,
      realWorldConnection: "This process teaches us about photosynthesis, plant biology, and chemical pigments. The same principles apply to understanding why flamingos are pink (from their diet) and how different chemicals create colors in everything from food to cosmetics.",
      subject: "Science",
      likes: 38,
      discussions: 15
    },
    {
      id: 3,
      question: "Why do countries have different currencies?",
      answer: "Different currencies exist because each country wants to control its own economic policy. Having your own currency allows a government to adjust interest rates, control inflation, and respond to economic crises independently. It's like each country having its own economic 'toolkit.' Exchange rates between currencies fluctuate based on factors like economic stability, political conditions, trade relationships, and inflation rates. This is why some currencies are 'stronger' than others - it reflects the economic health and stability of that country.",
      subjectId: 3,
      realWorldConnection: "Understanding currency helps explain international trade, why some products cost different amounts in different countries, and how global economics work. It's essential for understanding news about trade wars, economic policies, and global business.",
      subject: "Social Science",
      likes: 29,
      discussions: 8
    },
    {
      id: 4,
      question: "Why do we use different verb tenses when telling stories?",
      answer: "Verb tenses are like a time machine for language! They help us navigate through different time periods in our stories and conversations. Past tense tells us what already happened, present tense describes what's happening now, and future tense predicts what will happen. In storytelling, we often mix tenses strategically - using past tense for the main narrative but switching to present tense for dramatic effect ('Suddenly, the door opens...'). This creates emotional impact and helps readers feel like they're experiencing events in real-time.",
      subjectId: 4,
      realWorldConnection: "Mastering verb tenses improves communication in all areas of life - from writing emails and reports to giving presentations and telling jokes. It's also crucial for learning other languages, as each language has its own tense system.",
      subject: "English",
      likes: 22,
      discussions: 6
    },
    {
      id: 5,
      question: "Why do we fold our hands while praying or greeting?",
      answer: "The gesture of folding hands (called 'Namaste' or 'Anjali Mudra') has deep cultural and practical significance. Historically, it showed that you carried no weapons, indicating peaceful intentions. In many cultures, it's believed that pressing palms together balances the left and right sides of the body and mind. The gesture also shows respect and humility - you're literally 'bowing' your hands. From a hygiene perspective, it's a non-contact greeting that prevents the spread of germs, which is why many cultures maintained this practice even before modern germ theory.",
      subjectId: 5,
      realWorldConnection: "Understanding cultural practices helps us appreciate diversity and develop cultural sensitivity. These gestures appear in international business, diplomacy, and global communication, making cultural literacy a valuable life skill.",
      subject: "Hindi",
      likes: 35,
      discussions: 18
    },
    {
      id: 6,
      question: "Why do Sanskrit shlokas have specific rhythms and patterns?",
      answer: "Sanskrit shlokas follow specific meters (called 'chhandas') because rhythm and pattern make them easier to memorize and recite. Before written texts were common, knowledge was passed down orally, and rhythmic patterns helped ensure accuracy across generations. The patterns also create a meditative quality - the repetitive rhythm can induce a calm, focused mental state. Each meter has rules about syllable length and stress, similar to how music has beats and measures. This isn't just poetry; it's a sophisticated system for preserving and transmitting knowledge.",
      subjectId: 6,
      realWorldConnection: "These principles appear in modern rap music, advertising jingles, and even in learning techniques like mnemonics. Understanding rhythm and pattern helps in music, poetry, public speaking, and memory techniques used in all subjects.",
      subject: "Sanskrit",
      likes: 18,
      discussions: 4
    }
  ];

  const handleGenerateQuestion = () => {
    generateQuestionMutation.mutate();
  };

  const toggleLike = (questionId: string) => {
    setLikedQuestions(prev => ({ ...prev, [questionId]: !prev[questionId] }));
  };

  const currentQuestions = dailyLifeQuestions.length > 0 ? dailyLifeQuestions : sampleQuestions;

  const filteredQuestions = currentQuestions.filter((question: any) => {
    const matchesSearch = question.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         question.answer.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         question.realWorldConnection.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSubject = selectedSubject === "all" || question.subjectId.toString() === selectedSubject;
    return matchesSearch && matchesSubject;
  });

  const getSubjectIcon = (subjectId: number) => {
    const subjectIcons = {
      1: Calculator, // Mathematics
      2: FlaskRound,      // Science
      3: Globe,      // Social Science
      4: BookOpen,   // English
      5: Languages,  // Hindi
      6: BookOpen,   // Sanskrit
    };
    return subjectIcons[subjectId as keyof typeof subjectIcons] || BookOpen;
  };

  const getSubjectColor = (subjectId: number) => {
    const subjectColors = {
      1: "blue",    // Mathematics
      2: "green",   // Science
      3: "yellow",  // Social Science
      4: "purple",  // English
      5: "orange",  // Hindi
      6: "red",     // Sanskrit
    };
    return subjectColors[subjectId as keyof typeof subjectColors] || "gray";
  };

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
              <Globe className="text-primary" size={32} />
              <h1 className="text-3xl font-bold text-gray-900">Daily Life Questions</h1>
            </div>
            <p className="text-gray-600">Connect your studies to the real world around you</p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardContent className="p-6 text-center">
                <Target className="mx-auto h-8 w-8 text-green-500 mb-2" />
                <div className="text-2xl font-bold text-gray-900">{filteredQuestions.length}</div>
                <p className="text-sm text-gray-600">Questions Available</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center">
                <Heart className="mx-auto h-8 w-8 text-red-500 mb-2" />
                <div className="text-2xl font-bold text-gray-900">
                  {filteredQuestions.reduce((sum: number, q: any) => sum + (q.likes || 0), 0)}
                </div>
                <p className="text-sm text-gray-600">Total Likes</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center">
                <MessageCircle className="mx-auto h-8 w-8 text-blue-500 mb-2" />
                <div className="text-2xl font-bold text-gray-900">
                  {filteredQuestions.reduce((sum: number, q: any) => sum + (q.discussions || 0), 0)}
                </div>
                <p className="text-sm text-gray-600">Discussions</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center">
                <TrendingUp className="mx-auto h-8 w-8 text-purple-500 mb-2" />
                <div className="text-2xl font-bold text-gray-900">92%</div>
                <p className="text-sm text-gray-600">Satisfaction Rate</p>
              </CardContent>
            </Card>
          </div>

          {/* Controls */}
          <Card className="mb-8">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  <Input
                    placeholder="Search questions about daily life..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                
                <Select value={selectedSubject} onValueChange={setSelectedSubject}>
                  <SelectTrigger className="w-full md:w-48">
                    <SelectValue placeholder="All Subjects" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Subjects</SelectItem>
                    {subjects.map((subject: any) => (
                      <SelectItem key={subject.id} value={subject.id.toString()}>
                        {subject.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Button 
                  onClick={handleGenerateQuestion}
                  disabled={generateQuestionMutation.isPending}
                  className="flex items-center space-x-2"
                >
                  {generateQuestionMutation.isPending ? (
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  ) : (
                    <RefreshCw size={16} />
                  )}
                  <span>New Question</span>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Questions Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredQuestions.map((question: any) => {
              const SubjectIcon = getSubjectIcon(question.subjectId);
              const subjectColor = getSubjectColor(question.subjectId);
              const isLiked = likedQuestions[question.id];
              
              return (
                <Card key={question.id} className={cn(
                  "border-l-4 hover-lift",
                  `border-l-${subjectColor}-500`
                )}>
                  <CardHeader>
                    <div className="flex items-start justify-between mb-2">
                      <Badge className={cn(
                        `bg-${subjectColor}-100 text-${subjectColor}-800 hover:bg-${subjectColor}-100`
                      )}>
                        <SubjectIcon size={14} className="mr-1" />
                        {question.subject || subjects.find((s: any) => s.id === question.subjectId)?.name}
                      </Badge>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => toggleLike(question.id)}
                        className="p-1"
                      >
                        <Heart 
                          size={16} 
                          className={cn(
                            isLiked ? "text-red-500 fill-red-500" : "text-gray-400 hover:text-red-500"
                          )}
                        />
                      </Button>
                    </div>
                    <CardTitle className="text-lg">{question.question}</CardTitle>
                  </CardHeader>
                  
                  <CardContent>
                    <div className="space-y-4">
                      <div className="bg-gray-50 rounded-lg p-4">
                        <h4 className="font-semibold text-gray-900 mb-2">💡 Answer:</h4>
                        <p className="text-gray-700 text-sm leading-relaxed">{question.answer}</p>
                      </div>
                      
                      <div className={cn(
                        "rounded-lg p-4 border-l-4",
                        `bg-${subjectColor}-50 border-l-${subjectColor}-500`
                      )}>
                        <h4 className={cn(
                          "font-semibold mb-2 flex items-center space-x-2",
                          `text-${subjectColor}-900`
                        )}>
                          <Globe size={16} />
                          <span>Real-World Connection:</span>
                        </h4>
                        <p className={cn(
                          "text-sm leading-relaxed",
                          `text-${subjectColor}-800`
                        )}>
                          {question.realWorldConnection}
                        </p>
                      </div>

                      <div className="flex items-center justify-between pt-2">
                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                          <div className="flex items-center space-x-1">
                            <Heart size={14} />
                            <span>{(question.likes || 0) + (isLiked ? 1 : 0)} likes</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <MessageCircle size={14} />
                            <span>{question.discussions || 0} discussions</span>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          <Button variant="outline" size="sm">
                            Share
                          </Button>
                          <Button variant="outline" size="sm">
                            Discuss
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* No Results */}
          {filteredQuestions.length === 0 && (
            <Card>
              <CardContent className="text-center py-12">
                <Search className="mx-auto h-16 w-16 text-gray-400 mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No questions found</h3>
                <p className="text-gray-600 mb-4">
                  Try adjusting your search terms or generate some new questions.
                </p>
                <Button onClick={handleGenerateQuestion} disabled={generateQuestionMutation.isPending}>
                  Generate New Questions
                </Button>
              </CardContent>
            </Card>
          )}

          {/* Educational Tip */}
          <Card className="mt-8 bg-gradient-to-r from-blue-50 to-green-50 border-blue-200">
            <CardContent className="p-6">
              <div className="flex items-start space-x-3">
                <Lightbulb className="text-blue-600 flex-shrink-0 mt-1" size={24} />
                <div>
                  <h3 className="font-semibold text-blue-900 mb-2">🌟 Learning Tip</h3>
                  <p className="text-blue-800 text-sm leading-relaxed">
                    The best learning happens when you can connect new knowledge to things you already know and experience daily. 
                    Try to find these connections in everything you study - ask yourself "How does this apply to my life?" 
                    or "Where have I seen this before?" This makes learning more meaningful and memorable!
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
      
      <ChatbotWidget />
    </div>
  );
}
