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
    const workName = document.querySelector(".main-content .name");
    const workContainer = document.querySelector(".todo-container");
    const tabBar = document.querySelector(".tab-bar");
    const newTab = document.createElement("input");
    
    function addTodo(todo){
        todos.push(todo);
        loadTodos();  
    }   
    
    function removeTodo(e){
        todos.splice(e.target.dataset.pos,1);
        loadTodos();
        updateLocalStorage(todos);
    }

    function loadTodos(){
        let cur = 0;
        while(workContainer.firstElementChild){
            workContainer.firstElementChild.remove();
        }
        for(let todo of todos){
            const todoContainer = document.createElement("div");
            const todoName = document.createElement("input");
            todoName.value = `${todo.name}`;
            todoName.addEventListener("input",()=>{
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
            todoDesc.addEventListener("input",()=>{
                todo.desc = todoDesc.value;
                updateLocalStorage(todos);
            });

            const todoDeadline = document.createElement("input");
            todoDeadline.type = "date";
            todoDeadline.value = `${todo.deadline}`;
            todoDeadline.addEventListener("input",()=>{
                todo.deadline = todoDeadline.value;
                updateLocalStorage(todos);
            });

            const todoDone = document.createElement("input");
            todoDone.type = "checkbox";
            todoDone.checked = todo.done;
            todoDone.addEventListener("input",()=>{
                todo.done = todoDone.checked;
                updateLocalStorage(todos);
            });

            const removeButton = document.createElement("button");
            removeButton.textContent = "X";
            removeButton.style.padding = "0px";
            removeButton.style.border = "none";
            removeButton.style.color = "red";
            removeButton.style.fontWeight = "bolder";
            removeButton.setAttribute("data-pos",cur);
            removeButton.addEventListener("click",(e)=>{
                removeTodo(e);
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
        newTab.addEventListener("change",(e)=>{
            if(e.target.value){
                workName.textContent = e.target.value;
                updateLocalStorage();
            }
        });
        newTab.addEventListener("click",(e)=>{
            changeProject(e);
            loadTodos();
        });
       
        newTab.addEventListener("dblclick",()=>{
            newTab.remove();
            projects.splice(count,1);
            updateLocalStorage();
            location.reload();
        })
        tabBar.appendChild(newTab);
    })();

    function updateLocalStorage(){
        localStorage.setItem(`projects`,JSON.stringify(projects));
        // console.log(JSON.parse(localStorage.getItem(`projects`)));
    }

    return {addTodo,loadTodos,name,todos,updateLocalStorage,count};
}