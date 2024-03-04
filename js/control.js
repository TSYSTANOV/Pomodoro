import { state } from "./state.js"
import { startTimer } from "./timer.js"
import showTime from "./timer.js"

const btnStart = document.querySelector('.control__btn_start')
const btnStop = document.querySelector('.control__btn_stop')
const navigationBtns = document.querySelectorAll('.navigation__btn')
Array.from(navigationBtns).forEach((el)=>{
    el.addEventListener('click',()=>{
        document.querySelector('.navigation__btn_active').classList.remove('navigation__btn_active')
        event.target.classList.add('navigation__btn_active')
        state.status = event.target.dataset.use
        clearTimeout(state.timerId)
        state.isActive = false
        btnStart.textContent = 'Старт'
        state.timeLeft = state[state.status]
        showTime(state.timeLeft)
    })
})

export function changeActiveBtn(dataUse){ 
    const btn = document.querySelector(`[data-use='${dataUse}']`)
    document.querySelector('.navigation__btn_active').classList.remove('navigation__btn_active')
    btn.classList.add('navigation__btn_active')
}


function stop(){
    console.log(state.timerId)
    clearTimeout(state.timerId)
    state.isActive = false
    btnStart.textContent = 'Старт'
    state.timeLeft = state.work
    showTime(state.timeLeft)
}

export const initControl = () =>{
    btnStart.addEventListener('click',()=>{
        
        if(state.isActive){
            clearTimeout(state.timerId)
            state.isActive = false
            btnStart.textContent = 'Старт'
        }else{
            state.isActive = true
            btnStart.textContent = 'Пауза'
            startTimer()
        }

    })

    btnStop.addEventListener('click', stop)
    showTime(state.timeLeft)
}


