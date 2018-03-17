import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Divider, Card, RaisedButton, TextField, CardText, List, ListItem } from 'material-ui';

class TodoCard extends React.Component{
    constructor(props){
        super(props);
    }
    
    render() {
        return (
            <ListItem primaryText={this.props.todoText}></ListItem>
        );
    }
}

class AddTodoCard extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            todoText: ""
        }
    }

    handleChange = (e) => {
        this.setState({
            todoText: e.target.value
        });
    }

    handleClick = (e) => {
        if(this.state.todoText === "") return;
        console.log("clicked todo add");
        this.props.onClick(this.state.todoText);
        this.setState({
            todoText: ""
        });
    }

    render(){
        return (
            <div>
                    <TextField id="todoInput" style={{
                        margin: "0px 8px 0px 0px",
                    }} type="text" floatingLabelText="Enter Todo" value={this.state.todoText} onChange={this.handleChange}></TextField>        
                    <RaisedButton type="submit" primary={true} value="Add" onClick={this.handleClick} label="Add"/>
            </div>
        );
    }
}


function TodoList(props){
    const listValues = props.todoList.map((todoItem) => (
        <div>
            <TodoCard todoText={todoItem}/>
            <Divider />
        </div>
    ));
    return (
        <List>
            {listValues}
        </List>
    );
}

class App extends React.Component{
    
    constructor(props){
        super(props);
        this.state = {
            todoList: []
        };
    }
    
    handleSubmit = (todoText) => {
        let todoList = this.state.todoList.slice();    
        todoList.push(todoText);
        this.setState({
            todoList: todoList
        });
    }

    render() {
        return(
            <MuiThemeProvider>
                <div className="center-align">
                    <AddTodoCard onClick = {this.handleSubmit} />
                    <TodoList todoList={this.state.todoList}/>
                </div>
            </MuiThemeProvider>
        );
    }
}

ReactDOM.render(<App />, document.getElementById('root'));