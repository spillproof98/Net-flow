import httpx
from app.core.config import settings

SERP_ENDPOINT = "https://serpapi.com/search"

async def web_search(query: str, max_results: int = 5) -> list[dict]:
    if not settings.SERPAPI_API_KEY:
        raise RuntimeError("SERPAPI_API_KEY not configured")

    params = {
        "q": query,
        "api_key": settings.SERPAPI_API_KEY,
        "engine": "google",
        "num": max_results,
    }

    async with httpx.AsyncClient(timeout=10) as client:
        res = await client.get(SERP_ENDPOINT, params=params)
        res.raise_for_status()
        data = res.json()

    results = []
    for item in data.get("organic_results", [])[:max_results]:
        results.append({
            "title": item.get("title"),
            "snippet": item.get("snippet"),
            "link": item.get("link"),
        })

    return results
