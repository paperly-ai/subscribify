import { deleteDocument } from "@/api/document";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Ellipsis, SquarePen, Trash } from "lucide-react";

interface DropdownMenuDocProps {
  document_id: string;
}

export function DropdownMenuDoc(props: DropdownMenuDocProps) {
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
          <Button variant={null} onClick={() => deleteDocument(document_id)} className="w-full flex py-0 items-center justify-center gap-2 text-red-700">
            <Trash size={15} />
            Delete
          </Button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
