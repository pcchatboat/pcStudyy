import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import Header from "@/components/layout/header";
import Sidebar from "@/components/layout/sidebar";
import ChatbotWidget from "@/components/chatbot/chatbot-widget";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { 
  HelpCircle, Send, CheckCircle, Clock, Search, 
  BookOpen, Lightbulb, MessageSquare, TrendingUp 
} from "lucide-react";
import { cn } from "@/lib/utils";

const doubtSchema = z.object({
  question: z.string().min(10, "Question must be at least 10 characters long"),
  subjectId: z.string().min(1, "Please select a subject"),
});

export default function DoubtCenter() {
  const [selectedGrade, setSelectedGrade] = useState("8");
  const [searchTerm, setSearchTerm] = useState("");
  const { toast } = useToast();

  const form = useForm<z.infer<typeof doubtSchema>>({
    resolver: zodResolver(doubtSchema),
    defaultValues: {
      question: "",
      subjectId: "",
    },
  });

  // Fetch subjects
  const { data: subjects = [] } = useQuery({
    queryKey: ["/api/subjects"],
  });

  // Fetch user doubts
  const { data: doubts = [], refetch: refetchDoubts } = useQuery({
    queryKey: ["/api/doubts", 1], // Using default user ID 1 for demo
  });

  // Submit doubt mutation
  const submitDoubtMutation = useMutation({
    mutationFn: async (doubtData: z.infer<typeof doubtSchema>) => {
      const response = await apiRequest("POST", "/api/doubts", {
        question: doubtData.question,
        subjectId: parseInt(doubtData.subjectId),
        userId: 1, // Default user for demo
      });
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Doubt Submitted!",
        description: "Your question has been answered by our AI tutor.",
      });
      form.reset();
      refetchDoubts();
      queryClient.invalidateQueries({ queryKey: ["/api/doubts"] });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to submit your doubt. Please try again.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (values: z.infer<typeof doubtSchema>) => {
    submitDoubtMutation.mutate(values);
  };

  const filteredDoubts = doubts.filter((doubt: any) =>
    doubt.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doubt.answer?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const recentDoubts = doubts.slice(0, 3);
  const resolvedDoubts = doubts.filter((doubt: any) => doubt.status === "answered").length;
  const pendingDoubts = doubts.filter((doubt: any) => doubt.status === "pending").length;

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
              <HelpCircle className="text-primary" size={32} />
              <h1 className="text-3xl font-bold text-gray-900">Doubt Center</h1>
            </div>
            <p className="text-gray-600">Get instant help with your questions from our AI tutor</p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardContent className="p-6 text-center">
                <CheckCircle className="mx-auto h-8 w-8 text-green-500 mb-2" />
                <div className="text-2xl font-bold text-gray-900">{resolvedDoubts}</div>
                <p className="text-sm text-gray-600">Doubts Resolved</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center">
                <Clock className="mx-auto h-8 w-8 text-yellow-500 mb-2" />
                <div className="text-2xl font-bold text-gray-900">{pendingDoubts}</div>
                <p className="text-sm text-gray-600">Pending</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center">
                <TrendingUp className="mx-auto h-8 w-8 text-blue-500 mb-2" />
                <div className="text-2xl font-bold text-gray-900">2.5m</div>
                <p className="text-sm text-gray-600">Avg Response Time</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center">
                <Lightbulb className="mx-auto h-8 w-8 text-purple-500 mb-2" />
                <div className="text-2xl font-bold text-gray-900">95%</div>
                <p className="text-sm text-gray-600">Satisfaction Rate</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Ask New Doubt */}
            <div className="lg:col-span-2">
              <Card className="mb-8">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <MessageSquare className="text-primary" size={24} />
                    <span>Ask a New Doubt</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                      <FormField
                        control={form.control}
                        name="subjectId"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Subject</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select a subject" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {subjects.map((subject: any) => (
                                  <SelectItem key={subject.id} value={subject.id.toString()}>
                                    {subject.name}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="question"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Your Question</FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder="Describe your doubt in detail. The more specific you are, the better answer you'll get!"
                                className="min-h-32"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <Button 
                        type="submit" 
                        className="w-full"
                        disabled={submitDoubtMutation.isPending}
                      >
                        {submitDoubtMutation.isPending ? (
                          <div className="flex items-center space-x-2">
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                            <span>Getting Answer...</span>
                          </div>
                        ) : (
                          <div className="flex items-center space-x-2">
                            <Send size={16} />
                            <span>Ask Doubt</span>
                          </div>
                        )}
                      </Button>
                    </form>
                  </Form>
                </CardContent>
              </Card>

              {/* Search Doubts */}
              <Card className="mb-6">
                <CardContent className="p-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                    <Input
                      placeholder="Search your previous doubts..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Doubts List */}
              <div className="space-y-4">
                {filteredDoubts.length === 0 ? (
                  <Card>
                    <CardContent className="text-center py-12">
                      <HelpCircle className="mx-auto h-16 w-16 text-gray-400 mb-4" />
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        {searchTerm ? "No doubts found" : "No doubts yet"}
                      </h3>
                      <p className="text-gray-600">
                        {searchTerm 
                          ? "Try adjusting your search terms." 
                          : "Ask your first question to get started!"}
                      </p>
                    </CardContent>
                  </Card>
                ) : (
                  filteredDoubts.map((doubt: any) => (
                    <Card key={doubt.id} className="border-l-4 border-l-primary">
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between mb-4">
                          <Badge variant={doubt.status === "answered" ? "default" : "secondary"}>
                            {doubt.status === "answered" ? "Answered" : "Pending"}
                          </Badge>
                          <span className="text-sm text-gray-500">
                            {new Date(doubt.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                        
                        <div className="space-y-4">
                          <div>
                            <h4 className="font-semibold text-gray-900 mb-2">Question:</h4>
                            <p className="text-gray-700 bg-gray-50 p-3 rounded-lg">
                              {doubt.question}
                            </p>
                          </div>
                          
                          {doubt.answer && (
                            <div>
                              <h4 className="font-semibold text-gray-900 mb-2 flex items-center space-x-2">
                                <BookOpen size={16} />
                                <span>Answer:</span>
                              </h4>
                              <div className="text-gray-700 bg-blue-50 p-4 rounded-lg border-l-4 border-l-blue-500">
                                <div className="whitespace-pre-wrap">{doubt.answer}</div>
                              </div>
                            </div>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))
                )}
              </div>
            </div>

            {/* Sidebar Info */}
            <div className="space-y-6">
              {/* Quick Tips */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Tips for Better Answers</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-start space-x-3">
                      <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-primary text-xs font-bold">1</span>
                      </div>
                      <p className="text-sm text-gray-600">Be specific about what you don't understand</p>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-primary text-xs font-bold">2</span>
                      </div>
                      <p className="text-sm text-gray-600">Include relevant context or chapter information</p>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-primary text-xs font-bold">3</span>
                      </div>
                      <p className="text-sm text-gray-600">Show what you've already tried</p>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-primary text-xs font-bold">4</span>
                      </div>
                      <p className="text-sm text-gray-600">Ask follow-up questions if needed</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Recent Doubts */}
              {recentDoubts.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Recent Doubts</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {recentDoubts.map((doubt: any) => (
                        <div key={doubt.id} className="p-3 bg-gray-50 rounded-lg">
                          <p className="text-sm font-medium text-gray-900 line-clamp-2">
                            {doubt.question}
                          </p>
                          <div className="flex items-center justify-between mt-2">
                            <Badge size="sm" variant={doubt.status === "answered" ? "default" : "secondary"}>
                              {doubt.status}
                            </Badge>
                            <span className="text-xs text-gray-500">
                              {new Date(doubt.createdAt).toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </main>
      </div>
      
      <ChatbotWidget />
    </div>
  );
}
