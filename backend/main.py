from dotenv import load_dotenv
load_dotenv()

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from graph import build_graph

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class PRDRequest(BaseModel):
    raw_input: str


@app.get("/")
def home():
    return {"message": "Requirement Triage Backend Running"}


@app.post("/generate-prd")
def generate_prd(request: PRDRequest):
    print("Request received")

    graph = build_graph()

    initial_state = {
        "raw_input": request.raw_input,
        "items": [],
        "clarification_needed": False,
        "prd_output": None,
    }

    print("Invoking graph...")
    final_state = graph.invoke(initial_state)
    print("Graph finished")

    print(final_state)

    return {
        "items": final_state.get("items", []),
        "prd_output": final_state.get("prd_output", "")
    }
    