import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form"
import { Input } from "@/components/ui/input"



import { useForm, type FieldValues, type SubmitHandler } from "react-hook-form"

export default function AddUserModal() {
    // this connects with the hook form 
    const form = useForm()



    // 
    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        console.log(data)
    }

    return (
        <Dialog>
            <form>
                <DialogTrigger asChild>
                    <Button >Add User</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogDescription className="sr-only">Fill up This task Form to add task</DialogDescription>
                    {/* sr-only means only the screen reader can read but this will not be visible. */}
                    <DialogHeader>
                        <DialogTitle>Add User</DialogTitle>
                    </DialogHeader>
                    {/* changed the form */}
                    <Form {...form}>
                        {/* form.handleSubmit → used to handle form submission */}
                        <form onSubmit={form.handleSubmit(onSubmit)}>
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Name</FormLabel>
                                        <FormControl>
                                            <Input  {...field} value={field.value || ""} />
                                            {/* Input: the actual input box. value={field.value || ""} ensures it’s never undefined. */}
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                            <DialogFooter className="mt-4 ">
                                <Button type="submit" className="w-full ">Save changes</Button>
                            </DialogFooter>
                        </form>


                    </Form>
                </DialogContent>
            </form>
        </Dialog>
    )
}