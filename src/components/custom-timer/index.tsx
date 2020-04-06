import React, { useState, useCallback } from 'react';
import { Formik } from 'formik';
import Modal from 'react-modal';
import ModalHeader from 'react-bootstrap/ModalHeader';
import ModalTitle from 'react-bootstrap/ModalTitle';
import ModalBody from 'react-bootstrap/ModalBody';
import { CustomTimerVars } from './types';
import { CustomVars } from '../dashboard/types';
import { Btn, BtnImg } from '../styles';
import { useDispatch } from 'react-redux';
import { updateCustom, changeCustom } from '../../redux/actions';

const CustomTimer: React.FC<CustomTimerVars> = ({
  setSeconds,
  activeTimer
}) => {
  const dispatch = useDispatch();

  const initialValues: CustomVars = {
    pomodoro: 25,
    short: 3,
    long: 15,
    longTrigger: 4
  }

  const [show, setShow] = useState<boolean>(false);
  const [updating, setUpdating] = useState<any>(null);
  const [time, setTime] = useState<CustomVars[]>([initialValues])

  const customBtn = require('../../images/custom.png');
  const saveBtn = require('../../images/save.png');

  const onUpdate: (val: CustomVars) => void = useCallback(
    (val: CustomVars) => {
      handleShow();
      setUpdating(val);
      dispatch(updateCustom(val))
    },
    [dispatch],
  )

  const onSubmit: (values: CustomVars) => void = useCallback(
    (values: CustomVars) => {

      if (updating !== null) {
        setTime((time: CustomVars[]) => time.filter((val: CustomVars) => {
          if (val === updating) {
            val.pomodoro = values.pomodoro;
            val.short = values.short;
            val.long = values.long;
            val.longTrigger = values.longTrigger;

            dispatch(changeCustom(values))
          } return true;
        }))
      }

      setSeconds(() => {
        if (activeTimer === "pomodoro") {
          return Number(values.pomodoro) * 60;
        } else if (activeTimer === "short") {
          return Number(values.short) * 60;
        } else {
          return Number(values.long) * 60;
        }
      })
      handleClose();
    },
    [activeTimer, updating, setTime, setSeconds, dispatch],
  )

  const getButton = () => {
    if (updating !== null) {
      return (<button type="submit"><BtnImg src={saveBtn} alt="" /></button>)
    }
  }

  const handleShow = () => setShow(true);

  const handleClose = () => {
    setShow(false);
    setUpdating(null);
  }

  return (
    <>
      {
        time.map((val: CustomVars, index: number) => (
          <Btn src={customBtn} title="Custom Timer" key={index} onClick={() => onUpdate(val)} />
        ))
      }

      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}>

        {formik => (
          <Modal isOpen={show} onRequestClose={handleClose} ariaHideApp={false}>
            <ModalHeader closeButton onClick={handleClose}>
              <ModalTitle>Custom Timer</ModalTitle>
            </ModalHeader>

            <ModalBody>
              <form onSubmit={formik.handleSubmit} onReset={formik.handleReset}>
                <div className="from-group">
                  <p>Pomodoro</p>
                  <input
                    type="number"
                    className="form-control"
                    name="pomodoro"
                    min="0"
                    value={Number(formik.values.pomodoro)}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange} />
                  {formik.touched.pomodoro && formik.errors.pomodoro ? (
                    <div>{formik.errors.pomodoro}</div>
                  ) : null}
                </div>

                <div className="from-group">
                  <p>Short Break</p>
                  <input
                    type="number"
                    className="form-control"
                    name="short"
                    min="0"
                    value={Number(formik.values.short)}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange} />
                  {formik.touched.short && formik.errors.short ? (
                    <div>{formik.errors.short}</div>
                  ) : null}
                </div>

                <div className="from-group">
                  <p>Long Break</p>
                  <input
                    type="number"
                    className="form-control"
                    name="long"
                    min="0"
                    value={Number(formik.values.long)}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange} />
                  {formik.touched.long && formik.errors.long ? (
                    <div>{formik.errors.long}</div>
                  ) : null}
                </div>

                <div className="from-group">
                  <p>Long Break Trigger</p>
                  <input
                    type="number"
                    className="form-control"
                    name="longTrigger"
                    min="0"
                    value={Number(formik.values.longTrigger)}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange} />
                  {formik.touched.longTrigger && formik.errors.longTrigger ? (
                    <div>{formik.errors.longTrigger}</div>
                  ) : null}
                </div>
                {
                  getButton()
                }
              </form>
            </ModalBody>
          </Modal>
        )}
      </Formik>
    </>
  );
}

export default CustomTimer;

