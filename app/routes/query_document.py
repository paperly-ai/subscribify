from fastapi import APIRouter,HTTPException
from app.core.pinecone import init_pinecone
from app.schemas import schema
from app.services.query_processor import QueryProcessor

router = APIRouter()

@router.post("/query")
async def query_pdf(request: schema.QueryPDFRequest):
    processor = QueryProcessor()
    index = init_pinecone()
    vector = processor.embed_query(request.query)

    results = index.query(vector=vector, top_k=10, include_metadata=True, namespace=request.document_id)

    if not results.get('matches'):
        return {"results": None}

    max_score = float('-inf')
    best_result = None

    for result in results['matches']:
        if result["score"] > max_score:
            max_score = result["score"]
            best_result = result

    if best_result is None:
        return {"results": None}

    return {
        "max_score": max_score,
        "best_result": {
            "score": best_result["score"],
            "metadata": best_result.get("metadata")
        }
    }

