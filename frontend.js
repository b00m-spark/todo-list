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

        const todoTitle = document.createElement("div");
        todoTitle.textContent = item.title;
        todoTitle.classList.add("todo-title");
        todoleft.appendChild(todoTitle);

        const detailsBtn = document.createElement("button");
        detailsBtn.id = "details-btn";
        detailsBtn.textContent = "details";
        todoright.appendChild(detailsBtn);
        const editBtn = document.createElement("button");
        editBtn.id = "edit-btn";
        editBtn.textContent = "edit";
        todoright.appendChild(editBtn);
        const deleteBtn = document.createElement("button");
        deleteBtn.id = "delete-btn";
        deleteBtn.textContent = "delete";
        todoright.appendChild(deleteBtn);

        todo.appendChild(todoleft);
        todo.appendChild(todoright);
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
    
    todos.innerHTML = "";
    displayTodolist(list);
    dialog.close();
})


list.addToDo("Read", "read new book", "2025-10-01", "high", "default");
list.addToDo("Complete survey", "saved in email", "2025-10-01", "medium", "default");
displayTodolist(list);