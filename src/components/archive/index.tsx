import React, { useState, useCallback, useMemo } from 'react';
import Modal from 'react-modal';
import ModalHeader from 'react-bootstrap/ModalHeader';
import ModalTitle from 'react-bootstrap/ModalTitle';
import ModalBody from 'react-bootstrap/ModalBody';
import { TaskVars } from '../dashboard/types';
import { Btn, Li, TextGroup, Heading3, Paragraph, BtnTodoBlock, BtnTodo, Ul } from '../styles';
import { useSelector, useDispatch } from 'react-redux';
import { deleteArchive, addFavoriteToDo } from '../../redux/actions'

const Archive = () => {
  const dispatch = useDispatch();
  const dataArchive: TaskVars[] = useSelector((state: any) => state.archiveReducer)
  const [show, setShow] = useState<boolean>(false);

  const archiveBtn = require('../../images/archive.png');
  const unfavoritetodoBtn = require('../../images/unfavorite-todo.png');
  const deleteBtn = require('../../images/delete-todo.png');

  const onFavorite: (val: TaskVars) => void = useCallback(
    (val: TaskVars) => {
      const item = { title: val.title, notes: val.notes, favorite: val.favorite }
      dispatch(addFavoriteToDo(item))
      dispatch(deleteArchive(val))
    },
    [dispatch],
  )

  const handleShow = () => {
    setShow(true);
  }

  const handleClose = () => {
    setShow(false);
  }

  const onRemove: (val: TaskVars) => void = useCallback(
    (val: TaskVars) => {
      dispatch(deleteArchive(val))
    },
    [dispatch],
  )

  const archiveList = useMemo(() => {
    return (
      dataArchive.map((val: TaskVars, index: number) => {
        return (
          <Li key={index}>
            <TextGroup>
              <Heading3>{val.title}</Heading3>
              <Paragraph>{val.notes}</Paragraph>
            </TextGroup>

            <BtnTodoBlock>
              <BtnTodo src={unfavoritetodoBtn} title="Favorite" onClick={() => onFavorite(val)} />
              <BtnTodo src={deleteBtn} title="Delete" onClick={() => onRemove(val)} />
            </BtnTodoBlock>
          </Li>
        )
      })
    )
  }, [onFavorite, onRemove, deleteBtn, unfavoritetodoBtn, dataArchive])

  return (
    <>
      <Btn src={archiveBtn} title="Archive" onClick={() => handleShow()} />

      <Modal isOpen={show} onRequestClose={handleClose} ariaHideApp={false}>
        <ModalHeader closeButton onClick={handleClose}>
          <ModalTitle>Archive</ModalTitle>
        </ModalHeader>

        <ModalBody>
          <Ul>
            {
              archiveList
            }
          </Ul>

        </ModalBody>
      </Modal>
    </>
  );
}

export default Archive;

