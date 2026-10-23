Const taskForm = document.getElementById("taskForm");
const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");

let tasks = [];

try {
  tasks = JSON.parse(localStorage.getItem("studyPilotTasks") || "[]");
  if (!Array.isArray(tasks)) tasks = [];
} catch {
  tasks = [];
}

function saveTasks() {
  localStorage.setItem("studyPilotTasks", JSON.stringify(tasks));
}

function renderTasks() {
  taskList.replaceChildren();

  tasks.forEach(task => {
    const li = document.createElement("li");
    if (task.done) li.classList.add("done");

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = task.done;
    checkbox.setAttribute("aria-label", "Mark task complete");

    checkbox.addEventListener("change", () => {
      task.done = checkbox.checked;
      saveTasks();
      renderTasks();
    });

    const text = document.createElement("span");
    text.textContent = task.name;

    const remove = document.createElement("button");
    remove.textContent = "✕";
    remove.className = "delete";
    remove.setAttribute("aria-label", "Delete task");

    remove.addEventListener("click", () => {
      tasks = tasks.filter(item => item.id !== task.id);
      saveTasks();
      renderTasks();
    });

    li.append(checkbox, text, remove);
    taskList.appendChild(li);
  });

  updateStats();
}

function updateStats() {
  const completed = tasks.filter(task => task.done).length;
  const remaining = tasks.length - completed;
  const percent = tasks.length
    ? Math.round(completed / tasks.length * 100)
    : 0;

  document.getElementById("completed").textContent = completed;
  document.getElementById("remaining").textContent = remaining;
  document.getElementById("percent").textContent = percent + "%";
  document.getElementById("bar").style.width = percent + "%";
}

taskForm.addEventListener("submit", event => {
  event.preventDefault();

  const name = taskInput.value.trim();
  if (!name) return;

  tasks.push({
    id: Date.now(),
    name: name,
    done: false
  });

  saveTasks();
  renderTasks();
  taskInput.value = "";
  taskInput.focus();
});

function focusTask() {
  document.getElementById("taskSection").scrollIntoView({
    behavior: "smooth"
  });
  taskInput.focus();
}

function makePlan() {
  const pending = tasks.filter(task => !task.done);
  const planText = document.getElementById("planText");

  if (pending.length === 0) {
    planText.textContent =
      "🎉 All caught up! Add a new task when you're ready.";
    return;
  }

  planText.textContent = pending
    .map((task, index) =>
      `${index + 1}. ${4 + index}:00 PM — ${task.name} (30 minutes)`
    )
    .join("\n");

  planText.style.whiteSpace = "pre-line";
}

function askAssistant() {
  document.getElementById("assistant").scrollIntoView({
    behavior: "smooth"
  });
  document.getElementById("question").focus();
}

document.getElementById("askForm").addEventListener("submit", event => {
  event.preventDefault();

  const question = document
    .getElementById("question")
    .value.trim()
    .toLowerCase();

  let advice =
    "Choose one small topic, study for 25 minutes, then take a 5-minute break. Explain what you learned in your own words.";

  if (question.includes("exam") || question.includes("revision")) {
    advice =
      "Prioritize important topics, practise questions, review mistakes, and leave time for sleep.";
  } else if (question.includes("focus") || question.includes("concentrate")) {
    advice =
      "Put your phone away, set a 25-minute timer, and work on one task only.";
  } else if (question.includes("memory") || question.includes("remember")) {
    advice =
      "Try active recall: close your notes and explain the concept without looking. Review it again tomorrow.";
  }

  document.getElementById("answer").textContent = "✨ " + advice;
});

renderTasks();
