import React, { useEffect } from "react";
import { Loader2 } from "lucide-react";
import { Message } from "@/constants/constants";

type Props = {
  isLoading: boolean;
  messages: Message[];
};

const MessageList = ({ messages, isLoading }: Props) => {
  useEffect(() => {
    const messageContainer = document.getElementById("message-container");
    if (messageContainer) {
      messageContainer.scrollTo({
        top: messageContainer.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages]);
  if (isLoading) {
    return (
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <Loader2 className="w-6 h-6 animate-spin" />
      </div>
    );
  }
  if (!messages || messages.length === 0) return null;
  return (
    <div id="message-container" className="flex flex-col gap-2 p-4 pb-20  h-[90vh] overflow-y-scroll">
      {messages.map((message) => (
        <div
          key={message.id}
          className={`flex ${message.role === "user" ? "justify-end pl-10" : "justify-start pr-10"
            }`}
        >
          <div
            className={`rounded-lg px-3 text-sm py-2  ${message.role === "user" ? "bg-gray-900 text-white" : "bg-gray-100 text-black"
              }`}
          >
            <p>{message.content}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MessageList;

// Example usage:


