//Selectors

const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const filterOption = document.querySelector('.filter-todo');



//Event Listeners

todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteCheck);
filterOption.addEventListener('click', filterTodo);



//Functions

function addTodo(e) {
	//Prevenir submit del <form>
	e.preventDefault();
	console.log("Sin submit");
	// Todo <div>
	const todoDiv = document.createElement("div");
	todoDiv.classList.add("todo");
	//Create <li>
	const newTodo = document.createElement('li');
	newTodo.innerText = todoInput.value;
	newTodo.classList.add('todo-item');
	todoDiv.appendChild(newTodo);
	//Check mark button
	const completedButton = document.createElement('button');
	completedButton.innerHTML = '<i class="fas fa-check"></i>';
	completedButton.classList.add("complete-btn")
	todoDiv.appendChild(completedButton);
	//Trash button
	const trashButton = document.createElement('button');
	trashButton.innerHTML = '<i class="fas fa-trash"></i>';
	trashButton.classList.add("trash-btn")
	todoDiv.appendChild(trashButton);
	// Agregar a list
	todoList.appendChild(todoDiv);
	// Limpiar input
	todoInput.value = ""
}


function deleteCheck(e) {
	console.log(e.target)
	const item = e.target;
	// Borrar TODO
	if (item.classList[0] === 'trash-btn'){
		const todo = item.parentElement;
		todo.classList.add("fall");
		todo.addEventListener('transitionend', function() {
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


function filterTodo(event) {
	const todos = todoList.childNodes;
	console.log(todos);
}