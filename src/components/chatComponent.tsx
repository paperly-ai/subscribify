"use client";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "./ui/button";
import { Send } from "lucide-react";
import MessageList from "./MessageList";
import axios from "axios";
import { Message } from "@/constants/constants";

type Props = { chatId: string };


const _messages: Message[] = [
  { id: "1", role: "user", content: "Hello!" },
  { id: "2", role: "assistant", content: "Hi there! How can I assist you today?" },
  { id: "3", role: "user", content: "I need help with my project." },
  { id: "4", role: "assistant", content: "Sure, what kind of help do you need?" },
  { id: "5", role: "user", content: "Can you provide more details?" },
  { id: "6", role: "assistant", content: "Certainly, what specific information do you require?" },
  { id: "7", role: "user", content: "I'm stuck on a coding problem." },
  { id: "8", role: "assistant", content: "Let's tackle it together. What's the issue?" },
  { id: "9", role: "user", content: "Thank you for your assistance!" },
  { id: "10", role: "assistant", content: "You're welcome! Glad I could help." },
  { id: "11", role: "user", content: "Could you explain this concept to me?" },
  { id: "12", role: "assistant", content: "Of course! Here's a breakdown of that concept." },
  { id: "13", role: "user", content: "What tools do you recommend for project management?" },
  { id: "14", role: "assistant", content: "There are several options. Let's discuss which might suit your needs." },
  { id: "15", role: "user", content: "How do I improve my coding skills?" },
  { id: "16", role: "assistant", content: "Practice and learning new techniques regularly can help." },
  { id: "17", role: "user", content: "What are the latest updates in web development?" },
  { id: "18", role: "assistant", content: "Let me provide you with some recent advancements." },
  { id: "19", role: "user", content: "Is there a recommended IDE for beginners?" },
  { id: "20", role: "assistant", content: "Many beginners find IDEs like Visual Studio Code or IntelliJ IDEA helpful." },
  { id: "21", role: "user", content: "How do I debug JavaScript code effectively?" },
  { id: "22", role: "assistant", content: "Using console logs and debugging tools in browsers can be useful." },
  { id: "23", role: "user", content: "Do you have any tips for writing clean code?" },
  { id: "24", role: "assistant", content: "Yes, writing modular and well-documented code is key." },
  { id: "25", role: "user", content: "Thank you for your advice!" },
];
const ChatComponent = ({ chatId }: Props) => {
  const [messages, setMessages] = useState(_messages);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);



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
      // const response = await axios.post("/api/chat", { chatId, message: input });
      //const assistantMessage = { id: String(messages.length + 2), role: "assistant", content: response.data.message };
      setMessages([...messages, newMessage]);
    } catch (error) {
      console.error("Error sending message:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative h-full overflow-scroll">
      {/* header */}
      <div className="sticky top-0 hidden lg:block inset-x-0 p-2 bg-white h-[10vh] ">
        <h3 className="text-lg fixed inset-x-0 top-4 md:relative text-center md:text-start font-semibold">Chat</h3>
      </div>

      {/* message list */}
      <MessageList messages={messages} isLoading={isLoading} />

      <form onSubmit={handleSubmit} className="absolute bottom-0 inset-x-0 px-2 py-4 bg-white">
        <div className="flex items-center">
          <Input
            value={input}
            onChange={handleInputChange}
            placeholder="Ask any question..."
            className="w-full focus:outline-none"
          />
          <Button className="bg-gray-900 ml-2" type="submit" disabled={isLoading}>
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </form>
    </div >
  );
};

export default ChatComponent;
