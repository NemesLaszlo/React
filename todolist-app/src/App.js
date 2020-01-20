import React, { Component } from 'react';
import TodoItem from './components/TodoItem';
import todosData from './datas/todosData';
import './style.css';

class App extends Component {
  state = {
    todos: todosData
  };

  List_todoItems() {
    const todoItems = this.state.todos.map(item => (
      <TodoItem key={item.id} item={item} onChange={this.handleChange} />
    ));
    return todoItems;
  }

  handleChange = id => {
    this.setState(prevState => {
      const updatedTodos = prevState.todos.map(todo => {
        if (todo.id === id) {
          todo.completed = !todo.completed;
        }
        return todo;
      });
      return {
        todos: updatedTodos
      };
    });
  };

  render() {
    return <div className="todo-list">{this.List_todoItems()}</div>;
  }
}

export default App;
