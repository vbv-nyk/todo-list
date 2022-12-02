import Project from "./newProject";
let curCount = 0;

export default function init(){
    const addTab = document.querySelector(".add-tab");
    const addTodo = document.querySelector(".add-todo");
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
        projects[curCount].addTodo(`Todo`);
        projects[curCount].loadTodos();
    }); 
} 

export function changeProject(e){
    curCount = e.target.dataset.count;
}