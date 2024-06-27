import React from 'react';

const Task = ({ task, handleDragStart, handleDragEnd }) => {
  return (
    <div
      className="task"
      draggable
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      data-task={task}
    >
      {task}
    </div>
  );
};

export default Task;
