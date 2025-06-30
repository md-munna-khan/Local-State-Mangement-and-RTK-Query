

import AddUserModal from "@/module/tasks/AddUserModal";

import UserCard from "@/module/tasks/UserCard";
import {
  selectFilter,
 
} from "@/redux/features/counter/task/taskSlice";
import { selectUser } from "@/redux/features/counter/task/userSlice";
import { useAppSelector } from "@/redux/hook";


export default function User() {
  const user = useAppSelector(selectUser);
  const filter = useAppSelector(selectFilter);
  // const dispatch = useDispatch()
  console.log(user);
  console.log(filter);
  return (
    <div>
      <h1>Tasks</h1>
      <div className="flex justify-center p-2">
     
        <AddUserModal/>
      </div>
      {user.map((user) => (
        <UserCard user={user} key={user.id} />
      ))}
    </div>
  );
}

