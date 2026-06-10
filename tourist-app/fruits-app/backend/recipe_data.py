# Recipe database for fruits and vegetables

recipe_database = {
    'carrot': [
        {
            'id': 'carrot_soup',
            'name': 'Creamy Carrot Ginger Soup',
            'description': 'A warming, nutritious soup perfect for any season',
            'prep_time': 15,
            'cook_time': 25,
            'servings': 4,
            'difficulty': 'Easy',
            'calories_per_serving': 120,
            'ingredients': [
                '2 lbs carrots, peeled and chopped',
                '1 onion, diced',
                '2 tbsp fresh ginger, minced',
                '4 cups vegetable broth',
                '1/2 cup coconut milk',
                '2 tbsp olive oil',
                'Salt and pepper to taste',
                'Fresh herbs for garnish'
            ],
            'instructions': [
                'Heat olive oil in a large pot over medium heat',
                'Sauté onion and ginger until fragrant, about 3 minutes',
                'Add carrots and broth, bring to boil',
                'Reduce heat and simmer 20 minutes until carrots are tender',
                'Blend until smooth using immersion blender',
                'Stir in coconut milk, season with salt and pepper',
                'Serve hot with fresh herbs'
            ],
            'tags': ['healthy', 'vegetarian', 'gluten-free', 'soup'],
            'image': '/images/recipes/carrot-soup.jpg'
        },
        {
            'id': 'roasted_carrots',
            'name': 'Honey Roasted Carrots',
            'description': 'Sweet and savory roasted carrots with herbs',
            'prep_time': 10,
            'cook_time': 30,
            'servings': 6,
            'difficulty': 'Easy',
            'calories_per_serving': 85,
            'ingredients': [
                '2 lbs baby carrots or large carrots cut into sticks',
                '3 tbsp honey',
                '2 tbsp olive oil',
                '1 tsp fresh thyme',
                '1/2 tsp salt',
                '1/4 tsp black pepper',
                'Fresh parsley for garnish'
            ],
            'instructions': [
                'Preheat oven to 425°F (220°C)',
                'Toss carrots with honey, olive oil, thyme, salt, and pepper',
                'Spread on baking sheet in single layer',
                'Roast 25-30 minutes until tender and caramelized',
                'Garnish with fresh parsley before serving'
            ],
            'tags': ['side-dish', 'roasted', 'healthy', 'vegetarian'],
            'image': '/images/recipes/roasted-carrots.jpg'
        }
    ],
    
    'potato': [
        {
            'id': 'garlic_potatoes',
            'name': 'Crispy Garlic Potatoes',
            'description': 'Perfectly crispy potatoes with aromatic garlic',
            'prep_time': 15,
            'cook_time': 45,
            'servings': 4,
            'difficulty': 'Medium',
            'calories_per_serving': 180,
            'ingredients': [
                '2 lbs potatoes, cut into chunks',
                '6 cloves garlic, minced',
                '3 tbsp olive oil',
                '1 tsp rosemary, chopped',
                '1 tsp salt',
                '1/2 tsp paprika',
                'Black pepper to taste'
            ],
            'instructions': [
                'Preheat oven to 425°F (220°C)',
                'Boil potatoes for 10 minutes until slightly tender',
                'Drain and let cool slightly',
                'Toss with olive oil, garlic, rosemary, salt, and spices',
                'Roast 30-35 minutes until golden and crispy',
                'Serve immediately while hot'
            ],
            'tags': ['side-dish', 'crispy', 'garlic', 'roasted'],
            'image': '/images/recipes/garlic-potatoes.jpg'
        },
        {
            'id': 'potato_salad',
            'name': 'Healthy Potato Salad',
            'description': 'Light and fresh potato salad with herbs',
            'prep_time': 20,
            'cook_time': 15,
            'servings': 6,
            'difficulty': 'Easy',
            'calories_per_serving': 145,
            'ingredients': [
                '2 lbs small potatoes',
                '1/4 cup olive oil',
                '2 tbsp lemon juice',
                '2 tbsp fresh dill',
                '1 red onion, thinly sliced',
                'Salt and pepper to taste',
                '2 tbsp capers (optional)'
            ],
            'instructions': [
                'Boil potatoes until tender, about 15 minutes',
                'Cool and cut into bite-sized pieces',
                'Whisk together olive oil, lemon juice, salt, and pepper',
                'Toss potatoes with dressing, dill, and onion',
                'Let marinate 30 minutes before serving',
                'Garnish with capers if desired'
            ],
            'tags': ['salad', 'healthy', 'vegetarian', 'fresh'],
            'image': '/images/recipes/potato-salad.jpg'
        }
    ],
    
    'radish': [
        {
            'id': 'radish_salad',
            'name': 'Crisp Radish Salad',
            'description': 'Refreshing salad showcasing radish crunch',
            'prep_time': 15,
            'cook_time': 0,
            'servings': 4,
            'difficulty': 'Easy',
            'calories_per_serving': 45,
            'ingredients': [
                '1 bunch radishes, thinly sliced',
                '2 cucumbers, sliced',
                '1/4 cup rice vinegar',
                '1 tsp sesame oil',
                '1 tsp honey',
                '1/4 tsp salt',
                'Sesame seeds for garnish'
            ],
            'instructions': [
                'Slice radishes and cucumbers thinly',
                'Whisk together vinegar, sesame oil, honey, and salt',
                'Toss vegetables with dressing',
                'Let chill for 15 minutes',
                'Garnish with sesame seeds before serving'
            ],
            'tags': ['salad', 'fresh', 'low-calorie', 'Asian-inspired'],
            'image': '/images/recipes/radish-salad.jpg'
        }
    ],
    
    'tomato': [
        {
            'id': 'caprese_salad',
            'name': 'Classic Caprese Salad',
            'description': 'Simple, elegant salad with fresh tomatoes',
            'prep_time': 15,
            'cook_time': 0,
            'servings': 4,
            'difficulty': 'Easy',
            'calories_per_serving': 165,
            'ingredients': [
                '4 large ripe tomatoes, sliced',
                '8 oz fresh mozzarella, sliced',
                '1/4 cup fresh basil leaves',
                '3 tbsp extra virgin olive oil',
                '2 tbsp balsamic vinegar',
                'Salt and pepper to taste'
            ],
            'instructions': [
                'Arrange tomato and mozzarella slices alternately on platter',
                'Tuck basil leaves between slices',
                'Drizzle with olive oil and balsamic vinegar',
                'Season with salt and pepper',
                'Serve immediately at room temperature'
            ],
            'tags': ['salad', 'Italian', 'fresh', 'vegetarian'],
            'image': '/images/recipes/caprese-salad.jpg'
        },
        {
            'id': 'tomato_sauce',
            'name': 'Homemade Tomato Sauce',
            'description': 'Rich, flavorful sauce perfect for pasta',
            'prep_time': 10,
            'cook_time': 30,
            'servings': 8,
            'difficulty': 'Easy',
            'calories_per_serving': 55,
            'ingredients': [
                '2 lbs fresh tomatoes, chopped',
                '4 cloves garlic, minced',
                '1 onion, diced',
                '2 tbsp olive oil',
                '1 tsp dried oregano',
                '1/2 tsp salt',
                'Fresh basil leaves'
            ],
            'instructions': [
                'Heat olive oil in large pan over medium heat',
                'Sauté onion and garlic until softened',
                'Add tomatoes, oregano, and salt',
                'Simmer 25-30 minutes until thickened',
                'Stir in fresh basil at the end',
                'Use immediately or store in refrigerator'
            ],
            'tags': ['sauce', 'Italian', 'versatile', 'homemade'],
            'image': '/images/recipes/tomato-sauce.jpg'
        }
    ],
    
    'apple': [
        {
            'id': 'apple_crisp',
            'name': 'Healthy Apple Crisp',
            'description': 'Classic dessert with wholesome ingredients',
            'prep_time': 20,
            'cook_time': 40,
            'servings': 8,
            'difficulty': 'Easy',
            'calories_per_serving': 195,
            'ingredients': [
                '6 apples, peeled and sliced',
                '1 cup old-fashioned oats',
                '1/2 cup almond flour',
                '1/3 cup maple syrup',
                '1/4 cup coconut oil, melted',
                '1 tsp cinnamon',
                '1/2 tsp vanilla extract',
                'Pinch of salt'
            ],
            'instructions': [
                'Preheat oven to 375°F (190°C)',
                'Arrange sliced apples in baking dish',
                'Mix oats, almond flour, maple syrup, coconut oil, cinnamon, vanilla, and salt',
                'Sprinkle topping over apples',
                'Bake 35-40 minutes until golden',
                'Serve warm, optionally with yogurt'
            ],
            'tags': ['dessert', 'healthy', 'fall', 'comfort-food'],
            'image': '/images/recipes/apple-crisp.jpg'
        },
        {
            'id': 'apple_salad',
            'name': 'Waldorf Apple Salad',
            'description': 'Refreshing salad with apples, celery, and walnuts',
            'prep_time': 15,
            'cook_time': 0,
            'servings': 6,
            'difficulty': 'Easy',
            'calories_per_serving': 125,
            'ingredients': [
                '4 apples, diced',
                '2 celery stalks, chopped',
                '1/2 cup walnuts, chopped',
                '1/4 cup Greek yogurt',
                '2 tbsp lemon juice',
                '1 tbsp honey',
                'Lettuce leaves for serving'
            ],
            'instructions': [
                'Combine diced apples, celery, and walnuts in bowl',
                'Mix Greek yogurt, lemon juice, and honey',
                'Toss apple mixture with dressing',
                'Chill for 30 minutes',
                'Serve on lettuce leaves'
            ],
            'tags': ['salad', 'healthy', 'fresh', 'protein'],
            'image': '/images/recipes/waldorf-salad.jpg'
        }
    ],
    
    'banana': [
        {
            'id': 'banana_smoothie',
            'name': 'Power Banana Smoothie',
            'description': 'Energizing smoothie perfect for breakfast',
            'prep_time': 5,
            'cook_time': 0,
            'servings': 2,
            'difficulty': 'Easy',
            'calories_per_serving': 165,
            'ingredients': [
                '2 ripe bananas',
                '1 cup almond milk',
                '2 tbsp peanut butter',
                '1 tbsp chia seeds',
                '1 tsp vanilla extract',
                '1/2 tsp cinnamon',
                'Ice cubes as needed'
            ],
            'instructions': [
                'Add all ingredients to blender',
                'Blend until smooth and creamy',
                'Add ice if thinner consistency desired',
                'Pour into glasses and serve immediately',
                'Optional: top with sliced banana or nuts'
            ],
            'tags': ['smoothie', 'healthy', 'breakfast', 'protein'],
            'image': '/images/recipes/banana-smoothie.jpg'
        },
        {
            'id': 'banana_bread',
            'name': 'Healthy Banana Bread',
            'description': 'Moist, wholesome banana bread',
            'prep_time': 15,
            'cook_time': 60,
            'servings': 12,
            'difficulty': 'Medium',
            'calories_per_serving': 145,
            'ingredients': [
                '3 ripe bananas, mashed',
                '1.5 cups whole wheat flour',
                '1/3 cup coconut oil, melted',
                '1/4 cup maple syrup',
                '2 eggs',
                '1 tsp baking soda',
                '1 tsp vanilla extract',
                '1/2 tsp salt'
            ],
            'instructions': [
                'Preheat oven to 350°F (175°C)',
                'Mix mashed bananas, coconut oil, maple syrup, eggs, and vanilla',
                'In separate bowl, combine flour, baking soda, and salt',
                'Fold dry ingredients into wet ingredients',
                'Pour into greased loaf pan',
                'Bake 55-60 minutes until toothpick comes out clean',
                'Cool before slicing'
            ],
            'tags': ['baked-goods', 'healthy', 'breakfast', 'snack'],
            'image': '/images/recipes/banana-bread.jpg'
        }
    ],
    
    'orange': [
        {
            'id': 'orange_salad',
            'name': 'Citrus Orange Salad',
            'description': 'Bright, refreshing salad with oranges and greens',
            'prep_time': 15,
            'cook_time': 0,
            'servings': 4,
            'difficulty': 'Easy',
            'calories_per_serving': 85,
            'ingredients': [
                '4 oranges, peeled and segmented',
                '4 cups mixed greens',
                '1/4 red onion, thinly sliced',
                '2 tbsp olive oil',
                '1 tbsp orange juice',
                '1 tsp honey',
                '1/4 cup toasted almonds'
            ],
            'instructions': [
                'Arrange mixed greens on plates',
                'Top with orange segments and red onion',
                'Whisk together olive oil, orange juice, and honey',
                'Drizzle dressing over salad',
                'Garnish with toasted almonds'
            ],
            'tags': ['salad', 'fresh', 'citrus', 'light'],
            'image': '/images/recipes/orange-salad.jpg'
        },
        {
            'id': 'orange_smoothie',
            'name': 'Tropical Orange Smoothie',
            'description': 'Vitamin-packed smoothie with tropical flavors',
            'prep_time': 5,
            'cook_time': 0,
            'servings': 2,
            'difficulty': 'Easy',
            'calories_per_serving': 110,
            'ingredients': [
                '2 oranges, juiced',
                '1 cup coconut milk',
                '1/2 cup frozen mango',
                '1/2 banana',
                '1 tsp fresh ginger',
                '1 tbsp honey (optional)'
            ],
            'instructions': [
                'Combine all ingredients in blender',
                'Blend until smooth',
                'Taste and adjust sweetness if needed',
                'Serve immediately over ice',
                'Garnish with orange slice if desired'
            ],
            'tags': ['smoothie', 'tropical', 'vitamin-c', 'refreshing'],
            'image': '/images/recipes/orange-smoothie.jpg'
        }
    ]
}