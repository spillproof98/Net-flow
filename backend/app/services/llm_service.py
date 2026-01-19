from openai import AsyncOpenAI
from app.core.config import settings

client = AsyncOpenAI(api_key=settings.OPENAI_API_KEY)


async def chat_completion(
    prompt: str,
    model: str,
    temperature: float = 0.7,
    system_prompt: str | None = None,
) -> str:
    """
    Execute an LLM chat completion safely.
    """

    messages = []

    if system_prompt:
        messages.append({
            "role": "system",
            "content": system_prompt
        })

    messages.append({
        "role": "user",
        "content": prompt
    })

    try:
        response = await client.chat.completions.create(
            model=model,
            messages=messages,
            temperature=temperature,
            timeout=30,
        )
    except Exception as e:
        # Never crash the workflow
        return f"[LLM ERROR] {str(e)}"

    if not response.choices:
        return "[LLM ERROR] No response generated."

    return response.choices[0].message.content or ""
