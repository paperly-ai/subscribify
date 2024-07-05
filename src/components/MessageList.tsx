import React from "react";
import { Loader2 } from "lucide-react";
import { Message } from "@/constants/constants";

type Props = {
  isLoading: boolean;
  messages: Message[];
};

const MessageList = ({ messages, isLoading }: Props) => {
  if (isLoading) {
    return (
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <Loader2 className="w-6 h-6 animate-spin" />
      </div>
    );
  }
  if (!messages || messages.length === 0) return null;
  return (
    <div className="flex  flex-col gap-2 p-4  h-[80vh] overflow-y-scroll">
      {messages.map((message) => (
        <div
          key={message.id}
          className={`flex ${message.role === "user" ? "justify-end pl-10" : "justify-start pr-10"
            }`}
        >
          <div
            className={`rounded-lg px-3 text-sm py-2  ${message.role === "user" ? "bg-blue-500 text-white" : "bg-gray-100 text-black"
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


