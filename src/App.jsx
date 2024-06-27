import React, { useState } from 'react';
import './App.css';
import TaskList from './TaskList';

function App() {
  const initialTasks = Array.from({ length: 10 }, (_, i) => `Task ${i + 1}`);
  const [tasks, setTasks] = useState({
    today: [],
    tomorrow: [],
    thisWeek: [],
    nextWeek: [],
    unplanned: initialTasks,
  });

  const handleDragStart = (event) => {
    event.dataTransfer.setData('task', event.target.dataset.task);
    setTimeout(() => {
      event.target.classList.add('hidden');
    }, 0);
  };

  const handleDragEnd = (event) => {
    event.target.classList.remove('hidden');
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const task = event.dataTransfer.getData('task');
    const from = Object.keys(tasks).find((key) =>
      tasks[key].includes(task)
    );
    const to = event.currentTarget.dataset.title;

    console.log(`Task: ${task}, From: ${from}, To: ${to}`);

    if (from && to && from !== to && Array.isArray(tasks[to])) {
      setTasks((prevTasks) => ({
        ...prevTasks,
        [from]: prevTasks[from].filter((t) => t !== task),
        [to]: [...prevTasks[to], task],
      }));
    }
  };

  return (
    <div className="container">
      {Object.keys(tasks).map((key) => (
        <TaskList
          key={key}
          title={key}
          tasks={tasks[key]}
          handleDragStart={handleDragStart}
          handleDragEnd={handleDragEnd}
          handleDragOver={handleDragOver}
          handleDrop={handleDrop}
        />
      ))}
    </div>
  );
}

export default App;
