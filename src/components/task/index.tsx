import React, { useCallback } from 'react';
import { useHotkeys } from 'react-hotkeys-hook';

import { AddTaskVars } from './types'
import { TaskVars } from '../dashboard/types';
import { TextGroup, BtnTodo, BtnPlayBlock, BtnTodoBlock, Heading3, Paragraph } from '../styles';
import { useDispatch } from 'react-redux';
import { addArchive, taskList } from '../../redux/actions'
const Task = ({
  val,
  startTimer,
  resetTimer,
  handleShow,
  setUpdating,
  task,
  setTask,
  setToDo,
  setDraggedItem
}: AddTaskVars) => {
  const dispatch = useDispatch();
  const playtodoBtn = require('../../images/play-todo.png');
  // const favoriteBtn = require('../../images/favorite-todo.png');
  const unfavoriteBtn = require('../../images/unfavorite-todo.png');
  const editBtn = require('../../images/edit-todo.png');
  const deleteBtn = require('../../images/delete-todo.png');


  useHotkeys('ctrl+alt+s', () => onStart(val));

  const onStart = (val: TaskVars) => {
    const item = { title: val.title, notes: val.notes, favorite: val.favorite }
    // timerPomodoro()
    startTimer();
    // setTaskList(item);
    dispatch(taskList(item))
  }

  const onUpdate = (val: TaskVars) => {
    handleShow();
    setUpdating(val);
    
    setTask({ ...task, title: val.title, notes: val.notes, favorite: val.favorite })
  }

  const onFavorite: (val: TaskVars) => void = useCallback(
    () => {
      setToDo((todo: TaskVars[]) => {
        const taskedit = todo.filter((todo: TaskVars) => {
          if (todo === val) {
            todo.title = val.title;
            todo.notes = val.notes;
            todo.favorite = true;
          } return true;
        })

        localStorage.setItem("taskdata", JSON.stringify(taskedit));
        return taskedit
      })
    },
    [ setToDo, val],
  )

  const onRemove: (val: TaskVars) => void = useCallback(
    (val: TaskVars) => {
      setToDo((todo: TaskVars[]) => {
        localStorage.removeItem("taskdata");
        const removetask = todo.filter((todo: TaskVars) => todo !== val)
        localStorage.setItem("taskdata", JSON.stringify(removetask));
        return removetask
      })

      const item = { title: val.title, notes: val.notes, favorite: val.favorite }
      // setArchive([...archive, item])
      dispatch(addArchive(item))
      // localStorage.setItem("archive", JSON.stringify([...archive, item]));
      resetTimer()
    },
    [resetTimer, setToDo, dispatch],
  )

  const onDragStart = (val: TaskVars) => {
    setDraggedItem(val);
  };

  const onDragEnd = () => null;

  return (

    <div className="drag"
      draggable
      onDragStart={() => { onDragStart(val) }}
      onDragEnd={onDragEnd}
    >
      <BtnPlayBlock src={playtodoBtn} title="Start (Ctrl+Alt+S)" onClick={() => onStart(val)} />
      <TextGroup>
        <Heading3>{val.title}</Heading3>
        <Paragraph>{val.notes}</Paragraph>
      </TextGroup>

      <BtnTodoBlock>
        <BtnTodo title="Favorite" src={unfavoriteBtn} onClick={() => onFavorite(val)} />
        <BtnTodo title="Edit" src={editBtn} onClick={() => onUpdate(val)} />
        <BtnTodo title="Delete" src={deleteBtn} onClick={() => onRemove(val)} />
      </BtnTodoBlock>
    </div>

  );
};

export default Task;