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

      /*   let description = document.createElement("p");
        description.className = "taskDetails";
        description.textContent = result["description"];

        let dueDate = document.createElement("p");
        //dueDate.type = "date";
        dueDate.className = "taskDetails";
        dueDate.textContent = result["dueDate"];
        

        let priority = document.createElement("p");
        priority.className = "taskDetails";
        priority.textContent = result["priority"];


        let para5 = document.createElement("select");
        para5.className = "projectList";
        let high = document.createElement("option");
        high.value = project.name;
        high.textContent = project.name;
        para5.appendChild(high);
        loadOtherProjectsForSelectBox(para5); */
       

       /*  taskDiv.appendChild(description);
        taskDiv.appendChild(dueDate);
        taskDiv.appendChild(priority);
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
   
    let description = document.createElement("input");
    description.className = "inputy";
    description.placeholder = "Todo Description";


    let dueDate = document.createElement("input");
    dueDate.type = "date";
    dueDate.className = "inputy";

    let priority = document.createElement("select");
    priority.className = "selectBox";

    let opt0 = document.createElement("option");
    opt0.value = "Priority:";
    opt0.textContent = "Priority:";
    priority.appendChild(opt0);

    let high = document.createElement("option");
    high.value = "High";
    high.textContent = "High";
    priority.appendChild(high);

    let medium = document.createElement("option");
    medium.value = "Medium";
    medium.textContent = "Medium";
    priority.appendChild(medium);

    let low = document.createElement("option");
    low.value = "Low";
    low.textContent = "Low";
    priority.appendChild(low);


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
        let newTodo = new Todo(para.value, description.value, dueDate.value, priority.value);
        currentProject.addTodo(newTodo);
        refreshTodos();
        populateTodos(currentProject);
    });

    cancelButton.addEventListener("click", function(){
        closeTodoForm();
    });
    

    addTaskDiv.appendChild(para);
    addTaskDiv.appendChild(description);
    addTaskDiv.appendChild(dueDate);
    addTaskDiv.appendChild(priority);
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

    //title cluster
    let titleLabel = document.createElement("label");
    titleLabel.setAttribute("for", "title" );
    titleLabel.innerText = "Title:";

    let title= document.createElement("input");
    title.className = "inputy";
    title.value = todo.title;
    title.id = "title";

    let titleDiv = document.createElement("div");
    titleDiv.className = "divForClass";
    titleDiv.appendChild(titleLabel);
    titleDiv.appendChild(title);


    //description cluster
    let descriptionLabel = document.createElement("label");
    descriptionLabel.setAttribute("for", "description");
    descriptionLabel.innerText = "Description:";

    let description = document.createElement("input");
    description.className = "inputy";
    description.value= todo.description;
    description.id = "description";

    let descriptionDiv = document.createElement("div");
    descriptionDiv.className = "divForClass";
    descriptionDiv.appendChild(descriptionLabel);
    descriptionDiv.appendChild(description);

    //dueDate cluster
    let dueDateLabel = document.createElement("label");
    dueDateLabel.setAttribute("for", "dueDate");
    dueDateLabel.innerText = "Due Date:"

    let dueDate = document.createElement("input");
    dueDate.type = "date";
    dueDate.className = "inputy";
    dueDate.value = todo.dueDate;
    dueDate.id = "dueDate";

    let dueDateDiv = document.createElement("div");
    dueDateDiv.className = "divForClass";
    dueDateDiv.appendChild(dueDateLabel);
    dueDateDiv.appendChild(dueDate);


    //priority cluster
    let priorityLabel = document.createElement("label");
    priorityLabel.setAttribute("for", "priority");
    priorityLabel.innerText = "Priority";

    let priority = document.createElement("select");
    priority.className = "selectBox";
    priority.id = "priority";

    let divForPriority = document.createElement("div");
    divForPriority.className = "divForClass"
    divForPriority.appendChild(priorityLabel);
    divForPriority.appendChild(priority);


    let high = document.createElement("option");
    high.value = "High";
    high.textContent = "High";
    priority.appendChild(high);

    let medium = document.createElement("option");
    medium.value = "Medium";
    medium.textContent = "Medium";
    priority.appendChild(medium);

    let low = document.createElement("option");
    low.value = "Low";
    low.textContent = "Low";
    priority.appendChild(low);


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
        let newTodo = new Todo(title.value, description.value, dueDate.value, priority.value);
        project.editTodo(id,newTodo);
        checkForAddTaskButton(project);
        closeModal();
    });

    cancelButton.addEventListener("click", function(){
        closeModal();
    });
    
    
    addTaskDiv.appendChild(titleDiv);
    addTaskDiv.appendChild(descriptionDiv);
    addTaskDiv.appendChild(dueDateDiv);
    addTaskDiv.appendChild(divForPriority);
 
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



