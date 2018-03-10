import React, { Component } from 'react';

class SingleItem extends Component {
  render() {
    let style = {}
    if (this.props.item.completed) {
      style = {
        textDecoration: 'line-through',
        color: 'grey'
      }
    }
    return (
      <li>
        <input
          type="checkbox"
          onChange={() => { this.props.markCompleted(this.props.index) }}
          checked={this.props.item.completed}
        />
        <label style={style}>{this.props.item.task}</label>
        <button onClick={this.props.removeItem} type="button" className="close">&times;</button>
      </li>
    );

  }
}
export default SingleItem;