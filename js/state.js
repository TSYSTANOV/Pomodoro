
const WORK_TIME = 25;
const BREAK_TIME = 5;
const RELAX_TIME = 20


export const state = {
    timeLeft: WORK_TIME * 60,
    isActive: false,
    timerId:0,
    work:WORK_TIME * 60,
    break:BREAK_TIME * 60,
    relax:RELAX_TIME * 60,
    status:'work',
    count:4
}