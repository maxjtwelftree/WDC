function getDateTask4_1() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            document.getElementById("P1").innerHTML = "This page was last viewed " + this.responseText;
        }
    };
    xhttp.open("GET", "/last.txt", true);
    xhttp.send();
}

function getColors() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var color = this.responseText;
            document.getElementById("header").innerHTML = color;
            document.getElementById("header").style.color = color;
        }
    };
    xhttp.open("GET", "/color.txt", true);
    xhttp.send();
}

// 4.3
var dates = [];

function log() {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            dates = JSON.parse(this.responseText);
            updateDates();
            setInterval(logRo, 10000);
        }
    };
    xmlhttp.open("GET", "/log.json", true);
    xmlhttp.send();
}

function logRo() {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            dates = JSON.parse(this.responseText);
            updateDates();
        }
    };
    xmlhttp.open("GET", "/log-ro.json", true);
    xmlhttp.send();
}

function updateDates() {
    var ul = document.getElementsByTagName("ul")[0];
    ul.innerHTML = "";
    for (var i = 0; i < dates.length; i++) {
        let d1 = dates[i].date;
        var li = document.createElement("li");
        li.appendChild(document.createTextNode(d1));
        ul.appendChild(li);
    }
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
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
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
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var header = document.getElementsByTagName('h1')[0];
            document.body.innerHTML = '';
            document.body.appendChild(header);
            document.body.innerHTML += this.responseText;
        } else {
            var para = document.createElement("p");
            para.innerHTML = "Accept T&C?";
            var but = document.createElement("button");
            but.onclick = accept;
            but.innerHTML = "Yes";
            header = document.getElementsByTagName('h1')[0];
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
    var picture = document.createElement("img");
    picture.src = "/images/doggos/" + data.uri;
    picture.alt = data.description;
    document.body.appendChild(picture);
    var p = document.createElement("p");
    p.innerHTML = data.description;
    document.body.appendChild(p);
    setTimeout(dog, 10000);
}

function sendRequest(url) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var values = JSON.parse(this.responseText);
            if (url === "/images.json") {
                displayDogImage(values);
            } else {
                dates = values;
                updateDates();
            }
        }
    };
    xhttp.open("GET", url, true);
    xhttp.send();
}
