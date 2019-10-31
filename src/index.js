import React from 'react';
import ReactDOM from 'react-dom';

import ItemsList from './ItemsList';
import AddItem from './AddItem';
import './custom.css'

var items = [], index = 1, subIndex = 1;
items.push({index: index++, value: 'Learn React', subtasks: [{index: subIndex++, value: 'subtask', parentIndex: 1}]});
items.push({index: index++, value: 'Play Videogames', subtasks: []});
items.push({index: index++, value: 'Buy Food', subtasks: []});

class App extends React.Component {
  constructor (props) {
    super(props);
    this.addItem = this.addItem.bind(this);
    this.addSubtask = this.addSubtask.bind(this);
    this.editItem = this.editItem.bind(this);
    this.editTask = this.editTask.bind(this);
    this.removeItem = this.removeItem.bind(this);
    this.removeTask = this.removeTask.bind(this);
    this.state = {items: items};
  }
  addItem(item) {
    items.unshift({
      index: index++,
      value: item.newItemValue,
      subtasks: []
    });
    this.setState({items: items});
  }
  addSubtask(item) {
    items.forEach(record => {
      if (record.index === item.parentIndex) {
        record.subtasks.unshift({
          index: subIndex++,
          value: item.newItemValue,
          parentIndex: item.parentIndex
        })
      }
    });
    this.setState({items: items});
  }
  editItem(item) {
    items.forEach((record) => {
      if(record.index===item.index) {
        record.value = item.newValue
      }
    });
    this.setState({items: items});
  }
  editTask(item) {
    items.forEach((record) => {
      if(record.index===item.parentIndex) {
        record.subtasks.forEach(task => {
          if(task.index===item.index) {
            task.value = item.newValue
          }
        })
      }
    });
    this.setState({items: items});
  }
  removeItem (itemIndex) {
    items.splice(itemIndex, 1);
    this.setState({items: items});
  }
  removeTask (taskItem) {
    items.forEach(record => {
      if (record.index === taskItem.parentIndex) {
        record.subtasks.splice(taskItem.index, 1);
      }
    });
    this.setState({items: items});
  }
  render() {
    return (
      <div>
        <h2>Items List</h2>
        <AddItem addItem={this.addItem} />
        <ItemsList items={this.props.initItems} subtasks = {this.props.initTasks} removeItem={this.removeItem} editItem={this.editItem} removeTask={this.removeTask} editTask={this.editTask} addSubtask = {this.addSubtask}/>
      </div>
    );
  }
}


let container = document.getElementById('app');
let component = <App initItems={items} />;
ReactDOM.render(component, container);
