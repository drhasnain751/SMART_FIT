import pandas as pd
import numpy as np

data_store = {}

def load_all_data():
    global data_store
    
    # --- Load and Clean Workout Data ---
    try:
        # This path must be correct
        workout_path = 'data/01_megaGymDataset.csv'
        df_workout = pd.read_csv(workout_path)
        
        # ... (cleaning logic is fine) ...
        df_workout.rename(columns={'Title': 'Name'}, inplace=True)
        df_workout['Equipment'] = df_workout['Equipment'].fillna('Body Weight')
        level_mapping = {'Beginner': 'Beginner', 'Intermediate': 'Intermediate', 'Expert': 'Intermediate'}
        df_workout['Level'] = df_workout['Level'].map(level_mapping)
        df_workout.dropna(subset=['Level', 'BodyPart'], inplace=True)
        
        data_store['workout'] = df_workout
        print(f"SUCCESS: Workout dataset loaded from {workout_path}.")
    except FileNotFoundError:
        print(f"ERROR: Workout data file not found at '{workout_path}'.")
        data_store['workout'] = None

    # --- Load and Clean Diet Data ---
    try:
        # This path must be correct
        diet_path = 'data/fda_approved_food_items_w_nutrient_info.csv'
        df_food = pd.read_csv(diet_path, low_memory=False)
        
        # ... (cleaning logic is fine) ...
        columns_to_keep = {
            'description': 'Food', 'branded_food_category': 'Category',
            'Energy-KCAL': 'Calories', 'Protein-G': 'Protein',
            'Total lipid (fat)-G': 'Fat', 'Carbohydrate, by difference-G': 'Carbs'
        }
        df_food_cleaned = df_food[list(columns_to_keep.keys())].rename(columns=columns_to_keep)
        
        nutrient_cols = ['Calories', 'Protein', 'Fat', 'Carbs']
        for col in nutrient_cols:
            df_food_cleaned[col] = pd.to_numeric(df_food_cleaned[col], errors='coerce')
            
        df_food_cleaned.dropna(subset=nutrient_cols, inplace=True)
        df_food_cleaned = df_food_cleaned[df_food_cleaned['Calories'] > 0].copy()
        
        with np.errstate(divide='ignore', invalid='ignore'):
            df_food_cleaned['Leanness'] = (df_food_cleaned['Protein'] * 4) / df_food_cleaned['Calories']
        df_food_cleaned.replace([np.inf, -np.inf], 0, inplace=True)
        df_food_cleaned['Leanness'].fillna(0, inplace=True)
        
        data_store['diet'] = df_food_cleaned
        print(f"SUCCESS: Diet dataset loaded from {diet_path}.")
    except (FileNotFoundError, KeyError) as e:
        print(f"ERROR loading diet data: {e}")
        data_store['diet'] = None