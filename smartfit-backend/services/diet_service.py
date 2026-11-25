import pandas as pd
import random
import numpy as np

def calculate_tdee(gender: str, weight_kg: float, height_cm: float, age: int, activity_level: float):
    if gender.lower() == 'male':
        bmr = 88.362 + (13.397 * weight_kg) + (4.799 * height_cm) - (5.677 * age)
    else:
        bmr = 447.593 + (9.247 * weight_kg) + (3.098 * height_cm) - (4.330 * age)
    return bmr * activity_level

def calculate_macros(tdee: float, goal: str):
    if goal == 'fat_loss': calorie_target = tdee - 500
    elif goal == 'muscle_gain': calorie_target = tdee + 500
    else: calorie_target = tdee
    macros = {'calories': calorie_target, 'protein': (calorie_target * 0.30) / 4, 'carbs': (calorie_target * 0.40) / 4, 'fat': (calorie_target * 0.30) / 9}
    return {k: round(v) for k, v in macros.items()}

def generate_diet_plan_v3(df: pd.DataFrame, daily_targets: dict):
    meal_plan = {'Breakfast': {'items': [], 'totals': {}}, 'Lunch': {'items': [], 'totals': {}}, 'Dinner': {'items': [], 'totals': {}}}
    meal_distribution = {'Breakfast': 0.25, 'Lunch': 0.40, 'Dinner': 0.35}

    for meal_name, percentage in meal_distribution.items():
        meal_targets = {k: v * percentage for k, v in daily_targets.items()}
        meal_df = meal_plan[meal_name]
        meal_df['totals'] = {'Calories': 0, 'Protein': 0, 'Fat': 0, 'Carbs': 0}
        
        protein_needed = meal_targets.get('protein', 0)
        lean_protein_foods = df[(df['Protein'] > 10) & (df['Leanness'] > 0.3)]
        
        if not lean_protein_foods.empty:
            food_sample = lean_protein_foods.sample(1).iloc[0]
            target_protein_for_item = protein_needed * 0.8
            p_portion_g = round((target_protein_for_item / food_sample['Protein']) * 100) if food_sample['Protein'] > 0 else 100
            c_portion_g = round((meal_targets.get('calories', 0) / food_sample['Calories']) * 100) if food_sample['Calories'] > 0 else 100
            portion_g = min(p_portion_g, c_portion_g)
            portion_g = min(max(portion_g, 50), 300)
            
            portion_multiplier = portion_g / 100.0
            item = {
                'Food': food_sample['Food'], 'Portion (g)': portion_g,
                'Calories': round(food_sample['Calories'] * portion_multiplier), 'Protein': round(food_sample['Protein'] * portion_multiplier),
                'Fat': round(food_sample['Fat'] * portion_multiplier), 'Carbs': round(food_sample['Carbs'] * portion_multiplier)
            }
            meal_df['items'].append(item)
            for key in ['Calories', 'Protein', 'Fat', 'Carbs']: meal_df['totals'][key] += item[key]
            
        calories_needed = meal_targets.get('calories', 0) - meal_df['totals']['Calories']
        while calories_needed > 100 and len(meal_df['items']) < 3:
            filler_foods = df[(df['Carbs'] > 15) & (df['Leanness'] < 0.2)]
            if filler_foods.empty: break
            food_sample = filler_foods.sample(1).iloc[0]
            portion_g = round((calories_needed / food_sample['Calories']) * 100) if food_sample['Calories'] > 0 else 0
            portion_g = min(max(portion_g, 250), 50)
            
            portion_multiplier = portion_g / 100.0
            item = {
                'Food': food_sample['Food'], 'Portion (g)': portion_g,
                'Calories': round(food_sample['Calories'] * portion_multiplier), 'Protein': round(food_sample['Protein'] * portion_multiplier),
                'Fat': round(food_sample['Fat'] * portion_multiplier), 'Carbs': round(food_sample['Carbs'] * portion_multiplier)
            }
            meal_df['items'].append(item)
            for key in ['Calories', 'Protein', 'Fat', 'Carbs']: meal_df['totals'][key] += item[key]
            calories_needed -= item['Calories']

    return meal_plan