const express = require('express');
const mustacheExpress = require('mustache-express');
const bodyParser = require('body-parser');
const sequelize = require('sequelize')
const models = require("./models");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.engine('mustache', mustacheExpress());

app.set('views', './views')
app.set('view engine', 'mustache')

// function createUser() {
//   const user = models.User.build({
//     name: 'Courtney Carlson',
//     email: 'courtney.trochim@gmail.com',
//     bio: 'student'
//   });
//
//
//   user.save().then(function(newUser) {
//     console.log(newUser.dataValues);
//   })
// }
// createUser();
//
// function listUsers() {
//   models.User.findAll().then(function(users) {
//     users.forEach(function(user) {
//       console.log(user.dataValues);
//     })
//   })
// }
//
// listUsers();

app.get('/', function (req, res){
  res.render('index')
})

app.listen(3000, function() {
  console.log('Successfully started express application!');
})

process.on('SIGINT', function() {
  console.log("\nshutting down");
  const index = require('./models/index')
  index.sequelize.close()

 // give it a second
  setTimeout(function() {
    console.log('process exit');
    process.exit(0);
  }, 1000)
});
