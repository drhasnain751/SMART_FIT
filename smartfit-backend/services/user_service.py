# services/user_service.py
from sqlalchemy.orm import Session
import models
import security
from api.v1.schemas import users as user_schemas

def get_user_by_email(db: Session, email: str):
    """Fetches a single user from the DB by their email."""
    return db.query(models.User).filter(models.User.email == email).first()

def create_user(db: Session, user: user_schemas.UserCreate):
    """Creates a new user in the DB with a hashed password."""
    hashed_password = security.get_password_hash(user.password)
    db_user = models.User(email=user.email, hashed_password=hashed_password)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user