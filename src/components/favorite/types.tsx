import { TaskVars } from "../dashboard/types";

export type FavoriteVars = {
  setToDo: React.Dispatch<React.SetStateAction<TaskVars[]>>
  todo: TaskVars[]
}