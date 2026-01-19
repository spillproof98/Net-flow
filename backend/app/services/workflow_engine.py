from app.services.dag_executor import topo_sort
from app.services.rag_service import retrieve_context
from app.services.web_search import web_search
from app.core.llm_client import chat_completion


def render_prompt(template: str, runtime: dict) -> str:
    for key, value in runtime.items():
        template = template.replace(f"{{{key}}}", str(value))
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

    runtime = {
        "query": user_query,
        "context": "",
        "output": "",
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
                stack_id=stack_id,
            )
            if kb_context:
                runtime["context"] += (
                    "\n\n[KNOWLEDGE BASE]\n" + kb_context
                )

        # 3️⃣ Web Search (FIXED)
        elif node_type == "webSearch":
            web_text = await web_search(runtime["query"])
            if web_text:
                runtime["context"] += (
                    "\n\n[WEB SEARCH RESULTS]\n" + web_text
                )

        # 4️⃣ LLM
        elif node_type == "llm":
            if not runtime["context"]:
                runtime["context"] = "No external context available."

            prompt = render_prompt(
                data.get(
                    "prompt",
                    "Answer using the context below.\n\n{context}\n\nQuestion: {query}"
                ),
                runtime,
            )

            runtime["output"] = await chat_completion(
                prompt=prompt,
                temperature=data.get("temperature", 0.7),
                model=data.get("model", "gpt-4o-mini"),
            )

        # 5️⃣ Output
        elif node_type == "output":
            return runtime["output"]

    return runtime["output"]
