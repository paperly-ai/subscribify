from pydantic import BaseModel

class UpsertPDFRequest(BaseModel):
  document_url:str
  document_id:str
  user_id:str 

class QueryPDFRequest(BaseModel):
  document_id:str
  query:str
  user_id:str 

class GeminiRequest(BaseModel):
  text_chunk:str
  query:str

class GeminiStreamRequest(BaseModel):
  user_id:str
  query:str
  document_id:str

