import React, { Component } from 'react';
import Item from "./Item";


class List extends Component{



  render(){

    return(

      <div>

      <ul>

        {this.props.items.filter(item => item.completed === this.props.completed)
          .map(item =>

            <Item item={item}
            onDelete={this.props.onDelete}
            onComplete={this.props.onComplete}
            colorChange={this.props.colorChange} changeDate={this.props.changeDate}
            clickStar={this.props.clickStar}/>
        )  }


      </ul>

      </div>


    );
  }

}

export default List;
