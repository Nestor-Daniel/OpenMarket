import React from 'react';

import Subtask from './Subtask';
import AddSubtask from './AddSubtask';

export default class Item extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isEdit: false,
      item: props.item
    }
    this.onClickEdit = this.onClickEdit.bind(this);
    this.onClickDelete = this.onClickDelete.bind(this);
    this.onSaveEdit = this.onSaveEdit.bind(this);
  }
  onClickEdit() {
    this.setState({isEdit:true});
  }
  onSaveEdit() {
    var index = parseInt(this.props.index),
        newValue = this.refs.itemValue.value;
        if(newValue) {
          this.props.editItem({index, newValue});
          this.setState({isEdit:false});
          this.refs.itemValue.value = '';
        }
  }
  onClickDelete() {
    var index = parseInt(this.props.index);
    this.props.removeItem(index);
  }
  render () {
    if(this.props.item.subtasks && this.props.item.subtasks.length){
      var tasks = this.props.item.subtasks.map((item, index) => {
        return (<Subtask key={index} item={item} index={index+1} removeTask={this.props.removeTask} editTask={this.props.editTask}/>);
      });
    }
    return(
      <li>
        <div>
            <input type='text' ref='itemValue' class='marginAlign' style={{float: 'left', display: this.state.isEdit?'block':'none'}} onchange={this.onChange}/>
            <span ref='valueLabel' class='marginAlign' style={{float: 'left', display: !this.state.isEdit?'block':'none'}} >{this.props.item.value}</span>
            <button type='button' class='redButton' style={{float: 'left'}} onClick={this.onClickDelete}>X</button>
            <button type='button' class='marginAlign' style={{float: 'left', display: !this.state.isEdit?'block':'none'}} onClick={this.onClickEdit}>Edit</button>
            <button type='button' class='addButton' style={{float: 'left', display: this.state.isEdit?'block':'none'}} onClick={this.onSaveEdit}>Save</button>
            <AddSubtask style={{float: 'left'}} item={this.props.item} addSubtask={this.props.addSubtask} />
        </div>
        <ul>
          {tasks}
        </ul>
      </li>
    );
  }
}
