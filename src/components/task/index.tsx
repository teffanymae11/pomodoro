import React, { useCallback } from 'react';
import { useHotkeys } from 'react-hotkeys-hook';

import { AddTaskVars } from './types'
import { TaskVars } from '../dashboard/types';
import { TextGroup, BtnTodo, BtnPlayBlock, BtnTodoBlock, Heading3, Paragraph } from '../styles';
import { useDispatch } from 'react-redux';
import { addArchive, taskList, favoriteToDo, removeToDo, updateTask } from '../../redux/actions'

const Task: React.FC<AddTaskVars> = ({
  val,
  startTimer,
  resetTimer,
  handleShow,
  setUpdating,
  setDraggedItem
}) => {
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
    dispatch(taskList(item))
  }

  const onUpdate = (val: TaskVars) => {
    handleShow();
    setUpdating(val);
    dispatch(updateTask(val))
  }

  const onFavorite: (val: TaskVars) => void = useCallback(
    () => {
      dispatch(favoriteToDo(val))
    },
    [dispatch, val],
  )

  const onRemove: (val: TaskVars) => void = useCallback(
    (val: TaskVars) => {
      const item = { title: val.title, notes: val.notes, favorite: val.favorite }
      dispatch(removeToDo(val))
      dispatch(addArchive(item))
      resetTimer()
    },
    [resetTimer, dispatch],
  )

  const onDragStart = (val: TaskVars) =>  setDraggedItem(val);

  const onDragEnd = () => null;

  return (
      <div
        draggable
        onDragStart={() => { onDragStart(val) }}
        onDragEnd={onDragEnd}
      >
        <BtnPlayBlock src={playtodoBtn} data-testid="start" title="Start (Ctrl+Alt+S)" onClick={() => onStart(val)} />
        <TextGroup>
          <Heading3>{val.title}</Heading3>
          <Paragraph>{val.notes}</Paragraph>
        </TextGroup>

        <BtnTodoBlock>
          <BtnTodo data-testid="favorite" title="Favorite" src={unfavoriteBtn} onClick={() => onFavorite(val)} />
          <BtnTodo data-testid="edit" title="Edit" src={editBtn} onClick={() => onUpdate(val)} />
          <BtnTodo data-testid="delete" title="Delete" src={deleteBtn} onClick={() => onRemove(val)} />
        </BtnTodoBlock>
      </div>
  );
};

export default Task;