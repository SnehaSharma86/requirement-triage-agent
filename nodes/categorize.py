"""
nodes/categorize.py

LESSON: This node loops over state["items"] (built by intake_node) and
enriches each one. Notice the pattern: read a list from state, transform
it, return the updated list. This is the same shape as a .map() in JS —
we're just doing it with an LLM call inside the loop instead of pure logic.

We also introduce `needs_clarification` here — a flag the LLM sets when
it genuinely can't tell if something is a bug or a feature. This flag is
what Cluster 4's conditional routing will react to.
"""

from state import AgentState
from llm_client import call_llm_json

CATEGORIZE_SYSTEM_PROMPT = """
Classify this single product note into exactly one category.

Return ONLY JSON in this exact shape:
{"category": "bug" | "feature" | "tech_debt", "confident": true | false}

Set "confident": false ONLY if the note is genuinely ambiguous between
categories (e.g., could be read as either a bug or a feature request).
"""


def categorize_node(state: AgentState) -> dict:
    updated_items = []

    for item in state["items"]:
        result = call_llm_json(CATEGORIZE_SYSTEM_PROMPT, item["text"])

        item["category"] = result["category"]
        item["needs_clarification"] = not result["confident"]

        if item["needs_clarification"]:
            item["clarification_question"] = (
                f'Is "{item["text"]}" a bug fix or a new feature request?'
            )

        updated_items.append(item)

    # Set the graph-level flag if ANY item needs clarification.
    # This is what the conditional edge in Cluster 4 will check.
    any_unclear = any(i["needs_clarification"] for i in updated_items)

    return {
        "items": updated_items,
        "clarification_needed": any_unclear,
    }
