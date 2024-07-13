import pinecone
from app.core.config import settings

import os
from pinecone import Pinecone, ServerlessSpec




    



def init_pinecone():
    index_name = "pdf-chat-index"

    pc = Pinecone(
    api_key=settings.PINECONE_API_KEY
    )

    if 'pdf-chat-index' not in pc.list_indexes().names():
        pc.create_index(
            name='pdf-chat-index', 
            dimension=1536, 
            metric='euclidean',
            spec=ServerlessSpec(
                cloud='aws',
                region='us-east-1'
            )
        )
        
    return pc.Index(index_name)

pinecone_index = init_pinecone()
