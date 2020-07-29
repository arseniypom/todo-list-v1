const express = require('express');
const bodyParser = require('body-parser');
const date = require(__dirname + '/date.js')

const app = express();

const listOfTasks = ['Buy food', 'Cook food', 'Eat food'];
const listOfWorkingTasks = [];

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static('public'))

app.get('/', function(req, res) {
  res.render('list', {
    listTitle: date.getDate(),
    newListItems: listOfTasks
  })
})

app.get('/work', function(req, res) {
  res.render('list', {
    listTitle: 'Work list',
    newListItems: listOfWorkingTasks
  })
})

app.post('/', function(req, res) {
  const newTask = req.body.newItem;
  if (req.body.list === 'Work') {
    listOfWorkingTasks.push(newTask);
    res.redirect('/work');
  } else {
    listOfTasks.push(newTask);
    res.redirect('/');
  }
})


app.listen(process.env.PORT || 3000, function() {
  console.log("Server started on port 3000");
});
