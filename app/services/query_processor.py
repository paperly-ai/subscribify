from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain_google_genai import GoogleGenerativeAIEmbeddings
from app.core.config import settings
from app.services.pinecone_service import PineconeService
from app.utils.logger import Logger


class QueryProcessor:
    def __init__(self):
        self.log = Logger(__name__)
        self.log.info("Initializing QueryProcessor")
        self.embeddings = GoogleGenerativeAIEmbeddings(model=settings.GOOGLE_EMBEDDING_MODEL, google_api_key=settings.GOOGLE_API_KEY)
        self.pineconeService = PineconeService()
        self.log.info("Initialized embeddings and pinecone service")

    def embed_query(self, query_text):
        self.log.info(f"Embedding query: {query_text}")
        try:
            embeddings = self.embeddings.embed_query(query_text, output_dimensionality=settings.VECTOR_DIMENSIONS)
            self.log.info("Successfully embedded query")
            return embeddings
        except Exception as e:
            self.log.error(f"Error embedding query: {e}")
            raise

    def query_pinecone(self, vectors, document_id):
        self.log.info(f"Querying Pinecone with document_id: {document_id}")
        try:
            results = self.pineconeService.query(vector=vectors, namespace=document_id)
            self.log.info("Successfully queried Pinecone")
            return results
        except Exception as e:
            self.log.error(f"Error querying Pinecone: {e}")
            raise

    def max_match_result(self, results):
        self.log.info("Finding max match result")
        if not results.get('matches'):
            self.log.warning("No matches found")
            return {"results": None}

        max_score = float('-inf')
        best_result = None

        for result in results['matches']:
            if result["score"] > max_score:
                max_score = result["score"]
                best_result = result

        if best_result is None:
            self.log.warning("No best result found")
            return {"results": None}

        self.log.info(f"Max score found: {max_score}")
        return {
            "max_score": max_score,
            "best_result": {
                "score": best_result["score"],
                "metadata": best_result.get("metadata")
            }
        }

    def get_matches(self, query_text, document_id):
        self.log.info(f"Getting matches for query: {query_text} and document_id: {document_id}")
        try:
            query_vectors = self.embed_query(query_text=query_text)
            results = self.query_pinecone(vectors=query_vectors, document_id=document_id)
            match_result = self.max_match_result(results)
            self.log.info("Successfully got matches")
            return match_result
        except Exception as e:
            self.log.error(f"Error getting matches: {e}")
            raise
