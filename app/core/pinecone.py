from app.core.config import settings
from pinecone import Pinecone, ServerlessSpec
def init_pinecone(dimensions):
    index_name = "pdf-chat"

    pc = Pinecone(
    api_key=settings.PINECONE_API_KEY
    )

    print(dimensions)

    if 'pdf-chat' not in pc.list_indexes().names():
        pc.create_index(
            name='pdf-chat', 
            dimension=dimensions, 
            metric='euclidean',
            spec=ServerlessSpec(
                cloud='aws',
                region='us-east-1'
            )
        )
        
    return pc.Index(index_name)

def get_pinecone():
    index_name = "pdf-chat"

    pc = Pinecone(
    api_key=settings.PINECONE_API_KEY
    )
        
    return pc.Index(index_name)




