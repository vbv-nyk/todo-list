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
        const newTodoForm = document.createElement("div");

        const todoName = document.createElement("input");
        todoName.type = "text";
        todoName.placeholder = "Todo Name";

        const todoDesc = document.createElement("textarea");
        todoDesc.placeholder = "Enter Your Todo Description";
        todoDesc.rows = 1;

        const deadline = document.createElement("input");
        deadline.type = "date";

        

        const submitTodo = document.createElement("button");
        submitTodo.textContent = "Add";
        submitTodo.addEventListener("click",()=>{
            let todo = {
                name : todoName.value,
                desc : todoDesc.value,
                deadline : deadline.value,
            }
            projects[curCount].addTodo(todo);
        })
        newTodoForm.append(todoName,todoDesc,deadline,submitTodo);
        newTodoForm.classList.add("todo-item"); 
        newTodoForm.classList.add("todo-form-item");
        todoContainer.append(newTodoForm);
    }); 
} 

export function changeProject(e){
    curCount = e.target.dataset.count;
}