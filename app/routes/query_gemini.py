from fastapi import APIRouter, HTTPException
from fastapi.responses import StreamingResponse
from app.schemas import schema
from app.services.gemini_service import GeminiServie
from app.services.query_processor import QueryProcessor

router = APIRouter()

@router.post("/query", status_code=200)
async def query_pdf(request: schema.GeminiRequest):
    try:
        service = GeminiServie()
        data = service.get_response(text_chunk=request.text_chunk,query_text=request.query)
        return data
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    
@router.post("/query/stream",status_code=200)
async def query_stream(request:schema.GeminiStreamRequest):
    processor=QueryProcessor()
    geminiServie=GeminiServie()
    text=processor.get_matches(query_text=request.query,document_id=request.document_id)
    return StreamingResponse(geminiServie.get_response_stream(text_chunk=text,query_text=request.query), media_type="text/event-stream")
    
    
