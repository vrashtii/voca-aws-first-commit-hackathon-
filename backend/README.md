# VOCA Backend

Backend service for VOCA — Your AI Voice Proxy.

## Tech Stack

- Python
- FastAPI
- Pydantic
- SQLite
- Uvicorn

## Setup

Create and activate the virtual environment:

```powershell
python -m venv venv
.\venv\Scripts\Activate.ps1
```

Install the dependencies:

```powershell
pip install -r requirements.txt
```

## Run the Server

From the `backend` folder:

```powershell
uvicorn main:app --reload
```

API documentation:

```text
http://127.0.0.1:8000/docs
```

## API Endpoints

### Health

- `GET /health` — Check whether the backend is running.

### Agents

- `POST /api/agents` — Create a new agent.
- `GET /api/agents` — Get all agents.
- `GET /api/agents/{agent_id}` — Get a specific agent.
- `PUT /api/agents/{agent_id}` — Update agent details or enable/disable an agent.
- `GET /api/agents/{agent_id}/profile` — Get an agent's profile.

### Calls

- `POST /api/calls` — Create a call record.
- `GET /api/calls` — Get call history.
- `GET /api/calls/{call_id}` — Get a specific call.
- `PUT /api/calls/{call_id}` — Update call information.
- `POST /api/calls/process` — Process and save a call.

## Database

The backend uses SQLite.

Database file:

```text
voca.db
```

Tables:

- `agents`
- `calls`

The database is automatically created when the FastAPI application starts.

## Project Structure

```text
backend/
├── main.py
├── database.py
├── models.py
├── schemas.py
├── requirements.txt
├── README.md
└── .gitignore
```