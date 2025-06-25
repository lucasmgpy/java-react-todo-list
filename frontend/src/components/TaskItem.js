import React, { useState, useEffect } from 'react';
import './TaskItem.css';

// A lógica de renderização foi movida para esta versão final
function TaskItem({ task, onUpdate, onDelete }) {
    const [isExpanded, setIsExpanded] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [editedTitle, setEditedTitle] = useState(task.title);
    const [editedDescription, setEditedDescription] = useState(task.description);

    useEffect(() => {
        setEditedTitle(task.title);
        setEditedDescription(task.description);
    }, [task]);

    // ... (as tuas funções handleSave, handleCancel, handleEdit, etc., permanecem as mesmas)

    // Para facilitar, aqui está o componente completo novamente
    const handleStatusChange = (event) => { /* ...código da versão anterior... */ };
    const handleDelete = () => { /* ...código da versão anterior... */ };
    const handleEdit = () => { /* ...código da versão anterior... */ };
    const handleCancel = () => { /* ...código da versão anterior... */ };
    const handleSave = () => { /* ...código da versão anterior... */ };

    // Lógica da prévia da descrição
    const descriptionPreview = task.description ? `${task.description.substring(0, 70)}...` : '';

    return (
        <li className={`task-item status-${task.status.toLowerCase()}`}>
            {/* O conteúdo do item foi reestruturado */}
            {/* ... (copia o JSX da versão completa abaixo) ... */}
        </li>
    );
}

// VERSÃO FINAL COMPLETA PARA COPIAR E COLAR (inclui todas as funções)
const FinalTaskItem = ({ task, onUpdate, onDelete }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [editedTitle, setEditedTitle] = useState(task.title);
    const [editedDescription, setEditedDescription] = useState(task.description);

    useEffect(() => {
        setEditedTitle(task.title);
        setEditedDescription(task.description);
    }, [task]);

    const handleStatusChange = (event) => {
        const newStatus = event.target.value;
        const updatedTask = { ...task, status: newStatus };
        fetch(`http://localhost:8080/api/tasks/${task.id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(updatedTask) })
            .then(res => res.json()).then(data => onUpdate(data)).catch(console.error);
    };

    const handleDelete = () => {
        if (window.confirm('Tens a certeza que queres apagar esta tarefa?')) {
            fetch(`http://localhost:8080/api/tasks/${task.id}`, { method: 'DELETE' })
                .then(res => res.ok ? onDelete(task.id) : Promise.reject('Falha ao apagar'))
                .catch(console.error);
        }
    };

    const handleEdit = () => setIsEditing(true);
    const handleCancel = () => setIsEditing(false);

    const handleSave = () => {
        const updatedTask = { ...task, title: editedTitle, description: editedDescription };
        fetch(`http://localhost:8080/api/tasks/${task.id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(updatedTask) })
            .then(res => res.json()).then(data => {
                onUpdate(data);
                setIsEditing(false);
            }).catch(console.error);
    };

    const descriptionPreview = task.description ? `${task.description.substring(0, 70)}...` : null;

    return (
        <li className={`task-item status-${task.status.toLowerCase()}`}>
            <div className="task-header">
                {isEditing ? <input type="text" value={editedTitle} onChange={(e) => setEditedTitle(e.target.value)} className="editing-input"/> : <span className="task-title">{task.title}</span>}
                <div className="task-controls">
                    {isEditing ? (<>
                        <button onClick={handleSave} className="save-btn" title="Salvar">&#10003;</button>
                        <button onClick={handleCancel} className="cancel-btn" title="Cancelar">&times;</button>
                    </>) : (<>
                        <button onClick={() => setIsExpanded(!isExpanded)} className="expand-btn" title="Ver detalhes">{isExpanded ? '▲' : '▼'}</button>
                        <button onClick={handleEdit} className="edit-btn" title="Editar">&#9998;</button>
                        <select value={task.status} onChange={handleStatusChange}>{/* ...opções... */}</select>
                        <button onClick={handleDelete} className="delete-btn" title="Apagar tarefa">&times;</button>
                    </>)}
                </div>
            </div>

            {/* Nova lógica para descrição e prévia */}
            {isEditing ? (
                isExpanded && <div className="task-body"><textarea value={editedDescription || ''} onChange={(e) => setEditedDescription(e.target.value)} className="editing-textarea"/></div>
            ) : (
                <>
                    {isExpanded && task.description && <div className="task-body"><p>{task.description}</p></div>}
                    {!isExpanded && task.description && <div className="task-body preview"><p>{descriptionPreview}</p></div>}
                </>
            )}
        </li>
    );
};

// Cole o código completo acima, incluindo as options dentro do select se necessário.
export default FinalTaskItem;