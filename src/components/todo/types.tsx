import { TaskVars } from "../dashboard/types";

export type TodoVars = {
    handleShow: () => void,
    handleClose: () => void,
    show: boolean,
    onSubmit: (event: any) => void,
    getButton: () => JSX.Element
}