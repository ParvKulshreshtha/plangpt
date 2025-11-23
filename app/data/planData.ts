interface InputField {
    field: string;
    type: string;
    label: string;
    required: boolean;
  }
  
interface OutputField {
  field: string;
  label: string;
  type: string;
}
  
export interface PlanInfo {
  useCase: string;
  description: string;
  uri: string;
  image: string;
  initialPrompt: string;
  inputs: InputField[];
  outputs: OutputField[];
  tags: string[];
}


export const planData: PlanInfo[] = [
  {
    useCase: 'Travel Planner',
    description: 'Helps plan a trip based on user preferences like destination, dates, and budget.',
    uri: 'travel-planner',
    image: 'https://assets.weforum.org/article/image/XJkVQrA6uy9CVqo_9e3DMLlKvkOHcr8wPO4RbDhbsfc.jpg',
    initialPrompt: 'Plan a trip based:',
    tags: ['travel', 'trip-planning', 'vacation', 'tourism', 'itinerary', 'budget-travel'],
    inputs: [
      { field: 'destination', type: 'text', label: 'Destination', required: true },
      { field: 'dates', type: 'dateRange', label: 'Travel Dates', required: true },
      { field: 'budget', type: 'number', label: 'Budget', required: true },
      { field: 'preferences', type: 'text', label: 'Travel Preferences (e.g., adventure, relaxation)', required: false },
    ],
    outputs: [
      { field: 'bestTimeToVisit', label: 'Best Time to Visit', type: 'checkbox' },
      { field: 'packingList', label: 'Packing List', type: 'checkbox' },
      { field: 'itinerarySuggestions', label: 'Itinerary Suggestions', type: 'checkbox' },
      { field: 'visaRequirements', label: 'Visa Requirements', type: 'checkbox' },
      { field: 'weather', label: 'Weather Forecast', type: 'checkbox' },
    ],
  },
  {
    useCase: 'Meal Planner',
    description: 'Generates meal plans based on dietary preferences and health goals.',
    uri: 'meal-planner',
    image: 'https://cdn.apartmenttherapy.info/image/upload/v1644622714/k/Photo/Large%20Packages/2022-03-KESS-Tools/food-storage-glass-containers-horizontal.jpg',
    initialPrompt: 'Create a meal plan based:',
    tags: ['food', 'health', 'nutrition', 'diet', 'meal-prep', 'fitness'],
    inputs: [
      { field: 'diet', type: 'text', label: 'Dietary Preference (e.g., vegan, keto)', required: true },
      { field: 'calories', type: 'number', label: 'Daily Calorie Goal', required: true },
      { field: 'mealsPerDay', type: 'number', label: 'Number of Meals per Day', required: false },
    ],
    outputs: [
      { field: 'mealPlan', label: 'Meal Plan', type: 'checkbox' },
      { field: 'shoppingList', label: 'Shopping List', type: 'checkbox' },
      { field: 'recipeSuggestions', label: 'Recipe Suggestions', type: 'checkbox' },
    ],
  },
  {
    useCase: 'Fitness Tracker',
    description: 'Tracks fitness activities and provides workout suggestions.',
    uri: 'fitness-tracker',
    image: 'https://web-back.perfectgym.com/sites/default/files/styles/900x/public/fit%20stats.webp?itok=T_dGR03_',
    initialPrompt: 'Track your fitness progress:',
    tags: ['fitness', 'workout', 'exercise', 'health', 'tracking', 'progress'],
    inputs: [
      { field: 'activity', type: 'text', label: 'Activity Type (e.g., running, yoga)', required: true },
      { field: 'duration', type: 'number', label: 'Duration in Minutes', required: true },
      { field: 'caloriesBurned', type: 'number', label: 'Calories Burned', required: false },
    ],
    outputs: [
      { field: 'progressSummary', label: 'Progress Summary', type: 'checkbox' },
      { field: 'suggestedWorkouts', label: 'Suggested Workouts', type: 'checkbox' },
    ],
  },
  {
    useCase: 'Budget Tracker',
    description: 'Helps manage and track expenses to stay within budget.',
    uri: 'budget-tracker',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRyChsAeKQkBoG3iaC3Hpi--5KRP9X6EW357A&s',
    initialPrompt: 'Track your budget:',
    tags: ['money', 'finance', 'expenses', 'savings', 'budgeting'],
    inputs: [
      { field: 'income', type: 'number', label: 'Monthly Income', required: true },
      { field: 'expenses', type: 'text', label: 'List of Expenses', required: true },
    ],
    outputs: [
      { field: 'spendingAnalysis', label: 'Spending Analysis', type: 'checkbox' },
      { field: 'savingsSuggestions', label: 'Savings Suggestions', type: 'checkbox' },
    ],
  },
  {
    useCase: 'Language Tutor',
    description: 'Helps users learn a new language with interactive lessons.',
    uri: 'language-tutor',
    image: 'https://www.euroschoolindia.com/wp-content/uploads/2023/08/benefits-of-learning-second-language.jpg',
    initialPrompt: 'Learn a language:',
    tags: ['learning', 'language', 'education', 'skills', 'tutor', 'practice'],
    inputs: [
      { field: 'language', type: 'text', label: 'Language to Learn', required: true },
      { field: 'proficiency', type: 'text', label: 'Current Proficiency Level', required: true },
    ],
    outputs: [
      { field: 'lessonPlan', label: 'Lesson Plan', type: 'checkbox' },
      { field: 'practiceExercises', label: 'Practice Exercises', type: 'checkbox' },
    ],
  },
  {
    useCase: 'Event Organizer',
    description: 'Plans events based on preferences like theme and guest count.',
    uri: 'event-organizer',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ3DNasCvfOLMIxJyQtbNq7EfLkWnMazHE9xw&s',
    initialPrompt: 'Organize an event:',
    tags: ['events', 'party', 'wedding', 'planning', 'organizer', 'checklist'],
    inputs: [
      { field: 'eventType', type: 'text', label: 'Event Type (e.g., wedding, party)', required: true },
      { field: 'guestCount', type: 'number', label: 'Guest Count', required: true },
      { field: 'theme', type: 'text', label: 'Event Theme', required: false },
    ],
    outputs: [
      { field: 'checklist', label: 'Event Checklist', type: 'checkbox' },
      { field: 'budgetSummary', label: 'Budget Summary', type: 'checkbox' },
    ],
  },
  {
    useCase: 'Recipe Finder',
    description: 'Finds recipes based on ingredients you have at home.',
    uri: 'recipe-finder',
    image: 'https://images.immediate.co.uk/production/volatile/sites/30/2013/05/2022-09-23GFOWEBFamilyRecipes-OnePotGarlicChicken05875preview-d8a4a42.jpg?resize=768,574',
    initialPrompt: 'Find recipes based on these inputs:',
    tags: ['cooking', 'food', 'recipes', 'ingredients', 'home-cooking'],
    inputs: [
      { field: 'ingredients', type: 'text', label: 'Ingredients Available', required: true },
    ],
    outputs: [
      { field: 'recipeSuggestions', label: 'Recipe Suggestions', type: 'checkbox' },
      { field: 'nutritionInfo', label: 'Nutritional Information', type: 'checkbox' },
    ],
  },
  {
    useCase: 'Book Recommender',
    description: 'Suggests books based on genre and reading preferences.',
    uri: 'book-recommender',
    image: 'data:image/jpeg;base64,...',
    initialPrompt: 'Find recommended books for you:',
    tags: ['books', 'reading', 'recommendations', 'literature', 'genres'],
    inputs: [
      { field: 'genre', type: 'text', label: 'Preferred Genre', required: false },
      { field: 'mood', type: 'text', label: 'Reading Mood', required: false },
    ],
    outputs: [
      { field: 'bookList', label: 'Recommended Books', type: 'checkbox' },
    ],
  }
];
