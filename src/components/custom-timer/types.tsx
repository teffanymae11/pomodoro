import { CustomVars} from "../dashboard/types";

export type CustomTimerVars = {
    custom: CustomVars,
    setCustom: React.Dispatch<React.SetStateAction<CustomVars>>,
    setSeconds: React.Dispatch<React.SetStateAction<number>>,
    activeTimer: string
}