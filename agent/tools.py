"""Contains helper functions for LangGraph agent definitions."""

import pathlib

PROJECT_ROOT = pathlib.Path.cwd() / "generated_project"


def safe_path_for_project(path: str) -> pathlib.Path:
    p = (PROJECT_ROOT / path).resolve()
    if (
        PROJECT_ROOT.resolve() not in p.parents
        and PROJECT_ROOT.resolve() != p.parent
        and PROJECT_ROOT.resolve() != p
    ):
        raise ValueError("This path sits outside the project root.")
    return p
