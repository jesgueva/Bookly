# Bookly

Bookly is a simple appointment management system powered by FastAPI, LangChain, and React.

## Features

- Process incoming emails to either request clarification or schedule an appointment automatically.
- Store appointments in MongoDB.
- Send transactional emails via SendGrid.
- React frontend to interact with the backend.

## Prerequisites

1. **Python 3.10+**
2. **Node.js 18+**
3. **MongoDB** running locally or remotely.

## Backend Setup

```bash
cd backend
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
```

Create a `.env` file in `backend/` with:

```env
OPENAI_API_KEY=your_openai_key
SENDGRID_API_KEY=your_sendgrid_key
BOOKLY_FROM_EMAIL=no-reply@yourdomain.com
MONGODB_URI=mongodb://localhost:27017
```

Run the backend:

```bash
uvicorn main:app --reload
```

## Frontend Setup

```bash
cd ../frontend
npm install
npm start
```

The React app will open at `http://localhost:3000` and expects the backend at `http://localhost:8000`.

## Testing

You can use `pytest` (not yet included) to test backend components. Example:

```bash
pip install pytest httpx
pytest
```

## Folder Structure

```
Bookly
├── backend
│   ├── main.py
│   ├── database.py
│   ├── email_service.py
│   ├── langchain_agent.py
│   └── requirements.txt
└── frontend
    ├── package.json
    └── src/
        ├── App.js
        └── ...
```

---

Feel free to extend Bookly with authentication, richer email parsing, and calendar integrations. 