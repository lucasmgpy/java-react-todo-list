import React, { useState } from 'react';
import './TaskForm.css';

function TaskForm({ onTaskAdded }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState(''); // <-- NOVO ESTADO
  const [status, setStatus] = useState('NAO_INICIADO');

  const handleSubmit = (event) => {
    event.preventDefault();

    const newTask = {
      title,
      description, // <-- Adiciona a descrição ao objeto
      status,
    };

    fetch('http://localhost:8080/api/tasks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newTask),
    })
    .then(response => response.json())
    .then(savedTask => {
      setTitle('');
      setDescription(''); // <-- Limpa o campo após o envio
      setStatus('NAO_INICIADO');
      onTaskAdded(savedTask);
    })
    .catch(error => console.error('Erro ao adicionar tarefa:', error));
  };

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <div className="form-row">
        <input
          type="text"
          placeholder="Título da tarefa..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <div className="form-row">
                <textarea
                  placeholder="Descrição (opcional)..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="NAO_INICIADO">Não Iniciado</option>
          <option value="EM_PROGRESSO">Em Progresso</option>
          <option value="EM_PAUSA">Em Pausa</option>
          <option value="COMPLETO">Completo</option>
        </select>
        <button type="submit">Adicionar</button>
      </div>

    </form>
  );
}

export default TaskForm;