from app.services.dag_executor import topo_sort
from app.services.rag_service import retrieve_context
from app.services.web_search import web_search
from app.core.llm_client import chat_completion


def render_prompt(template: str, runtime: dict) -> str:
    """
    Safely replaces {variables} in prompt templates.
    Non-string values are stringified.
    """
    for key, value in runtime.items():
        template = template.replace(
            f"{{{key}}}",
            str(value)
        )
    return template


async def execute_workflow(
    workflow: dict,
    user_query: str,
    stack_id: str
) -> str:
    nodes = workflow["nodes"]
    edges = workflow["edges"]

    node_map = {n["id"]: n for n in nodes}
    execution_order = topo_sort(nodes, edges)

    # 🔥 Graph-wide runtime memory
    runtime = {
        "query": user_query,
        "context": "",
        "output": ""
    }

    for node_id in execution_order:
        node = node_map[node_id]
        node_type = node["type"]
        data = node.get("data", {})

        # 1️⃣ User Query
        if node_type == "userQuery":
            runtime["query"] = user_query

        # 2️⃣ Knowledge Base (RAG)
        elif node_type == "knowledgeBase":
            kb_context = retrieve_context(
                runtime["query"],
                stack_id=stack_id
            )

            if kb_context:
                runtime["context"] += (
                    "\n\n[KNOWLEDGE BASE]\n"
                    f"{kb_context}"
                )

        # 3️⃣ Web Search
        elif node_type == "webSearch":
            web_results = await web_search(runtime["query"])

            if web_results:
                formatted = "\n".join(
                    f"- {r['title']}: {r['snippet']}"
                    for r in web_results
                )

                runtime["context"] += (
                    "\n\n[WEB SEARCH RESULTS]\n"
                    f"{formatted}"
                )

        # 4️⃣ LLM
        elif node_type == "llm":
            prompt_template = data.get("prompt", "")
            temperature = data.get("temperature", 0.7)
            model = data.get("model", "gpt-4o-mini")

            prompt = render_prompt(prompt_template, runtime)

            runtime["output"] = await chat_completion(
                prompt=prompt,
                temperature=temperature,
                model=model
            )

        # 5️⃣ Output
        elif node_type == "output":
            return runtime.get("output", "")

    return runtime.get("output", "")
