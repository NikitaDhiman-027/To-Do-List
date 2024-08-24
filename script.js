document.getElementById('add-task-button').addEventListener('click', function() {
    const taskName = prompt('Enter the task name:');
    if (taskName) {
        addTask(taskName, 'todo');
    }
});

function addTask(name, status) {
    const table = document.getElementById('task-table').getElementsByTagName('tbody')[0];
    const rowCount = table.rows.length + 1;
    const row = table.insertRow();
    
    row.insertCell(0).textContent = rowCount;
    row.insertCell(1).textContent = new Date().toLocaleDateString();
    row.insertCell(2).textContent = name; // Add the current date
    row.insertCell(3).appendChild(createStatusButton(status));
    row.insertCell(4).appendChild(createEditIcon());
    row.insertCell(5).appendChild(createRemoveIcon(row));
}

function createStatusButton(status) {
    const button = document.createElement('button');
    button.className = `status-button ${status}`;
    button.textContent = capitalize(status);
    button.addEventListener('click', function() {
        const currentStatus = button.classList.contains('todo') ? 'todo' : 
                              button.classList.contains('inprogress') ? 'inprogress' : 'complete';
        const newStatus = getNextStatus(currentStatus);
        button.className = `status-button ${newStatus}`;
        button.textContent = capitalize(newStatus);
    });
    return button;
}

function createEditIcon() {
    const editIcon = document.createElement('span');
    editIcon.className = 'edit-icon';
    editIcon.innerHTML = '&#9998;';
    editIcon.addEventListener('click', function() {
        const newName = prompt('Edit the task name:', this.closest('tr').cells[1].textContent);
        if (newName) {
            this.closest('tr').cells[1].textContent = newName;
        }
    });
    return editIcon;
}

function createRemoveIcon(row) {
    const removeIcon = document.createElement('span');
    removeIcon.className = 'remove-icon';
    removeIcon.innerHTML = '&#10006;';
    removeIcon.addEventListener('click', function() {
        row.remove();
    });
    return removeIcon;
}

function getNextStatus(currentStatus) {
    return currentStatus === 'todo' ? 'inprogress' : 
           currentStatus === 'inprogress' ? 'complete' : 'todo';
}

function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}
