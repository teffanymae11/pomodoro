import React, { useState, useCallback, useMemo } from 'react';
import Modal from 'react-modal';
import ModalHeader from 'react-bootstrap/ModalHeader';
import ModalTitle from 'react-bootstrap/ModalTitle';
import ModalBody from 'react-bootstrap/ModalBody';
import { ArchiveVars } from './types';
import { TaskVars } from '../dashboard/types';
import { Btn, Li, TextGroup, Heading3, Paragraph, BtnTodoBlock, BtnTodo, Ul } from '../styles';
import { useSelector, useDispatch } from 'react-redux';
import { deleteArchive } from '../../redux/actions'

const Archive: React.FC<ArchiveVars> = ({
  todo,
  setToDo
}) => {
  const dispatch = useDispatch();
  const dataArchive:TaskVars[] = useSelector((state: any) => state.archiveReducer)
  const [show, setShow] = useState<boolean>(false);

  const archiveBtn = require('../../images/archive.png');
  const unfavoritetodoBtn = require('../../images/unfavorite-todo.png');
  const deleteBtn = require('../../images/delete-todo.png');

  // const getTaskData = () => {
  //   const getData = localStorage.getItem("archive");
  //   if (getData == null) return
  //   const finalData = JSON.parse(getData)
  //   setArchive(finalData)
  // }

  const onFavorite: (val: TaskVars) => void = useCallback(
    (val: TaskVars) => {
      const item = { title: val.title, notes: val.notes, favorite: val.favorite }

      setToDo([...todo, item])
      localStorage.setItem("taskdata", JSON.stringify([...todo, item]));

      // setArchive((arc: TaskVars[]) => {
      //   const archive = arc.filter((arc: TaskVars) => arc !== val)
      //   localStorage.setItem("archive", JSON.stringify(archive));
      //   return archive
      // })

      dispatch(deleteArchive(val))
    },
    [setToDo, todo, dispatch],
  )

  const handleShow = () => {
    setShow(true);
    // getTaskData();
  }

  const handleClose = () => {
    setShow(false);
  }

  const onRemove: (val: TaskVars) => void = useCallback(
    (val: TaskVars) => {
      // setArchive((arc: TaskVars[]) => {
      //   localStorage.removeItem("archive");
      //   return arc.filter((arc: TaskVars) => arc !== val)
      // })
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

