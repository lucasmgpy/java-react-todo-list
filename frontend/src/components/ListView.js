import React from 'react';
import TaskItem from './TaskItem';

function ListView({ tasks, onUpdate, onDelete }) {

  // 1. Define a ordem desejada para os estados
  const statusOrder = {
    'NAO_INICIADO': 1,
    'EM_PROGRESSO': 2,
    'EM_PAUSA': 3,
    'COMPLETO': 4
  };

  // 2. Cria uma cópia do array e ordena-o
  const sortedTasks = [...tasks].sort((a, b) => {
    return statusOrder[a.status] - statusOrder[b.status];
  });

  return (
    <ul>
      {/* 3. Renderiza o array ordenado */}
      {sortedTasks.map(task => (
        <TaskItem
          key={task.id}
          task={task}
          onUpdate={onUpdate}
          onDelete={onDelete}
        />
      ))}
    </ul>
  );
}

export default ListView;