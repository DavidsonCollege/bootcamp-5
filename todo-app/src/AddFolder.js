import React, { Component } from 'react';

class AddFolder extends Component{

render(){
  return(


    <form onSubmit={this.props.onSubmitFolder}>
      <input type = "text" value={this.props.value} onChange={this.props.onChangeFolder}/>
      <input type="submit" value="Add"/>
      </form>

  );
}

}



export default AddFolder;
