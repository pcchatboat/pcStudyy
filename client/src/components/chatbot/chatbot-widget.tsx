import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { MessageCircle, X, Send, Bot, User } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { cn } from "@/lib/utils";

interface ChatMessage {
  id: string;
  message: string;
  response?: string;
  isUser: boolean;
  timestamp: Date;
}

export default function ChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "1",
      message: "Hi! I'm your AI Study Buddy. Ask me anything about your subjects!",
      isUser: false,
      timestamp: new Date(),
    }
  ]);
  const [inputMessage, setInputMessage] = useState("");

  const chatMutation = useMutation({
    mutationFn: async (message: string) => {
      const response = await apiRequest("POST", "/api/chat", {
        message,
        userId: 1, // Default user for demo
        context: "general"
      });
      return response.json();
    },
    onSuccess: (data) => {
      const botMessage: ChatMessage = {
        id: Date.now().toString() + "_bot",
        message: data.response,
        isUser: false,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, botMessage]);
    },
  });

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      message: inputMessage,
      isUser: true,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    chatMutation.mutate(inputMessage);
    setInputMessage("");
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Chatbot Toggle Button */}
      <Button
        onClick={() => setIsOpen(!isOpen)}
        className="w-16 h-16 gradient-primary rounded-full shadow-lg hover:shadow-xl transition-all transform hover:scale-110 p-0"
      >
        <MessageCircle className="text-white text-xl" />
      </Button>

      {/* Chatbot Widget */}
      {isOpen && (
        <Card className="absolute bottom-20 right-0 w-80 shadow-2xl border">
          {/* Chatbot Header */}
          <CardHeader className="gradient-primary text-white p-4 rounded-t-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                  <Bot size={16} />
                </div>
                <div>
                  <h4 className="font-semibold">AI Study Buddy</h4>
                  <p className="text-sm opacity-90">Always ready to help!</p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsOpen(false)}
                className="text-white/80 hover:text-white hover:bg-white/10 p-1"
              >
                <X size={16} />
              </Button>
            </div>
          </CardHeader>

          {/* Chat Messages */}
          <CardContent className="h-64 overflow-y-auto p-4 space-y-3 custom-scrollbar">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={cn(
                  "flex items-start space-x-2",
                  msg.isUser ? "flex-row-reverse space-x-reverse" : "",
                  "chat-message-enter"
                )}
              >
                <div className={cn(
                  "w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0",
                  msg.isUser ? "bg-secondary" : "bg-primary"
                )}>
                  {msg.isUser ? (
                    <User className="text-white text-xs" />
                  ) : (
                    <Bot className="text-white text-xs" />
                  )}
                </div>
                <div className={cn(
                  "rounded-2xl px-3 py-2 max-w-64 text-sm",
                  msg.isUser 
                    ? "bg-primary text-white" 
                    : "bg-gray-100 text-gray-800"
                )}>
                  <p>{msg.message}</p>
                </div>
              </div>
            ))}
            {chatMutation.isPending && (
              <div className="flex items-center space-x-2">
                <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                  <Bot className="text-white text-xs" />
                </div>
                <div className="bg-gray-100 rounded-2xl px-3 py-2">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0.1s" }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
                  </div>
                </div>
              </div>
            )}
          </CardContent>

          {/* Chat Input */}
          <div className="p-4 border-t">
            <div className="flex space-x-2">
              <Input
                type="text"
                placeholder="Ask me anything..."
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                className="flex-1 text-sm"
                disabled={chatMutation.isPending}
              />
              <Button 
                onClick={handleSendMessage}
                disabled={chatMutation.isPending || !inputMessage.trim()}
                className="w-10 h-10 p-0"
              >
                <Send size={16} />
              </Button>
            </div>
            <p className="text-xs text-gray-500 mt-2">Powered by AI • Always learning to help you better!</p>
          </div>
        </Card>
      )}
    </div>
  );
}
