import React, { Component } from 'react';
import {CSVLink, CSVDownload} from 'react-csv';

// function Todo(props){
//   return (<div> clssName="todo" {props.value.description}</div>);
// }

class Todos extends Component {
  // renderTodo(i){
  //   return (<Todo value={this.props.todos[i].description}/>);
  // }
  reorder(array){
    let temp = [...array];
    temp.sort((a, b) => a.description.localeCompare(b.description));
    return temp;
  }

  reorderDate(array){
    let temp = [...array];
    temp.sort((a, b) => a.dateDue.localeCompare(b.dateDue));
    return temp;
  }

  render(){
    let completed = this.props.todos.filter(function (todo) {return todo.isComplete === true});
    let uncompleted = this.props.todos.filter(function (todo) {return todo.isComplete === false});
    let starStyle = {
      color: "yellow",
      fontSize: "36px",
      background:"white"
    }
    if(this.props.ordering==="alphabetically"){
      completed = this.reorder(completed);
      uncompleted = this.reorder(uncompleted);
    } else if(this.props.ordering==="date"){
      completed = this.reorderDate(completed);
      uncompleted = this.reorderDate(uncompleted);
    }
    // this.props.todos.map((todo) => {
    //   if (todo.isComplete) completed.push(todo);
    //   else uncompleted.push(todo);
    // });

    return (

        <div className="todos-container">
        <div className="Ordering options">
          <button onClick={this.props.setOrdering}>alphabetically</button>
          <button onClick={this.props.setOrderingByDate}>by date</button>
        </div>
        <div className="completed-container">
        <h3>Completed Tasks</h3>
        {completed.map((todo, i) => {
          return(
            <div key={todo._id}>
              <div style={{color:todo.color}}>{todo.description}</div>
              {todo.dateDue ? (<div>{todo.dateDue}</div>) : (
                <div>
                  <div>Due date not set</div>
                    <input id="date" type="datetime-local" onChange={this.props.changeDate}/>
                    <button onClick={(event)=>this.props.setDate(event, todo._id)}>Set Due Date</button>
                </div>

              )}
              <button onClick={()=>this.props.onDeleteTodo(todo._id)}>Delete</button>
              <button onClick={()=>this.props.markAsUncomplete(todo._id)}>Mark as uncompleted</button>
              <select onChange={(event)=>this.props.setColor(event, todo._id)}>
                <option value="black">black</option>
                <option value="red">red</option>
                <option value="yellow">yellow</option>
                <option value="blue">blue</option>
                <option value="pink">pink</option>
                <option value="aqua">aqua</option>
                <option value="indigo">indigo</option>
              </select>
              <br></br>
                {todo.star ? <h style={starStyle} onClick={()=>this.props.setStar(todo._id)}>&#9733;</h> :
                <h style={starStyle} onClick={()=>this.props.setStar(todo._id)}>&#9734;</h> }
            </div>);
        })
      }
      </div>
      <div className="uncompleted-container">
      <h3>Uncompleted Tasks</h3>
          {
            uncompleted.map((todo, i) => {
            return(
              <div key={todo._id}>
                <div style={{color:todo.color}}>{todo.description}</div>
                {todo.dateDue ? (<div>{todo.dateDue}</div>) : (
                  <div>
                    <div>Due date not set</div>
                      <input id="date" type="datetime-local" onChange={this.props.changeDate}/>
                      <button onClick={(event)=>this.props.setDate(event, todo._id)}>Set Due Date</button>
                  </div>
                )}
                <button onClick={()=>this.props.onDeleteTodo(todo._id)}>Delete</button>
                <button onClick={()=>this.props.markAsComplete(todo._id)}>Mark as completed</button>

                <select onChange={(event)=>this.props.setColor(event, todo._id)}>
                  <option value="black">black</option>
                  <option value="red">red</option>
                  <option value="yellow">yellow</option>
                  <option value="blue">blue</option>
                  <option value="pink">pink</option>
                  <option value="aqua">aqua</option>
                  <option value="indigo">indigo</option>
                </select>
                <br></br>
                  {todo.star ? <h style={starStyle} onClick={()=>this.props.setStar(todo._id)}>&#9733;</h> :
                  <h style={starStyle} onClick={()=>this.props.setStar(todo._id)}>&#9734;</h> }
              </div>);
          })
        }
      </div>
      <div>
        <form onSubmit={this.props.onAddToDo}>
          Add a todo: <input type="text" name="description" onChange={this.props.onChange}/>
          <input type="submit" value="submit"/>
        </form>
      </div>
      <div>
          <button onClick={this.props.deleteAll}>Delete all todos</button>
          <CSVLink data={this.props.todos}>Download</CSVLink>
      </div>
      </div>
    );
  }
}

export default Todos;
