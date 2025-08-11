// Массив для хранения задач
let tasks = [];
let nextId = 1;

// Элементы DOM
const tasksSection = document.getElementById('tasks');
const taskForm = document.getElementById('new-task-form');
const taskInput = document.getElementById('new-task-input');
const taskList = document.getElementById('task-list');

// Загрузка задач с сервера при загрузке страницы
async function loadTasks() {
    const loadingIndicator = document.getElementById('loading-indicator');
    loadingIndicator.style.display = 'flex';
    loadingIndicator.style.setProperty('justify-content', 'center');
    try {
        const response = await fetch('https://dummyjson.com/todos/user/1');
        if (!response.ok) {
            throw new Error(`Ошибка: ${response.status}`);
        }
        const data = await response.json();
        tasks = data.todos;
        renderTasks();
        noTasks();
    } catch (error) {
        console.error('Произошла ошибка:', error);
        alert('Задачи не загрузились :( \nПопробуйте обновить страницу позже');
    } finally {
        loadingIndicator.style.display = 'none';
    }
}

// Сохранение задач на сервере
async function saveTasks(task) {
    try {
        const response = await fetch('https://dummyjson.com/todos/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(task)
        });
        if (!response.ok) {
            throw new Error(`Ошибка: ${response.status}`);
        }
        const data = await response.json();
        console.log(data);
    } catch (error) {
        console.error('Произошла ошибка:', error);
        alert('Задача не была отправлена на сервер :( \nПопробуйте позже');
        deleteTaskElement(task.id);
    }
}

// Создание HTML элемента задачи
function createTaskElement(task) {
    const taskElement = document.createElement('li');
    taskElement.className = 'tasks__line';
    taskElement.innerHTML = `
        <div class="tasks__checkbox-wrap">
            <input type="checkbox" name="task${task.id}" id="task${task.id}" class="tasks__mark" ${task.completed ? "checked" : ""}
                    onchange="toggleTask(${task.id})" />
            <label for="task${task.id}" class="tasks__text ${task.completed ? "completed" : ""}">${task.todo}</label>
        </div>
        <button class="tasks__btn-del btn-reset" onclick="deleteTask(${task.id})">
            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#28283d"> <path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z" /></svg>
        </button>
    `;
    taskList.append(taskElement);
}

// Проверка наличия задач и отображение сообщения об их отсутствии
function noTasks() {
    if (tasks.length === 0) {
        const noTasks = document.createElement('p');
        noTasks.classList.add('tasks__null');
        noTasks.textContent = 'Задач нет!';
        noTasks.style.textAlign = 'center';
        tasksSection.append(noTasks);
    } else {
        const removeElement = document.querySelector('.tasks__null');
        if (removeElement) {
            removeElement.remove();
        }
    }
}

// Отображение всех задач
function renderTasks() {
    taskList.innerHTML = '';

    tasks.forEach((task) => {
        createTaskElement(task);
    });
}

// Добавление новой задачи
function addTask(text) {
    if (tasks.length > 0) {
        let maxId = 0;
        for (let task of tasks) {
            if (task.id > maxId) {
                maxId = task.id;
            }
        }
        nextId = maxId + 1;
    }

    const newTask = {
        id: nextId,
        todo: text,
        completed: false,
        userId: 1
    };

    tasks.push(newTask);
    createTaskElement(newTask);
    saveTasks(newTask);
    noTasks();
}

// Переключение статуса задачи (выполнено/не выполнено) с обновлением на сервере
async function toggleTask(id) {
    const targetTask = tasks.find((task) => task.id === id);
    try {
        targetTask.completed = !targetTask.completed;
        const response = await fetch(`https://dummyjson.com/todos/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                completed: targetTask.completed,
            })
        });
        if (!response.ok) {
            throw new Error(`Ошибка: ${response.status}`);
        }
        const data = await response.json();
        console.log(data);
    } catch (error) {
        console.error('Произошла ошибка:', error);
        alert('Статус задачи не был обновлён на сервере :( \nПопробуйте позже');
        targetTask.completed = !targetTask.completed;
        const targetTaskInput = document.getElementById(`task${id}`);
        targetTaskInput.checked = !targetTaskInput.checked;
    }
}

// Удаление HTML элемента задачи
function deleteTaskElement(id) {
    tasks = tasks.filter((task) => task['id'] !== id);
    const deleteTaskInput = document.getElementById(`task${id}`);
    if (deleteTaskInput) {
        const deleteTaskElement = deleteTaskInput.closest('.tasks__line');
        if (deleteTaskElement) {
            deleteTaskElement.remove();
        }
    }
    noTasks();
}

// Удаление задачи на сервере
async function deleteTask(id) {
    try {
        const response = await fetch(`https://dummyjson.com/todos/${id}`, {
            method: 'DELETE',
        });
        if (!response.ok) {
            throw new Error(`Ошибка: ${response.status}`);
        }
        const data = await response.json();
        console.log(data);
        deleteTaskElement(id);
    } catch (error) {
        console.error('Произошла ошибка:', error);
        alert('Произошла ошибка на сервере. Удалить задачу сейчас не получится :( \nПопробуйте позже');
    }
}

// Обработчик отправки формы
taskForm.addEventListener('submit', function (e) {
    e.preventDefault();

    if (taskInput.value) {
        addTask(taskInput.value);
        taskInput.value = '';
    } else {
        alert('Сначала введите задачу!');
    }
});

// Загружаем задачи при загрузке страницы
loadTasks();
