import React from 'react';

class CompletedList extends React.Component{

  render() {
    return (
      <div>
        <h3> Completed Todos </h3>
        <ol>
          {this.props.completed.map((todo) => {
            return <li key={todo._guid}>{todo.description} Completed: {todo.completed}
            <button onClick={this.props.handleToIncomplete}
            value={todo._guid}>Toggle Status</button>
            <br></br>
            <button onClick={() => this.props.handleDelete(todo)}
        >Remove</button>

            </li>
          })}
        </ol>

      </div>
    )
  }

}
export default CompletedList;
