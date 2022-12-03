import Project from "./ProjectFactory";
let curCount = 0;
export let projects = {};
const addTodo = document.querySelector(".add-todo");
const mainContentName = document.querySelector(".main-content .name");

export default function init(){
    const addTab = document.querySelector(".add-tab");
    const todoContainer = document.querySelector(".todo-container");
    let count = 0;
    let project;
      

    if(localStorage.getItem("projects")){
        let tempProjects = JSON.parse(localStorage.getItem("projects"));
        console.log(projects);
        let i;
        for(i in tempProjects){
            let tempProject = new Project(tempProjects[i].name,tempProjects[i].count);
            tempProject.name = tempProjects[i]. name;
            while(tempProject.todos.length != 0){
                tempProject.todos.pop();
            }
            for(let todo of tempProjects[i].todos){
                tempProject.todos.push(todo);
            }
            projects[i] = tempProject;
            count = i;
        }
        projects[0].loadTodos();
        mainContentName.textContent = projects[0].name;
    }else{ 
        project = new Project("Project 1",count);
        projects[count] = project;
        mainContentName.textContent = projects[count].name;
        project.loadTodos();
        curCount = count;
    }

    addTab.addEventListener("click",()=>{
        count++;
        project = new Project(`Project ${count+1}`,count);
        projects[count] = project; 
        projects[count].updateLocalStorage();
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
            if(todo.name){
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

    const tabItems = document.querySelectorAll(".tab-bar .tab-item");
    for(let tabItem of tabItems){
        tabItem.addEventListener("input",()=>{
            if(tabItem.value){
                projects[curCount].name = tabItem.value;
                mainContentName.textContent = tabItem.value;
                projects[curCount].updateLocalStorage();
            }else{
                alert("Name can't be empty");
                tabItem.value = name;
            }
        });
    }
} 

export function changeProject(e){
    curCount = e.target.dataset.count;
    mainContentName.textContent = projects[curCount].name;
    addTodo.style.display = "block";
}
