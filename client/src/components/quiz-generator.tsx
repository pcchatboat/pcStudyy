import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, XCircle, Clock, Trophy } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useTimer } from "@/hooks/use-timer";

interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
}

interface QuizGeneratorProps {
  subject: string;
  grade: number;
  chapter?: string;
}

export default function QuizGenerator({ subject, grade, chapter = "General" }: QuizGeneratorProps) {
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [answers, setAnswers] = useState<string[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);
  const [quizStarted, setQuizStarted] = useState(false);

  const { seconds, minutes, start, stop, reset } = useTimer();

  const generateQuizMutation = useMutation({
    mutationFn: async () => {
      const response = await apiRequest("POST", "/api/generate-quiz", {
        subject,
        grade,
        chapter,
        count: 5
      });
      return response.json();
    },
    onSuccess: (data) => {
      setQuestions(data.questions);
      setQuizStarted(true);
      start();
    },
  });

  const submitQuizMutation = useMutation({
    mutationFn: async (quizData: any) => {
      const response = await apiRequest("POST", "/api/quiz/submit", quizData);
      return response.json();
    },
  });

  const handleStartQuiz = () => {
    generateQuizMutation.mutate();
  };

  const handleAnswerSelect = (answer: string) => {
    setSelectedAnswer(answer);
  };

  const handleNextQuestion = () => {
    const newAnswers = [...answers, selectedAnswer];
    setAnswers(newAnswers);
    setSelectedAnswer("");

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      // Quiz completed
      stop();
      const finalScore = newAnswers.reduce((score, answer, index) => {
        return answer === questions[index].correctAnswer ? score + 1 : score;
      }, 0);
      setScore(finalScore);
      setShowResults(true);
      
      // Submit quiz results
      submitQuizMutation.mutate({
        userId: 1, // Default user for demo
        subjectId: 1, // This should be dynamic based on subject
        score: Math.round((finalScore / questions.length) * 100),
        totalQuestions: questions.length,
        timeSpent: minutes * 60 + seconds,
        completed: true
      });
    }
  };

  const handleRestartQuiz = () => {
    setQuestions([]);
    setCurrentQuestionIndex(0);
    setSelectedAnswer("");
    setAnswers([]);
    setShowResults(false);
    setScore(0);
    setQuizStarted(false);
    reset();
  };

  if (generateQuizMutation.isPending) {
    return (
      <Card>
        <CardContent className="p-8 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p>Generating your personalized quiz...</p>
        </CardContent>
      </Card>
    );
  }

  if (showResults) {
    const percentage = Math.round((score / questions.length) * 100);
    
    return (
      <Card>
        <CardHeader className="text-center">
          <Trophy className="mx-auto h-16 w-16 text-yellow-500 mb-4" />
          <CardTitle className="text-2xl">Quiz Completed!</CardTitle>
        </CardHeader>
        <CardContent className="text-center space-y-4">
          <div className="text-4xl font-bold text-primary">{percentage}%</div>
          <p className="text-lg">You scored {score} out of {questions.length} questions correct!</p>
          
          <div className="flex justify-center space-x-4 text-sm text-gray-600">
            <div className="flex items-center space-x-1">
              <Clock size={16} />
              <span>{minutes}:{seconds.toString().padStart(2, '0')}</span>
            </div>
          </div>

          <div className="space-y-2">
            {questions.map((question, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <span className="text-sm">Question {index + 1}</span>
                {answers[index] === question.correctAnswer ? (
                  <CheckCircle className="text-green-500" size={20} />
                ) : (
                  <XCircle className="text-red-500" size={20} />
                )}
              </div>
            ))}
          </div>

          <Button onClick={handleRestartQuiz} className="w-full">
            Take Another Quiz
          </Button>
        </CardContent>
      </Card>
    );
  }

  if (!quizStarted) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Ready for a Quiz?</CardTitle>
          <p className="text-gray-600">Test your knowledge with AI-generated questions!</p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <Label className="font-semibold">Subject:</Label>
              <p>{subject}</p>
            </div>
            <div>
              <Label className="font-semibold">Grade:</Label>
              <p>Class {grade}</p>
            </div>
            <div>
              <Label className="font-semibold">Chapter:</Label>
              <p>{chapter}</p>
            </div>
            <div>
              <Label className="font-semibold">Questions:</Label>
              <p>5 Questions</p>
            </div>
          </div>
          
          <Button onClick={handleStartQuiz} className="w-full" size="lg">
            Start Quiz
          </Button>
        </CardContent>
      </Card>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <Badge variant="outline">Question {currentQuestionIndex + 1} of {questions.length}</Badge>
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Clock size={16} />
            <span>{minutes}:{seconds.toString().padStart(2, '0')}</span>
          </div>
        </div>
        <Progress value={progress} className="w-full" />
      </CardHeader>
      
      <CardContent className="space-y-6">
        <h3 className="text-lg font-semibold">{currentQuestion.question}</h3>
        
        <RadioGroup value={selectedAnswer} onValueChange={handleAnswerSelect}>
          {currentQuestion.options.map((option, index) => (
            <div key={index} className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-gray-50">
              <RadioGroupItem value={option} id={`option-${index}`} />
              <Label htmlFor={`option-${index}`} className="flex-1 cursor-pointer">
                {option}
              </Label>
            </div>
          ))}
        </RadioGroup>
        
        <Button 
          onClick={handleNextQuestion} 
          disabled={!selectedAnswer}
          className="w-full"
        >
          {currentQuestionIndex < questions.length - 1 ? "Next Question" : "Finish Quiz"}
        </Button>
      </CardContent>
    </Card>
  );
}
