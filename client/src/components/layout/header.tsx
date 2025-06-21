import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { GraduationCap, User } from "lucide-react";

interface HeaderProps {
  selectedGrade: string;
  onGradeChange: (grade: string) => void;
}

export default function Header({ selectedGrade, onGradeChange }: HeaderProps) {
  return (
    <header className="bg-white shadow-sm border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-4">
            <Link href="/">
              <div className="flex items-center space-x-2 cursor-pointer">
                <div className="w-10 h-10 gradient-primary rounded-lg flex items-center justify-center">
                  <GraduationCap className="text-white text-lg" />
                </div>
                <span className="text-2xl font-bold text-gray-900">LearnMate</span>
              </div>
            </Link>
          </div>
          
          <nav className="hidden md:flex space-x-8">
            <Link href="/" className="text-primary font-semibold">
              Dashboard
            </Link>
            <Link href="/subjects" className="text-gray-600 hover:text-primary transition-colors">
              Subjects
            </Link>
            <Link href="/quiz" className="text-gray-600 hover:text-primary transition-colors">
              Quiz Center
            </Link>
            <Link href="/doubt-center" className="text-gray-600 hover:text-primary transition-colors">
              Doubt Center
            </Link>
            <Link href="/creativity-hub" className="text-gray-600 hover:text-primary transition-colors">
              Creativity Hub
            </Link>
            <Link href="/reasoning-iq" className="text-gray-600 hover:text-primary transition-colors">
              Reasoning & IQ
            </Link>
          </nav>

          <div className="flex items-center space-x-4">
            <Select value={selectedGrade} onValueChange={onGradeChange}>
              <SelectTrigger className="bg-gray-100 border-0 rounded-lg px-3 py-2 text-sm font-medium focus:ring-2 focus:ring-primary w-28">
                <SelectValue placeholder="Grade" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="6">Class 6</SelectItem>
                <SelectItem value="7">Class 7</SelectItem>
                <SelectItem value="8">Class 8</SelectItem>
                <SelectItem value="9">Class 9</SelectItem>
                <SelectItem value="10">Class 10</SelectItem>
                <SelectItem value="11">Class 11</SelectItem>
                <SelectItem value="12">Class 12</SelectItem>
              </SelectContent>
            </Select>
            
            <Button size="sm" className="w-8 h-8 bg-primary rounded-full p-0">
              <User className="text-white text-sm" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
