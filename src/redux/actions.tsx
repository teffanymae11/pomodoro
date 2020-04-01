import * as actionType from './strings'
import { TaskVars } from '../components/dashboard/types';

export const addArchive = (item: TaskVars) => {
  return {
    type: actionType.ADD_ARCHIVE,
    payload: item
  };
};

export const deleteArchive = (val: TaskVars) => {
  return {
    type: actionType.DELETE_ARCHIVE,
    payload: val
  };
};

export const taskList = () => {
  return {
    type: actionType.TASK_LIST
  };
};