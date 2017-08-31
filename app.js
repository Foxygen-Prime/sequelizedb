const express = require('express');
const mustacheExpress = require('mustache-express');
const bodyParser = require('body-parser');
const sequelize = require('sequelize')
const models = require("./models");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

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

app.get('/', function(req, res) {
  res.render('index')
})

app.get('/users', function(req, res) {
  models.User.findAll().then(function(userslist) {
    res.render('usersgui', {
      userskey: userslist
    });
  })
})

app.get('/userForm', function(req, res) {
  res.render('UserForm');
})

app.post('/create_user', function(req, res) {
  const userToCreate = models.User.build({
    name: req.body.formInputName,
    email: req.body.formInputEmail,
    bio: req.body.formInputBio
  });
  console.log(req.body);
  userToCreate.save().then(function() {
    res.redirect("/users")
  })
})

app.post('/delete_user/:idOfTheUser', function(req, res) {
  console.log("the ID of User is " + req.params.idOfTheUser);
  models.User.destroy({where: {id: req.params.idOfTheUser}}).then(function() {
 res.redirect("/users")
  })
  });

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
