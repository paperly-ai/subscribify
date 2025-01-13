from app.core.pinecone import init_pinecone
from typing import List, Dict, Optional
from app.core.config import settings
from app.utils.logger import Logger

class PineconeService:
    def __init__(self):
        self.index = init_pinecone(settings.PINECONE_INDEX_NAME)
        self.log=Logger(name=__name__)

    def upsert(self, id: str, vector: List[float], metadata: Optional[Dict] = None):
        """Upsert a single vector with metadata into the Pinecone index."""
        try:
            self.index.upsert([(id, vector, metadata or {})])
            return {"status": "success", "id": id}
        except Exception as e:
            return {"status": "error", "detail": str(e)}

    def upsert_document(self, vectors, namespace):
        """Upsert multiple vectors."""
        self.index.upsert(vectors=vectors, namespace=namespace)
        self.log.info("upserted vectors successfully")

    def query(self, vector: List[float], top_k: int = 5, namespace: Optional[str] = None):
        """Query the Pinecone index for the top_k nearest vectors."""
        try:
            results = self.index.query(vector=vector, top_k=top_k, include_metadata=True, namespace=namespace)
            return results
        except Exception as e:
            return {"status": "error", "detail": str(e)}
