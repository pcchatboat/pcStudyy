import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Brain, Lightbulb, Target, Clock, Award, TrendingUp, Zap, Puzzle } from 'lucide-react';

export default function ReasoningIQ() {
  const [selectedGrade, setSelectedGrade] = useState('8');
  const [currentTest, setCurrentTest] = useState(null);
  const [testProgress, setTestProgress] = useState(0);

  const reasoningTopics = {
    "6": [
      { id: 1, name: "Pattern Recognition", difficulty: "Easy", questions: 25, description: "Identify sequences and patterns" },
      { id: 2, name: "Basic Logic", difficulty: "Easy", questions: 20, description: "Simple if-then reasoning" },
      { id: 3, name: "Visual Puzzles", difficulty: "Medium", questions: 15, description: "Shape and image problems" },
      { id: 4, name: "Number Series", difficulty: "Medium", questions: 18, description: "Mathematical sequences" },
    ],
    "7": [
      { id: 1, name: "Analogies", difficulty: "Medium", questions: 22, description: "Relationship-based reasoning" },
      { id: 2, name: "Logical Sequences", difficulty: "Medium", questions: 20, description: "Advanced pattern recognition" },
      { id: 3, name: "Spatial Reasoning", difficulty: "Hard", questions: 16, description: "3D visualization skills" },
      { id: 4, name: "Critical Thinking", difficulty: "Hard", questions: 18, description: "Analyze and evaluate arguments" },
    ],
    "8": [
      { id: 1, name: "Deductive Reasoning", difficulty: "Medium", questions: 24, description: "Drawing logical conclusions" },
      { id: 2, name: "Inductive Reasoning", difficulty: "Hard", questions: 20, description: "Pattern-based predictions" },
      { id: 3, name: "Abstract Thinking", difficulty: "Hard", questions: 18, description: "Conceptual problem solving" },
      { id: 4, name: "Logical Puzzles", difficulty: "Hard", questions: 22, description: "Complex reasoning challenges" },
    ],
    "9": [
      { id: 1, name: "Syllogistic Reasoning", difficulty: "Hard", questions: 25, description: "Formal logic structures" },
      { id: 2, name: "Hypothesis Testing", difficulty: "Hard", questions: 20, description: "Scientific reasoning methods" },
      { id: 3, name: "Decision Making", difficulty: "Expert", questions: 18, description: "Optimize choices under constraints" },
      { id: 4, name: "System Thinking", difficulty: "Expert", questions: 16, description: "Understanding complex relationships" },
    ],
    "10": [
      { id: 1, name: "Propositional Logic", difficulty: "Hard", questions: 28, description: "Formal logical statements" },
      { id: 2, name: "Causal Reasoning", difficulty: "Expert", questions: 22, description: "Cause and effect relationships" },
      { id: 3, name: "Strategic Thinking", difficulty: "Expert", questions: 20, description: "Game theory and planning" },
      { id: 4, name: "Meta-cognition", difficulty: "Expert", questions: 18, description: "Thinking about thinking" },
    ],
    "11": [
      { id: 1, name: "Philosophical Logic", difficulty: "Expert", questions: 25, description: "Advanced logical concepts" },
      { id: 2, name: "Research Methodology", difficulty: "Expert", questions: 24, description: "Scientific inquiry methods" },
      { id: 3, name: "Ethical Reasoning", difficulty: "Expert", questions: 20, description: "Moral decision-making frameworks" },
      { id: 4, name: "Complex Problem Solving", difficulty: "Master", questions: 18, description: "Multi-step analytical solutions" },
    ],
    "12": [
      { id: 1, name: "Advanced Analytics", difficulty: "Master", questions: 30, description: "Statistical and logical analysis" },
      { id: 2, name: "Creative Problem Solving", difficulty: "Master", questions: 25, description: "Innovative thinking approaches" },
      { id: 3, name: "Leadership Reasoning", difficulty: "Master", questions: 22, description: "Decision-making in complex scenarios" },
      { id: 4, name: "Competitive Analysis", difficulty: "Master", questions: 20, description: "Preparation for entrance exams" },
    ]
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Easy': return 'bg-green-100 text-green-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'Hard': return 'bg-orange-100 text-orange-800';
      case 'Expert': return 'bg-red-100 text-red-800';
      case 'Master': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const currentTopics = reasoningTopics[selectedGrade] || [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2 flex items-center">
            <Brain className="mr-3 text-indigo-600" />
            Reasoning & IQ Development
          </h1>
          <p className="text-gray-600">Enhance your logical thinking, problem-solving, and analytical skills</p>
        </div>

        {/* Grade Selection */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-4">Select Your Grade:</h3>
          <div className="flex flex-wrap gap-3">
            {['6', '7', '8', '9', '10', '11', '12'].map((grade) => (
              <Button
                key={grade}
                variant={selectedGrade === grade ? "default" : "outline"}
                onClick={() => setSelectedGrade(grade)}
                className="min-w-[60px]"
              >
                Grade {grade}
              </Button>
            ))}
          </div>
        </div>

        <Tabs defaultValue="topics" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="topics">Topics</TabsTrigger>
            <TabsTrigger value="practice">Practice Tests</TabsTrigger>
            <TabsTrigger value="challenges">Daily Challenges</TabsTrigger>
            <TabsTrigger value="progress">Progress Tracking</TabsTrigger>
          </TabsList>

          <TabsContent value="topics" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {currentTopics.map((topic) => (
                <Card key={topic.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="flex items-center space-x-2">
                          <Puzzle className="h-5 w-5 text-indigo-600" />
                          <span>{topic.name}</span>
                        </CardTitle>
                        <CardDescription className="mt-2">{topic.description}</CardDescription>
                      </div>
                      <Badge className={getDifficultyColor(topic.difficulty)}>
                        {topic.difficulty}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-sm text-gray-600">{topic.questions} Questions Available</span>
                      <div className="flex items-center space-x-1">
                        <Clock className="h-4 w-4 text-gray-400" />
                        <span className="text-sm text-gray-600">~{Math.round(topic.questions * 1.5)} min</span>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <Button className="w-full" variant="default">
                        Start Learning
                      </Button>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm" className="flex-1">
                          Quick Quiz
                        </Button>
                        <Button variant="outline" size="sm" className="flex-1">
                          Practice Set
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="practice" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Zap className="h-5 w-5" />
                    <span>Quick Assessment</span>
                  </CardTitle>
                  <CardDescription className="text-blue-100">
                    15-minute IQ evaluation
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="text-sm opacity-90">
                      • 20 mixed questions
                      • Adaptive difficulty
                      • Instant feedback
                    </div>
                    <Button variant="secondary" className="w-full">
                      Start Quick Test
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Target className="h-5 w-5" />
                    <span>Comprehensive Test</span>
                  </CardTitle>
                  <CardDescription className="text-green-100">
                    45-minute full evaluation
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="text-sm opacity-90">
                      • 60 questions
                      • All reasoning types
                      • Detailed analysis
                    </div>
                    <Button variant="secondary" className="w-full">
                      Start Full Test
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Award className="h-5 w-5" />
                    <span>Challenge Mode</span>
                  </CardTitle>
                  <CardDescription className="text-purple-100">
                    High-difficulty problems
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="text-sm opacity-90">
                      • Expert level questions
                      • Competitive format
                      • Leaderboard ranking
                    </div>
                    <Button variant="secondary" className="w-full">
                      Accept Challenge
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Recent Test Results</CardTitle>
                <CardDescription>Your performance over the last 30 days</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded">
                    <div>
                      <h4 className="font-medium">Comprehensive IQ Test</h4>
                      <p className="text-sm text-gray-600">Completed 3 days ago</p>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-green-600">128</div>
                      <div className="text-xs text-gray-500">IQ Score</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded">
                    <div>
                      <h4 className="font-medium">Logical Reasoning Quick Test</h4>
                      <p className="text-sm text-gray-600">Completed 1 week ago</p>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-blue-600">85%</div>
                      <div className="text-xs text-gray-500">Accuracy</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="challenges" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="border-l-4 border-l-yellow-500">
                <CardHeader>
                  <CardTitle className="text-lg">Today's Logic Puzzle</CardTitle>
                  <CardDescription>Daily brain teaser to keep you sharp</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <p className="text-sm">
                      If all roses are flowers, and some flowers fade quickly, can we conclude that some roses fade quickly?
                    </p>
                    <div className="flex items-center justify-between">
                      <Badge variant="outline">Logic</Badge>
                      <span className="text-xs text-gray-500">5 min</span>
                    </div>
                    <Button size="sm" className="w-full">Solve Now</Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-blue-500">
                <CardHeader>
                  <CardTitle className="text-lg">Pattern Challenge</CardTitle>
                  <CardDescription>Find the hidden sequence</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <p className="text-sm">
                      2, 6, 12, 20, 30, ?
                      <br />What comes next in this sequence?
                    </p>
                    <div className="flex items-center justify-between">
                      <Badge variant="outline">Patterns</Badge>
                      <span className="text-xs text-gray-500">3 min</span>
                    </div>
                    <Button size="sm" className="w-full">Solve Now</Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-green-500">
                <CardHeader>
                  <CardTitle className="text-lg">Spatial Reasoning</CardTitle>
                  <CardDescription>3D visualization challenge</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <p className="text-sm">
                      If you fold a piece of paper in half twice and make one cut, how many holes will it have when unfolded?
                    </p>
                    <div className="flex items-center justify-between">
                      <Badge variant="outline">Spatial</Badge>
                      <span className="text-xs text-gray-500">4 min</span>
                    </div>
                    <Button size="sm" className="w-full">Solve Now</Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Weekly Challenge Leaderboard</CardTitle>
                <CardDescription>Top performers this week</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { rank: 1, name: "Alex Chen", score: 950, streak: 7 },
                    { rank: 2, name: "Priya Sharma", score: 920, streak: 6 },
                    { rank: 3, name: "Jordan Kim", score: 890, streak: 5 },
                    { rank: 4, name: "You", score: 865, streak: 4 },
                  ].map((user) => (
                    <div key={user.rank} className="flex items-center justify-between p-3 bg-gray-50 rounded">
                      <div className="flex items-center space-x-3">
                        <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                          user.rank <= 3 ? 'bg-yellow-500 text-white' : 'bg-gray-300 text-gray-700'
                        }`}>
                          {user.rank}
                        </div>
                        <span className={user.name === 'You' ? 'font-semibold text-blue-600' : ''}>{user.name}</span>
                      </div>
                      <div className="flex items-center space-x-4">
                        <span className="text-sm">{user.score} pts</span>
                        <Badge variant="outline">{user.streak} day streak</Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="progress" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Overall IQ Score</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center">
                    <div className="text-4xl font-bold text-indigo-600 mb-2">128</div>
                    <div className="text-sm text-gray-600 mb-3">Above Average</div>
                    <Progress value={75} className="h-2" />
                    <div className="text-xs text-gray-500 mt-2">Top 25% percentile</div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Reasoning Accuracy</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center">
                    <div className="text-4xl font-bold text-green-600 mb-2">87%</div>
                    <div className="text-sm text-gray-600 mb-3">Last 30 days</div>
                    <Progress value={87} className="h-2" />
                    <div className="text-xs text-gray-500 mt-2">+12% from last month</div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Challenge Streak</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center">
                    <div className="text-4xl font-bold text-orange-600 mb-2">15</div>
                    <div className="text-sm text-gray-600 mb-3">Days consecutive</div>
                    <Progress value={60} className="h-2" />
                    <div className="text-xs text-gray-500 mt-2">Goal: 25 days</div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Skill Breakdown</CardTitle>
                <CardDescription>Your performance across different reasoning types</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { skill: "Logical Reasoning", score: 92, color: "bg-blue-500" },
                    { skill: "Pattern Recognition", score: 88, color: "bg-green-500" },
                    { skill: "Spatial Intelligence", score: 75, color: "bg-yellow-500" },
                    { skill: "Abstract Thinking", score: 82, color: "bg-purple-500" },
                    { skill: "Critical Analysis", score: 79, color: "bg-red-500" },
                  ].map((skill) => (
                    <div key={skill.skill} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="font-medium">{skill.skill}</span>
                        <span className="text-sm font-semibold">{skill.score}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-3">
                        <div 
                          className={`h-3 rounded-full ${skill.color}`}
                          style={{ width: `${skill.score}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}