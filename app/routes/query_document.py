from fastapi import APIRouter, HTTPException
from app.schemas import schema
from app.services.query_processor import QueryProcessor

router = APIRouter()

@router.post("/query", status_code=200)
async def query_pdf(request: schema.QueryPDFRequest):
    try:
        processor = QueryProcessor()
        data = processor.get_matches(query_text=request.query, document_id=request.document_id)
        return data
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
