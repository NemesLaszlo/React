import React, { Component } from 'react';
import PropTypes from 'prop-types';

class TodoItem extends Component {
  state = {};

  btnStyle = {
    background: '#ff0000',
    color: '#fff',
    border: 'none',
    padding: '5px 9px',
    borderRadius: '50%',
    cursor: 'pointer',
    float: 'right'
  };

  getStyle = () => {
    return {
      background: '#f4f4f4',
      padding: '10px',
      borderBottom: '1px #ccc dotted',
      textDecoration: this.props.todo.completed ? 'line-through' : 'none'
    };
  };

  render() {
    return (
      <div style={this.getStyle()}>
        <p>
          <input
            type="checkbox"
            onChange={() => this.props.markComplete(this.props.todo.id)}
          />{' '}
          {this.props.todo.title}
          <button
            onClick={() => this.props.delTodo(this.props.todo.id)}
            style={this.btnStyle}
          >
            x
          </button>
        </p>
      </div>
    );
  }
}

TodoItem.propTypes = {
  todo: PropTypes.object.isRequired,
  markComplete: PropTypes.func.isRequired,
  delTodo: PropTypes.func.isRequired
};

export default TodoItem;
