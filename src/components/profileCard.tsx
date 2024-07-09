import { Button } from "@/components/ui/button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { IUser } from "@/hooks/useAuth";
import { LogOut } from "lucide-react"

type Props = {
  user: IUser | null;
  logout: () => void;
};

export const ProfileCard = ({ user, logout }: Props) => {

  return (
    <Popover>
      <PopoverTrigger asChild>
        <div className="flex items-center  border-t pt-2 hover:cursor-pointer select-none justify-center gap-3">
          <p className=" h-10 w-10 flex items-center bg-gray-800 text-white justify-center rounded-full border">
            {user?.userName[0]}
          </p>
          <div>
            <h2>{user?.userName}</h2>
            <p className="text-sm">{user?.userEmail}</p>
          </div>
        </div>

      </PopoverTrigger>
      <PopoverContent className="shadow-none border-none bg-none bg-transparent">
        <Button onClick={logout} className="w-full flex items-center justify-between" variant="destructive">
          <p>Log out</p><LogOut /></Button>
      </PopoverContent>
    </Popover>
  )
}
