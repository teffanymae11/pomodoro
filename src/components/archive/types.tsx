import { TaskVars } from "../dashboard/types";

export type ArchiveVars = {
    archive: TaskVars[]
    setArchive: React.Dispatch<React.SetStateAction<TaskVars[]>>,
    todo: TaskVars[]
    setToDo: React.Dispatch<React.SetStateAction<TaskVars[]>>
}