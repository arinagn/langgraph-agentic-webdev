from dotenv import load_dotenv
from langchain_groq import ChatGroq
from langgraph.constants import END
from langgraph.graph import StateGraph
from prompts import *
from states import *

# Extract API Key from .env
load_dotenv()

llm = ChatGroq(model="openai/gpt-oss-120b")

user_prompt = "Create a simple calculator web application."


def planner_agent(state: dict) -> dict:
    response = llm.with_structured_output(Plan).invoke(planner_prompt(user_prompt))
    return {"plan": response}


graph = StateGraph(dict)
graph.add_node("planner", planner_agent)
graph.set_entry_point("planner")

agent = graph.compile()

result = agent.invoke({"user_prompt": user_prompt})
print(result)
