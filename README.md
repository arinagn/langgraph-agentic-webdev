# langgraph-agentic-webdev

Uses the LangGraph framework to build a small multi‑agent web app builder. Running main.py creates a self-contained web project (output in `generated_project`) from a natural language prompt, e.g., the included `generated_project` was produced by running main.py with the prompt "Create a simple calculator web app."

## What this repo builds (80/20 rule)

- A pipeline (implemented as a LangGraph graph) that maps a single natural language prompt -> a generated web project (HTML/CSS/JS).
- The graph coordinates multiple agent components (user prompt -> planning -> architecting a solution -> code generation).
- Run `main.py` to execute the graph and produce the generated app in `generated_project/`.

## Quick start (how to use main.py)

1. Install dependencies outlined in pyproject.toml (I use Rust-based uv as a package manager due to it's efficiency, but feel free to use pip etc.)
   - python 3.10+ recommended
   - create and store your LLM API key in a .env file in the root (e.g., `GROQ_API_KEY`)
2. Run:
   - python main.py --prompt "Create a simple calculator web app."
   - The program will run the LangGraph graph and write the generated output to `generated_project/`.
3. Open `generated_project/index.html` in a browser to view the app.

If no `--prompt` is provided, main.py may have a default prompt or interactive prompt flow (see the `main.py` file for details).

## LangGraph — concise (80/20)

- LangGraph models multi-step agent workflows as a directed graph:
  - Nodes: agents/tools that transform or produce data (e.g., "Plan UI", "Generate HTML", "Write files").
  - Edges: typed channels transporting structured state between nodes.
  - Execution: the graph orchestrator schedules nodes, passes state along edges, and aggregates outputs.
- Why this helps: graph structure makes agent roles explicit, isolates prompts and transformation logic, and makes it easier to test or swap components.

In this repo, main.py builds + boots a LangGraph graph (defined in `agent/graph.py`) that wires prompts, tools, and state types together to produce the final project files.

## How the graph maps to files in this repo

- main.py
  - Bootstraps the LangGraph runtime and runs the graph with a user prompt.
  - Accepts the prompt (CLI or code), starts execution, and saves the produced files into `generated_project/`.
- agent/graph.py
  - Uses GROQ's Python API to initialise a model object with OpenAI's GPT-OSS-120b
  - Defines the LangGraph nodes, edges, and the overall graph structure (how agent components connect).
  - Responsible for composing the different agent behaviors into a single pipeline.
- agent/prompts.py
  - Centralized prompt templates and prompt assembly helpers used by generator/planner nodes.
  - Keeps language for LLM calls in one place so it’s easy to edit or improve instructions.
- agent/states.py
  - Defines the typed data structures (states) passed between nodes (e.g., `Plan`, `ImplementationTask`, `TaskPlan`, `CoderState`). These serves as schemas for the
    output of each LLM invocation.
  - Makes data contracts explicit so nodes know what to expect on each input edge.
- agent/tools.py
  - Lightweight wrappers for external interactions: LLM call helpers, validators, file I/O utilities, and small code-format helpers.
  - Encapsulates side effects (writing files to disk, logging, etc.) so node logic remains testable.

## generated_project

- This folder is the result of running `main.py` with the prompt "Create a simple calculator web app."
- It contains a minimal web app (HTML/CSS/JS) demonstrating the output format the graph produces.
