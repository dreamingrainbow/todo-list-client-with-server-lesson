## Todo List Client With Redux.

# Let's build our Todo List Client App with Redux
We will begin by creating the todo list app with create react app.
`create-react-app todo-list-client`

Once complete we can add our dependencies.
`npm i jquery bootstrap reactstrap font-awesome redux react-redux`

Once everything is installed we start in our `index.js` file.

Now we will need to update our `index.js` file so that we bring in our dependancies and setup our Middleware and Redux Store.

```JavaScript
import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducers from './reducers';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import 'bootstrap/dist/css/bootstrap.css';
import 'font-awesome/css/font-awesome.css';
ReactDOM.render(<Provider store={createStore(reducers)}><App /></Provider>, document.getElementById('root'));
registerServiceWorker();

```

In our `index.js` file we import our store, and Provider along with our reducers and other dependencies like bootstrap and font-awesome.

In our `index.js` we set our Provider with the store property. We pass it the store by creating a store using the reducers as a paramater to the createStore method we import from Redux.

Now, we can utilize Bootstrap, Font-awesome, and our Redux store, we can build our App files.

Let's create our directories next. Inside our `src` folder we can create two new folders. Create one folder named actions, and the other reducers. Inside these two filders, create a file named `index.js`

Next, inside of the `actions` folder lets create two more folders. Lets create a constants folder and a helpers folder.

Great, we will use these folders to help organize our code and keep it modular.

Now, we can start creating all of the logig for our actions. So, first lets tackle the constants.

Inside the constants folder, lets create another `index.js` file.

By now you may be wondering why so many `index.js` files. This pattern is called bootstrapping not to be confused with the bootstrap that we use for layout and design. In this case we bootstrap(load) the other file exports into one file.

So, in the `index.js` file we will join our constants, and the same in the helpers will join the helpers, and so the `index.js` under actions will load all the exports from the constants index and the helpers index.

At this point, we have several index.js files that are empty, but we will get back to them. Let's create another file.

This time we will create our first constant file, our `addTodo.js` should be create in our constants and in our helpers folders. Yup that's right two files named `addTodo.js` one in constants and one in helpers. 
We can work with the constants addTodo.js file first.

Let's open up the `src/actions/constants/addTodo.js` and add our first constant export.

```JavaScript
const ADD_TODO = 'ADD_TODO';

export { ADD_TODO };

```

Simple enough, right, we declare a constant called `ADD_TODO` and its value as a string `ADD_TODO`

Let's do the same for the rest of our constants. We can tackle `getTodoList` next.

```JavaScript
const GET_TODO_LIST = 'GET_TODO_LIST';

export {GET_TODO_LIST};

```

Remove Todo is just as simple.

```JavaScript
const REMOVE_TODO = 'REMOVE_TODO';

export { REMOVE_TODO };

```

Only a couple of files left to create. We can do the `setTodo.js` file next.

```JavaScript
const SET_TODO = 'SET_TODO';

export {SET_TODO};

```

Finally we just have our `toggleTodo.js` file.

```JavaScript
const TOGGLE_TODO = 'TOGGLE_TODO';

export {TOGGLE_TODO};

```

Great, now that we have them all created we can add them all to our `src/actions/constants/index.js` file.

```JavaScript
import { GET_TODO_LIST } from './getTodoList';
import { ADD_TODO } from './addTodo';
import { REMOVE_TODO } from './removeTodo';
import { SET_TODO } from './setTodo';
import { TOGGLE_TODO } from './toggleTodo';

export {
    GET_TODO_LIST,
    ADD_TODO,
    REMOVE_TODO,
    SET_TODO,
    TOGGLE_TODO
};

```

Well, that was a little bit of work, but now we have a bit more, we have our helpers next.

We already created the `src/helpers/addTodo.js` lets open that up and add our addTodo helper function.

```JavaScript
import {
    ADD_TODO
} from '../constants';

export const addTodo = (newTodo) => {
    const todoList = JSON.parse(localStorage.getItem('TodoList')) || [];  
    todoList.push(newTodo);      
    localStorage.setItem('TodoList', JSON.stringify(todoList));    
    return {
        type : ADD_TODO,
        payload : todoList
    }
}

```

In our helper function file we import in our constants and create our addTodo function. In our function we load the Todo List from the localstorage and push the new todo to the todo list and the store it back in local storage. Then we return the dispatch object with our ADD_TODO constant as its type and the new todoList as the payload. Next we can create the `getTodoList.js` helper function file. Once we create the file, we can add our helper function.

```JavaScript
import {
    GET_TODO_LIST
} from '../constants';

export const getTodoList = () => {
    return {
        type : GET_TODO_LIST,
        payload : JSON.parse(localStorage.getItem('TodoList'))
    }
}
```

Again in our `getTodoList.js` helper function file we can import our constant `GET_TODO_LIST` and the create our function. In our function return our dispatch with our type and payload, just like our addTodo. The differnce is that we load the payload from localstorage and parse the data. Now we can create our `removeTodo.js` helper function file.

Inside our `/src/actions/helpers/removeTodo.js` we again add our constant `REMOVE_TODO` and our helper `removeTodo` function.

```JavaScript
import {
    REMOVE_TODO
} from '../constants';

export const removeTodo = (todoIndex) => {
    const todoList = JSON.parse(localStorage.getItem('TodoList'));  
    const newTodoList = todoList.filter((todo, i) => Number(todoIndex) !== i);
    localStorage.setItem('TodoList', JSON.stringify(newTodoList));
    return {
        type : REMOVE_TODO,
        payload : newTodoList
    }
}
```

Inside our remove helper function `removeTodo` we load the todo list from local storage, parse it, then filter out the index, update local storage, and finally return our dispatch type and payload. 

Once we finish `removeTodo` helper function we can create our `src/helpers/setTodo.js` helper function.  
We can once again add our constant import and create our `setTodo` helper function.

```JavaScript
import {
    SET_TODO
} from '../constants';

export const setTodo = (newTodo) => {
    return {
        type : SET_TODO,
        payload : newTodo
    }
}
```

In our `setTodo` helper function we just return our dispatch with our newTodo. 

Our last helper function file we will create will be our `toggleTodo.js` file.

```JavaScript
import {
    TOGGLE_TODO
} from '../constants';

export const toggleTodo = (todoIndex) => {
    const todoList = JSON.parse(localStorage.getItem('TodoList'));  
    todoList[todoIndex].completed = Date.now();
    localStorage.setItem('TodoList', JSON.stringify(todoList));
    return {
        type : TOGGLE_TODO,
        payload : todoList
    }
}

```

So, in our toggleTodo function we simple parse the localstorage and set the completed parameter of the todo, then update the localstorage, and return the dispatch type and payload.

Awesome, now that we have finished creating the action helpers we need to import them in our `/src/actions/helpers/index.js` file.

```Javascript
import { getTodoList } from './getTodoList';
import { addTodo } from './addTodo';
import { removeTodo } from './removeTodo';
import { setTodo } from './setTodo';
import { toggleTodo } from './toggleTodo';

export {
    getTodoList,
    addTodo,
    removeTodo,
    setTodo,
    toggleTodo
};
```
Now let's finish up the actions by updating the `src/actions/index.js`;

```JavaScript
import { GET_TODO_LIST, ADD_TODO, SET_TODO, TOGGLE_TODO, REMOVE_TODO } from './constants';

import { getTodoList, addTodo, setTodo, toggleTodo, removeTodo } from './helpers';

export { 
    GET_TODO_LIST, 
    ADD_TODO, 
    SET_TODO, 
    TOGGLE_TODO, 
    REMOVE_TODO,
    getTodoList,
    addTodo,
    setTodo,
    toggleTodo,
    removeTodo
 };

```
Now that we have imported and exported everthing, making referencing our newly created code easier and more modular.

Sweet, almost done! All we have left now is the reducers which we will take on next, then we can finish our `App.js` methods.

So, lets finish up by creating our reducers. You may think we need a bunch of reducers, but we only need a few. So in our reducers folder, we create two new files. We need to create `src/reducers/todoReducer.js` and `src/reducers/todoListReducer.js` to go along with the `src/reducers/index.js` file. 

We can start with the `todoReducer.js` file and add our todoReducer function.

```JavaScript
import { SET_TODO } from '../actions';

export const todoReducer = ( todo = null, action) => {
    switch(action.type) {
        case SET_TODO:
            return action.payload.todo;
        default:
            return todo;
    }
};

```

In our `todoReducer.js` file we import our `SET_TODO` constant from our actions, using our bootstraped (autoloaded) constants and we create our todoReducer reducer function. In our function we pass in the current todo state, and the action. Using a switch statement we return our todo or the current todo as it was in state.

Now we have our `todoReducer.js` we can create our `todoListReducer.js`. Again in our todolistReducer we import our constants from our actions and create our `todoListReducer` reducer function.

```JavaScript
import { GET_TODO_LIST, ADD_TODO, REMOVE_TODO, TOGGLE_TODO } from '../actions';

export const todoListReducer = ( todoList = [], action) => {
    switch(action.type) {        
        case GET_TODO_LIST:
        case ADD_TODO:
        case TOGGLE_TODO:
        case REMOVE_TODO:
            return action.payload;
        default:
            return todoList;
    }
};

```
In our `todoListReduce.js` file we import all of our other constants from our actions, and add our todoListReducer function. The function uses a switch statement to use the constants as the switch cases to make the proper selection of what to do. Since, they all return `action.payload` you can simplify it like above.  Now that everything is complete in these two files, we can finish our reducer `src/reducers/index.js` file.

```JavaScript
import { combineReducers } from 'redux';
import { todoListReducer } from './todoListReducer';
import { todoReducer } from './todoReducer';

const rootReducer = combineReducers({
    todoList : todoListReducer,
    todo : todoReducer,
    });

export default rootReducer;

```
Inside our reducer `index.js` file we import `combineReducers` from `redux` and our two reducers we just created. Finally we will be passing in the state object to `combineReducers` and return the result back to the redux store.

We are finally on the last file, all we have to do now is open back up our App.js file and complete it.


We can start by importing in our dependancies.
```JavaScript
import React, { Component } from 'react';
import { getTodoList, setTodo, addTodo, toggleTodo, removeTodo } from './actions';
import { connect } from 'react-redux';
import { Container, Row, Col } from 'reactstrap';
```

Let's create our render method next.

```JavaScript
class App extends Component {
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

```


We need to map our state to props, and connect our App component to the redux store.

```JavaScript
const mapStateToProps = (state) => {
  return {
    todo : state.todo,
    todoList : state.todoList
  }
}

export default connect(mapStateToProps, {getTodoList, setTodo, addTodo, toggleTodo, removeTodo})(App);

```

Now lets add a couple life cycle methods that allow our screens to automatically update our content.

```JavaScript
  
  componentWillMount() {
    this.props.getTodoList();
  }

  componentDidMount() {
    this.props.getTodoList();
  }
```

In our `componentWillMount` and `componentDidMount` methods we call our `getTodoList` method that has been mapped from our getTodoList action helper function to our App component properties. Once we complete that we need to render our todo list.

We can add our `renderTodoList` method to our App component class.

```JavaScript
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

```

In our render todo list we iterate over our todo list returning the row for each todo. Now we can add our `setTodo` method.

```JavaScript
  setTodo() { 
    const todo  = this.refs.todo.value;
    this.props.setTodo({ todo : { todo, completed : false, created : Date.now()} });
  }
```

In our `setTodo` method we just grab the value of the todo and pass the new todo object to our `setTodo` action helper function that we have mapped to our properties of the App component.

Great, let's move on to our `addTodo` method.

```JavaScript
  addTodo() {
    if(this.props.todo === undefined ) return null;    
    this.refs.todo.value = '';
    this.props.addTodo(this.props.todo);
    this.setState({todo:''});
  }
```
In our `addTodo` method we return null if the todo is undefined, then we set the input value to empty, we take our todo from props, that was mapped by redux, and call our `addTodo` action helper that we mapped to our App component properties. Finally we call setState to clear our todo in our current state forcing a reload of our component.

Just a couple more methods left. Lets complete our `removeTodo` method next.

```JavaScript
  removeTodo(e){
    let todoIndex = e.target.dataset.todo || e.target.parentNode.dataset.todo;
    this.props.removeTodo(todoIndex);
  }
```
In our `removeTodo` we pass the `todoIndex` that we get from the dataset and call our `removeTodo` action helper function we mapped to our properties of the App component.

Yes that's right we are on our last method and we have a todo list built using redux.

```JavaScript
  toggleCompleted(e) {
    const todoIndex = Number(e.target.dataset.todo);    
    const todoList = this.props.todoList;
    if(!todoList[todoIndex].completed) {
        this.props.toggleTodo(todoIndex);
    }
  }
  
```

In our `toggleComplete` method we check if the todo exists and is completed if its not we call our `toggleTodo` action helper function passing in the todoIndex.

## Run our App

`npm start`

At this point it should all be up and running and we can just decorate our new app.