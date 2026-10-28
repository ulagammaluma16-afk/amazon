
const taskForm = document.getElementById("taskForm");
const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");

let tasks = JSON.parse(localStorage.getItem("studyPilotTasks") || "[]");

function renderTasks() {
    taskList.innerHTML = "";

    tasks.forEach((task, index) => {
        const li = document.createElement("li");

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = task.done;

        checkbox.addEventListener("change", () => {
            tasks[index].done = checkbox.checked;
            saveTasks();
        });

        const span = document.createElement("span");
        span.textContent = task.name;

        const del = document.createElement("button");
        del.textContent = "Delete";

        del.addEventListener("click", () => {
            tasks.splice(index, 1);
            saveTasks();
            renderTasks();
        });

        li.append(checkbox, span, del);
        taskList.appendChild(li);
    });
}

function saveTasks() {
    localStorage.setItem("studyPilotTasks", JSON.stringify(tasks));
}

taskForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const name = taskInput.value.trim();
    if (name === "") return;

    tasks.push({ name: name, done: false });
    saveTasks();
    renderTasks();

    taskInput.value = "";
});

renderTasks();
