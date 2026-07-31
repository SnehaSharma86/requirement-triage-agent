"""
main.py

LESSON: This is the "npm start" of the project. It builds the compiled
graph once, then invokes it with an initial state. LangGraph handles
the traversal — you never manually call node functions yourself.
"""

from dotenv import load_dotenv
load_dotenv()

from graph import build_graph

SAMPLE_INPUT = """
Search is really slow when there are a lot of results.
Users keep asking for a way to export their results to CSV.
The filter dropdown breaks on mobile screens.
"""


def run(raw_notes: str):
    app = build_graph()

    initial_state = {
        "raw_input": raw_notes,
        "items": [],
        "clarification_needed": False,
        "prd_output": None,
    }

    final_state = app.invoke(initial_state)
    print(final_state["prd_output"])


if __name__ == "__main__":
    run(SAMPLE_INPUT)
