from typing import List, Optional

from fastapi import FastAPI, HTTPException
from pydantic import BaseModel, EmailStr

# CORSMiddleware for frontend access
from langchain_agent import process_email_content
from database import appointments_collection
from fastapi.middleware.cors import CORSMiddleware


app = FastAPI(title="Bookly API")

# Allow React dev server (and other localhost ports) to access this API
origins = [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class EmailInput(BaseModel):
    """Input schema for /process_email"""

    email_text: str
    sender_email: Optional[EmailStr] = None  # optional; used for replies


class AppointmentOut(BaseModel):
    id: str
    participants: List[EmailStr]
    datetime: Optional[str]
    notes: Optional[str]


@app.post("/process_email")
async def process_email(input_data: EmailInput):

    result_text = await process_email_content(input_data.email_text, input_data.sender_email)

    return {"message": result_text}


@app.get("/appointments", response_model=List[AppointmentOut])
async def list_appointments():
    cursor = appointments_collection.find()
    appointments = []
    async for doc in cursor:
        doc["id"] = str(doc.pop("_id"))
        appointments.append(doc)
    return appointments 