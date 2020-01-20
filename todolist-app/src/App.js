import React, { Component } from 'react';
import TodoItem from './components/TodoItem';
import './style.css';

class App extends Component {
  state = {};
  render() {
    return (
      <div className="todo-list">
        <TodoItem />
        <TodoItem />
        <TodoItem />
        <TodoItem />
      </div>
    );
  }
}

export default App;
