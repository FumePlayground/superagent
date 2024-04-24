import asyncio
import json

from langchain_community.tools import BaseTool
from scrapingbee import ScrapingBeeClient


class Scraper(BaseTool):
    name = "Scraper"
    description = "useful for extracting content from a webpage"
    return_direct = False

    def _run(self, url: str) -> str:
        client = ScrapingBeeClient(api_key=self.metadata.get("apiKey"))
        response = client.get(
            url,
            params={
                "extract_rules": {
                    "text": "body",
                    "products": ".product-list > li",
                    "services": "#services > div",
                    "tech_uses": "article.tech-use-case"
                },
                "render_js": True,
                "wait_browser": "load",
            },
        )
        return response.text

    async def _arun(self, url: str) -> dict:
        loop = asyncio.get_event_loop()
        response_text = await loop.run_in_executor(None, self._run, url)
        return json.loads(response_text)
