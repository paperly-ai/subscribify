from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    PINECONE_API_KEY: str
    PINECONE_ENVIRONMENT: str
    GOOGLE_API_KEY:str
    GOOGLE_EMBEDDING_MODEL:str
    PINECONE_INDEX_NAME:str
    VECTOR_DIMENSIONS:int
    PINECONE_METRIC:str
    PINECONE_CLOUD:str
    PINCEONCE_REGION:str


    class Config:
        env_file = ".env"

settings = Settings()
