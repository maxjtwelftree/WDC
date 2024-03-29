const express = require('express');
const router = express.Router();

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

let temp_timestamp = '';
let counter = 1;
let d1_logs = '';
let page_counter = 0;
let color_counter = 0;
let log_entries = [];
let accept_counter = 0;
let dog_counter = 0;

router.get('/last.txt', function(req, res, next) {
  res.set('Content-Type', 'text/plain', 'charset=UTF-8');
  res.send(temp_timestamp);
  temp_timestamp = new Date().toString();
});

router.get('/color.html', function(req, res, next) {
  const number = counter % 4;
  let color = '';
  if (number === 0) {
    color = 'blue';
  } else if (number === 3) {
    color = 'green';
  } else if (number === 2) {
    color = 'yellow';
  } else {
    color = 'red';
  }
  const html = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
    <meta charset="UTF-8">
    <title>Express</title>
    </head>
    <body>
    <h1 style="color: ${color}">${color}</h1>
    </body>
    </html>`;
  res.send(html);
  counter++;
});

router.get('/log.html', function(req, res, next) {
  d1_logs += `<li>${new Date().toString()}</li>`;
  const html = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
    <meta charset="UTF-8">
    <title>Express</title>
    </head>
    <body>
    <ul>${d1_logs}</ul>
    </body>
    </html>`;
  res.send(html);
});

router.get('/first.html', function(req, res, next) {
  const html = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
    <meta charset="UTF-8">
    <title>Express</title>
    </head>
    <body>
    <h1>Welcome</h1>
    <a href="/main.html">Click on this link!</a>
    </body>
    </html>`;
  if (page_counter === 0) {
    res.send(html);
    page_counter++;
  } else {
    res.redirect('/main.html');
  }
});

router.get('/main.html', function(req, res, next) {
  const html = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
    <meta charset="UTF-8">
    <title>Express</title>
    </head>
    <body>
    <h1>My main site</h1>
    <p>Me love Me-Me. MEME!!</p>
    </body>
    </html>`;
  if (page_counter === 0) {
    res.redirect('/first.html');
  } else {
    res.send(html);
    page_counter++;
  }
});

router.get('/color.txt', function(req, res, next) {
  let color = '';
  if (color_counter % 4 === 0) {
    color = 'red';
  } else if (color_counter % 4 === 3) {
    color = 'blue';
  } else if (color_counter % 4 === 2) {
    color = 'green';
  } else {
    color = 'yellow';
  }
  res.set('Content-Type', 'text/plain', 'charset=UTF-8');
  res.send(String(color));
  color_counter++;
});

router.get('/log.json', function(req, res, next) {
  const d = { date: new Date().toString() };
  log_entries.push(d);
  res.json(log_entries);
});

router.get('/log-ro.json', function(req, res, next) {
  res.json(log_entries);
});

router.get('/accept', function(req, res, next) {
  res.sendStatus(200);
  accept_counter++;
});

router.get('/content.ajax', function(req, res, next) {
  if (accept_counter === 0) {
    res.sendStatus(403);
  } else {
    const html = `
      <p>Terms and conditions supplied</p>
      <p>Terms and conditions supplied</p>`;
    res.send(html);
  }
});

router.get('/images.json', function(req, res, next) {
  const i = dog_counter % 10;
  res.json(images[i]);
  dog_counter++;
});

module.exports = router;
