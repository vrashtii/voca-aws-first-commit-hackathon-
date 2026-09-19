import sqlite3

DATABASE_NAME = "voca.db"


def get_connection():
    connection = sqlite3.connect(DATABASE_NAME)
    connection.row_factory = sqlite3.Row
    return connection


def init_db():
    connection = get_connection()
    cursor = connection.cursor()

    cursor.execute("""
        CREATE TABLE IF NOT EXISTS agents (
            agent_id INTEGER PRIMARY KEY AUTOINCREMENT,
            agent_name TEXT NOT NULL,
            user_name TEXT NOT NULL,
            purposes TEXT NOT NULL,
            profile_data TEXT,
            status TEXT NOT NULL DEFAULT 'disabled',
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    """)

    cursor.execute("""
        CREATE TABLE IF NOT EXISTS calls (
            call_id INTEGER PRIMARY KEY AUTOINCREMENT,
            agent_id INTEGER NOT NULL,
            caller_name TEXT,
            call_type TEXT,
            summary TEXT,
            transcript TEXT,
            status TEXT,
            action_required BOOLEAN DEFAULT 0,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (agent_id) REFERENCES agents(agent_id)
        )
    """)

    connection.commit()
    connection.close()