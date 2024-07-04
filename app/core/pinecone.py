import pinecone
from app.core.config import settings

def init_pinecone():
    pinecone.init(api_key=settings.PINECONE_API_KEY, environment=settings.PINECONE_ENVIRONMENT)
    index_name = "pdf-chat-index"
    if index_name not in pinecone.list_indexes():
        pinecone.create_index(index_name, dimension=512)
    return pinecone.Index(index_name)

pinecone_index = init_pinecone()
