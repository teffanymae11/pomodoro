import { TaskVars } from "../dashboard/types";

export type TodoVars = {
    task: TaskVars,
    setTask: React.Dispatch<React.SetStateAction<TaskVars>>,
    handleShow: () => void,
    handleClose: () => void,
    show: boolean,
    onSubmit: (event: any) => void,
    getButton: () => JSX.Element
}