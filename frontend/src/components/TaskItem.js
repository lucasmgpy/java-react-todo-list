import React from 'react';
import './TaskItem.css';

function TaskItem({ task, onUpdate, onDelete }) {

  // Função chamada quando o valor do <select> muda
  const handleStatusChange = (event) => {
    const newStatus = event.target.value;
    const updatedTask = { ...task, status: newStatus };

    fetch(`http://localhost:8080/api/tasks/${task.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedTask)
    })
    .then(response => response.json())
    .then(data => {
      onUpdate(data); // Informa o componente pai (App) sobre a atualização
    })
    .catch(error => console.error('Erro ao atualizar tarefa:', error));
  };

  // Função chamada quando o botão de apagar é clicado
  const handleDelete = () => {
    fetch(`http://localhost:8080/api/tasks/${task.id}`, {
      method: 'DELETE'
    })
    .then(response => {
      if (response.ok) {
        onDelete(task.id); // Informa o componente pai (App) sobre a remoção
      } else {
        throw new Error('Falha ao apagar a tarefa');
      }
    })
    .catch(error => console.error('Erro ao apagar tarefa:', error));
  };

  return (
    <li className="task-item">
      <span className="task-title">{task.title}</span>
      <div className="task-controls">
        <select value={task.status} onChange={handleStatusChange}>
          <option value="NAO_INICIADO">Não Iniciado</option>
          <option value="EM_PROGRESSO">Em Progresso</option>
          <option value="EM_PAUSA">Em Pausa</option>
          <option value="COMPLETO">Completo</option>
        </select>
        <button onClick={handleDelete} className="delete-btn" title="Apagar tarefa">
          &times;
        </button>
      </div>
    </li>
  );
}

export default TaskItem;