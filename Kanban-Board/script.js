const columns = document.querySelectorAll(".colum");
const form = document.getElementById("form");
const todo = document.getElementById("todo");

let dragElement = null;


// Load Tasks
const savedTasks = JSON.parse(localStorage.getItem("tasks")) || {};

for (const colid in savedTasks) {
    const column = document.getElementById(colid);

    if(!column) continue;

    savedTasks[colid].forEach(task => {
        column.querySelector(".tasks").appendChild(createTask(task.title, task.desc));
    });
};

updateCount();

// Column Events
columns.forEach(column => {
    column.addEventListener("dragenter", e => {
        e.preventDefault();
        column.classList.add("hover");
    });

    column.addEventListener("dragleave", () => {
        column.classList.remove("hover");
    });

    column.addEventListener("dragover", e => {
        e.preventDefault();
    });

    column.addEventListener("drop", e => {
        e.preventDefault();

        if (!dragElement) return;

        column.querySelector(".tasks").appendChild(dragElement);
        column.classList.remove("hover");

        updateCount();
        saveLocal();
    });
});

// delete Listner
document.addEventListener("click", e => {
    if(!e.target.classList.contains("button")) return;

    e.target.closest(".task").remove();

    saveLocal();
    updateCount();
});

// Add New Task
form.addEventListener("submit", e => {
    e.preventDefault();

    const title = document.getElementById("InpTitle").value.trim();
    const desc = document.getElementById("InpDesc").value.trim();

    if (!title) return;

    todo.querySelector(".tasks").appendChild(createTask(title, desc));

    saveLocal();
    updateCount();

    document.getElementById("taskModal").classList.add("hidden");
    form.reset();
});


// Create New Task
function createTask(title, desc) {
    const div = document.createElement("div");

    div.className = "flex justify-between items-start task";
    div.draggable = true;

    div.innerHTML = `
       <div>
            <h2 class="title">${title}</h2>
            <p class="desc">${desc}</p>
        </div>
        <button class="button">Delete</button>
    `;

    div.addEventListener("dragstart", () => {
        dragElement = div;
    });

    return div;
};

// Update Count 
function updateCount() {
    columns.forEach(column => {
        column.querySelector(".count").textContent = column.querySelectorAll(".task").length;
    });
};

// Save Tasks
function saveLocal() {
    const data = {};

    columns.forEach(column => {
        data[column.id] = [...column.querySelectorAll(".task")].map(task => ({
            title: task.querySelector(".title").textContent,
            desc: task.querySelector(".desc").textContent,
        }));
    });

    localStorage.setItem("tasks", JSON.stringify(data));
};