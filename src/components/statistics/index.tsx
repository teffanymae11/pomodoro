import React, { useState } from 'react';
import Modal from 'react-modal';
import ModalHeader from 'react-bootstrap/ModalHeader';
import ModalTitle from 'react-bootstrap/ModalTitle';
import ModalBody from 'react-bootstrap/ModalBody';
import { StatsVars } from './types';
import { Btn } from '../styles';

const Statistics: React.FC<StatsVars> = ({
  pomodoroStat,
  shortStat,
  longStat,
  skipStat,
  timeStat,
  cycleStat
}) => {

  const statsBtn = require('../../images/stat.png');

  const [show, setShow] = useState<boolean>(false);

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  return (
    <>
      <Btn src={statsBtn} data-testid="stat" title="Statistics" onClick={handleShow}/>

      <Modal isOpen={show} onRequestClose={handleClose} ariaHideApp={false}>
        <ModalHeader closeButton data-testid="close" onClick={handleClose}>
          <ModalTitle>Statistics</ModalTitle>
        </ModalHeader>

        <ModalBody>
          <div className="text-center">
            <p>{`Pomodoro: ${pomodoroStat}`}</p>
            <p>{`Short: ${shortStat}`}</p>
            <p>{`Long: ${longStat}`}</p>
            <p>{`Skipped: ${skipStat}`}</p>
            <p>{`Time Consumed: ${`${Math.floor(Number(timeStat) / 60)}:${(Number(timeStat) % 60).toString().padStart(2, "0")}`}`}</p>
            <p>{`Completed Pomodoro Cyle: ${cycleStat}`}</p>
          </div>
        </ModalBody>
      </Modal>
    </>
  )
}

export default Statistics;