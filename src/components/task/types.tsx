import { TaskVars } from "../dashboard/types";

export type AddTaskVars = {
    val: TaskVars,
    startTimer: () => void,
    resetTimer: () => void,
    handleShow: () => void,
    setUpdating: React.Dispatch<any>,
    setDraggedItem: any
}