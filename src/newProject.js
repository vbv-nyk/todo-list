'use strict';

import init, { changeProject } from "./init";

export default function Project(name,count){
    let todo = {
        name:"Todo 1",
        desc:"",
        deadline:"",
        done:false,
    }
    let todos = [todo];
    const workName = document.querySelector(".work-name");
    const workContainer = document.querySelector(".todo-container");
    const tabBar = document.querySelector(".tab-bar");
    const newTab = document.createElement("div");

    function addTodo(todo){
        todos.push(todo);
        loadTodos();  
    }   
    
    function removeTodo(todoContainer,cur){
            todoContainer.remove();
            todos = todos.splice(cur,1);
    }

    function loadTodos(){
        while(workContainer.firstElementChild){
            workContainer.firstElementChild.remove();
        }
        for(let todo of todos){
            let cur = 0;
            const todoContainer = document.createElement("div");
            const todoName = document.createElement("input");
            todoName.value = `${todo.name}`;
            todoName.addEventListener("change",()=>{
                if(todoName.value){
                    todo.name = todoName.value;
                }else{
                    alert("Name cannot be empty");
                }
            })

            const todoDesc = document.createElement("input");
            todoDesc.value = `${todo.desc}`;
            todoDesc.placeholder = `Click to Enter a description`;  
            todoDesc.addEventListener("change",()=>{
                todo.desc = todoDesc.value;
            });

            const todoDeadline = document.createElement("input");
            todoDeadline.type = "date";
            todoDeadline.value = `${todo.deadline}`;
            todoDeadline.addEventListener("change",()=>{
                todo.deadline = todoDeadline.value;
            });

            const todoDone = document.createElement("input");
            todoDone.type = "checkbox";
            todoDone.checked = todo.done;
            todoDone.addEventListener("change",()=>{
                todo.done = todoDone.checked;
            });

            const removeButton = document.createElement("button");
            removeButton.textContent = "X";
            removeButton.style.padding = "0px";
            removeButton.style.border = "none";
            removeButton.style.color = "red";
            removeButton.style.fontWeight = "bolder";
            removeButton.addEventListener("click",()=>{
                removeTodo(todoContainer,cur);
            })

            todoContainer.append(todoName,todoDesc,todoDeadline,todoDone,removeButton);
            workContainer.append(todoContainer);
            todoContainer.classList.add("todo-item");
            cur++;
        }
    }
    const loadProject = (function (){
        newTab.textContent = name;
        newTab.classList.add("tab-item");
        newTab.setAttribute("data-count",count);
        newTab.addEventListener("click",(e)=>{
            changeProject(e);
            loadTodos();
        })
        tabBar.appendChild(newTab);
    })();

    return {addTodo,loadTodos,name};
}