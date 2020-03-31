import { TaskVars } from "../dashboard/types";

export type FavoriteVars = {
  archive: TaskVars[],
  setArchive: React.Dispatch<React.SetStateAction<TaskVars[]>>,
  setToDo: React.Dispatch<React.SetStateAction<TaskVars[]>>
  todo: TaskVars[]
}