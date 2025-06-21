import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Header from "@/components/layout/header";
import Sidebar from "@/components/layout/sidebar";
import ChatbotWidget from "@/components/chatbot/chatbot-widget";
import SubjectCard from "@/components/subject-card";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, Filter, BookOpen } from "lucide-react";

export default function Subjects() {
  const [selectedGrade, setSelectedGrade] = useState("8");
  const [searchTerm, setSearchTerm] = useState("");

  // Fetch subjects
  const { data: subjects = [] } = useQuery({
    queryKey: ["/api/subjects"],
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

  const filteredSubjects = subjects.filter((subject: any) =>
    subject.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    subject.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
              <BookOpen className="text-primary" size={32} />
              <h1 className="text-3xl font-bold text-gray-900">NCERT Subjects</h1>
            </div>
            <p className="text-gray-600">Explore comprehensive content for Class {selectedGrade}</p>
          </div>

          {/* Search and Filter */}
          <Card className="mb-8">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  <Input
                    placeholder="Search subjects..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <Filter className="text-gray-400" size={20} />
                  <Badge variant="secondary">Class {selectedGrade}</Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Subjects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {filteredSubjects.map((subject: any) => (
              <SubjectCard
                key={subject.id}
                subject={subject}
                progress={subjectProgress[subject.id as keyof typeof subjectProgress] || 0}
              />
            ))}
          </div>

          {/* No Results */}
          {filteredSubjects.length === 0 && searchTerm && (
            <Card>
              <CardContent className="text-center py-12">
                <BookOpen className="mx-auto h-16 w-16 text-gray-400 mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No subjects found</h3>
                <p className="text-gray-600">Try adjusting your search terms or browse all subjects.</p>
              </CardContent>
            </Card>
          )}

          {/* Subject Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Overall Progress</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-primary mb-2">63%</div>
                <p className="text-sm text-gray-600">Average across all subjects</p>
                <div className="w-full bg-gray-200 rounded-full h-2 mt-3">
                  <div className="bg-primary h-2 rounded-full w-3/5"></div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Best Subject</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600 mb-2">English</div>
                <p className="text-sm text-gray-600">82% completion rate</p>
                <Badge variant="secondary" className="mt-2">Excellent</Badge>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Focus Area</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-orange-600 mb-2">Sanskrit</div>
                <p className="text-sm text-gray-600">35% completion rate</p>
                <Badge variant="outline" className="mt-2">Needs Attention</Badge>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
      
      <ChatbotWidget />
    </div>
  );
}
