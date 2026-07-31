"""
nodes/intake.py

LESSON: This is your FIRST node. Every node has the same shape:

    def node_name(state: AgentState) -> dict:
        ... do something with state ...
        return {"field_to_update": new_value}

LangGraph takes what you return and merges it into the running state.
You do NOT return the whole state back — just the piece(s) you changed.
(Compare: res.locals.foo = bar in Express, not replacing the whole res.)
"""

from state import AgentState, RequirementItem
from llm_client import call_llm_json

INTAKE_SYSTEM_PROMPT = """
You are a product management assistant. The user will give you rough,
unstructured notes (feature requests, bug reports, complaints).

Split the notes into discrete, individual items. Return ONLY JSON in
this exact shape, nothing else:

{"items": ["first item as a clean sentence", "second item", ...]}
"""


def intake_node(state: AgentState) -> dict:
    result = call_llm_json(INTAKE_SYSTEM_PROMPT, state["raw_input"])

    items: list[RequirementItem] = []
    for text in result["items"]:
        items.append({
            "text": text,
            "category": None,
            "rice_score": None,
            "needs_clarification": False,
            "clarification_question": None,
        })

    return {"items": items}
