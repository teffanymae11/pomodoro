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

export const taskList = (item: any) => {
  return {
    type: actionType.TASK_LIST,
    payload: item
  };
};

export const filterToDo = (taskList: any) => {
  return {
    type: actionType.FILTER_TODO,
    payload: taskList
  };
};

export const addToDo = (newTask: any) => {
  return {
    type: actionType.ADD_TODO,
    payload: newTask
  }
}

export const updateToDo = (task: TaskVars, updating: any) => {
  return {
    type: actionType.UPDATE_TODO,
    payload: {
      task,
      updating
    }
  }
}

export const dragToDo = (items: TaskVars[]) => {
  return {
    type: actionType.DRAG_TODO,
    payload: items
  }
}

export const favoriteToDo = (val: TaskVars) => {
  return {
    type: actionType.FAVORITE_TODO,
    payload: val
  }
}

export const unfavoriteToDo = (val: TaskVars) => {
  return {
    type: actionType.UNFAVORITE_TODO,
    payload: val
  }
}

export const removeToDo = (val: TaskVars) => {
  return {
    type: actionType.REMOVE_TODO,
    payload: val
  }
}

export const addFavoriteToDo = (item: any) => {
  return {
    type: actionType.ADD_FAVORITE_TODO,
    payload: item
  }
}