import React, { Component } from 'react';
import { getTodoList, setTodo, addTodo, toggleTodo, removeTodo } from './actions';
import { connect } from 'react-redux';
import { Container, Row, Col } from 'reactstrap';

class App extends Component {
  
  componentWillMount() {
    this.props.getTodoList();
  }

  componentDidMount() {
    this.props.getTodoList();
  }

  renderTodoList() {
    const s = this.toggleCompleted.bind(this);
    const t = this.removeTodo.bind(this);
    return this.props.todoList.map((todo, i) => {
      return <Row key={i} >
      <Col onClick={s} data-todo={i}>{(new Date(todo.created)).toDateString()} {todo.todo}
       {todo.completed ? <i className="fa fa-check"></i> : null}
       {todo.completed ? (new Date(todo.completed)).toDateString() : null}
      </Col>
      <Col onClick={t} data-todo={i} title="Click to remove"><i className="fa fa-close"></i></Col>
       </Row>
      });
  }

  setTodo() { 
    const todo  = this.refs.todo.value;
    this.props.setTodo({ todo : { todo, completed : false, created : Date.now()} });
  }
  
  addTodo() {
    if(this.props.todo === undefined ) return null;    
    this.refs.todo.value = '';
    this.props.addTodo(this.props.todo);
    this.setState({todo:''});
  }

  removeTodo(e){
    let todoIndex = e.target.dataset.todo || e.target.parentNode.dataset.todo;
    this.props.removeTodo(todoIndex);
  }

  toggleCompleted(e) {
    const todoIndex = Number(e.target.dataset.todo);    
    const todoList = this.props.todoList;
    if(!todoList[todoIndex].completed) {
        this.props.toggleTodo(todoIndex);
    }
  }
  
  render() {
    return (
      <Container fluid className="justify-content-center align-content-center">
        <section className="text-center">
            <Row>
              <Col className="py-3">
                  <h1>To Do List</h1>
              </Col>
            </Row>            
            <Row>
              <Col>
                  <input type="text" name="todo" ref="todo" onChange={this.setTodo.bind(this)}/><button onClick={this.addTodo.bind(this)}>+</button>
              </Col>
            </Row>
            <Row className="my-3 py-5">
              <Col>
                  {this.renderTodoList()}
              </Col>
            </Row>
        </section>
      </Container>
    );
  }
}


const mapStateToProps = (state) => {
  return {
    todo : state.todo,
    todoList : state.todoList
  }
}

export default connect(mapStateToProps, {getTodoList, setTodo, addTodo, toggleTodo, removeTodo})(App);
