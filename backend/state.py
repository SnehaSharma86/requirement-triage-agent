"""
state.py

LESSON: In LangGraph, State is the single object passed between nodes.
Compare it to Express: (req, res, next) => { req.user = ... ; next() }
Here, a node reads `state`, returns a dict of fields to UPDATE, and
LangGraph merges that into the running state before passing it to the
next node.

We use a TypedDict (Python's typed-dictionary) to define the shape.
This is the Python equivalent of a TypeScript interface for your req body.
"""

from typing import TypedDict, List, Literal, Optional


class RequirementItem(TypedDict):
    """One parsed requirement/note, as it moves through the pipeline."""
    text: str
    category: Optional[Literal["bug", "feature", "tech_debt"]]
    rice_score: Optional[float]
    needs_clarification: bool
    clarification_question: Optional[str]


class AgentState(TypedDict):
    """
    The full state object that flows through every node in the graph.

    raw_input        -> what the user typed in (untouched)
    items             -> list of RequirementItem, built up as nodes run
    clarification_needed -> flag used for conditional routing (Cluster 4)
    prd_output        -> final markdown, filled in by the last node
    """
    raw_input: str
    items: List[RequirementItem]
    clarification_needed: bool
    prd_output: Optional[str]
