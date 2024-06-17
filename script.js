document.getElementById('addTaskButton').addEventListener('click', addTask);

function addTask() {
    const taskInput = document.getElementById('taskInput');
    const priorityInput = document.getElementById('priorityInput');
    const dueDateInput = document.getElementById('dueDateInput');
    const categoryInput = document.getElementById('categoryInput');

    if (taskInput.value.trim() === '') {
        alert('Please enter a task');
        return;
    }

    const task = {
        text: taskInput.value,
        priority: priorityInput.value,
        dueDate: dueDateInput.value,
        category: categoryInput.value,
        completed: false
    };

    addTaskToList(task);
    taskInput.value = '';
    priorityInput.value = 'low';
    dueDateInput.value = '';
    categoryInput.value = 'work';
    sortTasks();
}

function addTaskToList(task) {
    const taskList = document.getElementById('taskList');

    const li = document.createElement('li');
    li.className = `${task.priority} ${task.category}`;
    
    const taskText = document.createElement('span');
    taskText.textContent = `${task.text} (Due: ${task.dueDate})`;
    taskText.className = task.completed ? 'completed' : '';
    taskText.addEventListener('click', () => {
        task.completed = !task.completed;
        taskText.classList.toggle('completed');
        if (task.completed) {
            li.classList.add('completed');
        } else {
            li.classList.remove('completed');
        }
        moveCompletedTasksToBottom();
    });

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.addEventListener('click', () => {
        taskList.removeChild(li);
    });

    li.appendChild(taskText);
    li.appendChild(deleteButton);
    taskList.appendChild(li);
}

function sortTasks() {
    const taskList = document.getElementById('taskList');
    const tasks = Array.from(taskList.children);
    
    tasks.sort((a, b) => {
        const priorities = { low: 1, medium: 2, high: 3 };
        return priorities[b.classList[0]] - priorities[a.classList[0]];
    });

    tasks.forEach(task => taskList.appendChild(task));
}

function moveCompletedTasksToBottom() {
    const taskList = document.getElementById('taskList');
    const tasks = Array.from(taskList.children);
    
    tasks.sort((a, b) => {
        if (a.classList.contains('completed') && !b.classList.contains('completed')) {
            return 1;
        }
        if (!a.classList.contains('completed') && b.classList.contains('completed')) {
            return -1;
        }
        return 0;
    });

    tasks.forEach(task => taskList.appendChild(task));
}
