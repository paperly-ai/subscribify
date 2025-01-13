import { deleteDocument } from "@/api/document";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { removeDocument } from "@/features/documents/documentSlice";
import { Ellipsis, SquarePen, Trash } from "lucide-react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";

interface DropdownMenuDocProps {
  document_id: string;
}

export function DropdownMenuDoc(props: DropdownMenuDocProps) {
  const dispatch = useDispatch();

  const handleRemoveDocument = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    try {
      await deleteDocument(document_id);
      dispatch(removeDocument(document_id));
      toast.success("Document deleted successfully");
    } catch (error: any) {
      console.error("Error deleting document:", error);
      toast.error("Error deleting document");
    }
  };

  const { document_id } = props;
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Ellipsis />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-32">
        <DropdownMenuItem>
          <Button variant={null} className="w-full py-0 px-2 flex items-center justify-center gap-2">
            <SquarePen size={15} />
            Edit
          </Button>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Button variant={null} onClick={handleRemoveDocument} className="w-full flex py-0 items-center justify-center gap-2 text-red-700">
            <Trash size={15} />
            Delete
          </Button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
