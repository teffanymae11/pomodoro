import React, { useState, useCallback } from 'react';
import * as Yup from 'yup'
import { useFormikContext, Formik } from 'formik';
import Modal from 'react-modal';
import ModalHeader from 'react-bootstrap/ModalHeader';
import ModalTitle from 'react-bootstrap/ModalTitle';
import ModalBody from 'react-bootstrap/ModalBody';
import { CustomTimerVars } from './types';
import { CustomVars } from '../dashboard/types';
import { Btn, BtnImg } from '../styles';
import { useDispatch, useSelector } from 'react-redux';
import { updateCustom, changeCustom } from '../../redux/actions';

const CustomTimer: React.FC<CustomTimerVars> = ({
  setSeconds,
  activeTimer
}) => {
  const dispatch = useDispatch();
  const custom: CustomVars = useSelector((state: any) => state.customReducer)

  const [show, setShow] = useState<boolean>(false);
  const [updating, setUpdating] = useState<any>(null);
  const [time, setTime] = useState<CustomVars[]>([{ pomodoro: 25, short: 3, long: 15, longTrigger: 4 }])

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

  const onChange = (event: any) => {
    dispatch(changeCustom(event))
  };

  const onSubmit: (event: any) => void = useCallback(
    (event: any) => {
      event.preventDefault();

      if (updating !== null) {
        setTime((time: CustomVars[]) => time.filter((val: CustomVars) => {
          if (val === updating) {
            val.pomodoro = custom.pomodoro;
            val.short = custom.short;
            val.long = custom.long;
            val.longTrigger = custom.longTrigger;
          } return true;
        }))
      }

      setSeconds(() => {
        if (activeTimer === "pomodoro") {
          return Number(custom.pomodoro) * 60;
        } else if (activeTimer === "short") {
          return Number(custom.short) * 60;
        } else {
          return Number(custom.long) * 60;
        }
      })
      handleClose();
    },
    [activeTimer, custom.long, custom.longTrigger, custom.pomodoro, custom.short, updating, setSeconds],
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

      <Modal isOpen={show} onRequestClose={handleClose} ariaHideApp={false}>
        <ModalHeader closeButton onClick={handleClose}>
          <ModalTitle>Custom Timer</ModalTitle>
        </ModalHeader>

        <ModalBody>
          <form onSubmit={onSubmit}>
            <div className="from-group">
              <p>Pomodoro</p>
              <input type="number"
                className="form-control"
                name="pomodoro"
                min="0"
                value={Number(custom.pomodoro)}
                onChange={onChange} />
            </div>

            <div className="from-group">
              <p>Short Break</p>
              <input type="number"
                className="form-control"
                name="short"
                min="0"
                value={Number(custom.short)}
                onChange={onChange} />
            </div>

            <div className="from-group">
              <p>Long Break</p>
              <input type="number"
                className="form-control"
                name="long"
                min="0"
                value={Number(custom.long)}
                onChange={onChange} />
            </div>

            <div className="from-group">
              <p>Long Break Trigger</p>
              <input type="number"
                className="form-control"
                name="longTrigger"
                min="0"
                value={Number(custom.longTrigger)}
                onChange={onChange} />
            </div>
            {
              getButton()
            }
          </form>
        </ModalBody>
      </Modal>
    </>
  );
}

export default CustomTimer;

