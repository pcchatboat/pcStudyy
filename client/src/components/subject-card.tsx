import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calculator, FlaskRound, Globe, Book, Languages, Ellipsis } from "lucide-react";
import { cn } from "@/lib/utils";

interface Subject {
  id: number;
  name: string;
  icon: string;
  color: string;
  totalChapters: number;
  description: string;
}

interface SubjectCardProps {
  subject: Subject;
  progress?: number;
  onClick?: () => void;
}

const iconMap = {
  calculator: Calculator,
  flask: FlaskRound,
  "globe-americas": Globe,
  book: Book,
  language: Languages,
  om: Ellipsis,
};

const colorMap = {
  blue: "bg-blue-100 text-blue-600",
  green: "bg-green-100 text-green-600",
  yellow: "bg-yellow-100 text-yellow-600",
  purple: "bg-purple-100 text-purple-600",
  orange: "bg-orange-100 text-orange-600",
  red: "bg-red-100 text-red-600",
};

const progressColorMap = {
  blue: "bg-blue-600",
  green: "bg-green-600",
  yellow: "bg-yellow-600",
  purple: "bg-purple-600",
  orange: "bg-orange-600",
  red: "bg-red-600",
};

export default function SubjectCard({ subject, progress = 0, onClick }: SubjectCardProps) {
  const Icon = iconMap[subject.icon as keyof typeof iconMap] || Book;
  const iconColorClass = colorMap[subject.color as keyof typeof colorMap] || "bg-gray-100 text-gray-600";
  const progressColorClass = progressColorMap[subject.color as keyof typeof progressColorMap] || "bg-gray-600";

  return (
    <Card 
      className="hover-lift cursor-pointer border border-gray-100 transform transition-all"
      onClick={onClick}
    >
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className={cn("w-12 h-12 rounded-lg flex items-center justify-center", iconColorClass)}>
            <Icon size={24} />
          </div>
          <Badge variant="secondary" className={cn("px-2 py-1 text-xs font-medium", iconColorClass)}>
            {subject.totalChapters} Chapters
          </Badge>
        </div>
        
        <h3 className="font-semibold text-gray-900 mb-2">{subject.name}</h3>
        <p className="text-gray-600 text-sm mb-4">{subject.description}</p>
        
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-500">Progress: {progress}%</span>
          <div className="w-16 bg-gray-200 rounded-full h-2">
            <div 
              className={cn("h-2 rounded-full", progressColorClass)}
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
