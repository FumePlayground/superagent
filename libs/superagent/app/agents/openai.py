import asyncio

from langchain.agents import AgentExecutor
from langchain.agents.openai_assistant import OpenAIAssistantRunnable
from langchain.schema.messages import AIMessage
from langchain.schema.output import ChatGeneration, LLMResult

from app.agents.base import AgentBase


class OpenAiAssistant(AgentBase):
    def __init__(self, enable_streaming=False):
        self.enable_streaming = enable_streaming
    async def ainvoke(self, message, *args, **kwargs):
        assistant_id = self.agent_config.metadata.get("id")
        agent = OpenAIAssistantRunnable(assistant_id=assistant_id, as_agent=True)
        enable_streaming = self.enable_streaming
        if enable_streaming:
            response = await agent.chat.create(
                model="gpt-4",
                messages=[{"role": "system", "content": message}],
                stream=True,
                settings=kwargs.get('settings')
            )
            async for chunk in response.stream():
                content = chunk['choices'][0].get('text', '')
                print(content)  # Placeholder for actual processing logic
            # Finalize the streamed interaction
            await self.on_llm_end(response=LLMResult(
                generations=[
                    [ChatGeneration(message=AIMessage(content='Streaming ended'))]
                ],
            ))
            return response
        else:
            return await super().ainvoke(message, *args, **kwargs)
            # Finalize the streamed interaction
            await self.on_llm_end(response=LLMResult(
                generations=[
                    [ChatGeneration(message=AIMessage(content='Streaming ended'))]
                ],
            ))
            return response
