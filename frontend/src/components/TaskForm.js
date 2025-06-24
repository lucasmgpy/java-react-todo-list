import React, { useState } from 'react';
import './TaskForm.css';

function TaskForm({ onTaskAdded }) {
  // Estado para guardar os valores dos campos do formulário
  const [title, setTitle] = useState('');
  const [status, setStatus] = useState('NAO_INICIADO'); // Valor inicial

  const handleSubmit = (event) => {
    // Previne o comportamento padrão do formulário, que é recarregar a página
    event.preventDefault();

    // Cria o objeto da nova tarefa com os dados do estado
    const newTask = {
      title,
      status,
    };

    // Faz o pedido POST para a nossa API
    fetch('http://localhost:8080/api/tasks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newTask),
    })
      .then(response => response.json())
      .then(savedTask => {
        // Limpa os campos do formulário
        setTitle('');
        setStatus('NAO_INICIADO');
        // Chama a função passada pelo componente pai (App.js) para atualizar a lista
        onTaskAdded(savedTask);
      })
      .catch(error => console.error('Erro ao adicionar tarefa:', error));
  };

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Adicionar nova tarefa..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <select value={status} onChange={(e) => setStatus(e.target.value)}>
        <option value="NAO_INICIADO">Não Iniciado</option>
        <option value="EM_PROGRESSO">Em Progresso</option>
        <option value="EM_PAUSA">Em Pausa</option>
        <option value="COMPLETO">Completo</option>
      </select>
      <button type="submit">Adicionar</button>
    </form>
  );
}

export default TaskForm;