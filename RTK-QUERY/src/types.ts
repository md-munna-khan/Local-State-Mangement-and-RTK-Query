export interface ITask{
    id:string,
        title:string,
        description:string,
        dueDate:Date,
        isCompleted:boolean,
        priority:"high"|"medium"|"low",
        AssignedTo:string|null
}
export interface IUser{
    id:string,
      name:string
}