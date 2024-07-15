from app.core.config import settings
from pinecone import Pinecone, ServerlessSpec

def init_pinecone(index_name):
    index_name = "pdf-chat"

    pc = Pinecone(
        api_key=settings.PINECONE_API_KEY
    )

    if index_name not in pc.list_indexes().names():
        pc.create_index(
            name=index_name, 
            dimension=settings.VECTOR_DIMENSIONS, 
            metric=settings.PINECONE_METRIC,
            spec=ServerlessSpec(
                cloud=settings.PINECONE_CLOUD,
                region=settings.PINCEONCE_REGION
            )
        )
        
    return pc.Index(index_name)

