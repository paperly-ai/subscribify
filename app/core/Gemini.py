import google.generativeai as genai
from app.core.config import settings

def init_query_model():
    api_key=settings.GOOGLE_API_KEY
    model_name=settings.GOOGLE_QUERY_MODEL
    genai.configure(api_key=api_key)
    try:
        return  genai.GenerativeModel(model_name=model_name)
    except Exception as e:
        raise ValueError(f"Failed to initialize model with name '{model_name}': {e}")

def init_embedding_mode():
    pass
