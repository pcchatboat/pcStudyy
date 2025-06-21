import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import Header from "@/components/layout/header";
import Sidebar from "@/components/layout/sidebar";
import ChatbotWidget from "@/components/chatbot/chatbot-widget";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { 
  Lightbulb, Brain, Zap, Eye, ChevronDown, 
  RefreshCw, Trophy, Target, Puzzle, Sparkles 
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function ThinkBeyond() {
  const [selectedGrade, setSelectedGrade] = useState("8");
  const [activeType, setActiveType] = useState("brain_teaser");
  const [openHints, setOpenHints] = useState<Record<string, boolean>>({});
  const [openSolutions, setOpenSolutions] = useState<Record<string, boolean>>({});
  const { toast } = useToast();

  // Fetch thinking challenges
  const { data: challenges = [], refetch: refetchChallenges } = useQuery({
    queryKey: ["/api/thinking-challenges", activeType],
    queryFn: () => fetch(`/api/thinking-challenges?type=${activeType}`).then(res => res.json()),
  });

  // Generate new challenge
  const generateChallengeMutation = useMutation({
    mutationFn: async (type: string) => {
      const response = await apiRequest("POST", "/api/generate-thinking-challenge", { type });
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "New Challenge Generated!",
        description: "A fresh thinking challenge is ready for you.",
      });
      refetchChallenges();
      queryClient.invalidateQueries({ queryKey: ["/api/thinking-challenges"] });
    },
  });

  const challengeTypes = [
    {
      id: "brain_teaser",
      name: "Brain Teasers",
      icon: Brain,
      color: "purple",
      description: "Mind-bending puzzles and logical challenges"
    },
    {
      id: "lateral_thinking",
      name: "Lateral Thinking",
      icon: Eye,
      color: "blue",
      description: "Creative problem-solving from different angles"
    },
    {
      id: "innovation",
      name: "Innovation",
      icon: Zap,
      color: "green",
      description: "Future-thinking and creative solutions"
    }
  ];

  const sampleChallenges = {
    brain_teaser: [
      {
        id: 1,
        title: "The Missing Day",
        description: "A calendar puzzle that challenges your logical thinking",
        hint: "Think about what makes each month unique",
        solution: "February is the only month that can have exactly 4 weeks (28 days). In a leap year, it has 29 days, but in regular years, it's the only month that fits perfectly into 4 weeks.",
        type: "brain_teaser"
      },
      {
        id: 2,
        title: "The School Bell Mystery",
        description: "The school bell rings every hour, but students only hear it 8 times during school hours. The bell rings at 8 AM when school starts and at 4 PM when school ends. How many times does it actually ring between 8 AM and 4 PM?",
        hint: "Count carefully - include both the start and end times",
        solution: "The bell rings 9 times: at 8 AM, 9 AM, 10 AM, 11 AM, 12 PM, 1 PM, 2 PM, 3 PM, and 4 PM. Students might not notice all of them during classes.",
        type: "brain_teaser"
      }
    ],
    lateral_thinking: [
      {
        id: 3,
        title: "The Backwards Classroom",
        description: "A teacher never faces the students but always knows what they're doing. The students can see the teacher but never see their face. How is this possible?",
        hint: "Think about different ways of 'seeing' and 'knowing'",
        solution: "The teacher could be using a mirror, security cameras, or teaching through a smart board while facing it. Or the classroom could be designed with the teacher at the back using technology to project forward.",
        type: "lateral_thinking"
      },
      {
        id: 4,
        title: "The Silent Library",
        description: "In a library, people are talking loudly, laughing, and making noise, but no one complains. Why?",
        hint: "Consider what type of library this might be",
        solution: "It could be a digital/virtual library, a library for the deaf community using sign language, during a special event, or a children's library during story time.",
        type: "lateral_thinking"
      }
    ],
    innovation: [
      {
        id: 5,
        title: "The Future Classroom",
        description: "Design a classroom for the year 2050. What would make learning more effective than today's classrooms?",
        hint: "Think about technology, environment, and how students learn best",
        solution: "Possible features: AI tutors, holographic displays, adaptive furniture, biometric learning optimization, virtual/augmented reality for immersive experiences, connection to global classrooms, sustainable materials, and personalized learning paths.",
        type: "innovation"
      },
      {
        id: 6,
        title: "The Homework Revolution",
        description: "Reimagine homework for the digital age. How can we make it more engaging and effective?",
        hint: "Consider gaming, collaboration, and real-world applications",
        solution: "Ideas: Gamified learning with points and levels, collaborative projects with students worldwide, AR/VR homework experiences, AI-powered personalized practice, real-world problem solving for local community, micro-learning modules, and peer teaching platforms.",
        type: "innovation"
      }
    ]
  };

  const handleGenerateChallenge = () => {
    generateChallengeMutation.mutate(activeType);
  };

  const toggleHint = (challengeId: string) => {
    setOpenHints(prev => ({ ...prev, [challengeId]: !prev[challengeId] }));
  };

  const toggleSolution = (challengeId: string) => {
    setOpenSolutions(prev => ({ ...prev, [challengeId]: !prev[challengeId] }));
  };

  const currentChallenges = challenges.length > 0 ? challenges : sampleChallenges[activeType as keyof typeof sampleChallenges] || [];

  const getTypeIcon = (type: string) => {
    const challengeType = challengeTypes.find(t => t.id === type);
    return challengeType ? challengeType.icon : Lightbulb;
  };

  const getTypeColor = (type: string) => {
    const challengeType = challengeTypes.find(t => t.id === type);
    return challengeType ? challengeType.color : "gray";
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
              <Lightbulb className="text-primary" size={32} />
              <h1 className="text-3xl font-bold text-gray-900">Think Beyond the Box</h1>
            </div>
            <p className="text-gray-600">Challenge your mind with innovative thinking puzzles and brain teasers</p>
          </div>

          {/* Featured Challenge */}
          <Card className="mb-8 bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200">
            <CardContent className="p-8">
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center">
                  <Sparkles className="text-purple-600" size={32} />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Challenge of the Day</h2>
                  <p className="text-gray-600">A special thinking challenge to spark your creativity</p>
                </div>
              </div>
              
              <div className="bg-white rounded-lg p-6 border border-purple-100">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">The Impossible School</h3>
                <p className="text-gray-700 mb-4">
                  Imagine a school where students teach themselves, there are no grades, no homework, 
                  but everyone learns more effectively than traditional schools. How would this work?
                </p>
                <div className="flex space-x-3">
                  <Button className="bg-purple-600 hover:bg-purple-700">
                    Take Challenge
                  </Button>
                  <Button variant="outline">
                    Share Your Idea
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardContent className="p-6 text-center">
                <Brain className="mx-auto h-8 w-8 text-purple-500 mb-2" />
                <div className="text-2xl font-bold text-gray-900">15</div>
                <p className="text-sm text-gray-600">Challenges Solved</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center">
                <Target className="mx-auto h-8 w-8 text-blue-500 mb-2" />
                <div className="text-2xl font-bold text-gray-900">89%</div>
                <p className="text-sm text-gray-600">Success Rate</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center">
                <Trophy className="mx-auto h-8 w-8 text-yellow-500 mb-2" />
                <div className="text-2xl font-bold text-gray-900">3</div>
                <p className="text-sm text-gray-600">Badges Earned</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center">
                <Puzzle className="mx-auto h-8 w-8 text-green-500 mb-2" />
                <div className="text-2xl font-bold text-gray-900">7</div>
                <p className="text-sm text-gray-600">Creative Solutions</p>
              </CardContent>
            </Card>
          </div>

          {/* Challenge Types Tabs */}
          <Tabs value={activeType} onValueChange={setActiveType} className="mb-8">
            <TabsList className="grid w-full grid-cols-3">
              {challengeTypes.map((type) => {
                const Icon = type.icon;
                return (
                  <TabsTrigger key={type.id} value={type.id} className="flex items-center space-x-2">
                    <Icon size={16} />
                    <span>{type.name}</span>
                  </TabsTrigger>
                );
              })}
            </TabsList>

            {challengeTypes.map((type) => (
              <TabsContent key={type.id} value={type.id}>
                <Card className={cn(
                  "mb-6 border-2",
                  `border-${type.color}-200 bg-gradient-to-r from-${type.color}-50 to-${type.color}-100/50`
                )}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className={cn(
                          "w-12 h-12 rounded-lg flex items-center justify-center",
                          `bg-${type.color}-100`
                        )}>
                          <type.icon className={`text-${type.color}-600`} size={24} />
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-gray-900">{type.name}</h3>
                          <p className="text-gray-600">{type.description}</p>
                        </div>
                      </div>
                      <Button 
                        onClick={handleGenerateChallenge}
                        disabled={generateChallengeMutation.isPending}
                        className="flex items-center space-x-2"
                      >
                        {generateChallengeMutation.isPending ? (
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                        ) : (
                          <RefreshCw size={16} />
                        )}
                        <span>New Challenge</span>
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                {/* Challenges List */}
                <div className="space-y-6">
                  {currentChallenges.map((challenge: any) => (
                    <Card key={challenge.id} className="border-l-4 border-l-primary">
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-center space-x-3">
                            <div className={cn(
                              "w-10 h-10 rounded-lg flex items-center justify-center",
                              `bg-${type.color}-100`
                            )}>
                              <type.icon className={`text-${type.color}-600`} size={20} />
                            </div>
                            <div>
                              <h3 className="text-xl font-semibold text-gray-900">{challenge.title}</h3>
                              <Badge className={`bg-${type.color}-100 text-${type.color}-800`}>
                                {type.name}
                              </Badge>
                            </div>
                          </div>
                        </div>

                        <div className="space-y-4">
                          <div className="bg-gray-50 rounded-lg p-4">
                            <p className="text-gray-700">{challenge.description}</p>
                          </div>

                          {challenge.hint && (
                            <Collapsible open={openHints[challenge.id]} onOpenChange={() => toggleHint(challenge.id)}>
                              <CollapsibleTrigger asChild>
                                <Button variant="outline" size="sm" className="flex items-center space-x-2">
                                  <Eye size={16} />
                                  <span>Show Hint</span>
                                  <ChevronDown 
                                    size={16} 
                                    className={cn(
                                      "transition-transform",
                                      openHints[challenge.id] && "rotate-180"
                                    )}
                                  />
                                </Button>
                              </CollapsibleTrigger>
                              <CollapsibleContent className="mt-3">
                                <div className="bg-blue-50 border-l-4 border-l-blue-500 p-4 rounded-lg">
                                  <p className="text-blue-800 font-medium mb-1">💡 Hint:</p>
                                  <p className="text-blue-700">{challenge.hint}</p>
                                </div>
                              </CollapsibleContent>
                            </Collapsible>
                          )}

                          {challenge.solution && (
                            <Collapsible open={openSolutions[challenge.id]} onOpenChange={() => toggleSolution(challenge.id)}>
                              <CollapsibleTrigger asChild>
                                <Button variant="outline" size="sm" className="flex items-center space-x-2">
                                  <Lightbulb size={16} />
                                  <span>Show Solution</span>
                                  <ChevronDown 
                                    size={16} 
                                    className={cn(
                                      "transition-transform",
                                      openSolutions[challenge.id] && "rotate-180"
                                    )}
                                  />
                                </Button>
                              </CollapsibleTrigger>
                              <CollapsibleContent className="mt-3">
                                <div className="bg-green-50 border-l-4 border-l-green-500 p-4 rounded-lg">
                                  <p className="text-green-800 font-medium mb-1">✅ Possible Solution:</p>
                                  <p className="text-green-700">{challenge.solution}</p>
                                </div>
                              </CollapsibleContent>
                            </Collapsible>
                          )}

                          <div className="flex items-center space-x-3 pt-4 border-t">
                            <Button className={`bg-${type.color}-600 hover:bg-${type.color}-700`}>
                              Start Thinking
                            </Button>
                            <Button variant="outline" size="sm">
                              Share Solution
                            </Button>
                            <Button variant="outline" size="sm">
                              Discuss
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {currentChallenges.length === 0 && (
                  <Card>
                    <CardContent className="text-center py-12">
                      <type.icon className="mx-auto h-16 w-16 text-gray-400 mb-4" />
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">No challenges available</h3>
                      <p className="text-gray-600 mb-4">Generate some brain teasers to get started!</p>
                      <Button onClick={handleGenerateChallenge} disabled={generateChallengeMutation.isPending}>
                        Generate Challenges
                      </Button>
                    </CardContent>
                  </Card>
                )}
              </TabsContent>
            ))}
          </Tabs>
        </main>
      </div>
      
      <ChatbotWidget />
    </div>
  );
}
