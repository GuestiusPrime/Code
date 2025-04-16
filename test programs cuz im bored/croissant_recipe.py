import json

json_string = """
{
  "recipeName": "Classic Croissants",
  "description": "A recipe for making delicious, flaky croissants from scratch.",
  "prepTime": "3 hours (including proofing time)",
  "cookTime": "20-25 minutes",
  "yield": "Approximately 12 croissants",
  "ingredients": [
    {
      "itemName": "All-Purpose Flour",
      "quantity": "500",
      "unit": "grams"
    },
    {
      "itemName": "Instant Dry Yeast",
      "quantity": "10",
      "unit": "grams"
    },
    {
      "itemName": "Granulated Sugar",
      "quantity": "50",
      "unit": "grams"
    },
    {
      "itemName": "Salt",
      "quantity": "10",
      "unit": "grams"
    },
    {
      "itemName": "Whole Milk",
      "quantity": "250",
      "unit": "ml"
    },
    {
      "itemName": "Water",
      "quantity": "50",
      "unit": "ml"
    },
    {
      "itemName": "Unsalted Butter (cold, for dough)",
      "quantity": "50",
      "unit": "grams",
      "notes": "Cut into small cubes"
    },
    {
      "itemName": "Unsalted Butter (cold, for lamination)",
      "quantity": "250",
      "unit": "grams",
      "notes": "Formed into a flat rectangle"
    },
    {
      "itemName": "Egg (for egg wash)",
      "quantity": "1",
      "unit": "large",
      "notes": "Beaten with a tablespoon of milk or water"
    }
  ],
  "instructions": [
    "Combine flour, yeast, sugar, and salt in a mixing bowl.",
    "Warm the milk and water to lukewarm. Add to dry ingredients and mix until a shaggy dough forms.",
    "Add cold butter cubes and mix until dough comes together. Knead the dough on a lightly floured surface for 5-7 minutes, or until smooth and elastic.",
    "Form the dough into a rectangle, wrap in plastic wrap, and refrigerate for at least 2 hours.",
    "Place the cold dough on a lightly floured surface and roll it out into a large rectangle. Place the rectangle of cold butter in the center of the dough. Fold the dough over the butter like a letter (two folds).",
    "Wrap the dough in plastic wrap and refrigerate for 30 minutes.",
    "Repeat the folding process (rolling, folding, refrigerating) 2 more times. This creates the layers of butter and dough.",
    "After the final refrigeration, roll out the dough to approximately 1/8 inch thickness.",
    "Cut the dough into long triangles. Gently stretch each triangle and roll it up from the base to the tip to form a croissant shape.",
    "Place the croissants on a baking sheet lined with parchment paper. Cover loosely with plastic wrap and let them proof for 1-2 hours, or until doubled in size.",
    "Preheat oven to 375°F (190°C).",
    "Brush the croissants with egg wash.",
    "Bake for 20-25 minutes, or until golden brown.",
    "Let cool slightly before serving."
  ],
  "notes": "Keep all ingredients cold to achieve the best results. Proper lamination is key to flaky croissants."
}
"""

recipe = json.loads(json_string)  # Parse the JSON string

# Access the data
print(f"Recipe Name: {recipe['recipeName']}")
print(f"Prep Time: {recipe['prepTime']}")

print("\nIngredients:")
for ingredient in recipe['ingredients']:
    print(f"- {ingredient['itemName']}: {ingredient['quantity']} {ingredient['unit']}")

print("\nInstructions:")
for i, instruction in enumerate(recipe['instructions']):
    print(f"{i+1}. {instruction}")