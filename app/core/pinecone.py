from app.core.config import settings
from pinecone import Pinecone, ServerlessSpec
def init_pinecone():
    dimensions=1536
    index_name = "pdf-chat"

    pc = Pinecone(
        api_key=settings.PINECONE_API_KEY
    )

    if 'pdf-chat' not in pc.list_indexes().names():
        pc.create_index(
            name='pdf-chat', 
            dimension=768, 
            metric='euclidean',
            spec=ServerlessSpec(
                cloud='aws',
                region='us-east-1'
            )
        )
        
    return pc.Index(index_name)

