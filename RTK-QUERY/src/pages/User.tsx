import AddUserModal from "@/module/tasks/AddUserModal";






export default function User() {

    return (
        <div className="mx-auto max-w-7xl px-5 mt-20">
            <div className="flex justify-end items-center">
                <h1 className="mr-auto">Users</h1>
                <AddUserModal />
            </div>

            <div className="flex justify-start items-center gap-4">

            </div>

        </div>
    )
}