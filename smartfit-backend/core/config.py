# core/config.py
from pydantic_settings import BaseSettings, SettingsConfigDict
from typing import List

class Settings(BaseSettings):
    """
    Manages application configuration settings.
    Reads settings from environment variables or a .env file.
    """
    # --- Application settings ---
    APP_NAME: str = "SmartFit AI API"
    APP_VERSION: str = "1.0.0"
    DEBUG_MODE: bool = False

    # --- CORS settings ---
    ALLOWED_HOSTS: str = "http://localhost:3000,http://localhost:5173"

    # --- NEW: Auth and Database settings ---
    # These fields MUST be defined here so Pydantic knows to load them
    # from the .env file.
    JWT_SECRET_KEY: str
    JWT_ALGORITHM: str
    ACCESS_TOKEN_EXPIRE_MINUTES: int
    DATABASE_URL: str
    # --- END OF NEW SETTINGS ---


    @property
    def ALLOWED_HOSTS_LIST(self) -> List[str]:
        """
        Parses the ALLOWED_HOSTS string into a list of strings.
        """
        return [host.strip() for host in self.ALLOWED_HOSTS.split(",")]

    # This tells pydantic-settings to look for a .env file
    # and makes the variable names case-insensitive
    model_config = SettingsConfigDict(env_file=".env", case_sensitive=False)

# Create a single, importable instance of the settings
settings = Settings()