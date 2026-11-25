# api/v1/schemas/users.py
from pydantic import BaseModel, Field, EmailStr
from enum import Enum
from typing import List, Optional

# --- Your existing Enums are perfect, keep them ---
class Gender(str, Enum):
    male = "male"
    female = "female"

class Goal(str, Enum):
    fat_loss = "fat_loss"
    muscle_gain = "muscle_gain"
    strength_gain = "strength_gain"
    maintenance = "maintenance"

class UserLevel(str, Enum):
    beginner = "Beginner"
    intermediate = "Intermediate"

# --- MODELS FOR AUTHENTICATION ---
class UserBase(BaseModel):
    email: EmailStr

class UserCreate(UserBase):
    # --- THIS IS THE FIX ---
    # We add a max_length to prevent the bcrypt 72-byte limit error.
    password: str = Field(..., min_length=8, max_length=50)

class User(UserBase):
    id: int
    class Config:
        from_attributes = True

class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    email: Optional[str] = None
# --- END OF AUTH MODELS ---


# This is your existing schema for the AI planner, it's perfect as is
class UserProfileInput(BaseModel):
    gender: Gender
    weight_kg: float = Field(..., gt=0)
    height_cm: float = Field(..., gt=0)
    age: int = Field(..., gt=0)
    activity_level: float = Field(..., ge=1.2, le=1.9)
    user_level: UserLevel
    available_equipment: List[str] = Field(..., min_items=1)
    goal: Goal

    class Config:
        json_schema_extra = {
            "example": {
                "gender": "male", "weight_kg": 80, "height_cm": 180,
                "age": 28, "activity_level": 1.55, "user_level": "Beginner",
                "available_equipment": ["Body Weight", "Dumbbell"], "goal": "muscle_gain"
            }
        }