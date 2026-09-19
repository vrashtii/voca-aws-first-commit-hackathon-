from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from database import init_db, get_connection
from schemas import (
    AgentCreate,
    AgentUpdate,
    AgentResponse,
    CallCreate,
    CallResponse,
   CallProcess,
CallUpdate,
)
import json

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("startup")
def startup():
    init_db()


@app.get("/health")
def health_check():
    return {"status": "ok"}
@app.post("/api/agents")
def create_agent(agent: AgentCreate):
    connection = get_connection()
    cursor = connection.cursor()

    cursor.execute(
        """
        INSERT INTO agents (
            agent_name,
            user_name,
            purposes,
            profile_data
        )
        VALUES (?, ?, ?, ?)
        """,
        (
            agent.agent_name,
            agent.user_name,
            json.dumps(agent.purposes),
            json.dumps(agent.profile_data),
        ),
    )

    connection.commit()
    agent_id = cursor.lastrowid
    connection.close()

    return {
        "agent_id": agent_id,
        "message": "Agent created successfully",
    }
@app.get("/api/agents", response_model=list[AgentResponse])
def get_agents():
    connection = get_connection()
    cursor = connection.cursor()

    cursor.execute("SELECT * FROM agents ORDER BY created_at DESC")
    rows = cursor.fetchall()

    connection.close()

    agents = []

    for row in rows:
        agents.append({
            "agent_id": row["agent_id"],
            "agent_name": row["agent_name"],
            "user_name": row["user_name"],
            "purposes": json.loads(row["purposes"]),
            "profile_data": json.loads(row["profile_data"] or "{}"),
            "status": row["status"],
            "created_at": row["created_at"],
        })

    return agents
@app.get("/api/agents/{agent_id}", response_model=AgentResponse)
def get_agent(agent_id: int):
    connection = get_connection()
    cursor = connection.cursor()

    cursor.execute(
        "SELECT * FROM agents WHERE agent_id = ?",
        (agent_id,)
    )

    row = cursor.fetchone()
    connection.close()

    if row is None:
        raise HTTPException(status_code=404, detail="Agent not found")

    return {
        "agent_id": row["agent_id"],
        "agent_name": row["agent_name"],
        "user_name": row["user_name"],
        "purposes": json.loads(row["purposes"]),
        "profile_data": json.loads(row["profile_data"] or "{}"),
        "status": row["status"],
        "created_at": row["created_at"],
    }
@app.put("/api/agents/{agent_id}")
def update_agent(agent_id: int, agent: AgentUpdate):
    connection = get_connection()
    cursor = connection.cursor()

    cursor.execute(
        "SELECT * FROM agents WHERE agent_id = ?",
        (agent_id,)
    )

    existing_agent = cursor.fetchone()

    if existing_agent is None:
        connection.close()
        raise HTTPException(status_code=404, detail="Agent not found")

    update_fields = []
    values = []

    if agent.agent_name is not None:
        update_fields.append("agent_name = ?")
        values.append(agent.agent_name)

    if agent.user_name is not None:
        update_fields.append("user_name = ?")
        values.append(agent.user_name)

    if agent.purposes is not None:
        update_fields.append("purposes = ?")
        values.append(json.dumps(agent.purposes))

    if agent.profile_data is not None:
        update_fields.append("profile_data = ?")
        values.append(json.dumps(agent.profile_data))

    if agent.status is not None:
        update_fields.append("status = ?")
        values.append(agent.status)

    if update_fields:
        values.append(agent_id)

        cursor.execute(
            f"""
            UPDATE agents
            SET {", ".join(update_fields)}
            WHERE agent_id = ?
            """,
            values,
        )

        connection.commit()

    connection.close()

    return {
        "message": "Agent updated successfully",
        "agent_id": agent_id,
    }
@app.post("/api/calls", response_model=dict)
def create_call(call: CallCreate):
    connection = get_connection()
    cursor = connection.cursor()

    # Check that the agent exists
    cursor.execute(
        "SELECT agent_id FROM agents WHERE agent_id = ?",
        (call.agent_id,)
    )

    agent = cursor.fetchone()

    if agent is None:
        connection.close()
        raise HTTPException(status_code=404, detail="Agent not found")

    cursor.execute(
        """
        INSERT INTO calls (
            agent_id,
            caller_name,
            call_type,
            summary,
            transcript,
            status,
            action_required
        )
        VALUES (?, ?, ?, ?, ?, ?, ?)
        """,
        (
            call.agent_id,
            call.caller_name,
            call.call_type,
            call.summary,
            call.transcript,
            call.status,
            call.action_required,
        ),
    )

    connection.commit()
    call_id = cursor.lastrowid
    connection.close()

    return {
        "call_id": call_id,
        "message": "Call created successfully",
    }
@app.get("/api/calls", response_model=list[CallResponse])
def get_calls():
    connection = get_connection()
    cursor = connection.cursor()

    cursor.execute("SELECT * FROM calls ORDER BY created_at DESC")
    rows = cursor.fetchall()

    connection.close()

    calls = []

    for row in rows:
        calls.append({
            "call_id": row["call_id"],
            "agent_id": row["agent_id"],
            "caller_name": row["caller_name"],
            "call_type": row["call_type"],
            "summary": row["summary"],
            "transcript": row["transcript"],
            "status": row["status"],
            "action_required": bool(row["action_required"]),
            "created_at": row["created_at"],
        })

    return calls
@app.get("/api/calls/{call_id}", response_model=CallResponse)
def get_call(call_id: int):
    connection = get_connection()
    cursor = connection.cursor()

    cursor.execute(
        "SELECT * FROM calls WHERE call_id = ?",
        (call_id,)
    )

    row = cursor.fetchone()
    connection.close()

    if row is None:
        raise HTTPException(status_code=404, detail="Call not found")

    return {
        "call_id": row["call_id"],
        "agent_id": row["agent_id"],
        "caller_name": row["caller_name"],
        "call_type": row["call_type"],
        "summary": row["summary"],
        "transcript": row["transcript"],
        "status": row["status"],
        "action_required": bool(row["action_required"]),
        "created_at": row["created_at"],
    }
@app.get("/api/agents/{agent_id}/profile", response_model=AgentResponse)
def get_agent_profile(agent_id: int):
    connection = get_connection()
    cursor = connection.cursor()

    cursor.execute(
        """
        SELECT agent_id, agent_name, user_name, purposes, profile_data, status, created_at
        FROM agents
        WHERE agent_id = ?
        """,
        (agent_id,)
    )

    row = cursor.fetchone()
    connection.close()

    if row is None:
        raise HTTPException(status_code=404, detail="Agent not found")

    return {
        "agent_id": row["agent_id"],
        "agent_name": row["agent_name"],
        "user_name": row["user_name"],
        "purposes": json.loads(row["purposes"]),
        "profile_data": json.loads(row["profile_data"] or "{}"),
        "status": row["status"],
        "created_at": row["created_at"],
    }
@app.post("/api/calls/process", response_model=dict)
def process_call(call: CallProcess):
    connection = get_connection()
    cursor = connection.cursor()

    # Check that the agent exists
    cursor.execute(
        "SELECT agent_id FROM agents WHERE agent_id = ?",
        (call.agent_id,)
    )

    agent = cursor.fetchone()

    if agent is None:
        connection.close()
        raise HTTPException(status_code=404, detail="Agent not found")

    # Save the processed call
    cursor.execute(
        """
        INSERT INTO calls (
            agent_id,
            caller_name,
            call_type,
            summary,
            transcript,
            status,
            action_required
        )
        VALUES (?, ?, ?, ?, ?, ?, ?)
        """,
        (
            call.agent_id,
            call.caller_name,
            call.call_type,
            call.summary,
            call.transcript,
            call.status,
            call.action_required,
        ),
    )

    connection.commit()
    call_id = cursor.lastrowid
    connection.close()

    return {
        "call_id": call_id,
        "message": "Call processed and saved successfully",
    }
@app.put("/api/calls/{call_id}")
def update_call(call_id: int, call: CallUpdate):
    connection = get_connection()
    cursor = connection.cursor()

    cursor.execute(
        "SELECT * FROM calls WHERE call_id = ?",
        (call_id,)
    )

    existing_call = cursor.fetchone()

    if existing_call is None:
        connection.close()
        raise HTTPException(status_code=404, detail="Call not found")

    update_fields = []
    values = []

    if call.caller_name is not None:
        update_fields.append("caller_name = ?")
        values.append(call.caller_name)

    if call.call_type is not None:
        update_fields.append("call_type = ?")
        values.append(call.call_type)

    if call.summary is not None:
        update_fields.append("summary = ?")
        values.append(call.summary)

    if call.transcript is not None:
        update_fields.append("transcript = ?")
        values.append(call.transcript)

    if call.status is not None:
        update_fields.append("status = ?")
        values.append(call.status)

    if call.action_required is not None:
        update_fields.append("action_required = ?")
        values.append(call.action_required)

    if update_fields:
        values.append(call_id)

        cursor.execute(
            f"""
            UPDATE calls
            SET {", ".join(update_fields)}
            WHERE call_id = ?
            """,
            values,
        )

        connection.commit()

    connection.close()

    return {
        "message": "Call updated successfully",
        "call_id": call_id,
    }