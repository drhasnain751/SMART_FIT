

# services/__init__.py

from .data_loader import load_all_data, data_store
from .workout_service import generate_workout_plan
from .diet_service import calculate_tdee, calculate_macros, generate_diet_plan_v3

# Add this line to expose the new user functions
from .user_service import get_user_by_email, create_user