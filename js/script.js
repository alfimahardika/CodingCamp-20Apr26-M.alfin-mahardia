// ===== TIME =====
function updateTime() {
    const now = new Date();
  
    document.getElementById("time").innerText =
      now.toLocaleTimeString();
  
    document.getElementById("date").innerText =
      now.toDateString();
  
    let h = now.getHours();
    let g = "Good Evening";
  
    if (h < 12) g = "Good Morning";
    else if (h < 18) g = "Good Afternoon";
  
    document.getElementById("greeting").innerText = g;
  }
  setInterval(updateTime, 1000);
  
  
  // ===== TIMER =====
  let time = 1500;
  let interval;
  
  function startTimer() {
    if (interval) return;
  
    interval = setInterval(() => {
      time--;
      renderTime();
      if (time <= 0) clearInterval(interval);
    }, 1000);
  }
  
  function stopTimer() {
    clearInterval(interval);
    interval = null;
  }
  
  function resetTimer() {
    stopTimer();
    time = 1500;
    renderTime();
  }
  
  function renderTime() {
    let m = Math.floor(time / 60);
    let s = time % 60;
    document.getElementById("timer").innerText =
      `${m}:${s < 10 ? "0" : ""}${s}`;
  }
  
  
  // ===== TASK =====
  function loadTasks() {
    let data = JSON.parse(localStorage.getItem("tasks")) || [];
    let list = document.getElementById("taskList");
    list.innerHTML = "";
  
    data.forEach((t, i) => {
      let li = document.createElement("li");
      li.innerHTML = `
        <span>${t}</span>
        <button onclick="deleteTask(${i})" style="background:red;color:white">Delete</button>
      `;
      list.appendChild(li);
    });
  }
  
  function addTask() {
    let input = document.getElementById("taskInput");
    if (!input.value) return;
  
    let data = JSON.parse(localStorage.getItem("tasks")) || [];
    data.push(input.value);
  
    localStorage.setItem("tasks", JSON.stringify(data));
    input.value = "";
    loadTasks();
  }
  
  function deleteTask(i) {
    let data = JSON.parse(localStorage.getItem("tasks"));
    data.splice(i, 1);
    localStorage.setItem("tasks", JSON.stringify(data));
    loadTasks();
  }
  
  
  // ===== LINKS =====
  function loadLinks() {
    let data = JSON.parse(localStorage.getItem("links")) || [];
    let container = document.getElementById("links");
    container.innerHTML = "";
  
    data.forEach(l => {
      let btn = document.createElement("button");
      btn.innerText = l.name;
      btn.onclick = () => window.open(l.url, "_blank");
      container.appendChild(btn);
    });
  }
  
  function addLink() {
    let name = document.getElementById("linkName").value;
    let url = document.getElementById("linkURL").value;
  
    if (!name || !url) return;
  
    let data = JSON.parse(localStorage.getItem("links")) || [];
    data.push({ name, url });
  
    localStorage.setItem("links", JSON.stringify(data));
    loadLinks();
  }
  
  
  // INIT
  updateTime();
  renderTime();
  loadTasks();
  loadLinks();