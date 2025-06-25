import React from 'react';
import TaskItem from './TaskItem';
import './BoardView.css';

const STATUS_ORDER = ['NAO_INICIADO', 'EM_PROGRESSO', 'EM_PAUSA', 'COMPLETO'];
const STATUS_TITLES = {
  NAO_INICIADO: 'Não Iniciado',
  EM_PROGRESSO: 'Em Progresso',
  EM_PAUSA: 'Em Pausa',
  COMPLETO: 'Completo'
};


function BoardView({ tasks, onUpdate, onDelete }) {
  return (
    <div className="board-view">
      {STATUS_ORDER.map(status => (
        <div key={status} className={`board-column status-bg-${status.toLowerCase()}`}>
          <h3>{STATUS_TITLES[status]}</h3>
          <ul>
            {tasks
              .filter(task => task.status === status)
              .map(task => (
                <TaskItem
                  key={task.id}
                  task={task}
                  onUpdate={onUpdate}
                  onDelete={onDelete}
                />
              ))
            }
          </ul>
        </div>
      ))}
    </div>
  );
}

export default BoardView;