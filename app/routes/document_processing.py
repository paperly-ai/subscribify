from fastapi import APIRouter, HTTPException,status
from app.core.pinecone import init_pinecone
from app.services.document_processor import DocumentProcessor
from app.schemas import schema
from app.services.faiss_service import FaissService

router = APIRouter()

@router.post("/upsert_pdf", status_code=status.HTTP_201_CREATED)
async def upsert_pdf(request: schema.UpsertPDFRequest):
    try:
        processor = DocumentProcessor()
        processor.upload_to_pinecone(request.document_url, request.document_id)
        return {"status": "success"}
    except Exception as e:
        return HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e))

@router.post("/upsert_pdf/faiss", status_code=status.HTTP_201_CREATED)
async def upsert_pdf(request: schema.UpsertPDFRequest):
    try:
        processor = FaissService()
        processor.upsert_docs(pdf_url=request.document_url, document_id=request.document_id)
        return {"status": "success"}
    except Exception as e:
        return HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e))
