import * as actionType from './strings'
import { TaskVars } from '../components/dashboard/types';

export const addArchive = (item: TaskVars) => {
    return {
      type: actionType.ADD_ARCHIVE,
      payload: item
    };
  };