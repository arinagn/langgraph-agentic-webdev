from dotenv import load_dotenv
from langchain_groq import ChatGroq
from langchain_core.globals import set_verbose, set_debug
from langgraph.graph import StateGraph
from prompts import *
from states import *

# Extract API Key from .env
load_dotenv()

set_verbose(True)
set_debug(True)

llm = ChatGroq(model="openai/gpt-oss-120b")


def planner_agent(state: dict) -> dict:
    response = llm.with_structured_output(Plan).invoke(planner_prompt(user_prompt))
    if response is None:
        raise ValueError("Planner did not return a valid response.")
    return {"plan": response}


def architect_agent(state: dict) -> dict:
    plan: Plan = state["plan"]
    response = llm.with_structured_output(TaskPlan).invoke(architect_prompt(plan))
    if response is None:
        raise ValueError("Architect did not return a valid response.")
    response.plan = plan
    return {"task_plan": response}


graph = StateGraph(dict)
graph.add_node("planner", planner_agent)
graph.add_node("architect", architect_agent)
graph.add_edge("planner", "architect")
graph.set_entry_point("planner")

agent = graph.compile()


if __name__ == "__main__":
    user_prompt = "Create a simple calculator web application."
    result = agent.invoke({"user_prompt": user_prompt})
    print(result)
