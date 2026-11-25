# database.py
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from core.config import settings

# This engine points to the 'smartfit.db' file in your project root.
# The connect_args is required for SQLite to work with FastAPI's threading.
engine = create_engine(
    settings.DATABASE_URL, 
    connect_args={"check_same_thread": False}
)

# Each instance of SessionLocal will be a database session.
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# This will be the base class for our database models.
Base = declarative_base()

# Dependency to get a DB session in our endpoints.
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()