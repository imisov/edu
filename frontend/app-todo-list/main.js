// Массив для хранения задач
let tasks = [];
let nextId = 1;

// Элементы DOM
const tasksSection = document.getElementById('tasks');
const taskForm = document.getElementById('new-task-form');
const taskInput = document.getElementById('new-task-input');
const taskList = document.getElementById('task-list');

// Загрузка задач из localStorage при загрузке страницы
function loadTasks() {
    const storedTasks = JSON.parse(localStorage.getItem('tasks'));

    if (storedTasks) {
        tasks = storedTasks;
        renderTasks();
    }

    noTasks();
}

// Сохранение задач в localStorage
function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Создание HTML элемента задачи
function createTaskElement(task) {
    const taskElement = document.createElement('li');
    taskElement.className = 'tasks__line';
    taskElement.innerHTML = `
    <div class="tasks__checkbox-wrap">
        <input type="checkbox" name="task${task.id}" id="task${task.id
        }" class="tasks__mark" ${task.completed ? "checked" : ""}
                onchange="toggleTask(${task.id})" />
        <label for="task${task.id}" class="tasks__text ${task.completed ? "completed" : ""
        }">${task.text}</label>
    </div>
    <button class="tasks__btn-del btn-reset" onclick="deleteTask(${task.id
        })">
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
        noTasks.style.setProperty('text-align', 'center');
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
        text: text,
        completed: false,
    };

    tasks.push(newTask);
    createTaskElement(newTask);
    saveTasks();
    noTasks();
}

// Переключение статуса задачи (выполнено/не выполнено)
function toggleTask(id) {
    const targetTask = tasks.find((task) => task.id === id);
    targetTask.completed = !targetTask.completed;

    saveTasks();
}

// Удаление задачи
function deleteTask(id) {
    tasks = tasks.filter((task) => task['id'] !== id);

    const deleteTaskInput = document.getElementById(`task${id}`);

    if (deleteTaskInput) {
        const deleteTaskElement = deleteTaskInput.closest('.tasks__line');
        if (deleteTaskElement) {
            deleteTaskElement.remove();
        }
    }

    saveTasks();
    noTasks();
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
