import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Trophy, Medal, Crown, Star, TrendingUp, Users, Calendar, Target, Flame, Brain, BookOpen } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export default function Leaderboard() {
  const [selectedPeriod, setSelectedPeriod] = useState('weekly');
  const [selectedCategory, setSelectedCategory] = useState('overall');

  // Mock data - in real app, fetch from API
  const leaderboardData = {
    weekly: {
      overall: [
        { id: 1, rank: 1, name: "Priya Sharma", grade: 10, score: 2450, streak: 15, accuracy: 94, avatar: "/avatars/priya.jpg", change: 2 },
        { id: 2, rank: 2, name: "Rahul Kumar", grade: 9, score: 2380, streak: 12, accuracy: 91, avatar: "/avatars/rahul.jpg", change: -1 },
        { id: 3, rank: 3, name: "Ananya Singh", grade: 11, score: 2320, streak: 18, accuracy: 89, avatar: "/avatars/ananya.jpg", change: 1 },
        { id: 4, rank: 4, name: "Arjun Patel", grade: 8, score: 2280, streak: 9, accuracy: 87, avatar: "/avatars/arjun.jpg", change: 0 },
        { id: 5, rank: 5, name: "Kavya Reddy", grade: 12, score: 2250, streak: 20, accuracy: 92, avatar: "/avatars/kavya.jpg", change: 3 },
        { id: 6, rank: 6, name: "You", grade: 9, score: 2180, streak: 8, accuracy: 85, avatar: "/avatars/default.jpg", change: -2 },
        { id: 7, rank: 7, name: "Rohan Gupta", grade: 10, score: 2150, streak: 6, accuracy: 83, avatar: "/avatars/rohan.jpg", change: 1 },
        { id: 8, rank: 8, name: "Sneha Joshi", grade: 11, score: 2100, streak: 11, accuracy: 88, avatar: "/avatars/sneha.jpg", change: -1 },
      ],
      mathematics: [
        { id: 1, rank: 1, name: "Arjun Patel", grade: 8, score: 980, streak: 9, accuracy: 96, change: 1 },
        { id: 2, rank: 2, name: "Priya Sharma", grade: 10, score: 950, streak: 15, accuracy: 94, change: 0 },
        { id: 3, rank: 3, name: "You", grade: 9, score: 920, streak: 8, accuracy: 92, change: 2 },
      ],
      science: [
        { id: 1, rank: 1, name: "Kavya Reddy", grade: 12, score: 890, streak: 20, accuracy: 93, change: 0 },
        { id: 2, rank: 2, name: "Ananya Singh", grade: 11, score: 850, streak: 18, accuracy: 91, change: 1 },
        { id: 3, rank: 3, name: "You", grade: 9, score: 780, streak: 8, accuracy: 87, change: -1 },
      ]
    },
    monthly: {
      overall: [
        { id: 1, rank: 1, name: "Ananya Singh", grade: 11, score: 9850, streak: 28, accuracy: 92, change: 1 },
        { id: 2, rank: 2, name: "Priya Sharma", grade: 10, score: 9720, streak: 25, accuracy: 93, change: -1 },
        { id: 3, rank: 3, name: "Kavya Reddy", grade: 12, score: 9650, streak: 30, accuracy: 91, change: 0 },
        { id: 4, rank: 4, name: "You", grade: 9, score: 8980, streak: 18, accuracy: 88, change: 2 },
      ]
    }
  };

  const achievements = [
    { name: "Quiz Master", description: "Complete 100 quizzes", icon: Brain, color: "text-blue-500" },
    { name: "Streak Champion", description: "30-day study streak", icon: Flame, color: "text-orange-500" },
    { name: "Perfect Score", description: "Score 100% on 10 quizzes", icon: Target, color: "text-green-500" },
    { name: "Subject Expert", description: "Master all chapters in a subject", icon: BookOpen, color: "text-purple-500" }
  ];

  const currentData = leaderboardData[selectedPeriod]?.[selectedCategory] || [];

  const getRankIcon = (rank) => {
    switch (rank) {
      case 1: return <Crown className="h-6 w-6 text-yellow-500" />;
      case 2: return <Medal className="h-6 w-6 text-gray-400" />;
      case 3: return <Medal className="h-6 w-6 text-amber-600" />;
      default: return <span className="text-lg font-bold text-gray-500">#{rank}</span>;
    }
  };

  const getChangeIcon = (change) => {
    if (change > 0) return <TrendingUp className="h-4 w-4 text-green-500" />;
    if (change < 0) return <TrendingUp className="h-4 w-4 text-red-500 rotate-180" />;
    return <span className="text-gray-400">-</span>;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-white to-orange-50">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2 flex items-center">
            <Trophy className="mr-3 text-yellow-500" />
            Leaderboard
          </h1>
          <p className="text-gray-600">Compete with students across India and climb the ranks!</p>
        </div>

        {/* Period and Category Selection */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Time Period</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex space-x-2">
                {['weekly', 'monthly', 'alltime'].map((period) => (
                  <Button
                    key={period}
                    variant={selectedPeriod === period ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedPeriod(period)}
                    className="flex-1 capitalize"
                  >
                    {period === 'alltime' ? 'All Time' : period}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Category</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex space-x-2">
                {['overall', 'mathematics', 'science', 'english'].map((category) => (
                  <Button
                    key={category}
                    variant={selectedCategory === category ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedCategory(category)}
                    className="flex-1 capitalize"
                  >
                    {category}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="rankings" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="rankings">Rankings</TabsTrigger>
            <TabsTrigger value="achievements">Achievements</TabsTrigger>
            <TabsTrigger value="stats">Statistics</TabsTrigger>
          </TabsList>

          <TabsContent value="rankings" className="space-y-6">
            {/* Top 3 Podium */}
            <Card className="bg-gradient-to-r from-yellow-100 to-orange-100">
              <CardHeader>
                <CardTitle className="text-center">Top Performers</CardTitle>
                <CardDescription className="text-center">
                  {selectedPeriod.charAt(0).toUpperCase() + selectedPeriod.slice(1)} champions in {selectedCategory}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex justify-center items-end space-x-8">
                  {currentData.slice(0, 3).map((user, index) => (
                    <div key={user.id} className={`text-center ${index === 0 ? 'order-2' : index === 1 ? 'order-1' : 'order-3'}`}>
                      <div className={`relative ${index === 0 ? 'transform scale-110' : ''}`}>
                        <Avatar className={`mx-auto mb-2 ${index === 0 ? 'w-20 h-20' : 'w-16 h-16'} border-4 ${
                          index === 0 ? 'border-yellow-400' : index === 1 ? 'border-gray-300' : 'border-amber-500'
                        }`}>
                          <AvatarImage src={user.avatar} />
                          <AvatarFallback>{user.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                        </Avatar>
                        <div className="absolute -top-2 -right-2">
                          {getRankIcon(user.rank)}
                        </div>
                      </div>
                      <h3 className={`font-semibold ${user.name === 'You' ? 'text-blue-600' : ''} ${index === 0 ? 'text-lg' : ''}`}>
                        {user.name}
                      </h3>
                      <p className="text-sm text-gray-600">Grade {user.grade}</p>
                      <p className="font-bold text-lg">{user.score}</p>
                      <Badge variant="outline" className="text-xs">
                        {user.accuracy}% accuracy
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Full Rankings List */}
            <Card>
              <CardHeader>
                <CardTitle>Complete Rankings</CardTitle>
                <CardDescription>See where you stand among all participants</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {currentData.map((user) => (
                    <div 
                      key={user.id} 
                      className={`flex items-center justify-between p-4 rounded-lg border ${
                        user.name === 'You' ? 'bg-blue-50 border-blue-200' : 'bg-gray-50'
                      }`}
                    >
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-2">
                          {getRankIcon(user.rank)}
                          {getChangeIcon(user.change)}
                        </div>
                        <Avatar className="w-10 h-10">
                          <AvatarImage src={user.avatar} />
                          <AvatarFallback>{user.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                        </Avatar>
                        <div>
                          <h4 className={`font-semibold ${user.name === 'You' ? 'text-blue-600' : ''}`}>
                            {user.name}
                          </h4>
                          <p className="text-sm text-gray-600">Grade {user.grade}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-6">
                        <div className="text-center">
                          <p className="text-sm text-gray-600">Score</p>
                          <p className="font-bold">{user.score}</p>
                        </div>
                        <div className="text-center">
                          <p className="text-sm text-gray-600">Streak</p>
                          <p className="font-bold flex items-center">
                            <Flame className="h-4 w-4 text-orange-500 mr-1" />
                            {user.streak}
                          </p>
                        </div>
                        <div className="text-center">
                          <p className="text-sm text-gray-600">Accuracy</p>
                          <p className="font-bold">{user.accuracy}%</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="achievements" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Your Achievements</CardTitle>
                  <CardDescription>Badges you've earned through your learning journey</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    {achievements.slice(0, 2).map((achievement, index) => {
                      const Icon = achievement.icon;
                      return (
                        <div key={index} className="p-4 border rounded-lg text-center">
                          <Icon className={`h-8 w-8 mx-auto mb-2 ${achievement.color}`} />
                          <h4 className="font-semibold text-sm">{achievement.name}</h4>
                          <p className="text-xs text-gray-600">{achievement.description}</p>
                          <Badge className="mt-2 text-xs">Unlocked</Badge>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Next Achievements</CardTitle>
                  <CardDescription>Goals to work towards</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    {achievements.slice(2).map((achievement, index) => {
                      const Icon = achievement.icon;
                      return (
                        <div key={index} className="p-4 border rounded-lg text-center opacity-60">
                          <Icon className={`h-8 w-8 mx-auto mb-2 ${achievement.color}`} />
                          <h4 className="font-semibold text-sm">{achievement.name}</h4>
                          <p className="text-xs text-gray-600">{achievement.description}</p>
                          <Badge variant="outline" className="mt-2 text-xs">Locked</Badge>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Recent Achievements by Others</CardTitle>
                <CardDescription>See what others have accomplished recently</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { name: "Priya Sharma", achievement: "Quiz Master", time: "2 hours ago" },
                    { name: "Arjun Patel", achievement: "Math Wizard", time: "5 hours ago" },
                    { name: "Kavya Reddy", achievement: "Streak Champion", time: "1 day ago" },
                    { name: "Ananya Singh", achievement: "Perfect Score", time: "2 days ago" }
                  ].map((item, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded">
                      <div className="flex items-center space-x-3">
                        <Trophy className="h-5 w-5 text-yellow-500" />
                        <div>
                          <p className="font-medium">{item.name}</p>
                          <p className="text-sm text-gray-600">unlocked {item.achievement}</p>
                        </div>
                      </div>
                      <span className="text-xs text-gray-500">{item.time}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="stats" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center">
                    <Users className="h-5 w-5 mr-2 text-blue-500" />
                    Community Stats
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Total Students</span>
                      <span className="font-semibold">12,456</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Active This Week</span>
                      <span className="font-semibold">8,932</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Quizzes Completed</span>
                      <span className="font-semibold">245,678</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center">
                    <Calendar className="h-5 w-5 mr-2 text-green-500" />
                    Your Progress
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Rank This Week</span>
                      <span className="font-semibold">#6</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Best Rank</span>
                      <span className="font-semibold">#3</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Improvement</span>
                      <span className="font-semibold text-green-600">+12%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center">
                    <Star className="h-5 w-5 mr-2 text-purple-500" />
                    Achievements
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Earned</span>
                      <span className="font-semibold">8/25</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">This Month</span>
                      <span className="font-semibold">3</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Next Goal</span>
                      <span className="font-semibold text-blue-600">Quiz Master</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Performance Comparison</CardTitle>
                <CardDescription>How you compare to students in your grade</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium">Quiz Accuracy</span>
                      <span className="text-sm text-gray-600">85% (Grade 9 avg: 78%)</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-green-500 h-2 rounded-full" style={{ width: '85%' }}></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium">Study Consistency</span>
                      <span className="text-sm text-gray-600">8 days (Grade 9 avg: 5 days)</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-blue-500 h-2 rounded-full" style={{ width: '70%' }}></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium">Learning Speed</span>
                      <span className="text-sm text-gray-600">Above Average</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-purple-500 h-2 rounded-full" style={{ width: '75%' }}></div>
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