from app.core.config import settings
from pinecone import Pinecone, ServerlessSpec
from app.utils.logger import Logger

log=Logger(name=__name__)
def init_pinecone(index_name):

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
        log.info(f"create pinecone instance with index {index_name}")
        
    return pc.Index(index_name)

