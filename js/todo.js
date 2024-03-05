import stop from "./control.js"
import { state } from "./state.js"
import { changeActiveBtn } from "./control.js"
import showTime from "./timer.js"

const titleElem = document.querySelector('.title')
const countPomodoro = document.querySelector('.count_num')
const toDoListElem = document.querySelector('.todo__list')
let liAddToDo = document.createElement('li')
liAddToDo.className = 'todo__item'
let btnAddToDo = document.createElement('button')
btnAddToDo.textContent = 'Добавить задачу'
btnAddToDo.className = 'todo__add'
btnAddToDo.addEventListener('click', ()=>{
    let title = prompt('Введите задачу')
    if(!title){
        return
    }
    addToDoElement(title)
    
})
liAddToDo.append(btnAddToDo)
toDoListElem.textContent = ''
toDoListElem.append(liAddToDo)

export const getToDo = () =>{
    const toDoList = JSON.parse(localStorage.getItem('pomodoro') || '[]')
    return toDoList

}

function addToDoElement(title){

    const todo = {
        title,
        pomodoro:0,
        id:Math.random().toString(16).substring(2,8)
    }

    const list = getToDo()
    list.push(todo)
    localStorage.setItem('pomodoro', JSON.stringify(list))
    renderToDoList(list)
    showToDo()
}







function renderToDoList(list){
    toDoListElem.textContent = ''
    list.forEach((el, index, arr)=>{

  
            let li = document.createElement('li')
            li.dataset.Id = el.id

            li.className = 'todo__item'
            let toDoBtnEdit = document.createElement('button')
            toDoBtnEdit.setAttribute('aria-label', "Редактировать")
            toDoBtnEdit.className = 'todo__edit'
            toDoBtnEdit.addEventListener('click', ()=>{
                let title = prompt('Измените задачу: ' + el.title)
                if(!title){
                    return
                }
                toDoActiveBtn.textContent = title
                changeLocalStorage(el.id,title)
                showToDo()
            })

            let toDoBtnDel = document.createElement('button')
            toDoBtnDel.setAttribute('aria-label','Удалить')
            toDoBtnDel.className = 'todo__del'
            toDoBtnDel.addEventListener('click',()=>{
                li.remove()
                delLocalStorage(el.id)
                showToDo()
            })

            let toDoActiveBtn = document.createElement('button')
            toDoActiveBtn.className = 'todo__btn'
            toDoActiveBtn.textContent = el.title
            toDoActiveBtn.addEventListener('click',()=>{
                stop()
                state.status = 'work'
                state.timeLeft = state[state.status]
                showTime(state.timeLeft)
                changeActiveBtn(state.status)
                // state.activeTodo = list[index]
                showToDo(index)
            })

            li.innerHTML = `
          <div class="todo__item-wrapper">
          </div>
            `
            li.querySelector('.todo__item-wrapper').append(toDoActiveBtn,toDoBtnEdit, toDoBtnDel)

            toDoListElem.prepend(li)
        

    })
    toDoListElem.append(liAddToDo)
    const toDoList = getToDo()    
    state.activeTodo = toDoList[0]
    
}
function changeLocalStorage(id,title){
    const toDoList = getToDo()
    let count = null
    toDoList.forEach((el ,index)=>{
        if(el.id === id){
            toDoList[index].title = title
        }
    })
    localStorage.setItem('pomodoro', JSON.stringify(toDoList))
}
function delLocalStorage(id){
    const toDoList = getToDo()
    let count = null
    toDoList.forEach((el ,index)=>{
        if(el.id === id){
            count = index
        }
    })
    toDoList.splice(count,1)
    localStorage.setItem('pomodoro', JSON.stringify(toDoList))
}

function showToDo(index = 0){
    const toDoList = getToDo()    
    state.activeTodo = toDoList[index]
    titleElem.textContent = state.activeTodo ? state.activeTodo.title : 'Pomodoro'
    countPomodoro.textContent = state.activeTodo ? state.activeTodo.pomodoro : '0' 
}



export const initToDo = () =>{
    const toDoList = getToDo()      
    showToDo()
    renderToDoList(toDoList)
    
}