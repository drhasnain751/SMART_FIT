import pandas as pd

PPL_split = {
    'Push': ['Chest', 'Shoulders', 'Triceps'],
    'Pull': ['Lats', 'Middle Back', 'Lower Back', 'Biceps', 'Forearms', 'Traps'],
    'Legs': ['Quadriceps', 'Hamstrings', 'Glutes', 'Calves', 'Adductors', 'Abductors'],
    'Core': ['Abdominals']
}

sets_reps_schema = {
    'muscle_gain': '3-4 sets of 8-12 reps',
    'fat_loss': '3 sets of 15-20 reps',
    'strength_gain': '4-5 sets of 3-6 reps'
}

def generate_workout_plan(df: pd.DataFrame, user_level: str, user_goal: str, available_equipment: list):
    filtered_df = df[
        (df['Level'] == user_level) &
        (df['Equipment'].isin(available_equipment))
    ].copy()

    if filtered_df.empty:
        return {"Error": "No exercises found for your criteria. Try adding more equipment like 'Body Weight'."}

    workout_plan = {}
    reps_sets = sets_reps_schema.get(user_goal, '3 sets of 10-12 reps')

    if user_goal in ['muscle_gain', 'strength_gain']:
        for day, body_parts in PPL_split.items():
            day_exercises = []
            for part in body_parts:
                part_exercises = filtered_df[filtered_df['BodyPart'] == part]
                num_samples = min(2, len(part_exercises))
                if num_samples > 0:
                    selected = part_exercises.sample(n=num_samples)
                    for _, row in selected.iterrows():
                        day_exercises.append({
                            "Exercise": row['Name'],
                            "BodyPart": row['BodyPart'],
                            "SetsReps": reps_sets
                        })
            if day_exercises:
                workout_plan[f"Day {len(workout_plan) + 1}: {day}"] = day_exercises
    elif user_goal == 'fat_loss':
        compound_body_parts = ['Quadriceps', 'Hamstrings', 'Lats', 'Middle Back', 'Chest', 'Shoulders']
        for i in range(1, 4):
            day_exercises = []
            for part in compound_body_parts:
                part_exercises = filtered_df[filtered_df['BodyPart'] == part]
                num_samples = min(1, len(part_exercises))
                if num_samples > 0:
                    selected = part_exercises.sample(n=num_samples)
                    for _, row in selected.iterrows():
                        day_exercises.append({
                            "Exercise": row['Name'],
                            "BodyPart": row['BodyPart'],
                            "SetsReps": reps_sets
                        })
            if day_exercises:
                workout_plan[f"Day {i}: Full Body"] = day_exercises

    return workout_plan