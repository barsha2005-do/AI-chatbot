from fastapi import FastAPI, HTTPException

from pydantic import BaseModel
import openai
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Set up OpenAI API key
openai.api_key = os.getenv("OPENAI_API_KEY")
app = FastAPI()

class Message(BaseModel):
    user_message: str

@app.post("/chat")
async def chat_with_bot(message: Message):
    try:
        # Call OpenAI API to get the response
        response = openai.Completion.create(
            engine="text-davinci-003",  # You can change this based on the model you want to use
            prompt=message.user_message,
            max_tokens=150
        )
        # Extract the text response from OpenAI
        bot_message = response.choices[0].text.strip()
        return {"bot_message": bot_message}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error: {e}")
