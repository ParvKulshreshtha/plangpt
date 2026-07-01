export type CustomFormat = "table" | "cards" | "checklist";

export type AnswerFormatItem =
  | { id: string; type: "heading"; label: string }
  | { id: string; type: "para"; label: string }
  | { id: string; type: "custom"; label: string; format: CustomFormat };

export interface PlanInfo {
  useCase: string;
  description: string;
  uri: string;
  image: string;
  initialPrompt: string;
  initialDescription: string;
  answerFormat: AnswerFormatItem[];
  tags: string[];
}

export const planData: PlanInfo[] = [
  {
    useCase: "Travel Planner",
    description:
      "Helps plan a trip based on user preferences like destination, dates, and budget.",
    uri: "travel-planner",
    image:
      "https://assets.weforum.org/article/image/XJkVQrA6uy9CVqo_9e3DMLlKvkOHcr8wPO4RbDhbsfc.jpg",
    initialPrompt:
      "You are a travel planning assistant. Help the user plan their trip based on the details they share.",
    initialDescription:
      "Hi! I'm your Travel Planner. Tell me where you'd like to go, your travel dates, budget, and any preferences — and I'll build a personalized trip plan for you.",
    tags: ["travel", "trip-planning", "vacation", "tourism", "itinerary", "budget-travel"],
    answerFormat: [
      { id: "bestTimeToVisit", type: "heading", label: "Best Time to Visit" },
      { id: "bestTimeDetail", type: "para", label: "Season & weather overview" },
      { id: "itinerary", type: "heading", label: "Itinerary Suggestions" },
      { id: "itineraryDays", type: "custom", label: "Day-by-day itinerary", format: "table" },
      { id: "packingList", type: "heading", label: "Packing List" },
      { id: "packingItems", type: "custom", label: "What to pack", format: "checklist" },
      { id: "visaRequirements", type: "heading", label: "Visa Requirements" },
      { id: "visaDetail", type: "para", label: "Visa & entry information" },
      { id: "weather", type: "heading", label: "Weather Forecast" },
      { id: "weatherDetail", type: "para", label: "Expected weather during your trip" },
    ],
  },
  {
    useCase: "Meal Planner",
    description:
      "Generates meal plans based on dietary preferences and health goals.",
    uri: "meal-planner",
    image:
      "https://cdn.apartmenttherapy.info/image/upload/v1644622714/k/Photo/Large%20Packages/2022-03-KESS-Tools/food-storage-glass-containers-horizontal.jpg",
    initialPrompt:
      "You are a nutrition and meal planning assistant. Create personalized meal plans based on the user's dietary needs.",
    initialDescription:
      "Hi! I'm your Meal Planner. Share your dietary preferences, calorie goals, and how many meals you'd like per day — I'll create a balanced meal plan tailored to you.",
    tags: ["food", "health", "nutrition", "diet", "meal-prep", "fitness"],
    answerFormat: [
      { id: "mealPlan", type: "heading", label: "Meal Plan" },
      { id: "weeklyMeals", type: "custom", label: "Weekly meal schedule", format: "table" },
      { id: "shoppingList", type: "heading", label: "Shopping List" },
      { id: "shoppingItems", type: "custom", label: "Groceries to buy", format: "checklist" },
      { id: "recipes", type: "heading", label: "Recipe Suggestions" },
      { id: "recipeCards", type: "custom", label: "Recommended recipes", format: "cards" },
    ],
  },
  {
    useCase: "Fitness Tracker",
    description: "Tracks fitness activities and provides workout suggestions.",
    uri: "fitness-tracker",
    image:
      "https://web-back.perfectgym.com/sites/default/files/styles/900x/public/fit%20stats.webp?itok=T_dGR03_",
    initialPrompt:
      "You are a fitness coach. Help users track progress and suggest workouts based on their activity and goals.",
    initialDescription:
      "Hi! I'm your Fitness Tracker. Tell me about your recent workouts, goals, and activity level — I'll summarize your progress and suggest what to do next.",
    tags: ["fitness", "workout", "exercise", "health", "tracking", "progress"],
    answerFormat: [
      { id: "progressSummary", type: "heading", label: "Progress Summary" },
      { id: "progressDetail", type: "para", label: "Your fitness progress overview" },
      { id: "stats", type: "custom", label: "Activity stats", format: "table" },
      { id: "suggestedWorkouts", type: "heading", label: "Suggested Workouts" },
      { id: "workoutCards", type: "custom", label: "Workout recommendations", format: "cards" },
    ],
  },
  {
    useCase: "Budget Tracker",
    description: "Helps manage and track expenses to stay within budget.",
    uri: "budget-tracker",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRyChsAeKQkBoG3iaC3Hpi--5KRP9X6EW357A&s",
    initialPrompt:
      "You are a personal finance assistant. Help users analyze spending and improve their budget.",
    initialDescription:
      "Hi! I'm your Budget Tracker. Share your income, expenses, and savings goals — I'll break down your spending and suggest ways to save more.",
    tags: ["money", "finance", "expenses", "savings", "budgeting"],
    answerFormat: [
      { id: "spendingAnalysis", type: "heading", label: "Spending Analysis" },
      { id: "spendingBreakdown", type: "custom", label: "Expense breakdown", format: "table" },
      { id: "spendingInsight", type: "para", label: "Key spending insights" },
      { id: "savingsSuggestions", type: "heading", label: "Savings Suggestions" },
      { id: "savingsTips", type: "custom", label: "Actionable savings tips", format: "checklist" },
    ],
  },
  {
    useCase: "Language Tutor",
    description: "Helps users learn a new language with interactive lessons.",
    uri: "language-tutor",
    image:
      "https://www.euroschoolindia.com/wp-content/uploads/2023/08/benefits-of-learning-second-language.jpg",
    initialPrompt:
      "You are a language tutor. Create lesson plans and practice exercises based on the user's target language and level.",
    initialDescription:
      "Hi! I'm your Language Tutor. Tell me which language you want to learn and your current level — I'll design lessons and exercises just for you.",
    tags: ["learning", "language", "education", "skills", "tutor", "practice"],
    answerFormat: [
      { id: "lessonPlan", type: "heading", label: "Lesson Plan" },
      { id: "lessonSchedule", type: "custom", label: "Structured lesson schedule", format: "table" },
      { id: "lessonOverview", type: "para", label: "Learning path overview" },
      { id: "practiceExercises", type: "heading", label: "Practice Exercises" },
      { id: "exercises", type: "custom", label: "Exercises to practice", format: "cards" },
    ],
  },
  {
    useCase: "Event Organizer",
    description: "Plans events based on preferences like theme and guest count.",
    uri: "event-organizer",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ3DNasCvfOLMIxJyQtbNq7EfLkWnMazHE9xw&s",
    initialPrompt:
      "You are an event planning assistant. Help users organize events with checklists, timelines, and budget guidance.",
    initialDescription:
      "Hi! I'm your Event Organizer. Tell me about your event — type, guest count, theme, and budget — and I'll help you plan every detail.",
    tags: ["events", "party", "wedding", "planning", "organizer", "checklist"],
    answerFormat: [
      { id: "checklist", type: "heading", label: "Event Checklist" },
      { id: "checklistItems", type: "custom", label: "Tasks to complete", format: "checklist" },
      { id: "timeline", type: "heading", label: "Event Timeline" },
      { id: "timelineTable", type: "custom", label: "Schedule leading up to the event", format: "table" },
      { id: "budgetSummary", type: "heading", label: "Budget Summary" },
      { id: "budgetDetail", type: "para", label: "Estimated costs and allocation" },
    ],
  },
  {
    useCase: "Recipe Finder",
    description: "Finds recipes based on ingredients you have at home.",
    uri: "recipe-finder",
    image:
      "https://images.immediate.co.uk/production/volatile/sites/30/2013/05/2022-09-23GFOWEBFamilyRecipes-OnePotGarlicChicken05875preview-d8a4a42.jpg?resize=768,574",
    initialPrompt:
      "You are a cooking assistant. Suggest recipes based on ingredients the user has available.",
    initialDescription:
      "Hi! I'm your Recipe Finder. List the ingredients you have on hand and any dietary preferences — I'll suggest recipes you can make right now.",
    tags: ["cooking", "food", "recipes", "ingredients", "home-cooking"],
    answerFormat: [
      { id: "recipeSuggestions", type: "heading", label: "Recipe Suggestions" },
      { id: "recipes", type: "custom", label: "Recipes you can make", format: "cards" },
      { id: "nutritionInfo", type: "heading", label: "Nutritional Information" },
      { id: "nutritionTable", type: "custom", label: "Nutrition per serving", format: "table" },
    ],
  },
  {
    useCase: "Book Recommender",
    description: "Suggests books based on genre and reading preferences.",
    uri: "book-recommender",
    image:
      "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=800&q=80",
    initialPrompt:
      "You are a literary recommendation assistant. Suggest books based on the user's genre, mood, and reading preferences.",
    initialDescription:
      "Hi! I'm your Book Recommender. Tell me your favorite genres, mood, or books you've loved — I'll find your next great read.",
    tags: ["books", "reading", "recommendations", "literature", "genres"],
    answerFormat: [
      { id: "bookList", type: "heading", label: "Recommended Books" },
      { id: "books", type: "custom", label: "Book picks for you", format: "cards" },
      { id: "readingGuide", type: "heading", label: "Reading Guide" },
      { id: "guideDetail", type: "para", label: "Why these books match your taste" },
    ],
  },
];
