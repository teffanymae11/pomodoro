import React, { useState, useMemo, useCallback } from 'react';
import Modal from 'react-modal';
import ModalHeader from 'react-bootstrap/ModalHeader';
import ModalTitle from 'react-bootstrap/ModalTitle';
import ModalBody from 'react-bootstrap/ModalBody';
import { TaskVars } from '../dashboard/types';
import { Btn, Li, TextGroup, Heading3, Paragraph, BtnTodoBlock, BtnTodo, Ul } from '../styles';
import { useDispatch, useSelector } from 'react-redux';
import { addArchive, unfavoriteToDo, removeToDo } from '../../redux/actions'

const Favorite = () => {
  const todo: TaskVars[] = useSelector((state: any) => state.todoReducer)
  const dispatch = useDispatch();
  const favoriteBtn = require('../../images/favorite.png');
  const favoritetodoBtn = require('../../images/favorite-todo.png');
  const deleteBtn = require('../../images/delete-todo.png');

  const [show, setShow] = useState<boolean>(false);

  const onFavorite: (val: TaskVars) => void = useCallback(
    (val: TaskVars) => {
      dispatch(unfavoriteToDo(val))
    },
    [dispatch],
  )

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  const onRemove: (val: TaskVars) => void = useCallback(
    (val: TaskVars) => {
      const item = { title: val.title, notes: val.notes, favorite: val.favorite }
      dispatch(removeToDo(val))
      dispatch(addArchive(item))
    },
    [ dispatch],
  )

  const favoriteList = useMemo(() => {
    const favlist = todo.filter((todo: TaskVars) => todo.favorite === true)
    return (
      favlist.map((val: TaskVars, index: number) => {
        return (
          <Li key={index}>
            <TextGroup>
              <Heading3>{val.title}</Heading3>
              <Paragraph>{val.notes}</Paragraph>
            </TextGroup>

            <BtnTodoBlock>
              <BtnTodo src={favoritetodoBtn} data-testid="unfavorite" title="Unfavorite" onClick={() => onFavorite(val)} />
              <BtnTodo src={deleteBtn} data-testid="delete" title="Delete" onClick={() => onRemove(val)} />
            </BtnTodoBlock>
          </Li>
        )
      })
    )
  }, [todo, onFavorite, onRemove, deleteBtn, favoritetodoBtn])

  return (
    <>
      <Btn src={favoriteBtn} data-testid="favorite" title="Favorite" onClick={() => handleShow()} />

      <Modal isOpen={show} onRequestClose={handleClose} ariaHideApp={false}>
        <ModalHeader closeButton data-testid="close" onClick={handleClose}>
          <ModalTitle>Favorite</ModalTitle>
        </ModalHeader>

        <ModalBody>
          <Ul>
            {
              favoriteList
            }
          </Ul>
        </ModalBody>
      </Modal>
    </>
  );
}

export default Favorite;

