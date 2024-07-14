from fastapi import APIRouter
from app.core.pinecone import init_pinecone
from app.schemas import schema
from app.services.query_processor import QueryProcessor

router = APIRouter()

TARGET_DIMENSION = 768 

def pad_vector(vector, target_dim):
    """Pads the vector with zeros to reach the target dimension."""
    return vector + [0.00] * (target_dim - len(vector))

def query_vectors(index, query_vector, namespace, top_k=10):
    return index.query(vector=query_vector, top_k=top_k, namespace=namespace)

@router.post("/query")
async def query_pdf(request: schema.QueryPDFRequest):
    processor = QueryProcessor()
    index = init_pinecone()
    vector = processor.embed_query(request.query)

    results = index.query(vector=vector, top_k=10,include_metadata=True,namespace=request.document_id)

    if not results.get('matches'): 
        return {"results": None}
    response_data = []
    for result in results['matches']: 
        response_data.append({
            "id": result["id"],
            "score": result["score"],
            "metadata":result["metadata"]
        })
    return response_data
