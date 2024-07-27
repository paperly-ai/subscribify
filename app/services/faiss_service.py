import os
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain_google_genai import GoogleGenerativeAIEmbeddings 
import google.generativeai as genai
from langchain_community.vectorstores import FAISS
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain.chains.question_answering import load_qa_chain
from langchain.prompts import PromptTemplate
from app.services.document_downloader import get_document_content_from_url
from app.core.config import settings
from app.services.pinecone_service import PineconeService
from app.utils.logger import Logger
from io import BytesIO
from PyPDF2 import PdfReader



class FaissService():
    def __init__(self):
        self.api_key = os.getenv("GOOGLE_API_KEY")
        genai.configure(api_key=self.api_key)

    def __get_document_text(self, file_path):
        document_content = get_document_content_from_url(file_path)
        document_stream = BytesIO(document_content)
        reader = PdfReader(document_stream)
        text = "".join(page.extract_text() for page in reader.pages).replace("\n", " ")
        return text
    
    def get_text_chunks(self, text):
        text_splitter = RecursiveCharacterTextSplitter(chunk_size=10000, chunk_overlap=1000)
        chunks = text_splitter.split_text(text)
        return chunks

    def get_vector_store(self, text_chunks):
        embeddings = GoogleGenerativeAIEmbeddings(model="models/embedding-001")
        vector_store = FAISS.from_texts(text_chunks, embedding=embeddings)
        vector_store.save_local(self.vector_store_path)
    
    def get_conversational_chain(self):
        prompt_template = """
        Answer the question as detailed as possible from the provided context. If the answer is not in
        the provided context, just say, "The answer is not available in the context". Do not provide an incorrect answer.\n\n
        Context:\n{context}\n
        Question:\n{question}\n
        Answer:
        """
        model = ChatGoogleGenerativeAI(model="gemini-pro", temperature=0.3,stream=True)
        prompt = PromptTemplate(template=prompt_template, input_variables=["context", "question"])
        chain = load_qa_chain(model, chain_type="stuff", prompt=prompt)
        return chain

    def process_user_input(self,document_id, user_question):
        self.vector_store_path=f"./{document_id}"
        embeddings = GoogleGenerativeAIEmbeddings(model="models/embedding-001")
        vector_store = FAISS.load_local(self.vector_store_path, embeddings,allow_dangerous_deserialization=True)
        docs = vector_store.similarity_search(user_question)
        return docs

    def get_vector_store(self,text_chunks):
      embeddings = GoogleGenerativeAIEmbeddings(model="models/embedding-001")
      vector_store = FAISS.from_texts(text_chunks, embedding=embeddings)
      vector_store.save_local(self.vector_store_path)


    def upsert_docs(self,document_id,pdf_url):
        self.vector_store_path=f"{document_id}"
        texts=self.__get_document_text(file_path=pdf_url)
        chunks=self.get_text_chunks(text=texts)
        self.get_vector_store(text_chunks=chunks)
        return True
        

