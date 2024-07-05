"use client";
import { Link } from "react-router-dom";
import React from "react";
import { Button } from "./ui/button";
import { MessageCircle, PlusCircle } from "lucide-react";
import { cn } from "@/lib/utils";
// import axios from "axios";
import SubscriptionButton from "./SubscriptionButton";
import { Chats } from "@/constants/constants";
import { BsStars } from "react-icons/bs";

type Props = {
  chats: Chats[];
  chatId: number;
  isPro: boolean;
};

const ChatSideBar = ({ chats, chatId, isPro }: Props) => {
  const [loading, setLoading] = React.useState(false);


  return (
    <div className="w-full min-h-screen overflow-scroll soff p-4 text-gray-800 border-r">

      <div className="flex flex-col gap-2">
        <Link to="/">
          <Button variant="outline" className="w-full   border">
            <PlusCircle className="mr-2 w-4 h-4" />
            New Chat
          </Button>
        </Link>
        <Link to="/">
          <Button variant="ghost" className="w-full   border">
            <BsStars className="mr-2 w-4 h-4" />
            Get Pro
          </Button>
        </Link>
      </div>

      <div className="flex max-h-screen overflow-scroll pb-20 flex-col gap-2 mt-4">
        {chats.map((chat) => (
          <Link key={chat.id} to={`/chat/${chat.id}`}>
            <div
              className={cn("rounded-lg p-3 text-gray-500 flex items-center", {
                "bg-blue-600 text-white": chat.id === chatId,
                "hover:text-gray-900": chat.id !== chatId,
              })}
            >
              <MessageCircle className="mr-2" />
              <p className="w-full overflow-hidden text-sm truncate whitespace-nowrap text-ellipsis">
                {chat.pdfName}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ChatSideBar;
