from pydantic import BaseModel

class UpsertPDFRequest(BaseModel):
  document_url:str
  document_id:str
  user_id:str 

class QueryPDFRequest(BaseModel):
  document_id:str
  query:str
  user_id:str 

