# api/v1/endpoints/auth.py
from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session

from database import get_db
from security import create_access_token, verify_password
from services import user_service
from core.config import settings
from api.v1.schemas import users as user_schemas

router = APIRouter()

@router.post("/register", response_model=user_schemas.User, status_code=status.HTTP_201_CREATED)
def register_user(user: user_schemas.UserCreate, db: Session = Depends(get_db)):
    """
    Register a new user. Hashes the password and saves it to the database.
    """
    db_user = user_service.get_user_by_email(db, email=user.email)
    if db_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    return user_service.create_user(db=db, user=user)

@router.post("/token", response_model=user_schemas.Token)
def login_for_access_token(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    """
    Logs a user in by verifying their email and password.
    Returns a JWT access token if credentials are correct.
    """
    user = user_service.get_user_by_email(db, email=form_data.username) # Note: form uses 'username' field for the email
    if not user or not verify_password(form_data.password, user.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token = create_access_token(data={"sub": user.email})
    return {"access_token": access_token, "token_type": "bearer"}