import {ToDoList} from "./backend.js"
const todos = document.querySelector(".todos");
const list = new ToDoList();

function displayTodolist(todolist){
    const list = todolist.getTodoList();
    for (let item of list)
    {
        const todo = document.createElement("div");
        todo.classList.add("todo");
        todo.setAttribute("data-id", item.id);
        const todoleft = document.createElement("div");
        todoleft.classList.add("todo-left");
        
        const todoright = document.createElement("div")
        todoright.classList.add("todo-right");

        // todo title
        const todoTitle = document.createElement("div");
        todoTitle.textContent = item.title;
        todoTitle.classList.add("todo-title");
        todoleft.appendChild(todoTitle);

        // three buttons
        const detailsBtn = document.createElement("button");
        detailsBtn.classList.add("details-btn");
        detailsBtn.textContent = "details";
        todoright.appendChild(detailsBtn);
        const editBtn = document.createElement("button");
        editBtn.classList.add("edit-btn");
        editBtn.textContent = "edit";
        todoright.appendChild(editBtn);
        const deleteBtn = document.createElement("button");
        deleteBtn.classList.add("delete-btn");
        deleteBtn.textContent = "delete";
        todoright.appendChild(deleteBtn);

        todo.appendChild(todoleft);
        todo.appendChild(todoright);

        //details area (hidden)
        const detailsArea = document.createElement("div");
        detailsArea.classList.add("todo-details");
        detailsArea.innerHTML = 
        `<p>Due date: ${item.dueDate}</p>
        <p>Description: ${item.description}</p>
        <p>Priority: ${item.priority}</p>
        <p>Category: ${item.category}</p>`;
        todo.appendChild(detailsArea);

        todos.appendChild(todo);
    }
}

const addNewBtn = document.querySelector("#add-todo-btn");
const form = document.querySelector("#add-todo-form");
const dialog = document.querySelector("#add-todo-dialog");

//add new todo
addNewBtn.addEventListener("click", () => {
    form.reset();
    dialog.showModal();
    form.setAttribute("data-formId", "");
})

//close the form
const closeBtn = document.querySelector(".close-btn");
closeBtn.addEventListener("click", (event)=>{
    event.stopPropagation();
    dialog.close();
})
dialog.addEventListener("close", (event)=>{
    console.log("dialog closed");
    event.stopPropagation();
})

//submit form
form.addEventListener("submit", (event) => {
    event.preventDefault();

    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    const id = form.getAttribute("data-formId");
    if (id === "")
        list.addToDo(data["title"], data["description"], data["duedate"], data["priority"], "default");
    else{
        list.changeTitleOf(data["title"], id);
        list.changeDescriptionOf(data["description"], id);
        list.changeDueDateOf(data["duedate"], id);
        list.changePriorityOf(data["priority"], id);
    }
    todos.innerHTML = "";
    displayTodolist(list);
    dialog.close();
})

todos.addEventListener("click", (event) => {
    //edit the todo
    if (event.target.matches(".edit-btn"))
    {
        dialog.showModal();
        form.reset();

        let todo = event.target.parentElement.parentElement;
        const id = todo.getAttribute("data-id")
        todo = list.getToDo(id);

        document.querySelector("#title").value = todo.title;
        document.querySelector("#description").value = todo.description;
        console.log(todo.duedate);
        document.querySelector("#duedate").value = todo.dueDate;
        switch (todo.priority){
            case "low":     document.querySelector("#low").checked = true;      break;
            case "medium":  document.querySelector("#medium").checked = true;   break;
            case "high":    document.querySelector("#high").checked = true;     break;
        }
        form.setAttribute("data-formId", id);
    }
    //delete the todo
    if (event.target.matches(".delete-btn"))
    {
        let todo = event.target.parentElement.parentElement;
        const id = todo.getAttribute("data-id");
        list.deleteToDoWithId(id);
        event.target.parentElement.parentElement.remove();
    }
    //show todo details
    if (event.target.matches(".details-btn"))
    {
        const detailArea = event.target.parentElement.parentElement.querySelector(".todo-details");
        detailArea.classList.toggle("open");
    }
})

displayTodolist(list);