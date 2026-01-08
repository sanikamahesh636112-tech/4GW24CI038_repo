let algo = localStorage.getItem("algorithm");
let data = JSON.parse(localStorage.getItem("processData"));
let quantum = localStorage.getItem("quantum");

function sortByArrival(arr) {
    return arr.sort((a, b) => a.arrival - b.arrival);
}

// Store Gantt chart events
let gantt = [];

// ---------------------------
// FCFS
// ---------------------------
function fcfs() {
    let t = 0;
    data = sortByArrival(data);

    data.forEach(p => {
        if (t < Number(p.arrival)) t = Number(p.arrival);

        let start = t;
        t += Number(p.burst);
        let end = t;

        p.ct = end;
        p.tat = p.ct - p.arrival;
        p.wt = p.tat - p.burst;

        gantt.push({pid: p.pid, start, end});
    });
}

// ---------------------------
// SJF NON-PREEMPTIVE
// ---------------------------
function sjf() {
    let t = 0;
    let completed = 0;
    let n = data.length;
    let visited = Array(n).fill(false);

    while (completed < n) {
        let idx = -1;
        let mn = Infinity;

        for (let i = 0; i < n; i++) {
            if (!visited[i] && Number(data[i].arrival) <= t && Number(data[i].burst) < mn) {
                mn = Number(data[i].burst);
                idx = i;
            }
        }

        if (idx === -1) {
            t++;
            continue;
        }

        visited[idx] = true;
        let start = t;
        t += Number(data[idx].burst);
        let end = t;

        data[idx].ct = end;
        data[idx].tat = data[idx].ct - data[idx].arrival;
        data[idx].wt = data[idx].tat - data[idx].burst;

        gantt.push({pid: data[idx].pid, start, end});
        completed++;
    }
}

// ---------------------------
// SRTF
// ---------------------------
function srtf() {
    let n = data.length;
    data.forEach(p => p.rem = Number(p.burst));
    let t = 0, completed = 0;

    while (completed < n) {
        let idx = -1, mn = Infinity;

        for (let i = 0; i < n; i++) {
            if (data[i].arrival <= t && data[i].rem > 0 && data[i].rem < mn) {
                mn = data[i].rem;
                idx = i;
            }
        }

        if (idx === -1) {
            t++;
            continue;
        }

        let start = t;
        data[idx].rem--;
        t++;
        let end = t;

        gantt.push({pid: data[idx].pid, start, end});

        if (data[idx].rem === 0) {
            completed++;
            data[idx].ct = end;
            data[idx].tat = end - data[idx].arrival;
            data[idx].wt = data[idx].tat - data[idx].burst;
        }
    }
}

// ---------------------------
// ROUND ROBIN
// ---------------------------
function rr() {
    let q = Number(quantum);
    let queue = [];
    data.forEach(p => p.rem = Number(p.burst));

    let t = 0;
    queue.push(0);
    let visited = new Set([0]);

    while (queue.length > 0) {
        let i = queue.shift();

        let start = t;
        let exec = Math.min(q, data[i].rem);
        t += exec;
        data[i].rem -= exec;
        let end = t;

        gantt.push({pid: data[i].pid, start, end});

        // Add newly arrived
        for (let j = 0; j < data.length; j++) {
            if (data[j].arrival <= t && !visited.has(j) && data[j].rem > 0) {
                visited.add(j);
                queue.push(j);
            }
        }

        if (data[i].rem > 0) queue.push(i);
        else {
            data[i].ct = end;
            data[i].tat = end - data[i].arrival;
            data[i].wt = data[i].tat - data[i].burst;
        }
    }
}

// ---------------------------
// PRIORITY
// ---------------------------
function priority() {
    let t = 0;
    let completed = 0;
    let n = data.length;
    let done = Array(n).fill(false);

    while (completed < n) {
        let idx = -1, best = Infinity;

        for (let i = 0; i < n; i++) {
            if (!done[i] && data[i].arrival <= t && Number(data[i].priority) < best) {
                idx = i;
                best = Number(data[i].priority);
            }
        }

        if (idx === -1) { t++; continue; }

        let start = t;
        t += Number(data[idx].burst);
        let end = t;

        data[idx].ct = end;
        data[idx].tat = end - data[idx].arrival;
        data[idx].wt = data[idx].tat - data[idx].burst;

        gantt.push({pid: data[idx].pid, start, end});
        done[idx] = true;
        completed++;
    }
}

// -----------------------------------
// RUN THE CORRECT ALGORITHM
// -----------------------------------
if (algo === "fcfs") fcfs();
if (algo === "sjf") sjf();
if (algo === "srtf") srtf();
if (algo === "rr") rr();
if (algo === "priority") priority();

// -----------------------------------
// RENDER TABLE
// -----------------------------------
let table = document.getElementById("resultTable");
let sumT = 0, sumW = 0;

data.forEach(p => {
    let row = `<tr>
        <td>${p.pid}</td>
        <td>${p.arrival}</td>
        <td>${p.burst}</td>
        <td>${p.ct}</td>
        <td>${p.tat}</td>
        <td>${p.wt}</td>
    </tr>`;
    table.innerHTML += row;

    sumT += p.tat;
    sumW += p.wt;
});

document.getElementById("avg").innerHTML = `
<b>Average Turnaround Time:</b> ${(sumT/data.length).toFixed(2)} |
<b>Average Waiting Time:</b> ${(sumW/data.length).toFixed(2)}
`;

// -----------------------------------
// RENDER GANTT CHART
// -----------------------------------
let ganttDiv = document.getElementById("gantt");

gantt.forEach(block => {
    let width = (block.end - block.start) * 40; // 40px per time unit
    let color = "#" + Math.floor(Math.random()*16777215).toString(16);

    let bar = document.createElement("div");
    bar.className = "bar";
    bar.style.width = width + "px";
    bar.style.background = color;
    bar.innerText = block.pid;

    ganttDiv.appendChild(bar);
});