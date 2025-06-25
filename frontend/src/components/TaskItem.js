import React, { useState, useEffect } from 'react';
import './TaskItem.css';

function TaskItem({ task, onUpdate, onDelete }) {
    // Estados para controlo da UI
    const [isExpanded, setIsExpanded] = useState(false);
    const [isEditing, setIsEditing] = useState(false);

    // Estados para guardar os dados enquanto estão a ser editados
    const [editedTitle, setEditedTitle] = useState(task.title);
    const [editedDescription, setEditedDescription] = useState(task.description);

    // Efeito para atualizar os campos de edição se a tarefa original (prop) mudar
    useEffect(() => {
        setEditedTitle(task.title);
        setEditedDescription(task.description);
    }, [task]);

    // Função para lidar com a mudança de estado
    const handleStatusChange = (event) => {
        const newStatus = event.target.value;
        const updatedTask = { ...task, status: newStatus };

        fetch(`http://localhost:8080/api/tasks/${task.id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updatedTask)
        })
        .then(res => res.json())
        .then(data => onUpdate(data))
        .catch(console.error);
    };

    // Função para apagar a tarefa
    const handleDelete = () => {
        if (window.confirm('Tens a certeza que queres apagar esta tarefa?')) {
            fetch(`http://localhost:8080/api/tasks/${task.id}`, { method: 'DELETE' })
            .then(res => {
                if (res.ok) {
                    onDelete(task.id);
                } else {
                    return Promise.reject('Falha ao apagar');
                }
            })
            .catch(console.error);
        }
    };

    // Funções para o modo de edição
    const handleEdit = () => {
        // Garante que, ao entrar em modo de edição, os campos
        // têm sempre os dados mais recentes da tarefa.
        setEditedTitle(task.title);
        setEditedDescription(task.description);
        setIsEditing(true);
    };

    const handleCancel = () => {
        // Sai do modo de edição
        setIsEditing(false);
        // MUITO IMPORTANTE: Reverte os estados de edição para os valores originais da prop!
        // Isto descarta quaisquer alterações que o utilizador tenha feito.
        setEditedTitle(task.title);
        setEditedDescription(task.description);
    };

    // A função handleSave permanece exatamente igual
    const handleSave = () => {
        const updatedTask = { ...task, title: editedTitle, description: editedDescription };
        fetch(`http://localhost:8080/api/tasks/${task.id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updatedTask)
        })
        .then(res => res.json())
        .then(data => {
            onUpdate(data);
            setIsEditing(false);
        }).catch(console.error);
    };

    // Lógica da prévia da descrição
    const descriptionPreview = task.description ? `${task.description.substring(0, 70)}...` : null;

    return (
        <li className={`task-item status-${task.status.toLowerCase()}`}>
            <div className="task-header">
                {isEditing ? (
                    <input type="text" value={editedTitle} onChange={(e) => setEditedTitle(e.target.value)} className="editing-input" />
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
                            <button onClick={handleEdit} className="edit-btn" title="Editar">EDITAR</button>
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


            {isEditing ? (
                // Se está em modo de edição, mostra sempre a textarea
                <div className="task-body">
                    <textarea
                        value={editedDescription || ''}
                        onChange={(e) => setEditedDescription(e.target.value)}
                        className="editing-textarea"
                    />
                </div>
            ) : (
                // Se não está em modo de edição, aplica a lógica de expandir/prévia
                <>
                    {isExpanded && task.description && (
                        <div className="task-body">
                            <p>{task.description}</p>
                        </div>
                    )}
                    {!isExpanded && task.description && (
                        <div className="task-body preview">
                            <p>{descriptionPreview}</p>
                        </div>
                    )}
                </>
            )}


        </li>
    );
}

export default TaskItem;