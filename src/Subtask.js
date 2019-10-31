import React from 'react';

export default class Subtask extends React.Component{
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
  onClickDelete() {
    var index = parseInt(this.props.index),
        parentIndex = parseInt(this.props.item.parentIndex);
    this.props.removeTask({index, parentIndex});
  }
  onClickEdit() {
    this.setState({isEdit:true});
  }
  onSaveEdit() {
    var index = parseInt(this.props.index),
        newValue = this.refs.itemValue.value,
        parentIndex = parseInt(this.props.item.parentIndex);
    if(newValue) {
      this.props.editTask({index, newValue, parentIndex});
      this.setState({isEdit:false});
      this.refs.itemValue.value = '';
    }
  }
  render () {
    return(
      <li>
        <div>
          <input type='text' ref='itemValue' class='marginAlign' style={{float: 'left', display: this.state.isEdit?'block':'none'}} onchange={this.onChange}/>
          <span ref='valueLabel' class='marginAlign' style={{float: 'left', display: !this.state.isEdit?'block':'none'}} >{this.props.item.value}</span>
          <button type='button' class='redButton' onClick={this.onClickDelete}>X</button>
          <button type='button' class='marginAlign' style={{float: 'left', display: !this.state.isEdit?'block':'none'}} onClick={this.onClickEdit}>Edit</button>
          <button type='button' class='addButton' style={{float: 'left', display: this.state.isEdit?'block':'none'}} onClick={this.onSaveEdit}>Save</button>
        </div>
      </li>
    );
  }
}
