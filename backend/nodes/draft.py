"""
nodes/draft.py

LESSON: The final node. By now state["items"] is fully enriched —
categorized, scored, clarified. This node's job is just formatting:
turn structured data into the human-readable PRD output. Notice this
node does NOT call the LLM — not every node needs to. Plain Python is
often the right tool once the hard judgment calls are already done.
"""

from state import AgentState


def draft_node(state: AgentState) -> dict:
    lines = ["# Product requirements summary", ""]

    for item in state["items"]:
        lines.append(f"## {item['text']}")
        lines.append(f"- **Category**: {item['category']}")
        lines.append(f"- **RICE score**: {item['rice_score']}")
        if item["needs_clarification"]:
            lines.append(f"- **Open question**: {item['clarification_question']}")
        lines.append("")

    return {"prd_output": "\n".join(lines)}
