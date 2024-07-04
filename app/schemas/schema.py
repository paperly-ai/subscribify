from pydantic import BaseModel

class UpsertPDFRequest(BaseModel):
  documet_url:str
  document_id:str
  user_id:str 
