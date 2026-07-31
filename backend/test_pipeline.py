"""
test_pipeline.py

WHAT THIS IS: a manual smoke test that calls your REAL node functions
(from nodes/intake.py, categorize.py, clarify.py, prioritize.py,
draft.py) in the same order graph.py would run them — WITHOUT needing
the langgraph package installed. This exists purely so you can verify
your node logic works correctly in environments without internet
access to pip install.

On your own machine, run `python3 main.py` instead — that uses the
real LangGraph engine (graph.py) to execute this same pipeline, with
proper conditional routing instead of the manual if/else below.

Run with:  python3 test_pipeline.py
"""

from dotenv import load_dotenv
load_dotenv()

from nodes.intake import intake_node
from nodes.categorize import categorize_node
from nodes.clarify import clarify_node, route_after_categorize
from nodes.prioritize import prioritize_node
from nodes.draft import draft_node

SAMPLE_INPUT = """
Search is really slow when there are a lot of results.
Users keep asking for a way to export their results to CSV.
The filter dropdown breaks on mobile screens.
"""


def run_pipeline(raw_notes: str):
    state = {
        "raw_input": raw_notes,
        "items": [],
        "clarification_needed": False,
        "prd_output": None,
    }

    print("--- intake ---")
    state.update(intake_node(state))
    for item in state["items"]:
        print(f"  parsed: {item['text']}")

    print("\n--- categorize ---")
    state.update(categorize_node(state))
    for item in state["items"]:
        flag = " (needs clarification)" if item["needs_clarification"] else ""
        print(f"  {item['category']}: {item['text']}{flag}")

    # This mirrors what graph.py's conditional edge does automatically.
    next_node = route_after_categorize(state)
    print(f"\n--- router says: go to '{next_node}' ---")

    if next_node == "clarify":
        print("\n--- clarify ---")
        state.update(clarify_node(state))
        for item in state["items"]:
            if item["clarification_question"]:
                print(f"  open question: {item['clarification_question']}")

    print("\n--- prioritize ---")
    state.update(prioritize_node(state))
    for item in state["items"]:
        print(f"  RICE {item['rice_score']}: {item['text']}")

    print("\n--- draft ---")
    state.update(draft_node(state))

    print("\n===== FINAL PRD OUTPUT =====\n")
    print(state["prd_output"])


if __name__ == "__main__":
    run_pipeline(SAMPLE_INPUT)
