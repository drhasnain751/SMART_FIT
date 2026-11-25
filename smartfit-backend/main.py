# main.py
import sys
import os
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager

from api.v1.endpoints import generators, auth  # <-- IMPORT AUTH ROUTER
from services import load_all_data
from core.config import settings
from database import engine  # <-- IMPORT ENGINE
import models  # <-- IMPORT MODELS

# This command tells SQLAlchemy to create all tables defined in models.py
# It will create the 'smartfit.db' file and the 'users' table inside it.
models.Base.metadata.create_all(bind=engine)

@asynccontextmanager
async def lifespan(app: FastAPI):
    print("--- Loading data models ---")
    load_all_data()
    print("--- Data models loaded successfully! ---")
    yield
    print("--- Application shutting down ---")

app = FastAPI(
    title=settings.APP_NAME,
    description="API for generating personalized workout and diet plans.",
    version=settings.APP_VERSION,
    debug=settings.DEBUG_MODE,
    lifespan=lifespan
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.ALLOWED_HOSTS_LIST,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- INCLUDE THE NEW AUTH ROUTER ---
app.include_router(auth.router, prefix="/api/v1/auth", tags=["Authentication"])

# This is your existing router
app.include_router(generators.router, prefix="/api/v1", tags=["AI Generators"])

@app.get("/", tags=["Root"])
async def read_root():
    return {"message": f"Welcome to the {settings.APP_NAME}!"}