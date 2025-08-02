# ToDo List

## 1. Практическая задача: Статичная верстка ToDo List (HTML+CSS)

### Описание задачи 1

Создайте **статичную версию** ToDo приложения используя только HTML и CSS. Пока без JavaScript - просто красивый макет с примерами задач.

### Требования к дизайну

- Заголовок приложения
- Поле ввода новой задачи + кнопка "Добавить"
- Список из 3-4 примеров задач
- Чекбоксы для отметки выполненных задач
- Кнопки "Удалить" для каждой задачи
- Современный дизайн с тенями и скруглениями

### Пример дизайна

```text
+----------------------------------------+
|          📝 Мой ToDo List              |
+----------------------------------------+
| [  Новая задача...        ] [Добавить] |
+----------------------------------------+
| ☐ Изучить HTML и CSS        [Удалить]  |
| ☑ Сделать домашнее задание  [Удалить]  |
| ☐ Купить продукты           [Удалить]  |
| ☐ Позвонить маме            [Удалить]  |
+----------------------------------------+
```

-----

## 2. Практическая задача: Интерактивный ToDo List (HTML+CSS+JS)

### Описание задачи 2

Возьмите статичную версию ToDo List из первого модуля и добавьте JavaScript для полной функциональности. Все задачи должны сохраняться в localStorage.

### Новые требования к функционалу

- :white_check_mark: Добавление новых задач через форму
- :white_check_mark: Отметка задач как выполненные/невыполненные
- :white_check_mark: Удаление задач
- :white_check_mark: Сохранение всех изменений в localStorage
- :white_check_mark: Загрузка сохраненных задач при открытии страницы
- :white_check_mark: Валидация: нельзя добавить пустую задачу

### Структура данных

```JavaScript
// Пример структуры задачи в localStorage
const tasks = [
  { id: 1, text: "Изучить JavaScript", completed: false },
  { id: 2, text: "Сделать домашнее задание", completed: true },
  { id: 3, text: "Купить продукты", completed: false }
];
```

### JavaScript код (заполни недостающие части самостоятельно)

```HTML
<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>ToDo List</title>
  <style>
    {/* используй CSS из первого модуля */}
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>📝 Мой ToDo List</h1>
    </div>
    
    <form class="add-task" id="add-task-form">
      <input type="text" id="new-task-input" placeholder="Новая задача..." required>
      <button type="submit" class="btn">Добавить</button>
    </form>
    
    <div class="task-list" id="task-list">
      {/* задачи будут добавляться динамически через JS */}
    </div>
  </div>

  <script>
    // Массив для хранения задач
    let tasks = [];
    let nextId = 1;

    // Элементы DOM
    const taskForm = document.getElementById('add-task-form');
    const taskInput = document.getElementById('new-task-input');
    const taskList = document.getElementById('task-list');

    // Загрузка задач из localStorage при загрузке страницы
    function loadTasks() {
      {/* заполни сам: загрузи задачи из localStorage */}
    }

    // Сохранение задач в localStorage
    function saveTasks() {
      {/* заполни сам: сохрани массив tasks в localStorage */}
    }

    // Создание HTML элемента задачи
    function createTaskElement(task) {
      const taskDiv = document.createElement('div');
      taskDiv.className = 'task-item';
      taskDiv.innerHTML = `
        <input type="checkbox" class="task-checkbox" ${task.completed ? 'checked' : ''} 
               onchange="toggleTask(${task.id})">
        <span class="task-text ${task.completed ? 'completed' : ''}">${task.text}</span>
        <button class="delete-btn" onclick="deleteTask(${task.id})">Удалить</button>
      `;
      return taskDiv;
    }

    // Отображение всех задач
    function renderTasks() {
      {/* заполни сам: очисти taskList и добавь все задачи из массива */}
    }

    // Добавление новой задачи
    function addTask(text) {
      {/* заполни сам: создай новую задачу и добавь в массив */}
    }

    // Переключение статуса задачи (выполнено/не выполнено)
    function toggleTask(id) {
      {/* заполни сам: найди задачу по id и измени completed */}
    }

    // Удаление задачи
    function deleteTask(id) {
      {/* заполни сам: удали задачу из массива по id */}
    }

    // Обработчик отправки формы
    taskForm.addEventListener('submit', function(e) {
      {/* заполни сам: получи текст, добавь задачу, очисти поле */}
    });

    // Загружаем задачи при загрузке страницы
    loadTasks();
  </script>
</body>
</html>
```
