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
}


export const planData:PlanInfo[] = [
    {
      useCase: 'Travel Planner',
      description: 'Helps plan a trip based on user preferences like destination, dates, and budget.',
      uri: 'travel-planner',
      image: 'https://assets.weforum.org/article/image/XJkVQrA6uy9CVqo_9e3DMLlKvkOHcr8wPO4RbDhbsfc.jpg',
      initialPrompt: 'Plan a trip based:',
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
      image: 'data:image/jpeg;base64,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',
      initialPrompt: 'Find book recommendations:',
      inputs: [
        { field: 'genre', type: 'text', label: 'Preferred Genre', required: true },
        { field: 'author', type: 'text', label: 'Favorite Author', required: false },
      ],
      outputs: [
        { field: 'bookList', label: 'Book List', type: 'checkbox' },
        { field: 'purchaseLinks', label: 'Purchase Links', type: 'checkbox' },
      ],
    },
    {
      useCase: 'Job Finder',
      description: 'Finds job opportunities based on your skills and preferences.',
      uri: 'job-finder',
      image: 'https://cdn.prod.website-files.com/5d4c101771ecafe872b3098a/66dec1b818f8d7b956139f85_65e1b0529db64df0357922f8_Visuals%2520Webflow%2520Glossary%2520(10).jpeg',
      initialPrompt: 'Find jobs:',
      inputs: [
        { field: 'skills', type: 'text', label: 'Your Skills', required: true },
        { field: 'location', type: 'text', label: 'Preferred Location', required: false },
      ],
      outputs: [
        { field: 'jobList', label: 'Job List', type: 'checkbox' },
        { field: 'applicationTips', label: 'Application Tips', type: 'checkbox' },
      ],
    },
    {
      useCase: 'Pet Care Assistant',
      description: 'Provides tips and reminders for taking care of pets.',
      uri: 'pet-care-assistant',
      image: 'data:image/jpeg;base64,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',
      initialPrompt: 'Take care of your pet:',
      inputs: [
        { field: 'petType', type: 'text', label: 'Type of Pet', required: true },
        { field: 'healthConcerns', type: 'text', label: 'Health Concerns (if any)', required: false },
      ],
      outputs: [
        { field: 'careTips', label: 'Care Tips', type: 'checkbox' },
        { field: 'vetReminders', label: 'Vet Visit Reminders', type: 'checkbox' },
      ],
    },
    {
      useCase: "Study Planner",
      description: "Helps students organize their study schedule based on exam dates and subjects.",
      uri: "study-planner",
      image: "https://example.com/images/study.jpg",
      initialPrompt: "Plan your study schedule based on:",
      inputs: [
        {
          field: "subjects",
          type: "text",
          label: "Subjects to Study",
          required: true
        },
        {
          field: "examDate",
          type: "date",
          label: "Exam Date",
          required: true
        },
        {
          field: "studyHours",
          type: "number",
          label: "Daily Study Hours",
          required: true
        }
      ],
      outputs: [
        {
          field: "studySchedule",
          label: "Study Schedule",
          type: "checkbox"
        },
        {
          field: "examPreparation",
          label: "Exam Preparation Tips",
          type: "checkbox"
        }
      ]
    },
    {
      useCase: "Content Calendar Planner",
      description: "Helps plan content for social media and blogs.",
      uri: "content-calendar-planner",
      image: "https://example.com/images/content.jpg",
      initialPrompt: "Create a content calendar based on:",
      inputs: [
        {
          field: "platform",
          type: "text",
          label: "Content Platform (e.g., Instagram, Blog)",
          required: true
        },
        {
          field: "contentType",
          type: "text",
          label: "Content Type (e.g., blog post, video)",
          required: true
        },
        {
          field: "postingFrequency",
          type: "number",
          label: "Posts per Week",
          required: true
        }
      ],
      outputs: [
        {
          field: "contentIdeas",
          label: "Content Ideas",
          type: "checkbox"
        },
        {
          field: "postingSchedule",
          label: "Posting Schedule",
          type: "checkbox"
        }
      ]
    },
  
    
  ];