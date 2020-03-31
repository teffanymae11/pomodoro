import { TaskVars } from "../dashboard/types";

export type ArchiveVars = {
    todo: TaskVars[]
    setToDo: React.Dispatch<React.SetStateAction<TaskVars[]>>
}