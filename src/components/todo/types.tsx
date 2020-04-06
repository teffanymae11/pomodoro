import { TaskVars } from "../dashboard/types";

export type TodoVars = {
    updating: any
    todo: TaskVars[]
    handleShow: () => void,
    handleClose: () => void,
    show: boolean
}