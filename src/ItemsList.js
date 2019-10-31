import React from 'react';

import Item from './Item';

export default class ItemsList extends React.Component {
  render () {
    var items = this.props.items.map((item, index) => {
      return (
        <Item key={index} item={item} index={index+1} removeItem={this.props.removeItem} editItem={this.props.editItem} editTask={this.props.editTask} removeTask={this.props.removeTask} addSubtask={this.props.addSubtask}/>
      );
    });
    return (
      <ul> {items} </ul>
    );
  }
};
