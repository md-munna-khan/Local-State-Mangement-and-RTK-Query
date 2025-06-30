import { Button } from "@/components/ui/button";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { addUser } from "@/redux/features/counter/task/userSlice";

import { useAppDispatch } from "@/redux/hook";
import type { IUser } from "@/types";

import { useForm, type FieldValues, type SubmitHandler } from "react-hook-form";

export default function AddUserModal() {
  const dispatch = useAppDispatch();
  const form = useForm();

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    dispatch(addUser(data as IUser));
  };

  return (
    <Dialog>
      <form>
        <DialogTrigger asChild>
          <Button>Add User</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogDescription className="sr-only">
            Fill up This user Form to add user
          </DialogDescription>
          {/* sr-only means only the screen reader can read but this will not be visible. */}
          <DialogHeader>
            <DialogTitle>Add Task</DialogTitle>
          </DialogHeader>
          {/* changed the form */}
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input {...field} value={field.value || ""} />
                    </FormControl>
                  </FormItem>
                )}
              />

              <DialogFooter className="mt-4 ">
                <Button type="submit" className="w-full ">
                  Save changes
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </form>
    </Dialog>
  );
}
