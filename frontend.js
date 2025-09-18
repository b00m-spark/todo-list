import {ToDoList} from "./backend.js"
const todos = document.querySelector(".todos");
const list = new ToDoList();

function convertToMonthDay(fulldate){
    if (fulldate === "")
        return "";
    const [year, month, day] = fulldate.split("-");
    return(`${month}-${day}`);
}

function displayTodolist(todolist, category=""){
    const list = todolist.getTodoList();
    for (let item of list)
    {
        //check if this todo is the given category
        if (category !== "" && category != item.category)
            continue;

        const todo = document.createElement("div");
        todo.classList.add("todo");
        todo.setAttribute("data-id", item.id);
        const todoleft = document.createElement("div");
        todoleft.classList.add("todo-left");
        
        const todoright = document.createElement("div")
        todoright.classList.add("todo-right");

        // check box
        const checkbox = document.createElement("input");
        checkbox.setAttribute("type", "checkbox");
        checkbox.classList.add("checkbox");
        todoleft.appendChild(checkbox);
        // todo title
        const todoTitle = document.createElement("div");
        todoTitle.textContent = item.title;
        todoTitle.classList.add("todo-title");
        todoleft.appendChild(todoTitle);

        // due date
        const date = document.createElement("p");
        date.classList.add("duedate");
        date.textContent = convertToMonthDay(item.dueDate);

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
        todo.appendChild(date);
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

        if (item.priority === "medium")
            todo.style.backgroundColor = "rgb(255, 241, 162)";
        else if (item.priority === "high")
            todo.style.backgroundColor = "rgb(255, 182, 162)";
        if (item.completed){
            checkbox.checked = true;
            todo.classList.add("completed");
        }

        todos.appendChild(todo);
    }
}

const sidebarcats = document.querySelector(".sidebar-categories");
function displayCategories(categories){
    for (let catname of categories){
        const catbtn = document.createElement("button");
        catbtn.classList.add("category-btn");
        catbtn.textContent = catname;
        sidebarcats.appendChild(catbtn);
    }
}

const addCatBtn = document.querySelector(".add-new-category-btn");
addCatBtn.addEventListener("click", () => {
    let newCatName = prompt("Name of new category:");
    list.addNewCategory(newCatName);
    sidebarcats.innerHTML = "";
    displayCategories(list.getCategories());
})

const addNewBtn = document.querySelector("#add-todo-btn");
const form = document.querySelector("#add-todo-form");
const dialog = document.querySelector("#add-todo-dialog");

//add the category options
function addCategoryOptions(dialog){
    const options = dialog.querySelector("#category");
    options.innerHTML = "";
    const categories = list.getCategories();
    for (let cat of categories){
        const option = document.createElement("option");
        option.setAttribute("value", cat);
        option.textContent = cat;
        options.appendChild(option);
    }
}

//add new todo
addNewBtn.addEventListener("click", () => {
    form.reset();
    dialog.showModal();
    addCategoryOptions(dialog);
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
        list.addToDo(data["title"], data["description"], data["duedate"], data["priority"], data["category"]);
    else{
        list.changeTitleOf(data["title"], id);
        list.changeDescriptionOf(data["description"], id);
        list.changeDueDateOf(data["duedate"], id);
        list.changePriorityOf(data["priority"], id);
        list.changeCategoryOf(data["category"], id);
    }
    todos.innerHTML = "";
    displayTodolist(list, todos.getAttribute("data-category"));
    dialog.close();
})

todos.addEventListener("click", (event) => {
    //edit the todo
    if (event.target.matches(".edit-btn"))
    {
        dialog.showModal();
        addCategoryOptions(dialog);
        form.reset();

        let todo = event.target.parentElement.parentElement;
        const id = todo.getAttribute("data-id")
        todo = list.getToDo(id);

        document.querySelector("#title").value = todo.title;
        document.querySelector("#description").value = todo.description;
        document.querySelector("#duedate").value = todo.dueDate;
        switch (todo.priority){
            case "low":     document.querySelector("#low").checked = true;      break;
            case "medium":  document.querySelector("#medium").checked = true;   break;
            case "high":    document.querySelector("#high").checked = true;     break;
        }
        document.querySelector("#category").value = todo.category;
        form.setAttribute("data-formId", id);
    }
    //delete the todo
    else if (event.target.matches(".delete-btn"))
    {
        let todo = event.target.parentElement.parentElement;
        const id = todo.getAttribute("data-id");
        list.deleteToDoWithId(id);
        event.target.parentElement.parentElement.remove();
    }
    //show todo details
    else if (event.target.matches(".details-btn"))
    {
        const detailArea = event.target.parentElement.parentElement.querySelector(".todo-details");
        detailArea.classList.toggle("open");
    }
    //toggle to completed
    else if (event.target.matches(".checkbox"))
    {
        event.target.parentElement.parentElement.classList.toggle("completed");
        const id = event.target.parentElement.parentElement.getAttribute("data-id");
        list.changeCompletedStatusOf(id);
    }
})

const sidebar = document.querySelector(".sidebar");
sidebar.addEventListener("click", (event) => {
    if (event.target.matches("#homebtn")){
        todos.innerHTML = "";
        todos.setAttribute("data-category", "");
        displayTodolist(list);
    }
    else if (event.target.matches(".category-btn"))
    {
        const categoryName = event.target.textContent;
        todos.innerHTML = "";
        todos.setAttribute("data-category", categoryName);
        displayTodolist(list, categoryName);
    }
})

displayCategories(list.getCategories());
displayTodolist(list);