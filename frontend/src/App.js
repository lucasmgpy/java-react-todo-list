import React, { useState, useEffect } from 'react';
import TaskForm from './components/TaskForm';
import ListView from './components/ListView'; // <-- Importa a vista de Lista
import BoardView from './components/BoardView'; // <-- Importa a vista de Painel
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [viewMode, setViewMode] = useState('list'); // <-- NOVO ESTADO para a vista

  useEffect(() => {
    fetch('http://localhost:8080/api/tasks')
      .then(response => response.json())
      .then(data => setTasks(data))
      .catch(error => console.error('Erro ao buscar tarefas:', error));
  }, []);

  const handleTaskAdded = (newTask) => {
    setTasks([...tasks, newTask]);
  };

  const handleTaskUpdate = (updatedTask) => {
    setTasks(tasks.map(task => task.id === updatedTask.id ? updatedTask : task));
  };

  const handleTaskDelete = (taskId) => {
    setTasks(tasks.filter(task => task.id !== taskId));
  };

  return (
    <div className="App">
      <header>
        <h1>Gestor de Tarefas</h1>
        <div className="view-switcher">
          <button onClick={() => setViewMode('list')} className={viewMode === 'list' ? 'active' : ''}>
            Ver em Lista
          </button>
          <button onClick={() => setViewMode('board')} className={viewMode === 'board' ? 'active' : ''}>
            Ver em Painel
          </button>
        </div>
      </header>
      <main>
        <TaskForm onTaskAdded={handleTaskAdded} />

        <h2 style={{marginTop: '40px'}}>Tarefas</h2>

        {/* Renderização Condicional da Vista */}
        {viewMode === 'list' ? (
          <ListView tasks={tasks} onUpdate={handleTaskUpdate} onDelete={handleTaskDelete} />
        ) : (
          <BoardView tasks={tasks} onUpdate={handleTaskUpdate} onDelete={handleTaskDelete} />
        )}
      </main>
    </div>
  );
}

export default App;