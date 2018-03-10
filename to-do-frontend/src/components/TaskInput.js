import React, { Component } from 'react';

class TaskInput extends Component {
  
  render() {
    return (
      <div>
        <form ref={self => { this.formInput = self }} onSubmit={
          (e) => {
            e.preventDefault()
            if (this.formInput.task.value !== '') {
              this.props.addItem(this.formInput.task.value)
              this.formInput.task.value = ''
            }
          }
        }>
        <input type="text" name="task" placeholder="Enter New Task" />
        <button type="submit" className="btn btn-default">Add</button>
      </form>
      </div>
    );

  }
}
export default TaskInput;