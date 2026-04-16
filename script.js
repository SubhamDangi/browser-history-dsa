let historyList = [];
let currentIndex = -1;

// Load saved data
window.onload = function () {
    let storedHistory = localStorage.getItem("historyList");
    let storedIndex = localStorage.getItem("currentIndex");

    if (storedHistory) {
        historyList = JSON.parse(storedHistory);
        currentIndex = parseInt(storedIndex);
        display();
    }
};

function saveData() {
    localStorage.setItem("historyList", JSON.stringify(historyList));
    localStorage.setItem("currentIndex", currentIndex);
}

function visit() {
    let url = document.getElementById("urlInput").value;
    if (!url) return;

    // add https
    if (!url.startsWith("http")) {
        url = "https://" + url;
    }

    historyList = historyList.slice(0, currentIndex + 1);
    historyList.push(url);
    currentIndex++;

    window.open(url, "_blank");

    display();
    saveData();
}

function goBack() {
    if (currentIndex > 0) currentIndex--;
    display();
    saveData();
}

function goForward() {
    if (currentIndex < historyList.length - 1) currentIndex++;
    display();
    saveData();
}

function showCurrent() {
    alert("Current Page: " + historyList[currentIndex]);
}

function showHistory() {
    display();
}

function clearHistory() {
    historyList = [];
    currentIndex = -1;
    localStorage.clear();
    display();
}

function display() {
    let div = document.getElementById("history");
    div.innerHTML = "<h3>History</h3>";

    historyList.forEach((url, index) => {
        if (index === currentIndex)
            div.innerHTML += `<div class="current">➡ ${url}</div>`;
        else
            div.innerHTML += `<div>${url}</div>`;
    });
}