from openai import AsyncOpenAI
from app.core.config import settings

client = AsyncOpenAI(api_key=settings.OPENAI_API_KEY)


async def chat_completion(
    prompt: str,
    model: str | None = None,
    temperature: float = 0.7,
    system_prompt: str | None = None,
) -> str:
    """
    Async-safe LLM completion for workflow execution.
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
        res = await client.chat.completions.create(
            model=model or settings.OPENAI_CHAT_MODEL,
            messages=messages,
            temperature=temperature,
            timeout=30,
        )
    except Exception as e:
        return f"[LLM ERROR] {str(e)}"

    if not res.choices:
        return "[LLM ERROR] No response generated."

    return res.choices[0].message.content or ""
