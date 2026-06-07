const Alltask = document.querySelectorAll(".task");
const colum = document.querySelectorAll(".colum");
const form = document.getElementById("form");

let dragElement = null;

Alltask.forEach(task => {
    task.addEventListener("drag", (e) => {
        dragElement = task;

    })
});

colum.forEach(col => {
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
    });
});

form.addEventListener("submit", (e) => {
    e.preventDefault();

    const taskTitle = document.getElementById("Inptitle").value.trim();
    const taskDis  = document.getElementById("Inpdis").value.trim();
    const tasks = document.getElementById("tasks");

    tasks.innerHTML += `
    <div class="task" draggable="true">
            <div>
              <h2 class="title">${taskTitle}</h2>
              <p class="para">${taskDis}</p>
            </div>
            <button class="button">Delete</button>
          </div>
        </div>
    `;

    document.getElementById("taskModal").classList.add("hidden");
})