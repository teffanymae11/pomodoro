import { CustomVars, TaskVars } from "../dashboard/types";

export type DisplayTimerVars = {
    custom: CustomVars
    startTimer: () => void
    pauseTimer: () => void
    resetTimer: () => void
    handleClick: () => void
    timerPomodoro: () => void
    timerShort: () => void
    timerLong: () => void
    seconds: Number
    setSeconds: React.Dispatch<React.SetStateAction<number>>
    activeTimer: String
    setAuto: React.Dispatch<React.SetStateAction<boolean>>
    autoButton: boolean
    setAutoButton: React.Dispatch<React.SetStateAction<boolean>>
    count: Number
    setCount: React.Dispatch<React.SetStateAction<Number>>
    skipStat: Number
    setSkipStat: React.Dispatch<React.SetStateAction<Number>>
    cycleStat: Number
    setCycleStat: React.Dispatch<React.SetStateAction<Number>>
    handleShow: () => void,
    handleClose: () => void,
    show: boolean,
    onSubmit: (event: any) => void,
    getButton: () => JSX.Element
}