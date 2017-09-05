const express = require('express');
const hbs = require('hbs');
const fs = require('fs')
const app = express();
//dirname is the path of node-web-server
//process env get all environment variable as key
//value pair
const port = process.env.PORT || 5000;
hbs.registerPartials(__dirname+'/views/partials');
app.set('View engine', 'hbs');

//we use next to tell express that we are done
app.use((req, res, next) => {
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`;
  console.log(log);
  fs.appendFile('server.log', log + '\n', (err) => {
    if (err) {
      console.log('Unable to append to server');
    }
  });
  next();
});

// app.use((req, res, next) => {
//   res.render('maintainance.hbs')
// });

app.use(express.static(__dirname + '/public'));


hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear()
})
hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase();
})
//route handlders
app.get('/', (req, res) => {
  // res.send('<h1>Hello Express</h1>');
  res.render('home.hbs', {
    welcomeMessage: 'Hello Regi',
    pageTitle: 'Home Page',

  })
});

app.get('/about', (req, res) => {
  res.render('about.hbs', {
    pageTitle: 'About Page',
  })
});

app.get('/project', (req, res) => {
  res.render('project.hbs', {
    pageTitle: 'Project Page',
  })
});

app.get('/setting', (req, res) => {
  res.send({
    message: 'something went wrong'
  })
});

app.listen(port, () => {
  console.log(`Server is up on ${port}`);
})
