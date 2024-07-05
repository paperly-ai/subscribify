"use client";
import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "./ui/button";
import { Send } from "lucide-react";
import MessageList from "./MessageList";
import axios from "axios";
import { Message } from "@/constants/constants";

type Props = { chatId: number };

const _messages: Message[] = [
  { id: "1", role: "user", content: "Hello!" },
  { id: "2", role: "assistant", content: "Hi there! How can I assist you today?" },
  { id: "3", role: "user", content: "I need help with my project." },
  { id: "4", role: "assistant", content: "Sure, what kind of help do you need?" }
];

const ChatComponent = ({ chatId }: Props) => {
  const [messages, setMessages] = useState(_messages);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const messageContainer = document.getElementById("message-container");
    if (messageContainer) {
      messageContainer.scrollTo({
        top: messageContainer.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInput(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!input.trim()) return;

    const newMessage = { id: String(messages.length + 1), role: "user", content: input };
    setMessages([...messages, newMessage]);
    setInput("");

    try {
      setIsLoading(true);
      const response = await axios.post("/api/chat", { chatId, message: input });
      const assistantMessage = { id: String(messages.length + 2), role: "assistant", content: response.data.message };
      setMessages([...messages, newMessage, assistantMessage]);
    } catch (error) {
      console.error("Error sending message:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen overflow-scroll" id="message-container">
      {/* header */}
      <div className="sticky top-0 inset-x-0 p-2 bg-white h-[10vh] ">
        <h3 className="text-lg font-semibold">Chat</h3>
      </div>

      {/* message list */}
      <MessageList messages={messages} isLoading={isLoading} />

      <form onSubmit={handleSubmit} className="sticky bottom-0 inset-x-0 px-2 py-4 bg-white">
        <div className="flex items-center">
          <Input
            value={input}
            onChange={handleInputChange}
            placeholder="Ask any question..."
            className="w-full focus:outline-none"
          />
          <Button className="bg-blue-600 ml-2" type="submit" disabled={isLoading}>
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ChatComponent;
