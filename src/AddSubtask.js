import React from 'react';

export default class AddSubtask extends React.Component{
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
  }
  onSubmit(event) {
    event.preventDefault();
    var newItemValue = this.refs.itemName.value,
        parentIndex = this.props.item.index;
    if(newItemValue) {
      this.props.addSubtask({newItemValue, parentIndex});
      this.refs.form.reset();
    }
  }
  render () {
    return (
      <form ref='form' onSubmit={this.onSubmit}>
        <input type='text' ref='itemName'/>
        <button type='submit' class = 'addButton'>Add Subtask</button>
      </form>
    );
  }
}
