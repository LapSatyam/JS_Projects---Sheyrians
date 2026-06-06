const tasks = document.querySelectorAll(".task");
const colum = document.querySelectorAll(".colum");

tasks.forEach(task => {
    task.addEventListener("drag", (e) => {
        // console.log("dragging", e);

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
        col.classList.remove("hover");
    });
});