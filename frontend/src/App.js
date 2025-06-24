import React, { useState, useEffect } from 'react';
import TaskForm from './components/TaskForm';
import TaskItem from './components/TaskItem'; // <-- Importa o TaskItem
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8080/api/tasks')
      .then(response => response.json())
      .then(data => setTasks(data))
      .catch(error => console.error('Erro ao buscar tarefas:', error));
  }, []);

  const handleTaskAdded = (newTask) => {
    setTasks([...tasks, newTask]);
  };

  // Função para lidar com a atualização de uma tarefa
  const handleTaskUpdate = (updatedTask) => {
    // Substitui a tarefa antiga pela nova no array de estado
    setTasks(tasks.map(task =>
      task.id === updatedTask.id ? updatedTask : task
    ));
  };

  // Função para lidar com a remoção de uma tarefa
  const handleTaskDelete = (taskId) => {
    // Filtra o array de estado, removendo a tarefa com o ID correspondente
    setTasks(tasks.filter(task => task.id !== taskId));
  };

  return (
    <div className="App">
      <header>
        <h1>Gestor de Tarefas</h1>
      </header>
      <main>
        <TaskForm onTaskAdded={handleTaskAdded} />

        <h2 style={{marginTop: '40px'}}>As minhas tarefas</h2>
        <ul>
          {/* Agora mapeamos para o nosso novo componente TaskItem */}
          {tasks.map(task => (
            <TaskItem
              key={task.id}
              task={task}
              onUpdate={handleTaskUpdate}
              onDelete={handleTaskDelete}
            />
          ))}
        </ul>
      </main>
    </div>
  );
}

export default App;