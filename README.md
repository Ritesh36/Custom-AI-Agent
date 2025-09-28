#LangGraph AI Agent with Web Search
A learning project demonstrating the implementation of an AI agent using LangGraph that can perform web searches and maintain conversation memory. This agent combines the power of Groq's language models with Tavily's search capabilities in a stateful workflow.
##🚀 Features

Interactive AI Agent: Chat with an AI that can search the web for real-time information
Web Search Integration: Uses Tavily Search API for accurate, up-to-date information retrieval
Conversation Memory: Maintains context across the conversation using LangGraph's memory system
State Management: Implements a proper state graph with conditional routing
Tool Integration: Seamlessly decides when to use web search tools vs. direct responses

##🏗️ Architecture
This project implements a StateGraph workflow with the following components:
Workflow Nodes

Agent Node: Processes user input and decides whether to use tools or respond directly
Tools Node: Executes web search queries when needed
Conditional Routing: Intelligently routes between direct responses and tool usage

##Flow Diagram
<img width="1536" height="1024" alt="Image" src="https://github.com/user-attachments/assets/f812ae22-55b4-4293-aa04-cc0d890fc7cf" />

##🛠️ Technology Stack

LangGraph: For building the stateful AI workflow
LangChain: Framework for LLM application development
Groq API: Fast inference with openai/gpt-oss-20b model
Tavily Search: Web search API for real-time information
Node.js: Runtime environment
Readline: Interactive command-line interface
