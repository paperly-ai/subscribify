from fastapi import FastAPI
from fastapi.responses import StreamingResponse
import os
from dotenv import load_dotenv
import google.generativeai as genai

load_dotenv()

genai.configure(api_key=os.getenv('GOOGLE_API_KEY'))
model = genai.GenerativeModel('gemini-1.5-pro')

app = FastAPI(
    title="Waffle-AI",
    description="This is a custom API with FastAPI",
    version="1.0.0"
)

def generate_responses():
    response = model.generate_content("What is the meaning of life?", stream=True)
    for chunk in response:
        print(chunk.text)
        yield f"data: {chunk.text}\n\n"

@app.get("/get-response")
async def get_response():
    return StreamingResponse(generate_responses(), media_type="text/event-stream")
