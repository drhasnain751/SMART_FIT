# api/v1/endpoints/generators.py
from fastapi import APIRouter, HTTPException, Depends  # Add Depends
from api.v1.schemas.users import UserProfileInput, User  # Add User
from services import (
    generate_workout_plan, calculate_tdee, calculate_macros,
    generate_diet_plan_v3, data_store
)
from security import get_current_user  # Import the protection dependency

router = APIRouter()

# The 'current_user' parameter will be handled automatically by FastAPI.
# If the request doesn't have a valid token, it will be rejected with a 401 error.
@router.post("/generate-workout")
async def create_workout_plan(
    user_input: UserProfileInput, 
    current_user: User = Depends(get_current_user) # <-- PROTECT THIS ENDPOINT
):
    df = data_store.get('workout')
    if df is None:
        raise HTTPException(status_code=500, detail="Workout dataset is not loaded.")
    
    plan = generate_workout_plan(
        df=df,
        user_level=user_input.user_level.value,
        user_goal=user_input.goal.value,
        available_equipment=user_input.available_equipment
    )
    
    if "Error" in plan:
        raise HTTPException(status_code=400, detail=plan["Error"])
        
    return {"workout_plan": plan}

@router.post("/generate-diet")
async def create_diet_plan(
    user_input: UserProfileInput, 
    current_user: User = Depends(get_current_user) # <-- PROTECT THIS ENDPOINT
):
    df = data_store.get('diet')
    if df is None:
        raise HTTPException(status_code=500, detail="Diet dataset is not loaded.")
    
    tdee = calculate_tdee(
        gender=user_input.gender.value, weight_kg=user_input.weight_kg,
        height_cm=user_input.height_cm, age=user_input.age,
        activity_level=user_input.activity_level
    )
    macros = calculate_macros(tdee=tdee, goal=user_input.goal.value)
    plan = generate_diet_plan_v3(df=df, daily_targets=macros)
    
    return {"daily_targets": macros, "diet_plan": plan}