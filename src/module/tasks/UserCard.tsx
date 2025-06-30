import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

import { deleteUser } from "@/redux/features/counter/task/userSlice";
import { useAppDispatch } from "@/redux/hook";
import type { IUser } from "@/types";

import { Trash2 } from "lucide-react";

interface IProps {
  user: IUser;
}
// export default function TaskCard({ task }: IProps) {
export default function UserCard({ user }: IProps) {
  const dispatch = useAppDispatch();
  return (
    <div className="border px-5 py-3 rounded-md container ">
      <div className="flex justify-between items-center">
        <div className="flex gap-3 items-center">
          <h1>{user.name}</h1>
          <Button
            onClick={() => dispatch(deleteUser(user.id))}
            variant="link"
            className="p-0 text-red-500"
          >  
            <Trash2 /> 
          </Button>
          <Button variant="link" className="p-0 text-red-500"></Button>
          <Checkbox />
        </div>
      </div>
    </div>
  );
}
