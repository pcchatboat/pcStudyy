import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import Header from "@/components/layout/header";
import Sidebar from "@/components/layout/sidebar";
import ChatbotWidget from "@/components/chatbot/chatbot-widget";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { 
  CheckCircle, X, Search, RefreshCw, 
  Scale, BookOpen, Lightbulb, TrendingUp 
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function MythTruth() {
  const [selectedGrade, setSelectedGrade] = useState("8");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const { toast } = useToast();

  // Fetch myth facts
  const { data: mythFacts = [], refetch: refetchMythFacts } = useQuery({
    queryKey: ["/api/myth-facts"],
  });

  // Generate new myth fact
  const generateMythFactMutation = useMutation({
    mutationFn: async () => {
      const response = await apiRequest("POST", "/api/generate-myth-fact");
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "New Myth/Fact Generated!",
        description: "Discover something surprising and educational.",
      });
      refetchMythFacts();
      queryClient.invalidateQueries({ queryKey: ["/api/myth-facts"] });
    },
  });

  const sampleMythFacts = [
    {
      id: 1,
      title: "Lightning Never Strikes Twice",
      statement: "Lightning never strikes the same place twice",
      isMyth: true,
      explanation: "This is completely false! Lightning frequently strikes the same location multiple times. The Empire State Building in New York gets struck by lightning about 25 times per year. Lightning tends to strike tall, pointed, isolated objects, so these locations are repeatedly struck during storms. The phrase exists because people want to believe that lightning strikes are random, but they actually follow predictable patterns based on geography and weather conditions.",
      category: "science"
    },
    {
      id: 2,
      title: "Goldfish Memory Span",
      statement: "Goldfish only have a 3-second memory span",
      isMyth: true,
      explanation: "Goldfish actually have much better memories than people think! Studies have shown that goldfish can remember things for at least 3 months, and some research suggests they can remember for much longer. They can be trained to respond to different colors, sounds, and cues. This myth probably exists because people want to justify keeping goldfish in small bowls, but goldfish are actually quite intelligent and need proper space and stimulation.",
      category: "science"
    },
    {
      id: 3,
      title: "Great Wall of China Visibility",
      statement: "The Great Wall of China is visible from space",
      isMyth: true,
      explanation: "This is a persistent myth, but it's not true! The Great Wall of China is not visible from space with the naked eye. While it's long (over 13,000 miles), it's only about 15-25 feet wide, making it far too narrow to see from space. Astronauts have confirmed that you cannot see it without special equipment. This myth likely persists because the wall is such an impressive human achievement that people want to believe it's visible from space.",
      category: "history"
    },
    {
      id: 4,
      title: "Reading in Low Light",
      statement: "Reading in dim light will damage your eyesight permanently",
      isMyth: true,
      explanation: "Reading in low light won't cause permanent damage to your eyes, though it can cause temporary eye strain, fatigue, and headaches. Your eyes have to work harder to focus in dim conditions, which makes them tired, but this doesn't cause lasting harm. However, good lighting does make reading more comfortable and reduces eye strain. This myth might persist because parents want to encourage good reading habits and proper lighting.",
      category: "general"
    },
    {
      id: 5,
      title: "Einstein's School Performance",
      statement: "Albert Einstein failed mathematics in school",
      isMyth: true,
      explanation: "Einstein never failed math! In fact, he mastered calculus before he was 15 years old. This myth might have started because of confusion about grading systems - in Switzerland, where Einstein attended school, 6 was the highest grade (like an A+), while in Germany, 1 was the highest. Einstein actually excelled in mathematics and physics from a young age. He once said, 'Before I was fifteen I had mastered both differential and integral calculus.'",
      category: "academic"
    },
    {
      id: 6,
      title: "Brain Usage Percentage",
      statement: "Humans only use 10% of their brain",
      isMyth: true,
      explanation: "This is completely false! Brain imaging technology shows that humans use virtually all of their brain, even during simple tasks. Different areas of the brain are active at different times, but over the course of a day, nearly 100% of the brain is used. Even during sleep, many areas remain active. This myth is popular in movies and self-help books because it suggests we have vast untapped potential, but the reality is that our brains are already remarkably efficient.",
      category: "science"
    }
  ];

  const categories = [
    { id: "all", name: "All Categories", count: sampleMythFacts.length },
    { id: "science", name: "Science", count: sampleMythFacts.filter(f => f.category === "science").length },
    { id: "history", name: "History", count: sampleMythFacts.filter(f => f.category === "history").length },
    { id: "academic", name: "Academic", count: sampleMythFacts.filter(f => f.category === "academic").length },
    { id: "general", name: "General", count: sampleMythFacts.filter(f => f.category === "general").length }
  ];

  const handleGenerateMythFact = () => {
    generateMythFactMutation.mutate();
  };

  const currentMythFacts = mythFacts.length > 0 ? mythFacts : sampleMythFacts;

  const filteredMythFacts = currentMythFacts.filter((mythFact: any) => {
    const matchesSearch = mythFact.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         mythFact.statement.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         mythFact.explanation.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || mythFact.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const mythCount = filteredMythFacts.filter((f: any) => f.isMyth).length;
  const factCount = filteredMythFacts.filter((f: any) => !f.isMyth).length;

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
              <Scale className="text-primary" size={32} />
              <h1 className="text-3xl font-bold text-gray-900">Myth vs Truth</h1>
            </div>
            <p className="text-gray-600">Discover fascinating facts and bust common myths</p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardContent className="p-6 text-center">
                <X className="mx-auto h-8 w-8 text-red-500 mb-2" />
                <div className="text-2xl font-bold text-gray-900">{mythCount}</div>
                <p className="text-sm text-gray-600">Myths Busted</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center">
                <CheckCircle className="mx-auto h-8 w-8 text-green-500 mb-2" />
                <div className="text-2xl font-bold text-gray-900">{factCount}</div>
                <p className="text-sm text-gray-600">Facts Confirmed</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center">
                <BookOpen className="mx-auto h-8 w-8 text-blue-500 mb-2" />
                <div className="text-2xl font-bold text-gray-900">{filteredMythFacts.length}</div>
                <p className="text-sm text-gray-600">Total Entries</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center">
                <TrendingUp className="mx-auto h-8 w-8 text-purple-500 mb-2" />
                <div className="text-2xl font-bold text-gray-900">95%</div>
                <p className="text-sm text-gray-600">Accuracy Rate</p>
              </CardContent>
            </Card>
          </div>

          {/* Controls */}
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <Input
                  placeholder="Search myths and facts..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            
            <div className="flex gap-2 overflow-x-auto">
              {categories.map((category) => (
                <Button
                  key={category.id}
                  variant={selectedCategory === category.id ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category.id)}
                  className="whitespace-nowrap"
                >
                  {category.name} ({category.count})
                </Button>
              ))}
            </div>

            <Button 
              onClick={handleGenerateMythFact}
              disabled={generateMythFactMutation.isPending}
              className="flex items-center space-x-2"
            >
              {generateMythFactMutation.isPending ? (
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
              ) : (
                <RefreshCw size={16} />
              )}
              <span>Generate New</span>
            </Button>
          </div>

          {/* Myth Facts Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredMythFacts.map((mythFact: any) => (
              <Card key={mythFact.id} className={cn(
                "border-l-4 hover-lift",
                mythFact.isMyth ? "border-l-red-500" : "border-l-green-500"
              )}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-lg mb-2">{mythFact.title}</CardTitle>
                      <div className="flex items-center space-x-2">
                        <Badge 
                          variant={mythFact.isMyth ? "destructive" : "default"}
                          className={cn(
                            "font-semibold",
                            mythFact.isMyth 
                              ? "bg-red-100 text-red-800 hover:bg-red-100" 
                              : "bg-green-100 text-green-800 hover:bg-green-100"
                          )}
                        >
                          {mythFact.isMyth ? "MYTH" : "FACT"}
                        </Badge>
                        <Badge variant="outline" className="capitalize">
                          {mythFact.category}
                        </Badge>
                      </div>
                    </div>
                    <div className={cn(
                      "w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0",
                      mythFact.isMyth ? "bg-red-100" : "bg-green-100"
                    )}>
                      {mythFact.isMyth ? (
                        <X className="text-red-600" size={24} />
                      ) : (
                        <CheckCircle className="text-green-600" size={24} />
                      )}
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent>
                  <div className="space-y-4">
                    <div className="bg-gray-50 rounded-lg p-4">
                      <h4 className="font-semibold text-gray-900 mb-2">Statement:</h4>
                      <p className="text-gray-700 italic">"{mythFact.statement}"</p>
                    </div>
                    
                    <div className={cn(
                      "rounded-lg p-4 border-l-4",
                      mythFact.isMyth 
                        ? "bg-red-50 border-l-red-500" 
                        : "bg-green-50 border-l-green-500"
                    )}>
                      <div className="flex items-center space-x-2 mb-2">
                        <Lightbulb size={16} className={mythFact.isMyth ? "text-red-600" : "text-green-600"} />
                        <h4 className={cn(
                          "font-semibold",
                          mythFact.isMyth ? "text-red-900" : "text-green-900"
                        )}>
                          {mythFact.isMyth ? "Why it's a myth:" : "Why it's true:"}
                        </h4>
                      </div>
                      <p className={cn(
                        "text-sm leading-relaxed",
                        mythFact.isMyth ? "text-red-800" : "text-green-800"
                      )}>
                        {mythFact.explanation}
                      </p>
                    </div>

                    <div className="flex items-center space-x-3 pt-2">
                      <Button variant="outline" size="sm">
                        Share
                      </Button>
                      <Button variant="outline" size="sm">
                        Learn More
                      </Button>
                      <Button variant="outline" size="sm">
                        Related Facts
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* No Results */}
          {filteredMythFacts.length === 0 && (
            <Card>
              <CardContent className="text-center py-12">
                <Search className="mx-auto h-16 w-16 text-gray-400 mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No results found</h3>
                <p className="text-gray-600 mb-4">
                  Try adjusting your search terms or category filter.
                </p>
                <Button onClick={() => {
                  setSearchTerm("");
                  setSelectedCategory("all");
                }}>
                  Clear Filters
                </Button>
              </CardContent>
            </Card>
          )}

          {/* Educational Note */}
          <Card className="mt-8 bg-blue-50 border-blue-200">
            <CardContent className="p-6">
              <div className="flex items-start space-x-3">
                <BookOpen className="text-blue-600 flex-shrink-0 mt-1" size={24} />
                <div>
                  <h3 className="font-semibold text-blue-900 mb-2">💡 Educational Note</h3>
                  <p className="text-blue-800 text-sm leading-relaxed">
                    Critical thinking is essential in our information age. Always verify claims with reliable sources, 
                    understand the difference between correlation and causation, and remember that scientific knowledge 
                    evolves as we learn more. The best way to fight misinformation is through education and curiosity!
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
