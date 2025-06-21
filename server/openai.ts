import OpenAI from "openai";

// the newest OpenAI model is "gpt-4o" which was released May 13, 2024. do not change this unless explicitly requested by the user
const openai = new OpenAI({ 
  apiKey: process.env.OPENAI_API_KEY || process.env.OPENAI_API_KEY_ENV_VAR || "default_key" 
});

export async function generateChatResponse(message: string, context?: string): Promise<string> {
  const systemPrompt = `You are an AI Study Buddy for students in grades 6-12 studying NCERT syllabus. You should:
  - Explain concepts in simple, age-appropriate language
  - Use examples and analogies that students can relate to
  - Be encouraging and supportive
  - Ask follow-up questions to check understanding
  - Connect topics to real-world applications
  - Use emojis to make responses engaging
  
  ${context ? `Context: ${context}` : ''}`;

  const response = await openai.chat.completions.create({
    model: "gpt-4o",
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user", content: message }
    ],
    max_tokens: 500,
  });

  return response.choices[0].message.content || "I'm sorry, I couldn't generate a response right now.";
}

export async function generateQuizQuestions(subject: string, grade: number, chapter: string, count: number = 5): Promise<any[]> {
  const prompt = `Generate ${count} multiple choice questions for NCERT ${subject} Grade ${grade}, Chapter: ${chapter}.

  Return the response as a JSON object with this exact format:
  {
    "questions": [
      {
        "question": "Question text here",
        "options": ["Option A", "Option B", "Option C", "Option D"],
        "correctAnswer": "Option A",
        "explanation": "Explanation of why this is correct"
      }
    ]
  }

  Make questions appropriate for Grade ${grade} level and ensure they test understanding, not just memorization.`;

  const response = await openai.chat.completions.create({
    model: "gpt-4o",
    messages: [{ role: "user", content: prompt }],
    response_format: { type: "json_object" },
  });

  try {
    const result = JSON.parse(response.choices[0].message.content || '{"questions": []}');
    return result.questions || [];
  } catch (error) {
    throw new Error("Failed to generate quiz questions: " + error.message);
  }
}

export async function generateCreativeTask(category: string): Promise<any> {
  const prompt = `Generate a creative ${category} task/prompt suitable for students grades 6-12.

  Return the response as JSON with this format:
  {
    "title": "Task title",
    "description": "Brief description",
    "prompt": "Detailed creative prompt or instructions",
    "difficulty": "easy|medium|hard"
  }

  Make it engaging and educational.`;

  const response = await openai.chat.completions.create({
    model: "gpt-4o",
    messages: [{ role: "user", content: prompt }],
    response_format: { type: "json_object" },
  });

  try {
    return JSON.parse(response.choices[0].message.content || '{}');
  } catch (error) {
    throw new Error("Failed to generate creative task: " + error.message);
  }
}

export async function generateThinkingChallenge(type: string): Promise<any> {
  const prompt = `Generate a ${type} challenge for students grades 6-12.

  Return the response as JSON with this format:
  {
    "title": "Challenge title",
    "description": "Challenge description or question",
    "hint": "Optional hint",
    "solution": "Sample solution or approach"
  }

  Make it thought-provoking and fun.`;

  const response = await openai.chat.completions.create({
    model: "gpt-4o",
    messages: [{ role: "user", content: prompt }],
    response_format: { type: "json_object" },
  });

  try {
    return JSON.parse(response.choices[0].message.content || '{}');
  } catch (error) {
    throw new Error("Failed to generate thinking challenge: " + error.message);
  }
}

export async function generateMythFact(): Promise<any> {
  const prompt = `Generate an interesting myth or fact suitable for students grades 6-12.

  Return the response as JSON with this format:
  {
    "title": "Myth/Fact title",
    "statement": "The statement to evaluate",
    "isMyth": true/false,
    "explanation": "Detailed explanation of why it's a myth or fact",
    "category": "science|history|general|academic"
  }

  Make it educational and surprising.`;

  const response = await openai.chat.completions.create({
    model: "gpt-4o",
    messages: [{ role: "user", content: prompt }],
    response_format: { type: "json_object" },
  });

  try {
    return JSON.parse(response.choices[0].message.content || '{}');
  } catch (error) {
    throw new Error("Failed to generate myth/fact: " + error.message);
  }
}

export async function generateDailyLifeQuestion(subject: string): Promise<any> {
  const prompt = `Generate a "daily life" question that connects ${subject} to real-world applications for students grades 6-12.

  Return the response as JSON with this format:
  {
    "question": "How does [concept] relate to daily life?",
    "answer": "Detailed explanation of the real-world connection",
    "realWorldConnection": "Specific examples of how this applies in daily life"
  }

  Make it relatable and educational.`;

  const response = await openai.chat.completions.create({
    model: "gpt-4o",
    messages: [{ role: "user", content: prompt }],
    response_format: { type: "json_object" },
  });

  try {
    return JSON.parse(response.choices[0].message.content || '{}');
  } catch (error) {
    throw new Error("Failed to generate daily life question: " + error.message);
  }
}

export async function answerDoubt(question: string, subject: string, grade: number): Promise<string> {
  const prompt = `As an expert teacher, answer this student's doubt about ${subject} for Grade ${grade}:

  Question: ${question}

  Provide a clear, detailed explanation that:
  - Is appropriate for Grade ${grade} level
  - Uses simple language and examples
  - Includes diagrams or step-by-step solutions if needed
  - Encourages further learning
  - Uses emojis to make it engaging`;

  const response = await openai.chat.completions.create({
    model: "gpt-4o",
    messages: [{ role: "user", content: prompt }],
    max_tokens: 800,
  });

  return response.choices[0].message.content || "I'll need more information to answer your doubt properly.";
}
