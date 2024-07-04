from pydantic import BaseSettings

class Settings(BaseSettings):
    PINECONE_API_KEY: str
    PINECONE_ENVIRONMENT: str
    GOOGLE_API_KEY:str
    GOOGLE_EMBEDDING_MODEL:str

    class Config:
        env_file = ".env"

settings = Settings()
