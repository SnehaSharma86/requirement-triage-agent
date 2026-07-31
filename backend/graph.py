"""
graph.py

LESSON: This is the only file that knows the SHAPE of the pipeline.
Every node stays ignorant of what comes before/after it — same
principle as keeping Express middleware decoupled from the specific
route chain it's used in.

Graph shape we're building:

    intake -> categorize -> [route] -> clarify -> prioritize -> draft -> END
                                |
                                +-----------------> prioritize (skip clarify)
"""

from langgraph.graph import StateGraph, END
from state import AgentState
from nodes.intake import intake_node
from nodes.categorize import categorize_node
from nodes.clarify import clarify_node, route_after_categorize
from nodes.prioritize import prioritize_node
from nodes.draft import draft_node


def build_graph():
    graph = StateGraph(AgentState)

    # 1. Register every node with a name.
    graph.add_node("intake", intake_node)
    graph.add_node("categorize", categorize_node)
    graph.add_node("clarify", clarify_node)
    graph.add_node("prioritize", prioritize_node)
    graph.add_node("draft", draft_node)

    # 2. Declare the entry point.
    graph.set_entry_point("intake")

    # 3. Fixed edges — these always run in sequence.
    graph.add_edge("intake", "categorize")
    graph.add_edge("clarify", "prioritize")
    graph.add_edge("prioritize", "draft")
    graph.add_edge("draft", END)

    # 4. Conditional edge — this is the branch from Cluster 4.
    #    route_after_categorize returns "clarify" or "prioritize";
    #    the dict below maps those return strings to real node names.
    graph.add_conditional_edges(
        "categorize",
        route_after_categorize,
        {
            "clarify": "clarify",
            "prioritize": "prioritize",
        },
    )

    return graph.compile()
