import React, { Component } from 'react';

class AddTodo extends Component{

render(){
  return(
    <form onSubmit={this.props.onSubmit}>
      <input type = "text" value={this.props.value} onChange={this.props.onChange}/>
      <input type="submit" value="Add"/>
      </form>

  );
}

}



export default AddTodo;
