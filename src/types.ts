export interface iTask{
    id:string,
        title:string,
        description:string,
        dueDate:Date,
        isCompleted:boolean,
        priority:"High"|"Medium"|"Low"
}