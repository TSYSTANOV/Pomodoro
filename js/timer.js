import { alarm } from "./alarm.js"
import { state } from "./state.js"
import { changeActiveBtn } from "./control.js"
import { getToDo } from "./todo.js"

let min = document.querySelector('.time__minutes')
let sec = document.querySelector('.time__seconds')
const countPomodoro = document.querySelector('.count_num')
console.log(document.querySelector('title'))
function showTime(seconds){
    min.textContent = Math.floor(seconds / 60) < 10 ? '0'+ Math.floor(seconds / 60) : Math.floor(seconds / 60)
    sec.textContent = seconds % 60 < 10 ? '0'+seconds % 60:seconds % 60
    document.querySelector('title').textContent =  min.textContent + ':' + sec.textContent
}

export const startTimer = () =>{
    // state.timeLeft-= 1
    // showTime(state.timeLeft)
    if(state.timeLeft > 0 && state.isActive){
        state.timerId = setInterval(()=>{
            // startTimer()
            state.timeLeft-= 1
            showTime(state.timeLeft)
        },1000)
    }
    
    if(state.timeLeft <= 0){

        if(state.status === 'work'){
            const list = getToDo()
            state.activeTodo.pomodoro += 1

            list.forEach((el)=>{
                if(el.id === state.activeTodo.id ){
                    el.pomodoro = state.activeTodo.pomodoro
                }
            })
            localStorage.setItem('pomodoro', JSON.stringify(list))
            
            countPomodoro.textContent = state.activeTodo ? state.activeTodo.pomodoro : '0' 

            console.log(list)
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