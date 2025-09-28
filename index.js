import { StateGraph, MessagesAnnotation } from "@langchain/langgraph";
import { ToolNode } from "@langchain/langgraph/prebuilt";
import { TavilySearch } from "@langchain/tavily";
import { ChatGroq } from "@langchain/groq";
import readline from "node:readline/promises";
import dotenv from "dotenv";
import { MemorySaver } from "@langchain/langgraph";
dotenv.config();

const checkpointer = new MemorySaver();

const tool = new TavilySearch({
  apiKey: process.env.TAVILY_API_KEY,
  maxResults: 3,
  topic: "general",
});

const tools = [tool];
const toolNode = new ToolNode(tools);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const llm = new ChatGroq({
  model: "openai/gpt-oss-20b",
  temperature: 0,
  maxRetries: 2,
  apiKey: process.env.GROQ_API_KEY,
}).bindTools(tools);

async function callModel(state) {
  const response = await llm.invoke(state.messages);
  return { messages: [response] };
}

function shouldContinue(state) {
  const lastMessage = state.messages[state.messages.length - 1];
  if (lastMessage.tool_calls.length > 0) {
    return "tools";
  }
  return "__end__";
}

const workFlow = new StateGraph(MessagesAnnotation)
  .addNode("agent", callModel)
  .addNode("tools", toolNode)
  .addEdge("__start__", "agent")
  .addConditionalEdges("agent", shouldContinue)
  .addEdge("tools", "agent")
  .addEdge("agent", "__end__");

const app = workFlow.compile({ checkpointer });

async function main() {
  while (true) {
    const userInp = await rl.question("You: ");
    if (userInp == "/bye") break;

    const finalState = await app.invoke(
      {
        messages: [
          {
            role: "user",
            content: userInp,
          },
        ],
      },
      { configurable: { thread_id: 1 } }
    );

    const lastMessage = finalState.messages[finalState.messages.length - 1];
    console.log("AI: ", lastMessage.content);
  }

  rl.close();
}

main();
