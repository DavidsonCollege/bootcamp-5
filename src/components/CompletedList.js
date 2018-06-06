import { Component } from "react";

const CompletedList = ({ handleToIncomplete, todos, completed }) => {
  return (
    <div>
      <h3> Completed Todos </h3>
      <ol>
        {completed.map(todo => (
          <li key={todo._guid}>
            {todo.description} Completed: {todo.completed}
            <button onClick={handleToIncomplete} value={todo._guid}>
              Toggle Status
            </button>
            <br />
            <button onClick={() => handleDelete(todo)}>Remove</button>
          </li>
        ))}
      </ol>
    </div>
  );
};

export default CompletedList;
