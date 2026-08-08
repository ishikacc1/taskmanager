

let taskName = document.getElementById("taskName");
let taskDate = document.getElementById("taskDate");
let taskPriority = document.getElementById("taskPriority");
let taskList = document.getElementById("taskList");

async function addTask(){

    try {

        let name = taskName.value;
        let date = taskDate.value;
        let priority = taskPriority.value;


        console.log("Sending:", {
            name,
            date,
            priority
        });


        let response = await fetch("/api/tasks", {
            method: "POST",
            headers:{
                "Content-Type":"application/json"
            },
            body: JSON.stringify({
                name:name,
                date:date,
                priority:priority
            })
        });


        console.log("Status:", response.status);


        let data = await response.json();

        console.log("Response:", data);

        showTask(data);


    } catch(error){

        console.log("FETCH ERROR:", error);

    }

}

function showTask(task){

    let li = document.createElement("li");

    li.className = "list-group-item";

    li.innerHTML = `
    <b>${task.name}</b>
    <br>
    Date: ${task.date}
    <br>
    Priority: ${task.priority}
    <br><br>

    <button 
    class="btn btn-success btn-sm"
    onclick="completeTask(this)">
    Complete
    </button>

    <button
    class="btn btn-warning btn-sm"
    onclick = "editTask(${task.id})">
    edit
    </button>

    <button 
    class="btn btn-danger btn-sm"
    onclick="deleteTask(this, ${task.id})">
    Delete
    </button>
    `;

    taskList.appendChild(li);
}

function completeTask(button){
    let task = button.parentElement;
    task.style.backgroundColor = "green";
}

async function editTask(id) {

    let name = prompt("Enter new task name:");
    let date = prompt("Enter new date:");
    let priority = prompt("Enter new priority:");

    if (!name || !date || !priority) {
        return;
    }

    let response = await fetch(`/api/tasks/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            name: name,
            date: date,
            priority: priority
        })
    });

    let data = await response.json();

    console.log("Updated:", data);

    location.reload();
}
async function deleteTask(button,id){
    await fetch(`/api/tasks/${id}`,{
        method:"DELETE"
    });
    let task = button.parentElement;
    task.remove();
}
async function loadtasks() {
    let response = await fetch("/api/tasks");
    let tasks = await response.json();
    tasks.forEach(task => {
        showTask(task);
    });
}
loadtasks();