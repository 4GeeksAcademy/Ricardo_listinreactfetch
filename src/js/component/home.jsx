import React, { useState, useEffect } from 'react';

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');

  // Fetch the initial todos
  useEffect(() => {
    fetchTodos();
  }, []);

  // Function to fetch todos
  const fetchTodos = async () => {
    try {
      const response = await fetch('/api/todos'); // Replace with your backend API endpoint
      const data = await response.json();
      setTodos(data);
    } catch (error) {
      console.error('Error fetching todos:', error);
    }
  };

  // Function to add a new todo
  const addTodo = async () => {
    try {
      const response = await fetch('/api/todos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ title: newTodo }) // Assuming your backend expects a 'title' field
      });

      if (response.ok) {
        fetchTodos(); // Fetch updated todos after adding a new one
        setNewTodo(''); // Clear the input field
      } else {
        console.error('Error adding todo:', response.statusText);
      }
    } catch (error) {
      console.error('Error adding todo:', error);
    }
  };

  return (
    <div>
      <h1>Todo List</h1>
      <ul>
        {todos.map(todo => (
          <li key={todo.id}>{todo.title}</li> // Assuming each todo object has a unique 'id' field
        ))}
      </ul>
      <input
        type="text"
        value={newTodo}
        onChange={event => setNewTodo(event.target.value)}
      />
      <button onClick={addTodo}>Add Todo</button>
    </div>
  );
};

export default TodoList;
