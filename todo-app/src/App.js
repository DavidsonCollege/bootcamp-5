import React, { Component } from 'react';
import './App.css';
import List from "./List";
import AddTodo from "./AddTodo";
import ListFolder from "./ListFolder";



class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      items: [],
      formInput: '',
      formInputFolder: "",
      sortStatus: 'Default',
      folderNames: []
    }
  }

  //update input form for adding todo
  onChange = (event) => {
    this.setState({...this.state, formInput: event.target.value});
    event.preventDefault();
  }

   onSubmit = (event) => {
    this.addTodo(this.state.formInput);
    event.preventDefault();
  }


  //update input form for adding A FOLDER
  onChangeFolder = (event) => {
    this.setState({...this.state, formInputFolder: event.target.value});
    event.preventDefault();
  }

   onSubmitFolder = (event) => {
    this.addFolder(this.state.formInputFolder);
    event.preventDefault();
  }

  addFolder = (folderName) => {
    const folderNames = [...this.state.folderNames];
    folderNames.push(folderName);
    this.setState({...this.state, folderNames: folderNames, formInputFolder:""});
  }

  //update item state with new todo
  addTodo = (description) => {
    let items = this.state.items.slice();
    items.push({
      description: description,
      dueDate: null,
      completed: false,
      color: "black",
      starred: false,
      folder: null,
      _key: Math.random() * 10000

    });
    //resort array
    items = this.sortItems(items, this.state.sortStatus);

    this.setState({
      ...this.state,
      formInput: "",
      items: items,
    })
  }


  onDelete = (item) => {
    const items = [...this.state.items];
    const i = items.findIndex(element =>
      element === item);
    items.splice(i, 1);
    this.setState({...this.state, items: items});
  }

  onDeleteFolder = (folder) => {
    const folderNames = [...this.state.folderNames];
    const i = folderNames.findIndex(element =>
      element === folder);
    folderNames.splice(i, 1);
    let items = [...this.state.items];
    items.forEach(item => {
      if(item.folder === folder){
        item.folder = null;
      }
    })

    this.setState({...this.state, folderNames: folderNames, items: items});
  }


  onComplete = (item) => {
    const items = [...this.state.items];
    const i = items.findIndex(element =>
      element === item);
    items[i].completed = true;
    this.setState({...this.state, items: items});
  }

  deleteAll = () => {
    this.setState({...this.state, items: []});
  }

  colorChange = (event, item) => {
    const items = [...this.state.items];
    const i = items.findIndex(element =>
      element === item);
    items[i].color = event.target.value;
    this.setState({...this.state, items: items});
    event.preventDefault();
  }

  changeDate = (event, item) => {
    let items = [...this.state.items];
    const i = items.findIndex(element =>
      element === item);
    items[i].dueDate = event.target.date.value;

    items = this.sortItems(items, this.state.sortStatus);

    this.setState({...this.state, items: items});
    event.preventDefault();
  }

sortItems = (items, sortMethod) => {
  if(sortMethod === "Alphabetically"){
    items.sort((a,b) => {
    return a.description.localeCompare(b.description);
    });
  }
  else if (sortMethod === "By Due Date"){
    items.sort((a,b) => {
      if(a.dueDate === null){
        return 1;
      }
      if(b.dueDate === null){
        return -1;
      }
      if(a.dueDate === b.dueDate)
      return 0;
      return a.dueDate < b.dueDate ? -1 : 1;
    });
  }

  return items;

}

  sort = (event) => {
    let items = [...this.state.items];

    items = this.sortItems(items, event.target.value);

    this.setState({...this.state, items: items, sortStatus: event.target.value});
    event.preventDefault();
  }

  exportTodos = () => {
    const items = [...this.state.items];
    if(items.length === 0){
      alert("Nothing to export.");
      return;
    }
    let string = '';
    let temp = Object.keys(items[0]);
    temp.pop();
    string += temp.join(",") + '\n';
    items.forEach(item => {
      temp = Object.values(item);
      temp.pop();
      string += temp.join(',') + '\n';
    })

    this.download("todos.csv", string);
  }

  download = (filename, text) => {
    let element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename);

    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
  }

  clickStar = (event, item) => {

    let items = [...this.state.items];
    const i = items.findIndex(element =>
    element === item);
    items[i].starred = !items[i].starred;
    this.setState({...this.state, items: items});
    event.preventDefault();

  }




  render() {
    console.log(this.state);

    return (
      <div className="App">


      <button type="button" onClick={this.deleteAll}>Clear all todos</button>
      <button type="button" onClick={this.exportTodos}>Export Todos</button>


      <AddTodo onSubmit={event=>this.onSubmit(event)}
      onChange={event => this.onChange(event)}
      value={this.state.formInput} />

      <span> Sort todos </span>
      <select onChange={this.sort}>
        <option value="Default">Default</option>
        <option value="Alphabetically">Alphabetically</option>
        <option value="By Due Date">By Due Date</option>
      </select>

      <div className="container">
      <div className="list">
      <h3> All Incomplete Tasks </h3><br/>
      <List items={this.state.items} onDelete={i => this.onDelete(i)}
      onComplete={i => this.onComplete(i)} completed={false}
      colorChange={this.colorChange} changeDate={this.changeDate}
      clickStar={this.clickStar}
      />
      </div>
      <div className="list">
      <h3> All Completed Tasks </h3><br/>
      <List items={this.state.items} onDelete={i => this.onDelete(i)}
      onComplete={i => this.onComplete(i)} completed={true}
      colorChange={this.colorChange} changeDate={this.changeDate}
      clickStar={this.clickStar}
      />
      </div>

      <div className="list">
      <ListFolder items={this.state.items} onDelete={i => this.onDelete(i)}
      onComplete={i => this.onComplete(i)} folderNames={this.state.folderNames}
      colorChange={this.colorChange} changeDate={this.changeDate}
      clickStar={this.clickStar}
      value={this.state.formInputFolder} onSubmitFolder={this.onSubmitFolder}
      onChangeFolder={this.onChangeFolder} onDeleteFolder={this.onDeleteFolder}
      />
      </div>
      </div>
      </div>
    );
  }
}

export default App;
