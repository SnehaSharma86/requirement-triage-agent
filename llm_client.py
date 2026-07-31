"""
llm_client.py

LESSON: This is the ONE place in the whole project that talks to the
LLM API. Every node imports this instead of calling the API directly —
same reason you'd centralize an axios instance in a Node project
instead of calling fetch() in every route handler.

We ask the model to return ONLY JSON (no preamble, no markdown fences)
so we can reliably parse it with json.loads(). This is the core pattern
behind "structured output" in agent systems.

DEMO MODE: if no ANTHROPIC_API_KEY is set, or DEMO_MODE=true, this
module returns realistic canned responses instead of calling the real
API. This lets you run and verify the FULL graph today, with zero cost
and zero setup, before wiring in a real key. Every node's logic (the
part you actually built) runs for real — only the network call is
mocked.
"""

import os
import re
import json
import random

DEMO_MODE = os.environ.get("DEMO_MODE", "").lower() == "true" or not os.environ.get("ANTHROPIC_API_KEY")

if not DEMO_MODE:
    import anthropic
    client = anthropic.Anthropic(api_key=os.environ.get("ANTHROPIC_API_KEY"))

MODEL = "claude-sonnet-4-6"


def _mock_response(system_prompt: str, user_message: str) -> dict:
    """
    Pattern-matches which node is calling (by a unique phrase in its
    system prompt) and returns a structurally valid, believable
    response. This keeps the mock honest: it doesn't fake success,
    it exercises the same JSON shape the real API would return.
    """
    if "Split the notes into discrete" in system_prompt:
        # intake_node: split on sentence-ish boundaries
        raw_items = re.split(r"(?<=[.!?])\s+|\n", user_message.strip())
        items = [i.strip() for i in raw_items if i.strip()]
        return {"items": items}

    if "Classify this single product note" in system_prompt:
        text = user_message.lower()
        if any(w in text for w in ["slow", "break", "bug", "error", "fail", "crash"]):
            category = "bug"
        elif any(w in text for w in ["export", "add", "want", "request", "new"]):
            category = "feature"
        else:
            category = "tech_debt"
        # Deliberately flag ~1 in 4 items as ambiguous, to exercise
        # the clarify branch, same as a real model would sometimes do.
        confident = random.random() > 0.25
        return {"category": category, "confident": confident}

    if "Estimate RICE sub-scores" in system_prompt:
        return {
            "reach": random.randint(4, 9),
            "impact": random.randint(4, 9),
            "confidence": random.randint(5, 9),
            "effort": random.randint(2, 7),
        }

    raise ValueError("Demo mode has no mock defined for this prompt.")


def call_llm_json(system_prompt: str, user_message: str) -> dict:
    """
    Calls the LLM and parses its reply as JSON. In demo mode, returns
    a mocked-but-structurally-real response instead, so the graph
    still fully executes.
    """
    if DEMO_MODE:
        return _mock_response(system_prompt, user_message)

    response = client.messages.create(
        model=MODEL,
        max_tokens=1024,
        system=system_prompt,
        messages=[{"role": "user", "content": user_message}],
    )

    raw_text = response.content[0].text.strip()

    if raw_text.startswith("```"):
        raw_text = raw_text.strip("`")
        if raw_text.startswith("json"):
            raw_text = raw_text[4:]
        raw_text = raw_text.strip()

    try:
        return json.loads(raw_text)
    except json.JSONDecodeError as e:
        raise ValueError(
            f"LLM did not return valid JSON.\nRaw output was:\n{raw_text}"
        ) from e
