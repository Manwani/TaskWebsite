import "./style.css";
import Todo from "./todo.js";
import Project from "./project.js";
import { compareAsc } from "date-fns";
import Master from "./master.js";



let kont = new Todo("proj1", "fds", "2024-10-01", "not high");
let ppcaca = new Todo("proj1 2", "fdssss", "2024-10-02", "high");
let ppcaca2 = new Todo("proj1 3", "fdssss", "2024-10-03", "high");
let ppcaca3 = new Todo("PROJ2", "fdssss", "2024-10-04", "LOW");
let ppcaca4 = new Todo("PROJ3", "fdssss", "2024-10-05", "LOW");
let ppcaca5 = new Todo("PROJ3 2", "fdssss", "2024-10-06", "LOW");
let proj = new Project("Vacation");
let proj2 = new Project("Goals");
let proj3 = new Project("Dentist");

Master.addToMaster(proj);
Master.addToMaster(proj2);
Master.addToMaster(proj3);


proj.addTodo(kont);
proj.addTodo(ppcaca);
proj.addTodo(ppcaca2);
proj2.addTodo(ppcaca3);
proj3.addTodo(ppcaca4);
proj3.addTodo(ppcaca5);
//proj.removeTodo(ppcaca2);
//proj.listTodo();


const projectBox = document.getElementById("projectBox");
const todoBox = document.getElementById("todoBox");
const addTaskArea = document.getElementById("addTaskArea")
const todosArea = document.getElementById("todosArea");

const inboxButton = document.createElement("button");
inboxButton.textContent = "Inbox";
projectBox.prepend(inboxButton);

inboxButton.addEventListener("click", function(){
    showAllProjects();
});


function loadAddTaskArea(){
    if(!addTaskArea.firstChild){
        let addNewTaskButton = document.createElement("button");
        addNewTaskButton.textContent = "+ Add Todo";

        addNewTaskButton.addEventListener("click", function(){
            if(document.getElementsByClassName("addTaskDiv").length > 0){
                closeTodoForm();
            } else {
                openTodoForm();
            }
        });

        let deleteProjectButton = document.createElement("button");
        deleteProjectButton.textContent = "Delete Project";

        deleteProjectButton.addEventListener("click", function(){
            
            Master.removeFromMaster(Master.getCurrentMasterElement());
            refreshProjects();
            loadApplication();

        })

        addTaskArea.appendChild(addNewTaskButton);
        addTaskArea.appendChild(deleteProjectButton);
    }

}

function loadApplication(){
    populateProjects();
    createAddProjectButton();
    showAllProjects();
}

function populateProjects(){

    let projectId = 0;
    for(const project of Master.getMaster()){
            let projectButton = document.createElement("button");
            projectButton.id = projectId;
            projectButton.textContent = project.name;
            projectId++;
            projectButton.addEventListener("click",function(){
                refreshTodos();
                loadAddTaskArea();
                populateTodos(project);
                Master.setCurrentMasterElement(projectButton.id);
            });
            projectBox.appendChild(projectButton);
        }
}

function createAddProjectButton(){

    let addProjectButton = document.createElement("button");
    addProjectButton.textContent = "Create Project";
    
    addProjectButton.addEventListener("click", function(){   
      addProjectButton.remove();
      openAddProjectBox();
    });

    projectBox.appendChild(addProjectButton);
}

function openAddProjectBox(){
    
    let projectInput = document.createElement("input");
    projectInput.placeholder = "Input Project Name";

    let addProjectBoxButtons = document.createElement("div");
    addProjectBoxButtons.id = "addProjectBoxButtons";
    

    let addButton = document.createElement("button");
    addButton.textContent = "add";
    let cancelButton = document.createElement("button");
    cancelButton.textContent = "cancel";

    addButton.addEventListener("click", function(){
        //used trim to remove all whitespaces so users cant input empty spaces as project.
        if(projectInput.value.trim() && !Master.searchForExistingProject(projectInput.value.replaceAll(" ", ""))){
            let newProject = new Project(projectInput.value.replaceAll(" ", "")); //had to use replace to get rid of all spaces so classlist would work
            Master.addToMaster(newProject);
            refreshProjects(); 
            loadApplication();
        } else{
            alert("project already exists or project input is empty");
            projectInput.value = "";
        }
    })

    cancelButton.addEventListener("click", function(){
        closeAddProjectBox();
        createAddProjectButton();

    });

    projectBox.appendChild(projectInput);
    addProjectBoxButtons.appendChild(addButton);
    addProjectBoxButtons.appendChild(cancelButton);
    projectBox.appendChild(addProjectBoxButtons);


}

function closeAddProjectBox(){
    projectBox.lastChild.remove();
    projectBox.lastChild.remove();
}

function refreshProjects(){
    
    while(projectBox.childNodes.length > 1){
        projectBox.lastChild.remove();
    }
    
}

    


function populateTodos(project){

   
    let todoArray = project.Todo;
    sortArrayByDate(todoArray);
    let todoId = 0;

    for(const result of todoArray){
        
        let taskDiv = document.createElement("div");
        taskDiv.className = "divTasks";
        taskDiv.classList.add(project.name);
        

       /*  for(const detail in result){
            let para = document.createElement("input");
            para.className = "inputy";
            para.value = result[detail];
            taskDiv.appendChild(para);
        } */
        let priorityColorDiv = document.createElement("div");
        priorityColorDiv.className = "priorityColorDiv";
        changeColorPriority(priorityColorDiv, result["priority"]);

        let taskDetailsDiv = document.createElement("div");
        taskDetailsDiv.className = "taskDetailsDiv";
        taskDetailsDiv.id = todoId;

        let checkBox = document.createElement("div");
        checkBox.className = "checkBox";

        checkBox.addEventListener("click", function(){
            let parentDiv = this.parentElement;
            project.removeTodo(parentDiv.id);
            parentDiv.remove();
            checkForAddTaskButton(project);
            
        });


        let taskName = document.createElement("p");
        taskName.className = "taskDetails";
        taskName.textContent = result["title"];

      /*   let para2 = document.createElement("p");
        para2.className = "taskDetails";
        para2.textContent = result["description"];

        let para3 = document.createElement("p");
        //para3.type = "date";
        para3.className = "taskDetails";
        para3.textContent = result["dueDate"];
        

        let para4 = document.createElement("p");
        para4.className = "taskDetails";
        para4.textContent = result["priority"];


        let para5 = document.createElement("select");
        para5.className = "projectList";
        let opt1 = document.createElement("option");
        opt1.value = project.name;
        opt1.textContent = project.name;
        para5.appendChild(opt1);
        loadOtherProjectsForSelectBox(para5); */
       

       /*  taskDiv.appendChild(para2);
        taskDiv.appendChild(para3);
        taskDiv.appendChild(para4);
        taskDiv.appendChild(para5);
 */


        /* let addButton = document.createElement("button");
        addButton.textContent = "add";
 */
        let editButton = document.createElement("button");
        editButton.textContent = "edit";
        editButton.className = "editButton";

        let deleteButton = document.createElement("button");
        deleteButton.textContent = "delete";

        editButton.addEventListener("click", function(){  
            let parent = this.parentElement;
            openModal(project, parent.id);          
        });

        deleteButton.addEventListener("click", function(){
            let parentDiv = this.parentElement;
            project.removeTodo(parentDiv.id);
            parentDiv.remove();
            checkForAddTaskButton(project);
            
        });

        /* addButton.addEventListener("click", function(){
            let parentDiv = this.parentElement;
            let collectionArray = parentDiv.querySelectorAll("input");
            let newTodo = new Todo (collectionArray[0].value,collectionArray[1].value,
                                    collectionArray[2].value,collectionArray[3].value);
            project.addTodo(newTodo); 
            refreshTodos();
            populateTodos(project);
              
        }); */
 
        //taskDiv.appendChild(addButton);
        /* taskDiv.appendChild(editButton);
        taskDiv.appendChild(deleteButton); */
        taskDetailsDiv.appendChild(checkBox);
        taskDetailsDiv.appendChild(taskName);
        taskDetailsDiv.appendChild(editButton);
        taskDetailsDiv.appendChild(deleteButton);
        taskDiv.appendChild(priorityColorDiv);
        taskDiv.appendChild(taskDetailsDiv);
        todosArea.appendChild(taskDiv);
        todoId++;
        
    }

}

//populateTodos(proj);
loadApplication();


function refreshTodos(){
    while(todosArea.firstChild){
        todosArea.lastChild.remove();
    }
}

function sortArrayByDate(arr){
    arr.sort((a,b) => compareAsc(a.dueDate, b.dueDate));
}

function openTodoForm(){
    
    let para = document.createElement("input");
    para.className = "inputy";
    para.placeholder = "Todo Name";
   
    let para2 = document.createElement("input");
    para2.className = "inputy";
    para2.placeholder = "Todo Description";


    let para3 = document.createElement("input");
    para3.type = "date";
    para3.className = "inputy";

    let para4 = document.createElement("select");
    para4.className = "selectBox";

    let opt0 = document.createElement("option");
    opt0.value = "Priority:";
    opt0.textContent = "Priority:";
    para4.appendChild(opt0);

    let opt1 = document.createElement("option");
    opt1.value = "High";
    opt1.textContent = "High";
    para4.appendChild(opt1);

    let opt2 = document.createElement("option");
    opt2.value = "Medium";
    opt2.textContent = "Medium";
    para4.appendChild(opt2);

    let opt3 = document.createElement("option");
    opt3.value = "Low";
    opt3.textContent = "Low";
    para4.appendChild(opt3);


    let addButton = document.createElement("button");
    addButton.textContent = "add";
    addButton.className = "addButton";

    let cancelButton = document.createElement("button");
    cancelButton.textContent = "cancel"; 
    cancelButton.className = "cancelButton";

    let addTaskDiv = document.createElement("div");
    addTaskDiv.className = "addTaskDiv";

    let addTaskDivButtons = document.createElement("div");
    addTaskDivButtons.className = "addTaskDivButtons";

    addButton.addEventListener("click", function(){
        let currentProject = Master.getCurrentMasterElement();
        let newTodo = new Todo(para.value, para2.value, para3.value, para4.value);
        currentProject.addTodo(newTodo);
        refreshTodos();
        populateTodos(currentProject);
    });

    cancelButton.addEventListener("click", function(){
        closeTodoForm();
    });
    

    addTaskDiv.appendChild(para);
    addTaskDiv.appendChild(para2);
    addTaskDiv.appendChild(para3);
    addTaskDiv.appendChild(para4);
    addTaskDivButtons.appendChild(cancelButton);
    addTaskDivButtons.appendChild(addButton);
    addTaskDiv.appendChild(addTaskDivButtons);

    todosArea.prepend(addTaskDiv);
}

function closeTodoForm(){
    todosArea.firstChild.remove();
}

function showAllProjects(){
    refreshTodos();
    removeAddTaskArea();
    for(const project of Master.getMaster()){
        populateTodos(project);
    }
}


function loadOtherProjectsForSelectBox(selectOptions){

    let checkCurrentValue = selectOptions.firstChild.value;

    for(const project of Master.getMaster()){
        if(checkCurrentValue !== project.name){
            let opt = document.createElement("option");
            opt.value = project.name;
            opt.textContent = project.name;
            selectOptions.appendChild(opt);
        }
    }

}

function changeProject(parentDiv, oldProject){
    for(const project of Master.getMaster()){
        if(project.name == parentDiv.querySelector("select").value){
            project.addTodo(oldProject.Todo[parentDiv.id]);
            oldProject.removeTodo(parentDiv.id);
        }
    }
}

function removeAddTaskArea(){
    while(addTaskArea.firstChild){
        addTaskArea.lastChild.remove();
    }
}

//function used to figure out if user is viewing all projects or a single project
function checkForAddTaskButton(project){
    if(addTaskArea.firstChild){
        refreshTodos();
        populateTodos(project);
    } else{
        showAllProjects();
    }        
}

function changeColorPriority(pDiv, priority){
    if(priority.toLowerCase() === "high"){
        pDiv.style.backgroundColor = "red";
    }else if(priority.toLowerCase() === "medium"){
        pDiv.style.backgroundColor = "yellow";
    }else{
        pDiv.style.backgroundColor = "green";
    }

}

function openModal(project, id){
    let todoArray = project.Todo;
    let todo = todoArray[id];
    
    let modalBox = document.getElementById("modalBox");
    modalBox.style.display = "block";

    let modal = document.getElementById("modal");

    let para = document.createElement("input");
    para.className = "inputy";
    para.placeholder = todo.title;
   
    
    

    
   
    let para2 = document.createElement("input");
    para2.className = "inputy";
    para2.placeholder = todo.description;


    let para3 = document.createElement("input");
    para3.type = "date";
    para3.className = "inputy";
    para3.value = todo.dueDate;

    let para4 = document.createElement("select");
    para4.className = "selectBox";

    let testerLabel = document.createElement("label");
    testerLabel.setAttribute("for", para4);
    testerLabel.innerText = "yo im a label";

    let opt0 = document.createElement("option");
    opt0.value = "Priority:";
    opt0.textContent = "Priority:";
    para4.appendChild(opt0);

    let opt1 = document.createElement("option");
    opt1.value = "High";
    opt1.textContent = "High";
    para4.appendChild(opt1);

    let opt2 = document.createElement("option");
    opt2.value = "Medium";
    opt2.textContent = "Medium";
    para4.appendChild(opt2);

    let opt3 = document.createElement("option");
    opt3.value = "Low";
    opt3.textContent = "Low";
    para4.appendChild(opt3);


    let editButton = document.createElement("button");
    editButton.textContent = "Edit";
    editButton.className = "addButton";

    let cancelButton = document.createElement("button");
    cancelButton.textContent = "Cancel"; 
    cancelButton.className = "cancelButton";

    let addTaskDiv = document.createElement("div");
    addTaskDiv.className = "addTaskDiv";

    let addTaskDivButtons = document.createElement("div");
    addTaskDivButtons.className = "addTaskDivButtons";

    editButton.addEventListener("click", function(){
        let newTodo = new Todo(para.value, para2.value, para3.value, para4.value);
        project.editTodo(id,newTodo);
        checkForAddTaskButton(project);
        closeModal();
    });

    cancelButton.addEventListener("click", function(){
        closeModal();
    });
    
    addTaskDiv.appendChild(testerLabel);
    addTaskDiv.appendChild(para);
    addTaskDiv.appendChild(para2);
    addTaskDiv.appendChild(para3);
    addTaskDiv.appendChild(para4);
    addTaskDivButtons.appendChild(cancelButton);
    addTaskDivButtons.appendChild(editButton);
    addTaskDiv.appendChild(addTaskDivButtons);
       
    modal.appendChild(addTaskDiv);

    
}

function closeModal(){
    let modalBox = document.getElementById("modalBox");
    modalBox.style.display = "none";
    
    let modal = document.getElementById("modal");
    modal.firstChild.remove();
}



