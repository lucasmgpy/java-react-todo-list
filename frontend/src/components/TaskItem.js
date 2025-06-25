import React, { useState } from 'react';
import './TaskItem.css';

function TaskItem({ task, onUpdate, onDelete }) {
  // Estados para a UI
  const [isExpanded, setIsExpanded] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  // Estados para os dados em edição
  const [editedTitle, setEditedTitle] = useState(task.title);
  const [editedDescription, setEditedDescription] = useState(task.description);

  const handleStatusChange = (event) => {
    // ... (código existente, sem alterações)
  };

  const handleDelete = () => {
    // ... (código existente, sem alterações)
  };

  // Função para entrar no modo de edição
  const handleEdit = () => {
    // Inicializa os campos de edição com os valores atuais da tarefa
    setEditedTitle(task.title);
    setEditedDescription(task.description);
    setIsEditing(true);
  };

  // Função para cancelar a edição
  const handleCancel = () => {
    setIsEditing(false);
  };

  // Função para salvar as alterações
  const handleSave = () => {
    const updatedTask = {
      ...task,
      title: editedTitle,
      description: editedDescription
    };

    fetch(`http://localhost:8080/api/tasks/${task.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedTask)
    })
    .then(response => response.json())
    .then(data => {
      onUpdate(data); // Informa o App sobre a atualização
      setIsEditing(false); // Sai do modo de edição
    })
    .catch(error => console.error('Erro ao atualizar tarefa:', error));
  };


  return (
    <li className="task-item">
      <div className="task-header">
        {isEditing ? (
          <input
            type="text"
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
            className="editing-input"
          />
        ) : (
          <span className="task-title">{task.title}</span>
        )}

        <div className="task-controls">
          {isEditing ? (
            <>
              <button onClick={handleSave} className="save-btn" title="Salvar">&#10003;</button>
              <button onClick={handleCancel} className="cancel-btn" title="Cancelar">&times;</button>
            </>
          ) : (
            <>
              <button onClick={() => setIsExpanded(!isExpanded)} className="expand-btn" title="Ver detalhes">
                {isExpanded ? '▲' : '▼'}
              </button>
              <button onClick={handleEdit} className="edit-btn" title="Editar">&#9998;</button>
              <select value={task.status} onChange={handleStatusChange}>
                <option value="NAO_INICIADO">Não Iniciado</option>
                <option value="EM_PROGRESSO">Em Progresso</option>
                <option value="EM_PAUSA">Em Pausa</option>
                <option value="COMPLETO">Completo</option>
              </select>
              <button onClick={handleDelete} className="delete-btn" title="Apagar tarefa">
                &times;
              </button>
            </>
          )}
        </div>
      </div>

      {isExpanded && (
        <div className="task-body">
          {isEditing ? (
            <textarea
              value={editedDescription || ''}
              onChange={(e) => setEditedDescription(e.target.value)}
              className="editing-textarea"
            />
          ) : (
            <p>{task.description || <em>Sem descrição</em>}</p>
          )}
        </div>
      )}
    </li>
  );
}

// As funções handleStatusChange e handleDelete devem ser copiadas da versão anterior para aqui
// Coloquei-as aqui novamente por conveniência
const originalFunctions = {
    handleStatusChange: (task, onUpdate, event) => {
        const newStatus = event.target.value;
        const updatedTask = { ...task, status: newStatus };
        fetch(`http://localhost:8080/api/tasks/${task.id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updatedTask)
        })
        .then(response => response.json())
        .then(data => onUpdate(data))
        .catch(error => console.error('Erro ao atualizar tarefa:', error));
    },
    handleDelete: (task, onDelete) => {
        fetch(`http://localhost:8080/api/tasks/${task.id}`, { method: 'DELETE' })
        .then(response => {
            if (response.ok) { onDelete(task.id); }
            else { throw new Error('Falha ao apagar a tarefa'); }
        })
        .catch(error => console.error('Erro ao apagar tarefa:', error));
    }
};

// O ideal é re-integrar as funções dentro do componente.
// O código abaixo é uma versão final e completa que pode substituir todo o ficheiro.

const FinalTaskItem = ({ task, onUpdate, onDelete }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [editedTitle, setEditedTitle] = useState(task.title);
    const [editedDescription, setEditedDescription] = useState(task.description);

    const handleStatusChange = (event) => {
        const newStatus = event.target.value;
        const updatedTask = { ...task, status: newStatus };

        fetch(`http://localhost:8080/api/tasks/${task.id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updatedTask)
        })
        .then(response => response.json())
        .then(data => onUpdate(data))
        .catch(error => console.error('Erro ao atualizar tarefa:', error));
    };

    const handleDelete = () => {
      // Adicionamos a confirmação aqui!
      if (window.confirm('Tens a certeza que queres apagar esta tarefa?')) {
        // O código seguinte só é executado se o utilizador clicar em "OK"
        fetch(`http://localhost:8080/api/tasks/${task.id}`, {
          method: 'DELETE'
        })
        .then(response => {
            if (response.ok) {
                onDelete(task.id);
            } else {
                throw new Error('Falha ao apagar a tarefa');
            }
        })
        .catch(error => console.error('Erro ao apagar tarefa:', error));
      }
    };

    const handleEdit = () => {
        setEditedTitle(task.title);
        setEditedDescription(task.description);
        setIsEditing(true);
    };

    const handleCancel = () => {
        setIsEditing(false);
    };

    const handleSave = () => {
        const updatedTask = {
            ...task,
            title: editedTitle,
            description: editedDescription
        };

        fetch(`http://localhost:8080/api/tasks/${task.id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updatedTask)
        })
        .then(response => response.json())
        .then(data => {
            onUpdate(data);
            setIsEditing(false);
        })
        .catch(error => console.error('Erro ao atualizar tarefa:', error));
    };

    return (
        <li className="task-item">
          <div className="task-header">
            {isEditing ? (
              <input type="text" value={editedTitle} onChange={(e) => setEditedTitle(e.target.value)} className="editing-input"/>
            ) : (
              <span className="task-title">{task.title}</span>
            )}
            <div className="task-controls">
              {isEditing ? (
                <>
                  <button onClick={handleSave} className="save-btn" title="Salvar">&#10003;</button>
                  <button onClick={handleCancel} className="cancel-btn" title="Cancelar">&times;</button>
                </>
              ) : (
                <>
                  <button onClick={() => setIsExpanded(!isExpanded)} className="expand-btn" title="Ver detalhes">{isExpanded ? '▲' : '▼'}</button>
                  <button onClick={handleEdit} className="edit-btn" title="Editar">&#9998;</button>
                  <select value={task.status} onChange={handleStatusChange}>
                    <option value="NAO_INICIADO">Não Iniciado</option>
                    <option value="EM_PROGRESSO">Em Progresso</option>
                    <option value="EM_PAUSA">Em Pausa</option>
                    <option value="COMPLETO">Completo</option>
                  </select>
                  <button onClick={handleDelete} className="delete-btn" title="Apagar tarefa">&times;</button>
                </>
              )}
            </div>
          </div>
          {isExpanded && (
            <div className="task-body">
              {isEditing ? (
                <textarea value={editedDescription || ''} onChange={(e) => setEditedDescription(e.target.value)} className="editing-textarea"/>
              ) : (
                <p>{task.description || <em>Sem descrição</em>}</p>
              )}
            </div>
          )}
        </li>
    );
};

export default FinalTaskItem;