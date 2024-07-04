from io import BytesIO
from PyPDF2 import PdfReader
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain_google_genai import GoogleGenerativeAIEmbeddings
from app.services.document_downloader import get_document_content_from_url
from app.core.config import settings

class DocumentProcessor:
    def __init__(self):
        self.embeddings = GoogleGenerativeAIEmbeddings(model=settings.GOOGLE_EMBEDDING_MODEL, google_api_key=settings.GOOGLE_API_KEY)

    def __get_document_text(self, file_path):
        document_content = get_document_content_from_url(file_path)
        document_stream = BytesIO(document_content)
        reader = PdfReader(document_stream)
        text = ""
        for page in reader.pages:
            text += page.extract_text()
        return text

    def __get_text_chunks(self, text, chunk_size=10000, chunk_overlap=1000):
        text_splitter = RecursiveCharacterTextSplitter(chunk_size=chunk_size, chunk_overlap=chunk_overlap)
        chunks = text_splitter.split_text(text)
        return chunks

    def embed_text(self,file_path):
        document_text=self.__get_document_text(file_path=file_path)
        text_chunks=self.__get_text_chunks(document_text)
        return self.embeddings.embed_text(text_chunks)
