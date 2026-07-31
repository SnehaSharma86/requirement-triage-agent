# Requirement triage & PRD drafting agent

A LangGraph-based multi-agent workflow that takes rough, unstructured
product notes and turns them into a categorized, RICE-prioritized,
structured PRD draft — with clarifying questions surfaced for
ambiguous items.

Built as a learning project mapped to real product-management workflows:
requirement triage, RICE prioritization, and PRD drafting.

## Architecture

```
intake -> categorize --[conditional]--> clarify -> prioritize -> draft
                     \_______________________________/
                          (skips clarify if unambiguous)
```

- **intake** — splits raw notes into discrete items
- **categorize** — classifies each item as bug / feature / tech_debt,
  flags ambiguous ones
- **clarify** (conditional) — only runs if any item was flagged;
  resolves with a best-guess default and surfaces an open question
- **prioritize** — scores each item using RICE (Reach, Impact,
  Confidence, Effort)
- **draft** — formats everything into a markdown PRD

## Setup

```bash
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
cp .env.example .env   # add your ANTHROPIC_API_KEY
python3 main.py
```

## Demo mode (no API key needed)

If `ANTHROPIC_API_KEY` isn't set, the project automatically runs in
demo mode: every LLM call is replaced with a realistic mocked response
that exercises the same JSON shape a real call would return. This lets
you verify the entire pipeline — including the conditional clarify
routing — with zero cost and zero setup.

```bash
python3 test_pipeline.py
```

This runs your real node functions in sequence and prints each stage
of the pipeline, ending with the final PRD markdown. Once you add a
real API key, `python3 main.py` runs the same logic through the actual
LangGraph engine.

## Sample output

Input:
> Search is really slow when there are a lot of results. Users keep
> asking for a way to export their results to CSV. The filter dropdown
> breaks on mobile screens.

Output: a markdown PRD with each item categorized, RICE-scored, and
sorted by priority.

## What this project demonstrates

- LangGraph state management and conditional routing
- Structured LLM output (JSON-in, JSON-out) rather than freeform text
- Separating LLM judgment calls from deterministic logic (RICE math is
  computed in Python, not trusted to the model)
- A pipeline architecture directly analogous to Express middleware
  chains, applied to agent orchestration

## Possible extensions

- Wire a real tool call: replace the sample input with a call to a
  live backend API
- Add role-based access so only certain roles can trigger the `draft`
  node (RBAC applied to agent tool-calling)
- Swap the best-guess `clarify` resolution for an actual human-in-the-
  loop pause using LangGraph's interrupt feature
