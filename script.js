const moonEl = document.querySelector(".toog");
const body = document.querySelector(".all-body");
const inputEl = document.querySelector(".input-text");
const addBtn = document.querySelector(".btn");
const ul = document.querySelector("ul");

moonEl.addEventListener("click", () => {
    body.classList.toggle("show");
});

function saveTaskToLocalStorage(tasks){
    localStorage.setItem('task', JSON.stringify(tasks));
}

function loadTaskFromLocalStorage(){
    const tasks = JSON.parse(localStorage.getItem('task')) || [];
    tasks.forEach(task => {
        createElement(task.text, task.checked);
    });
}

function createElement(task, checked = false){
    const li = document.createElement("li");
    li.classList.add("list");

    const span1 = document.createElement("span");
    span1.textContent = task;

    const span2 = document.createElement("span");

    const checkBox = document.createElement("input");
    checkBox.type = "checkbox";
    checkBox.checked = checked;

    const del = document.createElement("button");
    del.classList.add("deleted");
    del.textContent = "delete";

    li.appendChild(span1);
    span2.appendChild(checkBox);
    span2.appendChild(del);
    li.appendChild(span2);
    ul.appendChild(li);

    del.addEventListener("click", () => {
        li.remove();
        updateTaskToStorage();
    });

    checkBox.addEventListener("change", updateTaskToStorage);
}

function updateTaskToStorage(){
    const tasks = [];

    document.querySelectorAll(".list").forEach(li => {
        const text = li.querySelector("span").textContent;
        const checked = li.querySelector("input").checked;
        tasks.push({ text, checked });
    });

    saveTaskToLocalStorage(tasks);
}

addBtn.addEventListener("click", () => {
    const text = inputEl.value.trim();
    if (text) {
        createElement(text);
        inputEl.value = "";
        updateTaskToStorage();
    }
});

window.addEventListener("load", loadTaskFromLocalStorage);
