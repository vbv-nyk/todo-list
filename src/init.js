import Project from "./newProject";
let curCount = 0;

export default function init(){
    const addTab = document.querySelector(".add-tab");
    const addTodo = document.querySelector(".add-todo");
    const todoContainer = document.querySelector(".todo-container");
    let count = 0;
    let project = new Project("Project 1",0);
    let projects = [];
    projects[0] = project;
    project.loadTodos();
    addTab.addEventListener("click",()=>{
        count++;
        project = new Project(`Project ${count + 1}`,count);
        projects[count] = project; 
        projects[count].loadTodos();
        curCount = count;
    });    
    addTodo.addEventListener("click",()=>{
        const todoName = document.createElement("input");
        const newTodoForm = document.createElement("div");
        todoName.type = "text";
        todoName.value = "Todo Name";
        const todoDesc = document.createElement("textarea");
        todoDesc.value = "Enter Your Todo Description";
        todoDesc.rows = 1;
        const deadline = document.createElement("input");
        deadline.type = "date";
        const submitTodo = document.createElement("button");
        submitTodo.textContent = "Add";
        newTodoForm.append(todoName,todoDesc,deadline,submitTodo);
        newTodoForm.classList.add("todo-item");
        newTodoForm.classList.add("todo-form-item");
        todoContainer.append(newTodoForm);
    }); 
} 

export function changeProject(e){
    curCount = e.target.dataset.count;
}