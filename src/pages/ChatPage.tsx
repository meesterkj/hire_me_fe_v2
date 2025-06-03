import React, { useState, useEffect, useRef } from "react";
import Layout from "../components/Layout";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";

interface UserInfo {
  userId: string;
  name: string;
}

interface Message {
  id: string;
  text: string;
  sender: "user" | "ai";
}

const ChatPage: React.FC = () => {
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const chatHistoryRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("nebulaUser");
    let userName = "there";
    if (storedUser) {
      try {
        const parsedUser: UserInfo = JSON.parse(storedUser);
        setUserInfo(parsedUser);
        userName = parsedUser.name || "there";
      } catch (e) { console.error("Failed to parse user info from localStorage", e); }
    }
    setMessages([
      {
        id: `ai-initial-${Date.now()}`,
        text: `Hi ${userName}! I'm Nebula's AI assistant. How can I help you get to know Nebula better today?`,
        sender: "ai",
      },
    ]);
  }, []);

  useEffect(() => {
    if (chatHistoryRef.current) {
      chatHistoryRef.current.scrollTop = chatHistoryRef.current.scrollHeight;
    }
  }, [messages]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;
    const userMessage: Message = { id: `user-${Date.now()}`, text: inputValue, sender: "user" };
    setMessages((prevMessages) => [...prevMessages, userMessage]);
    const currentInput = inputValue;
    setInputValue("");

    try {
      const response = await fetch("/api/chat/message", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: userInfo?.userId, message: currentInput }),
      });
      const aiResponseData = await response.json();
      if (!response.ok) {
        const aiErrorMessage: Message = { id: `ai-error-${Date.now()}`, text: aiResponseData.error || `Sorry, I couldn't connect. Status: ${response.statusText}`, sender: "ai" };
        setMessages((prevMessages) => [...prevMessages, aiErrorMessage]);
        return;
      }
      const aiMessage: Message = { id: `ai-${Date.now()}`, text: aiResponseData.response, sender: "ai" };
      setMessages((prevMessages) => [...prevMessages, aiMessage]);
    } catch (err) {
      console.error("Chat API call failed:", err);
      const aiErrorMessage: Message = { id: `ai-error-${Date.now()}`, text: "Sorry, an unexpected error occurred while fetching the chat response.", sender: "ai" };
      setMessages((prevMessages) => [...prevMessages, aiErrorMessage]);
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleSendMessage();
    }
  };

  return (
    <Layout>
      <div className="flex flex-col h-[calc(100vh-4rem)] md:h-[calc(100vh-4rem)] font-inter"> {/* Assuming Layout provides bg/text color */}
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-6 text-nebula-blue-med pt-10 md:pt-0">
          Get to know Nebula
        </h1>
        <div className="flex-grow bg-white rounded-lg shadow-xl p-4 md:p-6 flex flex-col overflow-hidden">
          <div ref={chatHistoryRef} id="chat-history" className="flex-grow overflow-y-auto space-y-4 flex flex-col mb-4 p-2">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`chat-bubble p-3 rounded-lg shadow max-w-xs md:max-w-md break-words
                              ${msg.sender === "user" ?
                                "bg-nebula-user-bubble text-nebula-blue-dark self-end rounded-br-sm" :
                                "bg-nebula-ai-bubble text-nebula-blue-dark self-start rounded-bl-sm"
                              }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
          </div>
          <div className="mt-auto flex items-center p-1 bg-gray-100 rounded-full shadow-inner">
            <input
              type="text"
              id="chat-input"
              placeholder="Type your message..."
              value={inputValue}
              onChange={handleInputChange}
              onKeyPress={handleKeyPress}
              className="flex-grow px-4 py-3 rounded-full focus:outline-none focus:ring-2 focus:ring-nebula-blue-soft bg-transparent text-nebula-blue-dark"
            />
            <button
              onClick={handleSendMessage}
              className="ml-2 bg-nebula-blue-soft hover:bg-nebula-blue-med text-white p-3 rounded-full shadow-md transition-colors duration-200 focus:outline-none focus:ring-4 focus:ring-nebula-blue-soft focus:ring-opacity-50"
              aria-label="Send message"
            >
              <FontAwesomeIcon icon={faPaperPlane} />
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};
export default ChatPage;
