# Comprehensive nutrition database for fruits and vegetables
# Values are per 100g serving

nutrition_database = {
    'carrot': {
        'name': 'Carrot',
        'category': 'vegetable',
        'calories_per_100g': 41,
        'macronutrients': {
            'carbohydrates': 9.6,  # grams
            'protein': 0.9,
            'fat': 0.2,
            'fiber': 2.8,
            'sugar': 4.7,
            'water': 88.3
        },
        'vitamins': {
            'vitamin_a': 835,  # mcg RAE
            'vitamin_c': 5.9,  # mg
            'vitamin_k': 13.2,  # mcg
            'folate': 19,  # mcg
            'vitamin_e': 0.66,  # mg
            'niacin': 0.983,  # mg
            'vitamin_b6': 0.138,  # mg
        },
        'minerals': {
            'potassium': 320,  # mg
            'calcium': 33,
            'iron': 0.3,
            'magnesium': 12,
            'phosphorus': 35,
            'zinc': 0.24,
            'sodium': 69
        },
        'health_benefits': [
            'Excellent source of beta-carotene (vitamin A)',
            'Supports eye health and vision',
            'Boosts immune system',
            'Rich in antioxidants',
            'Promotes healthy skin'
        ],
        'color': '#FF8C00'
    },
    
    'potato': {
        'name': 'Potato',
        'category': 'vegetable',
        'calories_per_100g': 77,
        'macronutrients': {
            'carbohydrates': 17.5,
            'protein': 2.0,
            'fat': 0.1,
            'fiber': 2.2,
            'sugar': 0.8,
            'water': 79.2
        },
        'vitamins': {
            'vitamin_c': 19.7,
            'vitamin_b6': 0.298,
            'folate': 15,
            'niacin': 1.061,
            'thiamin': 0.081,
            'riboflavin': 0.032
        },
        'minerals': {
            'potassium': 425,
            'phosphorus': 57,
            'magnesium': 23,
            'calcium': 12,
            'iron': 0.81,
            'zinc': 0.30,
            'sodium': 6
        },
        'health_benefits': [
            'High in potassium for heart health',
            'Good source of vitamin C',
            'Provides energy from complex carbohydrates',
            'Contains resistant starch',
            'Source of B vitamins'
        ],
        'color': '#DEB887'
    },
    
    'radish': {
        'name': 'Radish',
        'category': 'vegetable',
        'calories_per_100g': 16,
        'macronutrients': {
            'carbohydrates': 3.4,
            'protein': 0.7,
            'fat': 0.1,
            'fiber': 1.6,
            'sugar': 1.9,
            'water': 95.3
        },
        'vitamins': {
            'vitamin_c': 14.8,
            'folate': 25,
            'vitamin_k': 1.3,
            'niacin': 0.254,
            'vitamin_b6': 0.071
        },
        'minerals': {
            'potassium': 233,
            'calcium': 25,
            'phosphorus': 20,
            'magnesium': 10,
            'iron': 0.34,
            'zinc': 0.28,
            'sodium': 39
        },
        'health_benefits': [
            'Low in calories, high in water',
            'Natural detoxifier',
            'Supports digestive health',
            'Contains antioxidants',
            'May help regulate blood sugar'
        ],
        'color': '#FF1493'
    },
    
    'tomato': {
        'name': 'Tomato',
        'category': 'vegetable',
        'calories_per_100g': 18,
        'macronutrients': {
            'carbohydrates': 3.9,
            'protein': 0.9,
            'fat': 0.2,
            'fiber': 1.2,
            'sugar': 2.6,
            'water': 94.5
        },
        'vitamins': {
            'vitamin_c': 13.7,
            'vitamin_k': 7.9,
            'folate': 15,
            'vitamin_e': 0.54,
            'niacin': 0.594,
            'vitamin_b6': 0.080
        },
        'minerals': {
            'potassium': 237,
            'phosphorus': 24,
            'calcium': 10,
            'magnesium': 11,
            'iron': 0.27,
            'zinc': 0.17,
            'sodium': 5
        },
        'health_benefits': [
            'Rich in lycopene antioxidant',
            'Supports heart health',
            'May reduce cancer risk',
            'Hydrating and low calorie',
            'Good source of vitamin C'
        ],
        'color': '#FF6347'
    },
    
    'apple': {
        'name': 'Apple',
        'category': 'fruit',
        'calories_per_100g': 52,
        'macronutrients': {
            'carbohydrates': 13.8,
            'protein': 0.3,
            'fat': 0.2,
            'fiber': 2.4,
            'sugar': 10.4,
            'water': 85.6
        },
        'vitamins': {
            'vitamin_c': 4.6,
            'vitamin_k': 2.2,
            'vitamin_e': 0.18,
            'folate': 3,
            'niacin': 0.091,
            'vitamin_b6': 0.041
        },
        'minerals': {
            'potassium': 107,
            'calcium': 6,
            'phosphorus': 11,
            'magnesium': 5,
            'iron': 0.12,
            'zinc': 0.04,
            'sodium': 1
        },
        'health_benefits': [
            'High in fiber for digestive health',
            'Contains quercetin antioxidant',
            'May support heart health',
            'Helps regulate blood sugar',
            'Natural source of pectin'
        ],
        'color': '#DC143C'
    },
    
    'banana': {
        'name': 'Banana',
        'category': 'fruit',
        'calories_per_100g': 89,
        'macronutrients': {
            'carbohydrates': 22.8,
            'protein': 1.1,
            'fat': 0.3,
            'fiber': 2.6,
            'sugar': 12.2,
            'water': 74.9
        },
        'vitamins': {
            'vitamin_c': 8.7,
            'vitamin_b6': 0.367,
            'folate': 20,
            'niacin': 0.665,
            'riboflavin': 0.073,
            'thiamin': 0.031
        },
        'minerals': {
            'potassium': 358,
            'magnesium': 27,
            'phosphorus': 22,
            'calcium': 5,
            'iron': 0.26,
            'zinc': 0.15,
            'sodium': 1
        },
        'health_benefits': [
            'Excellent source of potassium',
            'Natural energy boost',
            'Supports muscle function',
            'Rich in vitamin B6',
            'Contains resistant starch when unripe'
        ],
        'color': '#FFD700'
    },
    
    'orange': {
        'name': 'Orange',
        'category': 'fruit',
        'calories_per_100g': 47,
        'macronutrients': {
            'carbohydrates': 11.8,
            'protein': 0.9,
            'fat': 0.1,
            'fiber': 2.4,
            'sugar': 9.4,
            'water': 86.8
        },
        'vitamins': {
            'vitamin_c': 53.2,
            'folate': 40,
            'vitamin_a': 11,
            'thiamin': 0.087,
            'riboflavin': 0.040,
            'niacin': 0.282
        },
        'minerals': {
            'potassium': 181,
            'calcium': 40,
            'phosphorus': 14,
            'magnesium': 10,
            'iron': 0.10,
            'zinc': 0.07,
            'sodium': 0
        },
        'health_benefits': [
            'Exceptional source of vitamin C',
            'Boosts immune system',
            'Rich in flavonoids',
            'Supports collagen production',
            'Natural source of citrus fiber'
        ],
        'color': '#FFA500'
    }
}