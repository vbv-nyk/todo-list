'use strict';

import init, { changeProject } from "./init";

export default function Project(name,count){
    let todos = ['Todo'];
    const workName = document.querySelector(".work-name");
    const workContainer = document.querySelector(".work-container");
    const tabBar = document.querySelector(".tab-bar");
    const newTab = document.createElement("div");

    function addTodo(todoName){
        todos.push(todoName); 
        loadTodos();  
    }   

    function loadTodos(){
        let cur = 1;
        while(workContainer.firstElementChild){
            workContainer.firstElementChild.remove();
        }
        for(let todoName of todos){
            const todo = document.createElement("div");
            todo.textContent = `${todoName} ${cur}`;
            workContainer.appendChild(todo);
            todo.classList.add("todo-item");
            cur++;
        }
    }
    const loadProject = (function (){
        workName.textContent = name;
        newTab.textContent = name;
        newTab.classList.add("tab-item");
        newTab.setAttribute("data-count",count);
        newTab.addEventListener("click",(e)=>{
            changeProject(e);
            workName.textContent = name;
            loadTodos();
        })
        tabBar.appendChild(newTab);
    })();

    return {addTodo,loadTodos,name};
}