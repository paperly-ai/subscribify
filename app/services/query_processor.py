from io import BytesIO
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain_google_genai import GoogleGenerativeAIEmbeddings
from app.services.document_downloader import get_document_content_from_url
from app.core.config import settings

class QueryProcessor:
    def __init__(self):
        self.embeddings = GoogleGenerativeAIEmbeddings(model=settings.GOOGLE_EMBEDDING_MODEL, google_api_key=settings.GOOGLE_API_KEY)

    def embed_query(self,query_text):
        return self.embeddings.embed_query(query_text,output_dimensionality=1536)
