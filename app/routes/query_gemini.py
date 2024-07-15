from fastapi import APIRouter, HTTPException
from app.schemas import schema
from app.services.gemini_service import GeminiServie

router = APIRouter()

@router.post("/query", status_code=200)
async def query_pdf(request: schema.GeminiRequest):
    try:
        service = GeminiServie()
        data = service.get_response(text_chunk=request.text_chunk,query_text=request.query)
        return data
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
