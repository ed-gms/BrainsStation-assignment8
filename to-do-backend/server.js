const express = require('express')
const app = express()
const Task = require('./models/Task')
const port = process.argv[2] || 8080

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017');

mongoose.Promise = global.Promise;

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log("Connected to db at /data/db/")
});

const bodyParser = require('body-parser')

app.use(bodyParser.json())

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS")
  next();
});

app.get('/tasks', (req, res) => {
  Task.find({})
    .then(tasks => {
      res.json(tasks)
    })
})

app.post('/tasks/add', (req, res) => {
  console.log(req.body)
  const { task, completed } = req.body
  let newTask = Task({
    task,
    completed
  })
  newTask.save()
    .then(task => {
      res.json(task)
    })
})

app.put('/tasks/update/', (req, res) => {
  let task = req.body.task
  let update = {
    completed: task.completed
  }
  let query = { "_id": task._id }

  Task.findOneAndUpdate(query, update, { new: true, runValidators: true })
    .then(updatedObject => {
      res.json(updatedObject);
    })
    .catch(err => {
      console.log(err)
      res.status(400).json({ err });
    })
});

app.delete('/tasks/delete/', (req, res) => {
  console.log(req.query)
  Task.findOneAndRemove({ "_id": req.query._id })
    .then(task => {
      res.json({ deleted: true })
    })
    .catch(err => {
      console.log(err);
      res.status(400)
        .json({ err });
    })
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})