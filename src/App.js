import React, { useState, useEffect } from 'react';
import Typography from '@material-ui/core/Typography';
import './styles.css';
import Amplify, { API, graphqlOperation } from 'aws-amplify'
import { createTodo, deleteTodo } from './graphql/mutations'
import { listTodos } from './graphql/queries'
import awsExports from './aws-exports';
import { withAuthenticator } from '@aws-amplify/ui-react';

import TodoForm from './TodoForm';
import TodoList from './TodoList';

Amplify.configure(awsExports);

const initialState = { name: '', description: '' }

const App = () => {
  const [todos, setTodos] = useState([])

  useEffect(() => {
    fetchTodos()
  }, [])

  async function fetchTodos() {
    try {
      const todoData = await API.graphql(graphqlOperation(listTodos))
      const todos = todoData.data.listTodos.items
      setTodos(todos)
    } catch (err) { console.log('error fetching todos') }
  }

  async function removeTodo(todo) {
    try {
      if (!todo.id) return
      console.log(`id: ${todo.id}`);
      setTodos(todos.filter((current) => current.id !== todo.id))
      await API.graphql(graphqlOperation(deleteTodo, {input: {id: todo.id}}))
    } catch (err) {
      console.log('error deleting todo: ', err)
    }
  }

  async function addTodo(todo) {
    try {
      if (!todo.name || !todo.description) return
      setTodos([...todos, todo])
      await API.graphql(graphqlOperation(createTodo, {input: todo}))
      await fetchTodos();
    } catch (err) {
      console.log('error creating todo: ', err)
    }
  }
  return (
    <div className="App">
      <Typography component="h1" variant="h2">
        // TODO
      </Typography>
      <TodoForm saveTodo={(todo) => {
          addTodo(todo);
      }} />
      <TodoList todos={todos} deleteTodo={removeTodo} />
    </div>
  );
};

export default withAuthenticator(App);