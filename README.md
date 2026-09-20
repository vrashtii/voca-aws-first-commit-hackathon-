# VOCA — Your AI Voice Proxy

> A personal AI voice proxy that handles routine conversations
> on behalf of users while keeping them informed and in control.

## 🚀 Overview

Voca is an AI-powered personal voice proxy designed to handle
routine phone conversations when the user is unavailable.

Instead of being a generic voice assistant, Voca is personalized
around the user's own information, selected purposes, and
conversation context.

Users can create an agent for:
- Delivery & Orders
- Job / Internship / Recruiter Calls
- Personal / General Calls
- Receptionist
- Order Taking
- Appointments
- Customer Support
- Custom purposes

## 💡 Problem

People receive many routine calls when they are busy, unavailable,
in class, at work, or travelling.

A normal chatbot cannot participate in a continuous voice
conversation, while a generic voice assistant does not have the
user's specific context.

Voca solves this by acting as a personal AI proxy that can:

- Understand incoming conversations
- Use information configured by the user
- Maintain multi-turn conversation context
- Collect important information
- Handle routine requests within defined boundaries
- Generate a structured call summary

## 🎯 How Voca Works

1. User creates a Voca agent
2. User selects the purposes the agent should handle
3. User provides purpose-specific information
4. Caller starts a conversation
5. Voice input is converted into text
6. FastAPI maintains the active call session
7. Strands-based Voca agent processes the conversation
8. Agent uses profile information and tools when required
9. Policy layer controls authorized actions
10. Response is converted back to voice
11. Call summary and transcript are stored

## 🧠 Agent Architecture

```text
                    CALLER
                       │
                       ▼
                 Voice / STT
                       │
                       ▼
              ┌─────────────────┐
              │   VOCA AGENT    │
              │ Amazon Strands  │
              └────────┬────────┘
                       │
          ┌────────────┼────────────┐
          ▼            ▼            ▼
    User Profile     Tools       Conversation
                                  History
          │            │            │
          └────────────┼────────────┘
                       ▼
              Policy / Authorization
                       │
                       ▼
                 Agent Response
                       │
                       ▼
                     TTS
                       │
                       ▼
                    CALLER
