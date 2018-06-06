import React, { Component } from 'react';

class Item extends Component {


   render(){
     return(
       <li key={this.props.item._key}>

       <span className={"desc " + this.props.item.color}>
       {this.props.item.description}
       </span>

       <span onClick={(event) => this.props.clickStar(event, this.props.item)} className="star">
       {this.props.item.starred ? String.fromCharCode(9733) : String.fromCharCode(9734)}
       </span>

       <span className="info">
       <p>Due on: {this.props.item.dueDate} </p>
       </span>
       <form onSubmit={(event) => this.props.changeDate(event, this.props.item)}>
       <input type="date" name="date"/>
       <input type="submit" value="Set due date"/>
       </form>

       <button type="button" onClick={() => {
         this.props.onComplete(this.props.item)
       }}>Mark as completed.</button>


       <button type="button" onClick={() => {
         this.props.onDelete(this.props.item)
       }}>Delete</button>


       <form onChange={(event) => this.props.colorChange(event, this.props.item)}>
       <input type="radio" name="color" value="red"/>Red
       <input type="radio" name="color" value="blue"/>Blue
       <input type="radio" name="color" value="green"/>Green
       </form>


       </li>

     );
   }
}




export default Item;
