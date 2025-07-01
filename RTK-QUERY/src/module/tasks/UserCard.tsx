import { Button } from "@/components/ui/button";

import type { IUser } from "@/types";
import { Trash2 } from "lucide-react";


interface IUProps {
    user: IUser;
}

export default function UserCard({ user }: IUProps) {

    return (
        <div className="border px-5 py-3 rounded-md w-[450px] ">
            <div className="flex justify-between items-center">
                <div className="flex gap-2 items-center">
                    {/* clsx used here  */}
                    <h1 className="mb-2" >{user.name}</h1>

                </div>
                <div className="flex gap-3 items-center">
                    <Button variant="link" className="p-0 text-red-500">
                        <Trash2 />
                    </Button>
                </div>
            </div>
        </div >
    )
}