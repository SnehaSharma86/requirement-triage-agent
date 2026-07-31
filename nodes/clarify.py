"""
nodes/clarify.py

LESSON: This node only runs when categorize_node set
clarification_needed = True. For this project, "clarifying" means
surfacing the question rather than blocking execution (a real product
might pause and wait for human input here — that's a valid extension).

We resolve ambiguous items with a best-guess default so the pipeline
can still complete end-to-end, but we keep the question attached to
the item so it shows up in the final PRD as an "open question" —
exactly like the JD's own listed deliverable: "dependency/timeline
risk advising."
"""

from state import AgentState


def clarify_node(state: AgentState) -> dict:
    updated_items = []

    for item in state["items"]:
        if item["needs_clarification"]:
            # Best-guess default so the pipeline keeps moving.
            # In a production system, this is where you'd pause
            # and wait for a human reply instead.
            if item["category"] is None:
                item["category"] = "feature"

        updated_items.append(item)

    return {"items": updated_items}


def route_after_categorize(state: AgentState) -> str:
    """
    LESSON: This is a ROUTING FUNCTION, not a node. It doesn't touch
    state — it just looks at it and returns the NAME of the next node
    as a string. This is what makes LangGraph a graph, not a pipeline.

    We register this with add_conditional_edges() in graph.py.
    """
    if state["clarification_needed"]:
        return "clarify"
    return "prioritize"
