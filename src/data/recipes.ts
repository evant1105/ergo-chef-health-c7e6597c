import { Recipe } from "@/components/RecipeCard";

export const recipes: Recipe[] = [
  {
    id: "1",
    title: "Garlic Butter Shrimp",
    description: "Quick and delicious shrimp sautéed in garlic butter with herbs",
    difficulty: "Easy",
    time: "15 min",
    servings: 2,
    calories: 280,
    imageUrl: "https://hoqspsbrlhscploirkky.supabase.co/storage/v1/object/public/image1/Screenshot%202025-12-03%20091249.png",
    steps: [
      "Prep shrimp by removing shells and deveining",
      "Melt butter in a large skillet over medium-high heat",
      "Add minced garlic and cook for 30 seconds",
      "Add shrimp and cook for 2-3 minutes per side",
      "Season with salt, pepper, and fresh herbs",
      "Serve immediately with crusty bread"
    ]
  },
  {
    id: "2",
    title: "Chicken Stir Fry",
    description: "Colorful vegetables and tender chicken in a savory sauce",
    difficulty: "Medium",
    time: "25 min",
    servings: 4,
    calories: 350,
    imageUrl: "https://hoqspsbrlhscploirkky.supabase.co/storage/v1/object/public/image1/Screenshot%202025-12-03%20091249.png",
    steps: [
      "Cut chicken breast into bite-sized pieces",
      "Prep vegetables: bell peppers, broccoli, snap peas",
      "Heat oil in a wok over high heat",
      "Stir-fry chicken until golden, set aside",
      "Stir-fry vegetables until crisp-tender",
      "Add sauce and chicken back to wok",
      "Serve over steamed rice"
    ]
  },
  {
    id: "3",
    title: "Caprese Salad",
    description: "Fresh tomatoes, mozzarella, and basil with balsamic glaze",
    difficulty: "Easy",
    time: "10 min",
    servings: 2,
    calories: 220,
    steps: [
      "Slice fresh mozzarella and ripe tomatoes",
      "Arrange alternately on a plate",
      "Tuck fresh basil leaves between slices",
      "Drizzle with olive oil and balsamic glaze",
      "Season with salt and freshly cracked pepper",
      "Serve immediately"
    ]
  },
  {
    id: "4",
    title: "Beef Tacos",
    description: "Seasoned ground beef with fresh toppings in crispy shells",
    difficulty: "Easy",
    time: "20 min",
    servings: 4,
    calories: 380,
    steps: [
      "Brown ground beef in a skillet",
      "Add taco seasoning and water, simmer",
      "Warm taco shells in oven",
      "Prep toppings: lettuce, tomato, cheese, sour cream",
      "Fill shells with seasoned beef",
      "Add desired toppings and serve"
    ]
  },
  {
    id: "5",
    title: "Mushroom Risotto",
    description: "Creamy Italian rice dish with sautéed mushrooms and parmesan",
    difficulty: "Hard",
    time: "45 min",
    servings: 4,
    calories: 420,
    steps: [
      "Heat broth in a saucepan, keep warm",
      "Sauté mushrooms until golden, set aside",
      "Toast arborio rice in butter",
      "Add wine and stir until absorbed",
      "Add broth one ladle at a time, stirring constantly",
      "Finish with mushrooms, butter, and parmesan",
      "Season and serve immediately"
    ]
  },
  {
    id: "6",
    title: "Greek Salad",
    description: "Crisp vegetables with feta cheese and tangy dressing",
    difficulty: "Easy",
    time: "15 min",
    servings: 2,
    calories: 180,
    steps: [
      "Chop cucumber, tomatoes, and red onion",
      "Add kalamata olives and bell pepper",
      "Crumble feta cheese over vegetables",
      "Whisk olive oil, lemon juice, oregano",
      "Drizzle dressing over salad",
      "Toss gently and serve"
    ]
  }
];
