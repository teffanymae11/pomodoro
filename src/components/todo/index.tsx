import React, { useEffect } from 'react';
import * as Yup from 'yup'
import { useFormikContext, Formik } from 'formik';
import Modal from 'react-modal';
import ModalHeader from 'react-bootstrap/ModalHeader';
import ModalTitle from 'react-bootstrap/ModalTitle';
import ModalBody from 'react-bootstrap/ModalBody';
import { TodoVars } from './types'
import { Btn, BtnImg } from '../styles';
import { useDispatch, useSelector } from 'react-redux';
import { updateToDo, addTask, addToDo } from '../../redux/actions';
import { TaskVars } from '../dashboard/types';

const Result = () => {
  const dispatch = useDispatch();
  const task: TaskVars = useSelector((state: any) => state.taskReducer)

  const { setValues } = useFormikContext<TaskVars>();

  useEffect(() => {
    if (task && task.title !== "") {
      setValues(task);
    }
  }, [dispatch, setValues, task])

  return null
};

const Todo: React.FC<TodoVars> = ({
  updating,
  todo,
  handleShow,
  handleClose,
  show
}) => {

  const dispatch = useDispatch();

  const initialValues: TaskVars | null = {
    title: '',
    notes: '',
    favorite: false
  }

  const validationSchema: Yup.ObjectSchema<TaskVars> = Yup.object().shape({
    title: Yup.string().required("Required"),
    notes: Yup.string().required("Required"),
    favorite: Yup.boolean().required("Required")
  });

  const addtodoBtn = require('../../images/add-todo.png');
  const saveBtn = require('../../images/save.png');
  const editBtn = require('../../images/edit.png');

  const onSubmit = (values: TaskVars, { resetForm }: any) => {
    const newTask = {
      title: values.title,
      notes: values.notes,
      favorite: values.favorite
    };

    if (updating == null) {
      dispatch(addToDo(newTask))
      localStorage.setItem("taskdata", JSON.stringify([...todo, newTask]));

    } else {
      dispatch(updateToDo(values, updating))
    }
    dispatch(addTask())
    resetForm();
    handleClose();
  };

  const getButton = () => {
    if (updating == null) {
      return (<button type="submit"><BtnImg data-testid="save" src={saveBtn} alt="" /></button>)

    } else {
      return (<button data-testid="edit" type="submit"><BtnImg src={editBtn} alt="" /></button>)
    }
  }

  return (
    <>
      <Btn src={addtodoBtn} data-testid="show" onClick={handleShow} />
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}>

        {formik => (
          <>
            <Modal isOpen={show} onRequestClose={handleClose} ariaHideApp={false}>
              <ModalHeader closeButton onClick={handleClose}>
                <ModalTitle>Task Manager</ModalTitle>
              </ModalHeader>

              <ModalBody>
                <div className="container">
                  <div className="row">
                    <div className="col-md-12">
                      <form onSubmit={formik.handleSubmit} onReset={formik.handleReset}>
                        <div className="from-group">
                          <input
                            type="text"
                            className="form-control"
                            name="title"
                            placeholder="Title"
                            value={formik.values.title}
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange} />
                          {formik.touched.title && formik.errors.title ? (
                            <div>{formik.errors.title}</div>
                          ) : null}
                        </div>

                        <div className="from-group">
                          <textarea
                            className="form-control"
                            name="notes"
                            placeholder="Notes"
                            value={formik.values.notes}
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange} />
                          {formik.touched.notes && formik.errors.notes ? (
                            <div>{formik.errors.notes}</div>
                          ) : null}
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

            <Result />
          </>
        )}
      </Formik>
    </>
  )
}

export default Todo