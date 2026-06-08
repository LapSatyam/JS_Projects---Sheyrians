const Alltask = document.querySelectorAll(".task");
const colums = document.querySelectorAll(".colum");
const form = document.getElementById("form");
const todo = document.getElementById("todo");

let tasksData = {};
let dragElement = null;


if (localStorage.getItem("tasks")) {
    const data = JSON.parse(localStorage.getItem("tasks"));

    for (const col in data) {
        const column = document.querySelector(`#${col}`);

        data[col].forEach(task => {
            const div = document.createElement("div");
            div.className = "task mb-2";
            div.setAttribute("draggable", "true");

            div.innerHTML = `
            <div>
              <h2 class="title">${task.title}</h2>
              <p class="para">${task.para}</p>
            </div>
            <button class="button">Delete</button>
          </div>
    `;
            div.addEventListener("drag", () => {
                dragElement = div;
            })
            column.appendChild(div);
        })
    };
    updateCount();
};


Alltask.forEach(task => {
    task.addEventListener("drag", (e) => {
        dragElement = task;
    })
});

colums.forEach(col => {
    col.addEventListener("dragenter", (e) => {
        e.preventDefault();
        col.classList.add("hover");
    });
    col.addEventListener("dragleave", (e) => {
        e.preventDefault();
        col.classList.remove("hover");
    });
    col.addEventListener("dragover", (e) => {
        e.preventDefault();
    });
    col.addEventListener("drop", (e) => {
        e.preventDefault();
        col.appendChild(dragElement);
        col.classList.remove("hover");
        updateCount();
        saveLocal();
    });
});

form.addEventListener("submit", (e) => {
    e.preventDefault();

    const taskTitle = document.getElementById("Inptitle").value.trim();
    const taskDis = document.getElementById("Inpdis").value.trim();
    const div = document.createElement("div");

    div.className = "task mb-2";
    div.setAttribute("draggable", "true");
    div.innerHTML = `
            <div>
              <h2 class="title">${taskTitle}</h2>
              <p class="para">${taskDis}</p>
            </div>
            <button class="button">Delete</button>
          </div>
    `;

    div.addEventListener("drag", () => {
        dragElement = div;
    });

    todo.appendChild(div);

    colums.forEach(col => {
        saveLocal();
        updateCount();
    });

    document.getElementById("taskModal").classList.add("hidden");
    form.reset();
});

// Update Count in all columns
function updateCount() {
    colums.forEach(col => {
        const tasks = col.querySelectorAll(".task");
        col.querySelector(".count").textContent = tasks.length;
    });
};

function saveLocal() {
    const tasksData = {};

    colums.forEach(col => {
        tasksData[col.id] = [];

        col.querySelectorAll(".task").forEach(task => {
            tasksData[col.id].push({
                title: task.querySelector(".title").innerText,
                para: task.querySelector(".para").innerText
            });
        });
    });

    localStorage.setItem("tasks", JSON.stringify(tasksData));
}