import { Component } from "react";

class TodoList extends Component {
  render() {
    const dateInput = this.props.state.dateInput;
    const todos = this.props.state.todos;
    const todos = this.props.state.todos;
    const todos = this.props.state.todos;
    const todos = this.props.state.todos;
    const todos = this.props.state.todos;
    const todos = this.props.state.todos;
    const todos = this.props.state.todos;

    const { todos, dateInput, a, x, v, f, a } = this.props.state;

    return (
      <div>
        <h3> TODOS: </h3>

        <form onSubmit={this.props.handleSubmit}>
          <label>Enter Todo:</label>
          <input type="text" value={this.props.input} onChange={this.props.handleChange} />
          <input type="date" value={this.props.dateInput} onChange={this.props.handleDate} />
          <button>Add!</button>
        </form>
        <button onClick={this.props.reorder}>Order Alphabetically</button>
        <button onClick={this.props.clearAll}>Clear All Todos</button>
        <h3> Incomplete Todos </h3>
        <ol>
          {this.props.todos.map(todo => {
            return (
              <li key={todo._guid}>
                <div style={{ color: todo.color }}>
                  {todo.description} Due: {todo.dueDate}
                  <br />
                  <button onClick={this.props.handleToComplete} value={todo._guid}>
                    Toggle Status
                  </button>
                  <select onChange={event => this.props.updateColor(event, todo)}>
                    <option value="green">Green</option>
                    <option value="blue">Blue</option>
                    <option value="magenta">Magenta</option>
                  </select>
                  <button onClick={() => this.props.handleDelete(todo)}>Remove</button>
                  <input type="date" value={this.props.dateInput} onChange={this.props.handleDate} />
                  <button onClick={() => this.props.changeDate(todo)}>Change</button>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    );
  }
}

export default TodoList;
