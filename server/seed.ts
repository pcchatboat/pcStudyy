import { db } from "./db";
import { subjects, creativeTasks, thinkingChallenges, mythFacts } from "@shared/schema";

export async function seedDatabase() {
  try {
    // Check if data already exists
    const existingSubjects = await db.select().from(subjects).limit(1);
    if (existingSubjects.length > 0) {
      console.log("Database already seeded");
      return;
    }

    console.log("Seeding database...");

    // Seed subjects
    const subjectData = [
      { name: "Mathematics", icon: "calculator", color: "blue", totalChapters: 12, description: "Algebra, Geometry, Statistics & more" },
      { name: "Science", icon: "flask", color: "green", totalChapters: 15, description: "Physics, Chemistry, Biology" },
      { name: "Social Science", icon: "globe-americas", color: "yellow", totalChapters: 18, description: "History, Geography, Civics" },
      { name: "English", icon: "book", color: "purple", totalChapters: 10, description: "Literature, Grammar, Writing" },
      { name: "Hindi", icon: "language", color: "orange", totalChapters: 14, description: "Literature, Grammar, Composition" },
      { name: "Sanskrit", icon: "om", color: "red", totalChapters: 8, description: "Shlokas, Grammar, Literature" },
      { name: "Reasoning and IQ", icon: "brain", color: "indigo", totalChapters: 15, description: "Logic, critical thinking, and problem-solving skills" },
    ];

    await db.insert(subjects).values(subjectData);

    // Seed creative tasks
    const creativeTaskData = [
      {
        title: "Story Writing Challenge",
        description: "Write a short story using the words: mystery, bicycle, and rainbow",
        category: "Creative Writing",
        difficulty: "Medium",
        estimatedTime: 30
      },
      {
        title: "Invention Showcase",
        description: "Design an invention that solves a problem in your daily life",
        category: "Innovation",
        difficulty: "Hard",
        estimatedTime: 45
      },
      {
        title: "Poetry Corner",
        description: "Create a poem about your favorite season using metaphors",
        category: "Creative Writing",
        difficulty: "Easy",
        estimatedTime: 20
      }
    ];

    await db.insert(creativeTasks).values(creativeTaskData);

    // Seed thinking challenges
    const thinkingChallengeData = [
      {
        title: "The Bridge Crossing Puzzle",
        description: "Four people need to cross a bridge at night with only one flashlight. How do they all get across in 17 minutes?",
        type: "Logic Puzzle",
        hint: "Think about who should go together and who should bring the flashlight back",
        solution: "The two fastest cross first, fastest returns, two slowest cross together, second fastest returns, then both fastest cross again"
      },
      {
        title: "Pattern Recognition",
        description: "What comes next in this sequence: 2, 6, 12, 20, 30, ?",
        type: "Mathematical",
        hint: "Look at the differences between consecutive numbers",
        solution: "42 (the differences are 4, 6, 8, 10, so next difference is 12)"
      }
    ];

    await db.insert(thinkingChallenges).values(thinkingChallengeData);

    // Seed myth facts
    const mythFactData = [
      {
        statement: "Lightning never strikes the same place twice",
        isTrue: false,
        explanation: "Lightning can and does strike the same place multiple times. The Empire State Building is struck about 25 times per year.",
        category: "Science",
        difficulty: "Easy",
        source: "National Weather Service"
      },
      {
        statement: "Goldfish have a 3-second memory",
        isTrue: false,
        explanation: "Goldfish actually have memories that last months, not seconds. They can be trained to respond to different colors, sounds, and other sensory cues.",
        category: "Biology",
        difficulty: "Easy",
        source: "Scientific Studies"
      }
    ];

    await db.insert(mythFacts).values(mythFactData);

    console.log("Database seeded successfully!");
  } catch (error) {
    console.error("Error seeding database:", error);
  }
}