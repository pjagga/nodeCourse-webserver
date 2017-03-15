const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;

var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');


app.use((req, res, next) => {
  var now = new Date().toString();
  var log = `${now}: ${req.method}: ${req.url}`;
  console.log(log);
  fs.appendFile('server.log', log + '\n', (err) => {
    if(err){
      console.log('Unable to append the file');
    }
  });
  next();
});

//Express middleware
// app.use((req, res, next) => {
//   res.render('maintenance.hbs', {
//     pageTitle: 'Home Page',
//     message: 'Site is under maintenance'
//   });
// });

app.use(express.static(__dirname + '/public'));


hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear();
});

hbs.registerHelper('upperCaseIt', (text) => {
  return text.toUpperCase();
});
app.get('/', (req, res) => {
  res.render('home.hbs', {
    pageTitle: 'Home Page',
    name: 'Pri',
    hobbies: [
      'swimming',
      'talking',
      'eating'
    ]
  })
});

app.get('/about', (req, res) => {
  res.render('about.hbs', {
    pageTitle: 'About Page'
  });
});

app.get('/projects', (req, res) => {
  res.render('projects.hbs', {
    pageTitle: 'Projects'
  });
});

app.get('/bad', (req, res) => {
  res.send({
    error: 404
  })
});

app.listen(port, () => {
  console.log(`Server is up and running on port ${port}`);
});