# security.py
from datetime import datetime, timedelta, timezone
from passlib.context import CryptContext
from jose import JWTError, jwt
from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from sqlalchemy.orm import Session

from core.config import settings
from database import get_db

# --- THIS IS THE CRITICAL CHANGE ---
# We are switching from 'bcrypt' to 'argon2', which is more modern
# and does not have the complex compilation issues.
pwd_context = CryptContext(schemes=["argon2"], deprecated="auto")
# ---

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/api/v1/auth/token")

def verify_password(plain_password, hashed_password):
    """Verifies a plain password against a hashed one."""
    return pwd_context.verify(plain_password, hashed_password)

def get_password_hash(password: str):
    """Hashes a password using argon2."""
    # The 72-byte limit is a bcrypt-specific problem. Argon2 does not have this issue.
    # We can now simplify this function back to its original form.
    return pwd_context.hash(password)

def create_access_token(data: dict):
    # This function does not need to change
    to_encode = data.copy()
    expire = datetime.now(timezone.utc) + timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, settings.JWT_SECRET_KEY, algorithm=settings.JWT_ALGORITHM)
    return encoded_jwt

def get_current_user(token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)):
    # This function does not need to change
    from services import user_service
    from api.v1.schemas import users as user_schemas

    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, settings.JWT_SECRET_KEY, algorithms=[settings.JWT_ALGORITHM])
        email: str = payload.get("sub")
        if email is None:
            raise credentials_exception
        token_data = user_schemas.TokenData(email=email)
    except JWTError:
        raise credentials_exception
        
    user = user_service.get_user_by_email(db, email=token_data.email)
    if user is None:
        raise credentials_exception
    return user