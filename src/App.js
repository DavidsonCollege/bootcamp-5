import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import TodoList from './components/TodoList.js';
import CompletedList from './components/CompletedList.js';

class App extends Component {
  constructor(props) {
  super(props)
  this.state = {
    todos: [],
    completed: [],
    input: "",
    dateInput: "",

    }
  }

updateColor = (event, todo) => {
  console.log(event.target.value);
  console.log(todo)
  var tempArray = [...this.state.todos]
  tempArray.map((obj) => {
    if(obj._guid == todo._guid){
      obj.color = event.target.value
    }
  })
  this.setState({...this.state, todos:tempArray})
}

clearAll = () => {
  const tempArray = [];
  const tempCompleted = [];

  this.setState({...this.state, todos:tempArray, completed: tempCompleted});
}
reorder = () => {
  var tempArray = [...this.state.todos]
  tempArray = tempArray.sort(function(a,b){ return a.description.localeCompare(b.description)});
  var tempCompleted = [...this.state.completed]
  tempCompleted = tempCompleted.sort(function(a,b){ return a.description.localeCompare(b.description)});

  this.setState({...this.state, todos:tempArray, completed: tempCompleted})

}
changeDate = (todo) => {
  var tempArray = [...this.state.todos]
  console.log(tempArray);
  tempArray.map((obj) => {
    if(obj._guid == todo._guid){
      obj.dueDate = this.state.dateInput
    }
  })
  this.setState({...this.state, todos:tempArray})
}
  handleToComplete = (event) =>{
    event.preventDefault()

    var id = event.target.value;
    var todo = {};

    var tempArray = [...this.state.todos].filter(( obj ) => {
      if(obj._guid == id){
        todo = obj
        todo.completed = true;
      }
    return obj._guid != id;
    });

    var tempCompleted = [...this.state.completed];
    tempCompleted.push(todo);
    this.setState({ ...this.state, todos:tempArray , completed:tempCompleted})

  }

  handleToIncomplete = (event) =>{
    event.preventDefault()

    var id = event.target.value;
    var todo = {};

    var tempArray = [...this.state.completed].filter(( obj ) => {
      if(obj._guid == id){
        todo = obj
        todo.completed = false;
      }
    return obj._guid != id;
    });

    var tempTodo = [...this.state.todos];
    tempTodo.push(todo);
    this.setState({ ...this.state, completed:tempArray , todos:tempTodo})

  }

  handleDelete = (todo) =>{
    console.log(todo)

    if(todo.completed){
      var tempArray = [...this.state.completed].filter(( obj ) => {
      return obj._guid != todo._guid;
      });
      //console.log(temp);
      this.setState({ ...this.state, completed:tempArray})

    }
    else{
      var tempArray = [...this.state.todos].filter(( obj ) => {
      return obj._guid != todo._guid;
      });
      //console.log(temp);
      this.setState({ ...this.state, todos:tempArray})
    }

  }

  handleSubmit = (event) =>{

    event.preventDefault()
    if(!(this.state.input === "")){
    const addObj = {description: this.state.input,
      _guid: Math.floor(Math.random() * 100000),
      completed:false, dueDate: this.state.dateInput,
      color: "red"};

    var temp = [...this.state.todos];
    temp.push(addObj);

    temp.sort(function(a,b){  if (a.dueDate < b.dueDate)
     return -1;
  if (a.dueDate > b.dueDate)
    return 1;
  return 0;});

    this.setState({ ...this.state, todos:temp})
    }

  }

  handleChange = (event) => {
    this.setState({
      input: event.target.value
    })
  }

  handleDate = (event) => {
    this.setState({
      dateInput:event.target.value
    })
  }


  render() {
    return (
      <div className="App">

        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">The Greatest Todo List</h1>
        </header>

        <p className="App-intro">

          <TodoList todos = {this.state.todos}
          input = {this.state.input}

          updateColor ={this.updateColor}
          clearAll={this.clearAll}
          reorder={this.reorder}
          changeDate={this.changeDate}
          handleDate ={this.handleDate}
          handleSubmit={this.handleSubmit}
          handleChange={this.handleChange}
          handleDelete={this.handleDelete}
          handleToComplete ={this.handleToComplete}/>

          <CompletedList completed = {this.state.completed}
          handleDelete={this.handleDelete}
          handleToIncomplete ={this.handleToIncomplete}/>

        </p>

      </div>
    );
  }
}

export default App;
