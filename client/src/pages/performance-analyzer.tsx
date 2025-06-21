import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell, Area, AreaChart } from 'recharts';
import { TrendingUp, TrendingDown, Target, Clock, Award, Brain, BookOpen, Calculator, Trophy } from 'lucide-react';

export default function PerformanceAnalyzer() {
  const [selectedTimeframe, setSelectedTimeframe] = useState('7d');
  
  // Mock data - in real app, fetch from API
  const performanceData = {
    overall: {
      accuracy: 78,
      streak: 12,
      totalQuizzes: 45,
      timeSpent: 1200, // minutes
      improvements: 15,
      rank: 23
    },
    subjectPerformance: [
      { subject: 'Mathematics', accuracy: 85, quizzes: 15, timeSpent: 360, improvement: 12 },
      { subject: 'Science', accuracy: 72, quizzes: 12, timeSpent: 290, improvement: 8 },
      { subject: 'English', accuracy: 80, quizzes: 10, timeSpent: 245, improvement: 10 },
      { subject: 'History', accuracy: 68, quizzes: 8, timeSpent: 185, improvement: 5 }
    ],
    weeklyProgress: [
      { day: 'Mon', accuracy: 75, quizzes: 3, timeSpent: 45 },
      { day: 'Tue', accuracy: 78, quizzes: 4, timeSpent: 60 },
      { day: 'Wed', accuracy: 82, quizzes: 5, timeSpent: 75 },
      { day: 'Thu', accuracy: 79, quizzes: 3, timeSpent: 50 },
      { day: 'Fri', accuracy: 85, quizzes: 6, timeSpent: 90 },
      { day: 'Sat', accuracy: 88, quizzes: 4, timeSpent: 65 },
      { day: 'Sun', accuracy: 86, quizzes: 2, timeSpent: 35 }
    ],
    difficultyBreakdown: [
      { level: 'Easy', correct: 85, total: 100, percentage: 85 },
      { level: 'Medium', correct: 72, total: 95, percentage: 76 },
      { level: 'Hard', correct: 45, total: 65, percentage: 69 }
    ],
    strengths: [
      { area: 'Algebra', score: 92, trend: 'up' },
      { area: 'Grammar', score: 89, trend: 'up' },
      { area: 'Physics', score: 85, trend: 'stable' }
    ],
    weaknesses: [
      { area: 'Geometry', score: 65, trend: 'down' },
      { area: 'Essay Writing', score: 68, trend: 'stable' },
      { area: 'Chemistry', score: 62, trend: 'up' }
    ]
  };

  const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444'];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Performance Analyzer</h1>
          <p className="text-gray-600">Detailed insights into your learning journey and progress</p>
        </div>

        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium opacity-90">Overall Accuracy</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <span className="text-3xl font-bold">{performanceData.overall.accuracy}%</span>
                <TrendingUp className="h-8 w-8 opacity-80" />
              </div>
              <p className="text-xs opacity-75 mt-1">+5% from last week</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium opacity-90">Study Streak</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <span className="text-3xl font-bold">{performanceData.overall.streak}</span>
                <Award className="h-8 w-8 opacity-80" />
              </div>
              <p className="text-xs opacity-75 mt-1">Days consecutive</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium opacity-90">Total Quizzes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <span className="text-3xl font-bold">{performanceData.overall.totalQuizzes}</span>
                <BookOpen className="h-8 w-8 opacity-80" />
              </div>
              <p className="text-xs opacity-75 mt-1">This month</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-orange-500 to-orange-600 text-white">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium opacity-90">Time Invested</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <span className="text-3xl font-bold">{Math.round(performanceData.overall.timeSpent / 60)}h</span>
                <Clock className="h-8 w-8 opacity-80" />
              </div>
              <p className="text-xs opacity-75 mt-1">Total study time</p>
            </CardContent>
          </Card>
        </div>

        {/* Detailed Analytics */}
        <Tabs defaultValue="progress" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="progress">Progress Tracking</TabsTrigger>
            <TabsTrigger value="subjects">Subject Analysis</TabsTrigger>
            <TabsTrigger value="strengths">Strengths & Weaknesses</TabsTrigger>
            <TabsTrigger value="recommendations">AI Recommendations</TabsTrigger>
          </TabsList>

          <TabsContent value="progress" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Weekly Progress Trend</CardTitle>
                  <CardDescription>Your accuracy and study time over the past week</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <AreaChart data={performanceData.weeklyProgress}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="day" />
                      <YAxis />
                      <Tooltip />
                      <Area type="monotone" dataKey="accuracy" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.3} />
                    </AreaChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Difficulty Level Performance</CardTitle>
                  <CardDescription>How you perform across different difficulty levels</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {performanceData.difficultyBreakdown.map((level, index) => (
                      <div key={level.level} className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="font-medium">{level.level}</span>
                          <span className="text-sm text-gray-600">
                            {level.correct}/{level.total} ({level.percentage}%)
                          </span>
                        </div>
                        <Progress value={level.percentage} className="h-2" />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Daily Study Pattern</CardTitle>
                <CardDescription>Your quiz completion and time spent throughout the week</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={performanceData.weeklyProgress}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="day" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="quizzes" fill="#10b981" name="Quizzes Completed" />
                    <Bar dataKey="timeSpent" fill="#3b82f6" name="Time Spent (mins)" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="subjects" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Subject Performance Overview</CardTitle>
                  <CardDescription>Your accuracy across different subjects</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={performanceData.subjectPerformance}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="subject" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="accuracy" fill="#3b82f6" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Time Distribution</CardTitle>
                  <CardDescription>How you allocate study time across subjects</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={performanceData.subjectPerformance}
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="timeSpent"
                        label={({ subject, percent }) => `${subject} ${(percent * 100).toFixed(0)}%`}
                      >
                        {performanceData.subjectPerformance.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Subject-wise Detailed Metrics</CardTitle>
                <CardDescription>Comprehensive performance breakdown by subject</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {performanceData.subjectPerformance.map((subject) => (
                    <div key={subject.subject} className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold">{subject.subject}</h4>
                        <Badge variant={subject.accuracy >= 80 ? "default" : "secondary"}>
                          {subject.accuracy}%
                        </Badge>
                      </div>
                      <div className="space-y-2 text-sm text-gray-600">
                        <div className="flex justify-between">
                          <span>Quizzes Taken:</span>
                          <span>{subject.quizzes}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Time Spent:</span>
                          <span>{Math.round(subject.timeSpent / 60)}h {subject.timeSpent % 60}m</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Improvement:</span>
                          <span className="text-green-600">+{subject.improvement}%</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="strengths" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Trophy className="h-5 w-5 text-yellow-500" />
                    <span>Your Strengths</span>
                  </CardTitle>
                  <CardDescription>Topics where you excel</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {performanceData.strengths.map((strength) => (
                      <div key={strength.area} className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                          <span className="font-medium">{strength.area}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="text-green-600 font-semibold">{strength.score}%</span>
                          {strength.trend === 'up' && <TrendingUp className="h-4 w-4 text-green-500" />}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Target className="h-5 w-5 text-red-500" />
                    <span>Areas for Improvement</span>
                  </CardTitle>
                  <CardDescription>Topics that need more focus</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {performanceData.weaknesses.map((weakness) => (
                      <div key={weakness.area} className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                          <span className="font-medium">{weakness.area}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="text-red-600 font-semibold">{weakness.score}%</span>
                          {weakness.trend === 'down' && <TrendingDown className="h-4 w-4 text-red-500" />}
                          {weakness.trend === 'up' && <TrendingUp className="h-4 w-4 text-green-500" />}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="recommendations" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Brain className="h-5 w-5 text-purple-500" />
                    <span>Priority Actions</span>
                  </CardTitle>
                  <CardDescription>Top 3 actions to improve your performance this week</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3 p-3 bg-red-50 rounded-lg">
                      <div className="w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-sm font-bold">1</div>
                      <div>
                        <h5 className="font-semibold text-red-900">Master Geometry Basics</h5>
                        <p className="text-sm text-red-800">Complete 20 geometry practice problems daily for 1 week</p>
                        <div className="mt-2">
                          <Badge variant="destructive" className="text-xs">High Priority</Badge>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-3 p-3 bg-yellow-50 rounded-lg">
                      <div className="w-6 h-6 bg-yellow-500 text-white rounded-full flex items-center justify-center text-sm font-bold">2</div>
                      <div>
                        <h5 className="font-semibold text-yellow-900">Improve Essay Structure</h5>
                        <p className="text-sm text-yellow-800">Practice writing 1 structured essay every 2 days</p>
                        <div className="mt-2">
                          <Badge variant="secondary" className="text-xs">Medium Priority</Badge>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-3 p-3 bg-blue-50 rounded-lg">
                      <div className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold">3</div>
                      <div>
                        <h5 className="font-semibold text-blue-900">Chemistry Lab Concepts</h5>
                        <p className="text-sm text-blue-800">Review chemical equations and reactions weekly</p>
                        <div className="mt-2">
                          <Badge variant="outline" className="text-xs">Regular Practice</Badge>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Target className="h-5 w-5 text-green-500" />
                    <span>Weekly Goals</span>
                  </CardTitle>
                  <CardDescription>Achievable targets for the next 7 days</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <h5 className="font-medium">Increase overall accuracy to 82%</h5>
                        <p className="text-sm text-gray-600">Current: 78% | Target: +4%</p>
                      </div>
                      <Progress value={78} className="w-20 h-2" />
                    </div>
                    
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <h5 className="font-medium">Complete 35 quiz questions</h5>
                        <p className="text-sm text-gray-600">Current: 45 total | Target: +35 this week</p>
                      </div>
                      <Progress value={65} className="w-20 h-2" />
                    </div>
                    
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <h5 className="font-medium">Maintain 15+ day streak</h5>
                        <p className="text-sm text-gray-600">Current: 12 days | Target: Keep going</p>
                      </div>
                      <Progress value={80} className="w-20 h-2" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Brain className="h-5 w-5 text-purple-500" />
                  <span>AI-Powered Learning Recommendations</span>
                </CardTitle>
                <CardDescription>Personalized suggestions based on your learning patterns</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="p-4 bg-gradient-to-r from-red-50 to-red-100 rounded-lg border border-red-200">
                    <div className="flex items-start space-x-3">
                      <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center">
                        <TrendingDown className="h-4 w-4 text-white" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-red-900 mb-2">Urgent: Geometry Performance Drop</h4>
                        <p className="text-red-800 mb-3">
                          Your geometry scores dropped 8% this week (73% → 65%). This suggests conceptual gaps in fundamental theorems.
                        </p>
                        <div className="bg-white p-3 rounded border">
                          <h5 className="font-medium mb-2">Recommended Action Plan:</h5>
                          <ul className="text-sm space-y-1">
                            <li>• Review basic geometric theorems (Pythagorean, angle sum)</li>
                            <li>• Practice 15 triangle and circle problems daily</li>
                            <li>• Watch visual geometry tutorials for better understanding</li>
                            <li>• Take a focused geometry quiz every 2 days</li>
                          </ul>
                        </div>
                        <div className="flex flex-wrap gap-2 mt-3">
                          <Badge className="bg-red-600">Critical</Badge>
                          <Badge variant="outline">2 weeks focus</Badge>
                          <Badge variant="outline">Visual learning</Badge>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-gradient-to-r from-green-50 to-green-100 rounded-lg border border-green-200">
                    <div className="flex items-start space-x-3">
                      <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                        <TrendingUp className="h-4 w-4 text-white" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-green-900 mb-2">Leverage: Algebra Mastery</h4>
                        <p className="text-green-800 mb-3">
                          Exceptional algebra performance (92% accuracy). Use this strength to build confidence in related areas.
                        </p>
                        <div className="bg-white p-3 rounded border">
                          <h5 className="font-medium mb-2">Growth Opportunities:</h5>
                          <ul className="text-sm space-y-1">
                            <li>• Advance to precalculus and calculus topics</li>
                            <li>• Apply algebraic skills to physics word problems</li>
                            <li>• Tutor peers in algebra to reinforce knowledge</li>
                            <li>• Participate in math competitions</li>
                          </ul>
                        </div>
                        <div className="flex flex-wrap gap-2 mt-3">
                          <Badge className="bg-green-600">Strength</Badge>
                          <Badge variant="outline">Expand horizons</Badge>
                          <Badge variant="outline">Leadership opportunity</Badge>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg border border-blue-200">
                    <div className="flex items-start space-x-3">
                      <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                        <Clock className="h-4 w-4 text-white" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-blue-900 mb-2">Optimize: Study Schedule</h4>
                        <p className="text-blue-800 mb-3">
                          Analysis shows peak performance on Friday-Saturday (85-88% accuracy). Your focus decreases on Sundays (68%).
                        </p>
                        <div className="bg-white p-3 rounded border">
                          <h5 className="font-medium mb-2">Schedule Optimization:</h5>
                          <ul className="text-sm space-y-1">
                            <li>• Schedule difficult topics (geometry, chemistry) on Fri-Sat</li>
                            <li>• Use Sundays for review and light practice</li>
                            <li>• Study in 45-minute focused blocks with 15-min breaks</li>
                            <li>• Plan challenging quizzes between 2-4 PM (your peak hours)</li>
                          </ul>
                        </div>
                        <div className="flex flex-wrap gap-2 mt-3">
                          <Badge className="bg-blue-600">Efficiency</Badge>
                          <Badge variant="outline">Time management</Badge>
                          <Badge variant="outline">Energy optimization</Badge>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-gradient-to-r from-purple-50 to-purple-100 rounded-lg border border-purple-200">
                    <div className="flex items-start space-x-3">
                      <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center">
                        <Award className="h-4 w-4 text-white" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-purple-900 mb-2">Maintain: Consistency Excellence</h4>
                        <p className="text-purple-800 mb-3">
                          12-day study streak with 78% average accuracy. You're in the top 15% of consistent learners.
                        </p>
                        <div className="bg-white p-3 rounded border">
                          <h5 className="font-medium mb-2">Streak Maintenance Strategy:</h5>
                          <ul className="text-sm space-y-1">
                            <li>• Set minimum daily goal: 1 quiz (10 minutes)</li>
                            <li>• Use mobile app for quick practice during breaks</li>
                            <li>• Prepare backup study materials for busy days</li>
                            <li>• Celebrate weekly milestones with small rewards</li>
                          </ul>
                        </div>
                        <div className="flex flex-wrap gap-2 mt-3">
                          <Badge className="bg-purple-600">Consistency</Badge>
                          <Badge variant="outline">Habit building</Badge>
                          <Badge variant="outline">Micro-learning</Badge>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-gradient-to-r from-orange-50 to-orange-100 rounded-lg border border-orange-200">
                    <div className="flex items-start space-x-3">
                      <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
                        <Calculator className="h-4 w-4 text-white" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-orange-900 mb-2">Strategy: Difficulty Progression</h4>
                        <p className="text-orange-800 mb-3">
                          Strong on easy (85%) and medium (76%) questions, but hard questions need work (69%). Time to level up systematically.
                        </p>
                        <div className="bg-white p-3 rounded border">
                          <h5 className="font-medium mb-2">Progressive Difficulty Plan:</h5>
                          <ul className="text-sm space-y-1">
                            <li>• Week 1-2: Master medium difficulty in weak subjects</li>
                            <li>• Week 3-4: Introduce hard problems with hints enabled</li>
                            <li>• Week 5-6: Attempt hard problems without assistance</li>
                            <li>• Track improvement: aim for 75% on hard questions</li>
                          </ul>
                        </div>
                        <div className="flex flex-wrap gap-2 mt-3">
                          <Badge className="bg-orange-600">Progressive</Badge>
                          <Badge variant="outline">Skill building</Badge>
                          <Badge variant="outline">Challenge ready</Badge>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}