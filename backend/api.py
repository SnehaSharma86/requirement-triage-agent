from fastapi import FastAPI
from pydantic import BaseModel
from dotenv import load_dotenv
from fastapi.middleware.cors import CORSMiddleware
from graph import build_graph

load_dotenv()

app = FastAPI(
    title="Requirement Triage Agent API",
    version="1.0.0",
    description="LangGraph powered Requirement Triage API"
)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class RequirementRequest(BaseModel):
    raw_input: str


@app.get("/")
def home():
    return {
        "message": "Requirement Triage Agent API is running"
    }


@app.post("/generate-prd")
def generate_prd(request: RequirementRequest):

    graph = build_graph()

    initial_state = {
        "raw_input": request.raw_input,
        "items": [],
        "clarification_needed": False,
        "prd_output": None,
    }

    final_state = graph.invoke(initial_state)

    return {
        "items": final_state["items"],
        "clarification_needed": final_state["clarification_needed"],
        "prd_output": final_state["prd_output"]
    }