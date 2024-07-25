import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "./ui/button";
import { Loader, Send } from "lucide-react";
import MessageList from "./MessageList";
import { getConversationByPdfId, queryDocument } from "@/api/queryDoc";
import { Message } from "@/constants/constants";

type Props = { document_id: string };

const ChatComponent = ({ document_id }: Props) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInput(event.target.value);
  };

  useEffect(() => {
    const fetchConversation = async () => {
      try {
        setIsLoading(true);
        const result = await getConversationByPdfId(document_id);
        setMessages(result.messages);
      } catch (error) {
        console.error('Error fetching conversation:', error);
      }
      finally {
        setIsLoading(false);
      }
    };

    fetchConversation();
  }, [document_id]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!input.trim()) return;

    const newMessage = { id: String(messages.length + 1), sender: "user", content: input };
    const updatedMessages = [...messages, newMessage];
    setMessages(updatedMessages);
    setInput("");

    try {
      setLoading(true);
      let assistMessage = { id: String(new Date()), sender: "assistant", content: "" };
      await queryDocument(document_id, input, (response, error) => {

        if (error) {
          console.error(error); ``
          return;
        }

        if (loading) {
          setLoading(false);
        }
        assistMessage.content += response;
        setMessages(prevMessages => {
          const index = prevMessages.findIndex(msg => msg.id === assistMessage.id);

          if (index !== -1) {
            const updatedMessages = [...prevMessages];
            updatedMessages[index] = assistMessage;
            return updatedMessages;
          } else {
            return [...prevMessages, assistMessage];
          }
        });
      });
    } catch (error) {
      console.error("Error sending message:", error);
    } finally {
      setLoading(false);
    }
  };



  return (
    <div className="relative h-full overflow-scroll">
      {/* header */}
      <div className="sticky top-0 hidden lg:block inset-x-0 p-2 bg-white h-[10vh] ">
        <h3 className="text-lg fixed inset-x-0 top-4 md:relative text-center md:text-start font-semibold">Chat</h3>
      </div>

      {/* message list */}
      <MessageList messages={messages} isLoading={isLoading} loading={loading} />

      <form onSubmit={handleSubmit} className="absolute bottom-0 inset-x-0 px-2 py-4 bg-white">
        <div className="flex items-center">
          <Input
            value={input}
            onChange={handleInputChange}
            placeholder="Ask any question..."
            className="w-full focus:outline-none"
          />
          <Button className="bg-gray-900 ml-2" type="submit" disabled={loading || isLoading}>
            {loading ? <Loader className="animate-spin h-4 w-4" /> : <Send className="h-4 w-4" />}
          </Button>
        </div>
      </form>
    </div >
  );
};

export default ChatComponent;
