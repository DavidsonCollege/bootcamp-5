import React, { Component } from 'react';
import Folder from "./Folder";
import AddFolder from "./AddFolder";


class ListFolder extends Component{



  render(){

    return(

      <div>
      <h3>My Folders: </h3>

      <AddFolder onSubmitFolder={this.props.onSubmitFolder}  value={this.props.value}
      onChangeFolder = {this.props.onChangeFolder} />

      {this.props.folderNames.map(folder =>

        <div>

        <h4>{folder}</h4>
        <div className="listFolder">
        <Folder items={this.props.items} onDelete={i => this.props.onDelete(i)}
        onComplete={i => this.props.onComplete(i)} folderName={folder}
        colorChange={this.props.colorChange} changeDate={this.props.changeDate}
        clickStar={this.props.clickStar} onDeleteFolder={this.props.onDeleteFolder}
        />
        </div>
        </div>
      )}


      </div>


    );
  }

}

export default ListFolder;
