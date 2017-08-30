const models = require("./models");

function createUser() {
  const user = models.User.build({
    name: 'Courtney Carlson',
    email: 'courtney.trochim@gmail.com',
    bio: 'student'
  });


  user.save().then(function(newUser) {
    console.log(newUser.dataValues);
  })
}
createUser();

function listUsers() {
  models.User.findAll().then(function(users) {
    users.forEach(function(user) {
      console.log(user.dataValues);
    })
  })
}

listUsers();
