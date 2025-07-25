import React from 'react';
import TaskForm from './features/tasks/TaskForm';
import TaskList from './features/tasks/TaskList';
import './App.css'; 

const App = () => {
  return (
    <div className="App">
      <h1>Task Manager</h1>
      <TaskForm />
      <TaskList />
    </div>
  );
};

export default App;
