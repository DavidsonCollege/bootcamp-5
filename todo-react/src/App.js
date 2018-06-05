import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Todo from './components/Todo'


class App extends Component {
  constructor(props){
    super(props);
    let currentTime = new Date(1997,10,24,1,1,1,1);
    this.state = {
      todos: [{description: 'default', dateDue: currentTime.toString(), isComplete: true, _id: 0, color: "black", star: false},
      {description: 'default2', dateDue: null, isComplete: false, _id: 1, color: "black", star: false}],
      input: "",
      date: Date.now(),
      counter: 2,
      ordering: "default",
    };
  }

  onChange = (event) => {
    event.preventDefault();
    this.setState({...this.state, input: event.target.value});
  }

  onAddToDo = event =>{
    event.preventDefault();
    //description = event.
      let newToDo = {description: this.state.input, dateDue: null, isComplete: false, _id: this.state.counter, color: "black", star: false};
      let todos = [...this.state.todos];
      todos.push(newToDo);
      this.setState({...this.state, todos:todos, counter:this.state.counter+1});
  }


  onDeleteTodo = id => {
    let todos = this.state.todos;
    let i = todos.findIndex((todo) => todo._id===id);
    todos.splice(i, 1);
    this.setState({...this.state,todos});
  }

  deleteAll = () => {
    let todos = [];
    this.setState({...this.state,todos});
  }

  markAsUncomplete = id => {
    //JSON.parse(JSON.stringify(array))
    let todos = [...this.state.todos];
    todos.find((todo)=>todo._id===id).isComplete = false;
    // let newToDo = {description: this.state.todos[i].description,
    //   dateDue: this.state.todos[i].dateDue, isComplete: false,
    //   _id: this.state.todos[i]._id};
    this.setState({...this.state, todos:todos});
  }

  markAsComplete = id => {
    // console.log("here");
    let todos = [...this.state.todos];
    // console.log(id);
    todos.find((todo)=>todo._id===id).isComplete = true;
    this.setState({...this.state, todos:todos});
  }

  changeDate = event => {
    event.preventDefault();
    //console.log(event.target.value);
    this.setState({...this.state, date: event.target.value});
    //console.log(this.state.date);
  }

  setDate = (event, id) => {
    event.preventDefault();
    //console.log("here");
    let todos = [...this.state.todos];
    todos.find((todo)=>todo._id===id).dateDue = this.state.date;
    this.setState([...this.state, todos:todos]);
  }

  setOrdering = () => {
    console.log("here");
    this.setState({...this.state, ordering: "alphabetically"});
  }

  setOrderingByDate = () => {
    console.log("here");
    this.setState({...this.state, ordering: "date"});
  }

  setColor = (event, id) => {
    event.preventDefault();
    let todos = [...this.state.todos];
    todos.find((todo)=>todo._id===id).color = event.target.value;
    this.setState({...this.state, todos:todos})
  }

  setStar = id => {
    let todos = [...this.state.todos];
    let todo = todos.find((todo)=>todo._id===id);
    todo.star = (todo.star) ? false : true;
    this.setState({...this.state, todos:todos})
  }

  render() {
    return (
      <div>
        <Todo todos={this.state.todos} onDeleteTodo={this.onDeleteTodo}
        onAddToDo={this.onAddToDo} onChange={this.onChange} input={this.state.input}
        markAsUncomplete={this.markAsUncomplete} markAsComplete={this.markAsComplete}
      changeDate={this.changeDate} setDate={this.setDate}
      ordering={this.state.ordering}
        setOrdering={this.setOrdering} setOrderingByDate={this.setOrderingByDate}
        deleteAll={this.deleteAll} setColor={this.setColor}
        color={this.state.color} setStar={this.setStar}/>
      </div>
    );
  }
}

export default App;
