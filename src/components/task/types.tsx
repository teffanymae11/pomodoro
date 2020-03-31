import { TaskVars } from "../dashboard/types";

export type AddTaskVars = {
    val: TaskVars,
    startTimer: () => void,
    setTaskList: React.Dispatch<any>,
    resetTimer: () => void,
    archive:  TaskVars[],
    setArchive: React.Dispatch<React.SetStateAction<TaskVars[]>>,
    handleShow: () => void,
    setUpdating: React.Dispatch<any>,
    task: TaskVars,
    setTask: React.Dispatch<React.SetStateAction<TaskVars>>,
    setToDo: React.Dispatch<React.SetStateAction<TaskVars[]>>
    setDraggedItem: any
    todo: TaskVars[]
}