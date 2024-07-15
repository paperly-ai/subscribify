from fastapi import APIRouter, HTTPException,status
from app.core.pinecone import init_pinecone
from app.services.document_processor import DocumentProcessor
from app.schemas import schema

router = APIRouter()

@router.post("/upsert_pdf",status_code=status.HTTP_201_CREATED)
async def upsert_pdf(request: schema.UpsertPDFRequest):
    processor=DocumentProcessor()
    vector = processor.embed_text(request.document_url)
    pinecone_index = init_pinecone()
    pinecone_index.upsert(vectors=vector,namespace=request.document_id)
    return {"detail":"document upserted successfully"}
