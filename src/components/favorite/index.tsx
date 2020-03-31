import React, { useState, useMemo, useCallback } from 'react';
import Modal from 'react-modal';
import ModalHeader from 'react-bootstrap/ModalHeader';
import ModalTitle from 'react-bootstrap/ModalTitle';
import ModalBody from 'react-bootstrap/ModalBody';
import { FavoriteVars } from './types';
import { TaskVars } from '../dashboard/types';
import { Btn, Li, TextGroup, Heading3, Paragraph, BtnTodoBlock, BtnTodo, Ul } from '../styles';
import { useDispatch } from 'react-redux';
import { addArchive } from '../../redux/actions'

const Favorite: React.FC<FavoriteVars> = ({
  archive,
  setArchive,
  setToDo,
  todo
}) => {
  const dispatch = useDispatch();
  const favoriteBtn = require('../../images/favorite.png');
  const favoritetodoBtn = require('../../images/favorite-todo.png');
  const deleteBtn = require('../../images/delete-todo.png');

  const onFavorite: (val: TaskVars) => void = useCallback(
    (val: TaskVars) => {
      setToDo((todo: TaskVars[]) => {
        const taskedit = todo.filter((todo: TaskVars) => {
          if (todo === val) {
            todo.title = val.title;
            todo.notes = val.notes;
            todo.favorite = false;
          } return true;
        })

        localStorage.setItem("taskdata", JSON.stringify(taskedit));
        return taskedit
      })
    },
    [setToDo],
  )


  const [show, setShow] = useState<boolean>(false);

  const handleShow = () => {
    setShow(true);
  }

  const handleClose = () => {
    setShow(false);
  }

  const onRemove: (val: TaskVars) => void = useCallback(
    (val: TaskVars) => {
      setToDo((todo: TaskVars[]) => {
        localStorage.removeItem("taskdata");
        const removetask = todo.filter((task: TaskVars) => val.title !== task.title || val.notes !== task.notes || val.favorite !== task.favorite);
        localStorage.setItem("taskdata", JSON.stringify(removetask));
        return removetask
      })

      const item = { title: val.title, notes: val.notes, favorite: val.favorite }
      // setArchive([...archive, item])
      dispatch(addArchive(item))
      localStorage.setItem("archive", JSON.stringify([...archive, item]));
    },
    [archive, setToDo, dispatch],
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
              <BtnTodo src={favoritetodoBtn} title="Unfavorite" onClick={() => onFavorite(val)} />
              <BtnTodo src={deleteBtn} title="Delete" onClick={() => onRemove(val)} />
            </BtnTodoBlock>
          </Li>
        )
      })
    )
  }, [todo, onFavorite, onRemove, deleteBtn, favoritetodoBtn])

  return (
    <>
      <Btn src={favoriteBtn} title="Favorite" onClick={() => handleShow()} />

      <Modal isOpen={show} onRequestClose={handleClose} ariaHideApp={false}>
        <ModalHeader closeButton onClick={handleClose}>
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

