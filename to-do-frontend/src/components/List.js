import React, { Component } from 'react';
import SingleItem from './SingleItem'

class List extends Component {
  render() {
    let itemsJSX = this.props.tasks.map((item, i) => {
      return <SingleItem
                item={item}
                index={i}
                key={i}
                markCompleted={this.props.markCompleted}
                removeItem={this.props.removeItem.bind(null, item)}
              />
    })
    return (
      <div>
        <ul>
          {itemsJSX}
        </ul>
      </div>
    );
  }
}
export default List;