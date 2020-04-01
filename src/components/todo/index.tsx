import React from 'react';
import Modal from 'react-modal';
import ModalHeader from 'react-bootstrap/ModalHeader';
import ModalTitle from 'react-bootstrap/ModalTitle';
import ModalBody from 'react-bootstrap/ModalBody';
import { TodoVars } from './types'
import { Btn } from '../styles';
import { useDispatch, useSelector } from 'react-redux';
import { changeTask } from '../../redux/actions';
import { TaskVars } from '../dashboard/types';

const Todo: React.FC<TodoVars> = ({
  handleShow,
  handleClose,
  show,
  onSubmit,
  getButton

}) => {
  const dispatch = useDispatch();
  const task: TaskVars = useSelector((state: any) => state.taskReducer)

  const addtodoBtn = require('../../images/add-todo.png');

  const onChange = (event: any) => {
    dispatch(changeTask(event))
  };

  return (
    <>
      <Btn src={addtodoBtn} onClick={handleShow}/>
      <Modal isOpen={show} onRequestClose={handleClose} ariaHideApp={false}>
        <ModalHeader closeButton onClick={handleClose}>
          <ModalTitle>Task Manager</ModalTitle>
        </ModalHeader>

        <ModalBody>
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <form onSubmit={onSubmit}>
                  <div className="from-group">
                    <input type="text"
                      className="form-control"
                      name="title"
                      placeholder="Title"
                      value={task.title}
                      onChange={onChange} />
                  </div>

                  <div className="from-group">
                    <textarea
                      className="form-control"
                      name="notes"
                      placeholder="Notes"
                      value={task.notes}
                      onChange={onChange} />
                  </div>
                  {
                    getButton()
                  }
                </form>
              </div>
            </div>
          </div>
        </ModalBody>
      </Modal>
    </>
  )
}

export default Todo