"use client";
import { Link } from "react-router-dom";
import React from "react";
import { Button } from "./ui/button";
import { MessageCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { UploadDialog } from "./uploadDialog";
import { Chats } from "@/constants/constants";
import { BsStars } from "react-icons/bs";

import { IUser } from "@/hooks/useAuth";
import { ProfileCard } from "./profileCard";

type Props = {
  chats: Chats[];
  chatId: number;
  isPro: boolean;
  user: IUser | null;
  logout: () => void;
};

const ChatSideBar = ({ chats, chatId, isPro, user, logout }: Props) => {
  const [loading, setLoading] = React.useState(false);


  return (
    <div className="w-full min-h-screen min-w-72 flex flex-col justify-between overflow-scroll soff p-4 text-gray-800 ">

      <div>
        <div className="flex flex-col gap-2">
          <UploadDialog />
          <Link to="/">
            <Button className="w-full   border">
              <BsStars className="mr-2 w-4 h-4" />
              Get Pro
            </Button>
          </Link>
        </div>

        <div className="flex max-h-[75vh] overflow-scroll element-class pb-20 flex-col gap-3 mt-4">
          {chats.length == 0 && <div className="flex h-96 items-center justify-center">
            <p className="text-sm"> You have'nt uploaded anything ,Upload a pdf document by clicking on new chat on top</p>
          </div>}
          {chats.map((chat) => (
            <Link key={chat.id} to={`/chat/${chat.id}`}>
              <div
                className={cn("rounded-lg px-3 py-2 text-gray-500 flex items-center", {
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

      <div>
        <ProfileCard user={user} logout={logout} />
      </div>
    </div>
  );
};

export default ChatSideBar;
