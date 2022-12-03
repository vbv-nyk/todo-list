'use strict';

import init, { changeProject } from "./init";

export default function Project(name,count){
    let todo = {
        name:"Todo",
        desc:"Click To Edit The Description",
        deadline:"1/1/1",
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

    function loadTodos(){
        let cur = 1;
        while(workContainer.firstElementChild){
            workContainer.firstElementChild.remove();
        }
        for(let todo of todos){
            console.log(todo);
            const todoContainer = document.createElement("div");
            const todoName = document.createElement("div");
            todoName.textContent = `${cur}. ${todo.name}`;
            
            const todoDesc = document.createElement("div");
            todoDesc.textContent = `${todo.desc}`;

            const todoDeadline = document.createElement("div");
            todoDeadline.textContent = `${todo.deadline}`;

            const todoDone = document.createElement("input");
            todoDone.type = "checkbox";
            todoDone.value = false;

            todoContainer.append(todoName,todoDesc,todoDeadline,todoDone);
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