"""Contains helper functions for LangGraph agent definitions."""

import pathlib
from langchain.tools import tool

PROJECT_ROOT = pathlib.Path.cwd() / "generated_project"


def safe_path_for_project(path: str) -> pathlib.Path:
    """Checks whether input path is safe for project creation."""
    p = (PROJECT_ROOT / path).resolve()
    if (
        PROJECT_ROOT.resolve() not in p.parents
        and PROJECT_ROOT.resolve() != p.parent
        and PROJECT_ROOT.resolve() != p
    ):
        raise ValueError("This path sits outside the project root.")
    return p


@tool
def write_file(path: str, content: str) -> str:
    """Writes content to a file at the specified path within the project root."""
    p = safe_path_for_project(path)
    p.parent.mkdir(parents=True, exist_ok=True)
    with open(p, "w", encoding="utf-8") as f:
        f.write(content)
    return f"WROTE:{p}"
