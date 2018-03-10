import React, { Component } from 'react';
import '../App.css';
import TaskInput from './TaskInput'
import List from './List'
import axios from 'axios'

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // message: "",
      tasks: [],
      pageLoaded: false
    };
  }
  componentDidMount() {
    axios.get(`http://localhost:8080/tasks`)
      .then((response) => {
        this.setState({
          tasks: response.data,
          pageLoaded: true
        })
      })
  }
  addItem = (task) => {
    axios.post('http://localhost:8080/tasks/add', {
      task: task,
      completed: false
    })
      .then((response) => {
        console.log(response);
      })
        
    this.setState({
      tasks: this.state.tasks.concat({
        task,
        completed: false,
      })
    })
  }
  markCompleted = (index) => {
    axios.put('http://localhost:8080/tasks/update', {
      task: this.state.tasks[index]
    })
    let tasks = this.state.tasks.slice()
    tasks[index].completed = !tasks[index].completed
    this.setState({
      tasks
    })
  }
  removeItem(toBeRemoved) {
    console.log(toBeRemoved)
    axios.delete('http://localhost:8080/tasks/delete', {
      params: {
        _id: toBeRemoved._id,
        task: toBeRemoved.task,
        completed: toBeRemoved.completed,
      }
    })

    let filteredItems = this.state.tasks.filter((item) => {
      return item !== toBeRemoved
    });
    this.setState({ tasks: filteredItems })
  }
  render() {
    return (
      (this.state.pageLoaded) ? (
        <div className="container text-center">
          <div className="row">
            <div className="col-md-12">
              <h1>To Do List</h1>
              <TaskInput addItem={this.addItem} />
              <p className="message text-danger"> {this.state.message}</p>
              <div className="col-sm-12">
                <List tasks={this.state.tasks} markCompleted={this.markCompleted} removeItem={this.removeItem.bind(this)} />
              </div>
            </div>
          </div>
        </div>
      ) : (
          <h1>Page loading...</h1>
        )
    );
  }
}


export default App;
