import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import Header from "@/components/layout/header";
import Sidebar from "@/components/layout/sidebar";
import ChatbotWidget from "@/components/chatbot/chatbot-widget";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { 
  Palette, PenTool, Lightbulb, Image, Music, 
  FileText, Sparkles, RefreshCw, Heart, Star 
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function CreativityHub() {
  const [selectedGrade, setSelectedGrade] = useState("8");
  const [activeCategory, setActiveCategory] = useState("writing");
  const { toast } = useToast();

  // Fetch creative tasks
  const { data: creativeTasks = [], refetch: refetchTasks } = useQuery({
    queryKey: ["/api/creative-tasks", activeCategory],
    queryFn: () => fetch(`/api/creative-tasks?category=${activeCategory}`).then(res => res.json()),
  });

  // Generate new creative task
  const generateTaskMutation = useMutation({
    mutationFn: async (category: string) => {
      const response = await apiRequest("POST", "/api/generate-creative-task", { category });
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "New Task Generated!",
        description: "A fresh creative challenge awaits you.",
      });
      refetchTasks();
      queryClient.invalidateQueries({ queryKey: ["/api/creative-tasks"] });
    },
  });

  const categories = [
    {
      id: "writing",
      name: "Creative Writing",
      icon: PenTool,
      color: "blue",
      description: "Stories, poems, and creative expressions"
    },
    {
      id: "art",
      name: "Art & Design",
      icon: Palette,
      color: "purple",
      description: "Drawing, painting, and visual arts"
    },
    {
      id: "project",
      name: "Project Ideas",
      icon: Lightbulb,
      color: "green",
      description: "Science projects and experiments"
    }
  ];

  const sampleTasks = {
    writing: [
      {
        id: 1,
        title: "Time Travel Adventure",
        description: "Write a story about visiting ancient civilizations",
        prompt: "You've discovered a time machine in your school library. Where would you go first and what would you learn about history that textbooks don't tell you?",
        difficulty: "medium",
        likes: 42
      },
      {
        id: 2,
        title: "Emotion Colors",
        description: "Describe emotions using only colors and textures",
        prompt: "If happiness was a color and sadness had a texture, how would you paint your emotions from this week?",
        difficulty: "easy",
        likes: 28
      }
    ],
    art: [
      {
        id: 3,
        title: "Math in Nature",
        description: "Create art inspired by mathematical patterns in nature",
        prompt: "Find patterns in nature (spirals, fractals, symmetry) and create artwork that combines these mathematical concepts with natural beauty.",
        difficulty: "hard",
        likes: 35
      },
      {
        id: 4,
        title: "Future City Design",
        description: "Design a sustainable city of the future",
        prompt: "Design a city that solves current environmental problems. What would transportation, buildings, and energy systems look like?",
        difficulty: "medium",
        likes: 51
      }
    ],
    project: [
      {
        id: 5,
        title: "Kitchen Chemistry",
        description: "Safe chemistry experiments using household items",
        prompt: "Create a science experiment using only items from your kitchen. Document the chemical reactions and explain the science behind them.",
        difficulty: "medium",
        likes: 67
      },
      {
        id: 6,
        title: "Solar System Model",
        description: "Build a scale model showing planetary distances",
        prompt: "Create a model that accurately represents the distances between planets. What materials would you use and how would you demonstrate scale?",
        difficulty: "hard",
        likes: 39
      }
    ]
  };

  const handleGenerateTask = () => {
    generateTaskMutation.mutate(activeCategory);
  };

  const currentTasks = creativeTasks.length > 0 ? creativeTasks : sampleTasks[activeCategory as keyof typeof sampleTasks] || [];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "easy": return "bg-green-100 text-green-800";
      case "medium": return "bg-yellow-100 text-yellow-800";
      case "hard": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getCategoryIcon = (category: string) => {
    const cat = categories.find(c => c.id === category);
    return cat ? cat.icon : Lightbulb;
  };

  const getCategoryColor = (category: string) => {
    const cat = categories.find(c => c.id === category);
    return cat ? cat.color : "gray";
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
              <Palette className="text-primary" size={32} />
              <h1 className="text-3xl font-bold text-gray-900">Creativity Hub</h1>
            </div>
            <p className="text-gray-600">Unleash your creativity with inspiring projects and challenges</p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardContent className="p-6 text-center">
                <PenTool className="mx-auto h-8 w-8 text-blue-500 mb-2" />
                <div className="text-2xl font-bold text-gray-900">12</div>
                <p className="text-sm text-gray-600">Stories Written</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center">
                <Image className="mx-auto h-8 w-8 text-purple-500 mb-2" />
                <div className="text-2xl font-bold text-gray-900">8</div>
                <p className="text-sm text-gray-600">Artworks Created</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center">
                <Lightbulb className="mx-auto h-8 w-8 text-green-500 mb-2" />
                <div className="text-2xl font-bold text-gray-900">5</div>
                <p className="text-sm text-gray-600">Projects Completed</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center">
                <Star className="mx-auto h-8 w-8 text-yellow-500 mb-2" />
                <div className="text-2xl font-bold text-gray-900">4.8</div>
                <p className="text-sm text-gray-600">Avg Rating</p>
              </CardContent>
            </Card>
          </div>

          {/* Category Tabs */}
          <Tabs value={activeCategory} onValueChange={setActiveCategory} className="mb-8">
            <TabsList className="grid w-full grid-cols-3">
              {categories.map((category) => {
                const Icon = category.icon;
                return (
                  <TabsTrigger key={category.id} value={category.id} className="flex items-center space-x-2">
                    <Icon size={16} />
                    <span>{category.name}</span>
                  </TabsTrigger>
                );
              })}
            </TabsList>

            {categories.map((category) => (
              <TabsContent key={category.id} value={category.id}>
                <Card className={cn(
                  "mb-6 border-2",
                  `border-${category.color}-200 bg-gradient-to-r from-${category.color}-50 to-${category.color}-100/50`
                )}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className={cn(
                          "w-12 h-12 rounded-lg flex items-center justify-center",
                          `bg-${category.color}-100`
                        )}>
                          <category.icon className={`text-${category.color}-600`} size={24} />
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-gray-900">{category.name}</h3>
                          <p className="text-gray-600">{category.description}</p>
                        </div>
                      </div>
                      <Button 
                        onClick={handleGenerateTask}
                        disabled={generateTaskMutation.isPending}
                        className="flex items-center space-x-2"
                      >
                        {generateTaskMutation.isPending ? (
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                        ) : (
                          <RefreshCw size={16} />
                        )}
                        <span>New Task</span>
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                {/* Tasks Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {currentTasks.map((task: any) => (
                    <Card key={task.id} className="hover-lift">
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div className="flex items-center space-x-2">
                            <Sparkles className={`text-${category.color}-600`} size={20} />
                            <CardTitle className="text-lg">{task.title}</CardTitle>
                          </div>
                          <Badge className={getDifficultyColor(task.difficulty)}>
                            {task.difficulty}
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-gray-600 mb-4">{task.description}</p>
                        
                        <div className="bg-gray-50 rounded-lg p-4 mb-4">
                          <h4 className="font-semibold text-gray-900 mb-2">Challenge:</h4>
                          <p className="text-sm text-gray-700">{task.prompt}</p>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4">
                            <Button variant="outline" size="sm" className="flex items-center space-x-1">
                              <Heart size={14} />
                              <span>{task.likes || 0}</span>
                            </Button>
                            <Button variant="outline" size="sm">
                              Share
                            </Button>
                          </div>
                          <Button className={`bg-${category.color}-600 hover:bg-${category.color}-700`}>
                            Start Creating
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {currentTasks.length === 0 && (
                  <Card>
                    <CardContent className="text-center py-12">
                      <category.icon className="mx-auto h-16 w-16 text-gray-400 mb-4" />
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">No tasks available</h3>
                      <p className="text-gray-600 mb-4">Generate some creative challenges to get started!</p>
                      <Button onClick={handleGenerateTask} disabled={generateTaskMutation.isPending}>
                        Generate Tasks
                      </Button>
                    </CardContent>
                  </Card>
                )}
              </TabsContent>
            ))}
          </Tabs>

          {/* Creative Showcase */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Star className="text-yellow-500" size={24} />
                <span>Featured Creations</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg p-4 border border-blue-100">
                  <div className="flex items-center space-x-2 mb-2">
                    <PenTool size={16} className="text-blue-600" />
                    <span className="text-sm font-medium text-blue-800">Story of the Week</span>
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-1">"The Library Time Machine"</h4>
                  <p className="text-sm text-gray-600">A captivating tale about discovering history through unexpected journeys...</p>
                </div>

                <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg p-4 border border-purple-100">
                  <div className="flex items-center space-x-2 mb-2">
                    <Palette size={16} className="text-purple-600" />
                    <span className="text-sm font-medium text-purple-800">Art Spotlight</span>
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-1">"Fibonacci in Flowers"</h4>
                  <p className="text-sm text-gray-600">A beautiful representation of mathematical patterns found in nature...</p>
                </div>

                <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg p-4 border border-green-100">
                  <div className="flex items-center space-x-2 mb-2">
                    <Lightbulb size={16} className="text-green-600" />
                    <span className="text-sm font-medium text-green-800">Project Winner</span>
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-1">"Rainbow pH Indicator"</h4>
                  <p className="text-sm text-gray-600">An innovative chemistry project using natural ingredients...</p>
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
