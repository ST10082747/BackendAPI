const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid'); 

const app = express();
//const port = 3000;
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(cors());

let todos = []; 

// Get all todos
app.get('/todos', (req, res) => {
  res.json(todos);
});

// Add a new todo
app.post('/todos', (req, res) => {
  const newTodo = req.body;
  newTodo.id = uuidv4(); 
  todos.push(newTodo);
  res.status(201).json(newTodo);
});

// Update a todo
app.put('/todos/:id', (req, res) => {
  const { id } = req.params;
  const updatedTodo = req.body;
  todos = todos.map(todo => (todo.id === id ? { ...updatedTodo, id } : todo)); 
  res.json(updatedTodo);
});

// Delete a todo
app.delete('/todos/:id', (req, res) => {
  const { id } = req.params;
  todos = todos.filter(todo => todo.id !== id);
  res.status(204).end();
});


app.listen(port, '0.0.0.0', () => {
  console.log(`Server running at http://0.0.0.0:${port}`);
});
