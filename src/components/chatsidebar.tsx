"use client";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { Loader, Menu, MessageCircle, SquarePen } from "lucide-react";
import { cn } from "@/lib/utils";
import { UploadDialog } from "./uploadDialog";
import { Document } from "@/constants/constants";
import { BsStars } from "react-icons/bs";

import { IUser } from "@/hooks/useAuth";
import { ProfileCard } from "./profileCard";
import { Drawer, DrawerContent, DrawerTrigger } from "./ui/drawer";

type Props = {
  documents: Document[];
  chatId: string;
  isPro: boolean;
  user: IUser | null;
  logout: () => void;
  loading: boolean;
  setId: (id: string) => void;

};

const ChatSideBar = ({ documents, chatId, user, logout, loading, setId }: Props) => {
  const renderChatList = () => {
    if (loading) {
      return <div className="flex h-96 items-center justify-center">
        <p className="text-sm">
          <Loader className="animate-spin" />
        </p>
      </div>
    }
    if (documents.length === 0) {
      return (
        <div className="flex h-96 items-center justify-center">
          <p className="text-sm">
            You haven't uploaded anything. Upload a PDF document by clicking on new chat on top.
          </p>
        </div>
      );
    }

    return documents.map((document: Document) => (
      <Link key={document._id} to={`/chat/${document._id}`}>
        <div
          className={cn("rounded-lg px-3 py-3 text-gray-500 flex items-center", {
            "bg-gray-900 text-white": document._id === chatId,
            "hover:text-gray-900": document._id !== chatId,
          })}
        >
          <MessageCircle className="mr-2" />
          <p className="w-full overflow-hidden text-sm truncate whitespace-nowrap text-ellipsis">
            {document.pdfName}
          </p>
        </div>
      </Link>
    ));
  };

  return (
    <Drawer>
      <DrawerTrigger
        asChild
        className="fixed z-50 top-2 left-4  items-center justify-start p-0 md:hidden"
      >
        <Button variant={'link'}>
          <Menu />
        </Button>
      </DrawerTrigger>

      <div
        className="fixed z-50 top-2 right-0  items-center  p-0 md:hidden"
      >
        <Button variant={'link'}>
          <SquarePen />
        </Button>
      </div>

      <DrawerContent>
        <div className="h-full w-full py-4 flex flex-col gap-4">

          <div className="flex flex-col gap-3 px-2">
            {renderChatList()}
          </div>
        </div>
      </DrawerContent>

      <div className=" h-screen left-0 z-10 hidden border-r border-gray-200 bg-white p-2 md:flex md:flex-col justify-between">
        <>
          <div className="flex flex-col gap-5">
            <div className="flex flex-col gap-2">
              <UploadDialog />
              <Link to="/">
                <Button className="w-full border">
                  <BsStars className="mr-2 w-4 h-4" />
                  Get Pro
                </Button>
              </Link>
            </div>
            <div>
              {renderChatList()}
            </div>
          </div>
        </>
        <div>
          <ProfileCard user={user} logout={logout} />
        </div>
      </div>
    </Drawer>
  );
};

export default ChatSideBar;
