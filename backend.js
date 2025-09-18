
export class ToDoList {
    constructor(){
        const savedList = localStorage.getItem("todosStorage");
        const defaultCategories = ["default", "school", "life"];
        const defaultTodos = [];

        if (savedList) {
            // Parse saved data
            const data = JSON.parse(savedList);
            this.todolist = data.todolist || defaultTodos;
            this.categories = data.categories || defaultCategories;
        } else {
            this.todolist = defaultTodos;
            this.categories = defaultCategories;
        }
    }
    save(){
        localStorage.setItem("todosStorage", JSON.stringify(this));
    }
    findIndexWithId(id){
        return this.todolist.findIndex(todo => todo.id === id);
    }

    displayOnConsole(){
        for (let todo of this.todolist)
            console.log(todo);
    }
    addToDo(title, description, dueDate, priority, category) {
        let todo = {title, description, dueDate, priority, category, completed: false, id: crypto.randomUUID()};
        this.todolist.push(todo);
    }
    deleteToDoWithId(id){
        const index = this.findIndexWithId(id);
        this.todolist.splice(index, 1);
    }
    addNewCategory(name){
        this.categories.push(name);
    }
    getTodoList(){
        return this.todolist;
    }
    getToDo(id){
        return this.todolist.find(todo => todo.id === id);
    }
    getToDoAt(id){
        return this.todolist.findIndex(todo => todo.id === id);
    }
    changeTitleOf(newTitle, id){
        const index = this.findIndexWithId(id);
        this.todolist[index].title = newTitle;
    }
    changeDescriptionOf(newDes, id){
        const index = this.findIndexWithId(id);
        this.todolist[index].description = newDes;
    }
    changeDueDateOf(newDate, id){
        const index = this.findIndexWithId(id);
        this.todolist[index].dueDate = newDate;
    }
    changePriorityOf(newPriority, id){
        const index = this.findIndexWithId(id);
        this.todolist[index].priority = newPriority;
    }
    changeCompletedStatusOf(id){
        const index = this.findIndexWithId(id);
        this.todolist[index].completed = !this.todolist[index].completed;
    }
    changeCategoryOf(newCat, id){
        const index = this.findIndexWithId(id);
        this.todolist[index].category = newCat;
    }
    getCategories(){
        return this.categories;
    }
}



