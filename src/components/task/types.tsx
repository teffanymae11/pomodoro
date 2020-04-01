import { TaskVars } from "../dashboard/types";

export type AddTaskVars = {
    val: TaskVars,
    startTimer: () => void,
    resetTimer: () => void,
    handleShow: () => void,
    setUpdating: React.Dispatch<any>,
    task: TaskVars,
    setTask: React.Dispatch<React.SetStateAction<TaskVars>>,
    setDraggedItem: any
}