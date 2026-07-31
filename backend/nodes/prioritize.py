"""
nodes/prioritize.py

LESSON: Same shape again — by now the pattern should feel automatic:
read state["items"], enrich each one, return the updated list.

This node scores each item using RICE (Reach, Impact, Confidence,
Effort). We ask the LLM to estimate the four sub-scores, then compute
the final RICE score OURSELVES in Python rather than trusting the LLM's
arithmetic. This is an important agent-building lesson: let the LLM do
judgment calls (estimating reach/impact), let plain code do the math.
"""

from state import AgentState
from llm_client import call_llm_json

RICE_SYSTEM_PROMPT = """
Estimate RICE sub-scores for this product item, on a 1-10 scale each:
- reach: how many users does this affect
- impact: how much it improves their experience if fixed/shipped
- confidence: how sure you are about these estimates
- effort: how much work it likely takes (higher = more effort)

Return ONLY JSON:
{"reach": 1-10, "impact": 1-10, "confidence": 1-10, "effort": 1-10}
"""


def prioritize_node(state: AgentState) -> dict:
    updated_items = []

    for item in state["items"]:
        scores = call_llm_json(RICE_SYSTEM_PROMPT, item["text"])

        reach = scores["reach"]
        impact = scores["impact"]
        confidence = scores["confidence"] / 10  # normalize to 0-1
        effort = max(scores["effort"], 1)  # avoid divide-by-zero

        rice_score = round((reach * impact * confidence) / effort, 1)
        item["rice_score"] = rice_score

        updated_items.append(item)

    # Sort highest-priority first — nice-to-have but makes the
    # final PRD output read naturally.
    updated_items.sort(key=lambda i: i["rice_score"], reverse=True)

    return {"items": updated_items}
