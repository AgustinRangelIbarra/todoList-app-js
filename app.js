//Selectors

const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const filterOption = document.querySelector('.filter-todo');



//Functions

const addTodo = (e) => {
	//Prevenir submit del <form>
	e.preventDefault();
	console.log("Sin submit");
	// Todo <div>
	const todoDiv = document.createElement("div");
	todoDiv.classList.add("todo");
	//Create <li>
	const newTodo = document.createElement("li");
	newTodo.innerText = todoInput.value;
	newTodo.classList.add("todo-item");
	todoDiv.appendChild(newTodo);
	// Agregar a local storage
	saveLocalTodos(todoInput.value);
	//Check mark button
	const completedButton = document.createElement("button");
	completedButton.innerHTML = '<i class="fas fa-check"></i>';
	completedButton.classList.add("complete-btn");
	todoDiv.appendChild(completedButton);
	//Trash button
	const trashButton = document.createElement('button');
	trashButton.innerHTML = '<i class="fas fa-trash"></i>';
	trashButton.classList.add("trash-btn");
	todoDiv.appendChild(trashButton);
	// Agregar a list
	todoList.appendChild(todoDiv);
	// Limpiar input
	todoInput.value = "";
}


const deleteCheck = (e) => {
	console.log(e.target)
	const item = e.target;
	// Borrar TODO
	if (item.classList[0] === 'trash-btn'){
		const todo = item.parentElement;
		todo.classList.add("fall");
		removeLocalTodos(todo);
		todo.addEventListener('transitionend', () => {
			todo.remove();
		})
		// todo.remove();
	}
	// Check mark
	if (item.classList[0] === "complete-btn") {
		const todo = item.parentElement;
		todo.classList.toggle("completed")
	}
}


const filterTodo = (event) => {
	const todos = todoList.childNodes;
	todos.forEach(function (todo) {
		switch (event.target.value) {
			case "all":
				console.log(todo);
				todo.style.display = "flex";
				break;
			case "completed":
				if(todo.classList.contains("completed")){
					todo.style.display = "flex";
				}else{
					todo.style.display = "none";
				}
				break;
			case "uncompleted":
				if(!todo.classList.contains("completed")){
					todo.style.display = "flex";
				} else {
					todo.style.display = "none";
				}
				break;
		}
	});
}


const saveLocalTodos = (todo) => {
	//check - revisar almacenamiento previo
	let todos;
	if (localStorage.getItem('todos') === null) {
		todos = [];
	} else {
		todos = JSON.parse(localStorage.getItem("todos"));
	}

	todos.push(todo);
	localStorage.setItem("todos", JSON.stringify(todos));
}


const getTodos = () => {
	console.log("Working");
	let todos;
	if (localStorage.getItem('todos') === null) {
		todos = [];
	} else {
		todos = JSON.parse(localStorage.getItem("todos"));
	}
	todos.forEach((todo) => {
		// Todo <div>
		const todoDiv = document.createElement("div");
		todoDiv.classList.add("todo");
		//Create <li>
		const newTodo = document.createElement("li");
		newTodo.innerText = todo;
		newTodo.classList.add("todo-item");
		todoDiv.appendChild(newTodo);
		//Check mark button
		const completedButton = document.createElement("button");
		completedButton.innerHTML = '<i class="fas fa-check"></i>';
		completedButton.classList.add("complete-btn");
		todoDiv.appendChild(completedButton);
		//Trash button
		const trashButton = document.createElement('button');
		trashButton.innerHTML = '<i class="fas fa-trash"></i>';
		trashButton.classList.add("trash-btn");
		todoDiv.appendChild(trashButton);
		// Agregar a list
		todoList.appendChild(todoDiv);
	})
}


const removeLocalTodos = (todo) => {
	//check - revisar almacenamiento previo
	let todos;
	if (localStorage.getItem('todos') === null) {
		todos = [];
	} else {
		todos = JSON.parse(localStorage.getItem("todos"));
	}
	const todoIndex = todo.children[0].innerText;
	console.log(todo.children[0].innerText);
	// console.log(todos.indexOf('asdf'));
	todos.splice(todos.indexOf(todoIndex), 1);
	localStorage.setItem("todos", JSON.stringify(todos));
}



//Event Listeners
document.addEventListener('DOMContentLoaded', getTodos)
todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteCheck);
filterOption.addEventListener("click", filterTodo);


