import { alarm } from "./alarm.js"
import { state } from "./state.js"
import { changeActiveBtn } from "./control.js"

let min = document.querySelector('.time__minutes')
let sec = document.querySelector('.time__seconds')

function showTime(seconds){
    min.textContent = Math.floor(seconds / 60) < 10 ? '0'+ Math.floor(seconds / 60) : Math.floor(seconds / 60)
    sec.textContent = seconds % 60 < 10 ? '0'+seconds % 60:seconds % 60
}

export const startTimer = () =>{
    state.timeLeft-= 1
    
    showTime(state.timeLeft)
    
    if(state.timeLeft > 0 && state.isActive){
        state.timerId = setTimeout(()=>{
            startTimer()
        },1000)
    }
    
    if(state.timeLeft <= 0){

        if(state.status === 'work'){
            state.activeTodo.pomodoro += 1
            if(state.activeTodo.pomodoro % state.count !== 0){
                state.status = 'break'
            }else{
                state.status = 'relax'
            }
        }else{
            state.status = 'work'
        }
        // alarm()
        state.timeLeft = state[state.status]
        changeActiveBtn(state.status)
        startTimer()
    }

}
export default showTime