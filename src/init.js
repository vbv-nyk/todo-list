import Project from "./ProjectFactory";
let curCount = 0;
let projects = [];
const addTodo = document.querySelector(".add-todo");
const mainContentName = document.querySelector(".main-content .name");

export default function init(){
    const addTab = document.querySelector(".add-tab");
    const todoContainer = document.querySelector(".todo-container");
    let count = 0;
    let project = new Project("Project 1",count);
    projects[count] = project;
    mainContentName.textContent = projects[count].name;
    project.loadTodos();
    addTab.addEventListener("click",()=>{
        count++;
        project = new Project(`Project ${count + 1}`,count);
        projects[count] = project; 
        curCount = count;
    });    

    addTodo.addEventListener("click",()=>{
        addTodo.style.display = "none";

        const newTodoForm = document.createElement("div");
        const todoName = document.createElement("input");
        todoName.type = "text";
        todoName.placeholder = "Todo Name";

        const todoDesc = document.createElement("textarea");
        todoDesc.placeholder = "Enter Your Todo Description";
        todoDesc.rows = 1;

        const todoDeadline = document.createElement("input");
        todoDeadline.type = "date";

        const submitTodo = document.createElement("button");
        submitTodo.textContent = "Add";
        submitTodo.addEventListener("click",()=>{
            let todo = {
                name : todoName.value,
                desc : todoDesc.value,
                deadline : todoDeadline.value,
            }
            if(localStorage.getItem(`${projects[curCount].name} ${todo.name}`)){
                alert("Can't have 2 todos with the same name");
                todoName.value = "";
            }else if(todo.name){
                projects[curCount].addTodo(todo);
                addTodo.style.display = "block";
            }else{
                alert("Name cannot be empty");
            }
        })
        newTodoForm.append(todoName,todoDesc,todoDeadline,submitTodo);
        newTodoForm.classList.add("todo-item"); 
        newTodoForm.classList.add("todo-form-item");
        todoContainer.append(newTodoForm);
    }); 
} 

export function changeProject(e){
    curCount = e.target.dataset.count;
    mainContentName.textContent = projects[curCount].name;
    addTodo.style.display = "block";
}
