from fastapi import APIRouter, HTTPException
from app.core.pinecone import init_pinecone
from app.services.document_processor import DocumentProcessor
from app.schemas import schema

router = APIRouter()

def pad_vector(vector, target_dim):
    """Pads the vector with zeros to reach the target dimension."""
    return vector + [0.00] * (target_dim - len(vector))

@router.post("/upsert_pdf")
async def upsert_pdf(request: schema.UpsertPDFRequest):
    processor=DocumentProcessor()
    vector = processor.embed_text(request.document_url)
    pinecone_index = init_pinecone()
    pinecone_index.upsert(vectors=vector,namespace=request.document_id)
    return vector
