// JSON Bin Configuration
const BIN_ID = '693ad489ae596e708f92c31e';
const MASTER_KEY = '$2a$10$EHGKzk1XCYlaSS1mcR3.hu/tx28452/EU08Rcq2Iub/6qE1/8mQda';
const BASE_URL = 'https://api.jsonbin.io/v3/b';

let todos = [];

// Load todos from JSON Bin
async function loadTodos() {
  try {
    const response = await fetch(`${BASE_URL}/${BIN_ID}/latest`, {
      headers: {
        'X-Master-Key': MASTER_KEY
      }
    });
    
    if (response.ok) {
      const data = await response.json();
      todos = data.record.todos || [];
      return todos;
    } else {
      console.error('Failed to load todos');
      return [];
    }
  } catch (error) {
    console.error('Error loading todos:', error);
    return [];
  }
}

// Save todos to JSON Bin
async function saveTodos() {
  try {
    const response = await fetch(`${BASE_URL}/${BIN_ID}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'X-Master-Key': MASTER_KEY
      },
      body: JSON.stringify({ todos: todos })
    });
    
    if (!response.ok) {
      console.error('Failed to save todos');
    }
  } catch (error) {
    console.error('Error saving todos:', error);
  }
}

function addTodo(todos, name, urgency) {
  let newTodo = {
    id: Math.floor(Math.random() * 100000 + 1),
    name: name,
    urgency: urgency
  };
  todos.push(newTodo);
  saveTodos();
}

function modifyTask(todos, id, newName, newUrgency) {
  // create the new task
  let modifiedTask = {
    "id": id,
    "name": newName,
    "urgency": newUrgency
  }

  // get the index of the task we want to replace
  const indexToReplace = todos.findIndex(function(t){
    return t.id == id;
  });

  // need to check if the index really exists
  // if the id doesn't exist, then findIndex will return -1
  if (indexToReplace > -1) {
    todos[indexToReplace] = modifiedTask;
    saveTodos();
  }
}

function deleteTask(todos, id) {
  let indexToDelete = null;
  for (let i = 0; i < todos.length; i++) {
    if (todos[i].id == id) {
      indexToDelete = i;
      break;
    }
  }
  if (indexToDelete !== null) {
    todos.splice(indexToDelete, 1);
    saveTodos();
  } else {
    console.log("Task is not found");
  }
}
