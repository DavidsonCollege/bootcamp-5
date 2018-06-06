import React, { Component } from 'react';
import Item from "./Item";


class Folder extends Component{



  render(){

    return(

      <div>
      <button type="button" onClick={() => {
        this.props.onDeleteFolder(this.props.folderName)
        }}>Delete</button>

      <ul>

        {this.props.items.filter(item => item.folder === this.props.folderName)
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

export default Folder;
