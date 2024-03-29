function getDateTask4_1() {
    const xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState === 4 && this.status === 200) {
            document.getElementById("P1").innerHTML = "This page was last viewed " + this.responseText;
        }
    };
    xhttp.open("GET", "/last.txt", true);
    xhttp.send();
}

function getColors() {
    const xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState === 4 && this.status === 200) {
            const color = this.responseText;
            const header = document.getElementById("header");
            header.innerHTML = color;
            header.style.color = color;
        }
    };
    xhttp.open("GET", "/color.txt", true);
    xhttp.send();
}

let dates = [];

function log() {
    const xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (this.readyState === 4 && this.status === 200) {
            dates = JSON.parse(this.responseText);
            updateDates();
            setInterval(logRo, 10000);
        }
    };
    xmlhttp.open("GET", "/log.json", true);
    xmlhttp.send();
}

function logRo() {
    const xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (this.readyState === 4 && this.status === 200) {
            dates = JSON.parse(this.responseText);
            updateDates();
        }
    };
    xmlhttp.open("GET", "/log-ro.json", true);
    xmlhttp.send();
}

function updateDates() {
    const ul = document.getElementsByTagName("ul")[0];
    ul.innerHTML = "";
    dates.forEach(date => {
        const li = document.createElement("li");
        li.textContent = date.date;
        ul.appendChild(li);
    });
}

function contact() {
    sendRequest("/log-ro.json");
}

function search() {
    sendRequest("/log-ro.json");
}

function about() {
    sendRequest("/log-ro.json");
}

function sendRequest(url) {
    const xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (this.readyState === 4 && this.status === 200) {
            dates = JSON.parse(this.responseText);
            updateDates();
        }
    };
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
}

function accept() {
    sendRequest("/accept");
}

function acceptTC() {
    const xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState === 4 && this.status === 200) {
            const header = document.getElementsByTagName('h1')[0];
            document.body.innerHTML = '';
            document.body.appendChild(header);
            document.body.innerHTML += this.responseText;
        } else {
            const para = document.createElement("p");
            para.textContent = "Accept T&C?";
            const but = document.createElement("button");
            but.onclick = accept;
            but.textContent = "Yes";
            const header = document.getElementsByTagName('h1')[0];
            document.body.innerHTML = '';
            document.body.appendChild(header);
            document.body.appendChild(para);
            document.body.appendChild(but);
        }
    };
    xhttp.open("GET", "/content.ajax", true);
    xhttp.send();
}

function dog() {
    sendRequest("/images.json");
}

function displayDogImage(data) {
    document.body.innerHTML = "";
    const picture = document.createElement("img");
    picture.src = "/images/doggos/" + data.uri;
    picture.alt = data.description;
    document.body.appendChild(picture);
    const p = document.createElement("p");
    p.textContent = data.description;
    document.body.appendChild(p);
    setTimeout(dog, 10000);
}
