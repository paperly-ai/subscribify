import ChatSideBar from "@/components/chatsidebar";
import { useAuth } from "@/hooks/useAuth";
import { Outlet } from "react-router-dom";


const ChatPage = () => {
  const { user, logout } = useAuth();

  return (
    <div className="flex max-h-screen overflow-scroll">
      <div className="flex w-full max-h-screen overflow-scroll">

        {/* chat sidebar */}
        <div className="md:w-80 max-h-screen">
          <ChatSideBar isPro={false} user={user} logout={logout} />
        </div>
        <Outlet />
      </div>
    </div>
  );
};

export default ChatPage;
