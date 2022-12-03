'use strict';

import init, { changeProject, projects } from "./init";

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
    const newTab = document.createElement("input");

    function addTodo(todo){
        todos.push(todo);
        loadTodos();  
    }   
    
    function removeTodo(todoContainer,cur){
            todoContainer.remove();
            todos = todos.splice(cur,1);
            updateLocalStorage(todos);
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
                if(localStorage.getItem(`${name} ${todoName.value}`)){
                    alert("Can't have 2 todos with the same name");
                    todoName.value = todo.name;
                    updateLocalStorage(todos);
                }else if(todoName.value){
                    todo.name = todoName.value;
                    updateLocalStorage(todos);
                }else{
                    alert("Name cannot be empty");
                }
            })

            const todoDesc = document.createElement("input");
            todoDesc.value = `${todo.desc}`;
            todoDesc.placeholder = `Click to Enter a description`;  
            todoDesc.addEventListener("change",()=>{
                todo.desc = todoDesc.value;
                updateLocalStorage(todos);
            });

            const todoDeadline = document.createElement("input");
            todoDeadline.type = "date";
            todoDeadline.value = `${todo.deadline}`;
            todoDeadline.addEventListener("change",()=>{
                todo.deadline = todoDeadline.value;
                updateLocalStorage(todos);
            });

            const todoDone = document.createElement("input");
            todoDone.type = "checkbox";
            todoDone.checked = todo.done;
            todoDone.addEventListener("change",()=>{
                todo.done = todoDone.checked;
                updateLocalStorage(todos);
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
        updateLocalStorage(todos);
    }
    const loadProject = (function (){
        newTab.value = name;
        newTab.classList.add("tab-item");
        newTab.setAttribute("data-count",count);
        newTab.addEventListener("click",(e)=>{
            changeProject(e);
            loadTodos();
        });
        newTab.addEventListener("change",()=>{
        });
        tabBar.appendChild(newTab);
    })();

    function updateLocalStorage(){
        localStorage.setItem(`projects`,JSON.stringify(projects));
        console.table(JSON.parse(localStorage.getItem(`projects`)));
    }

    return {addTodo,loadTodos,name,todos};
}