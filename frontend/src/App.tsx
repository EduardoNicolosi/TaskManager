import React, { useState, useEffect } from 'react';
import './App.css';
import { getTasks, Task, deleteTask } from './services/api';
import AddModal  from './components/addmodal';
import { createTask } from './services/api';
import { Trash2, Pencil } from 'lucide-react';

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    getTasks()
      .then((data: Task[]) => setTasks(data))
      .catch((err: Error) => alert(err.message))
      .finally(() => setLoading(false));
  }, []);

  const handleDeleteTask = async (id: number) => {
    const confirmDelete=window.confirm('Are you sure you want to delete this task?');
    if (!confirmDelete) return;
    try {
      await deleteTask(id);
      const data = await getTasks();
      setTasks(data);
    } catch (error) {
      alert('Error deleting task');
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <>
      <AddModal
        show={showModal}
        onClose={() => setShowModal(false)}
        onSubmit={async(title, description) => {
          try {
            await createTask({title, description});
            const data = await getTasks();
            setTasks(data);
          } catch (error) {
            alert('Error adding task');
          }
          setShowModal(false);
        }}
      />
      <div className="addTask">
        <button className="addTaskBtn" onClick={() => setShowModal(true)} style={{ backgroundColor: 'white', color: 'black', padding: '10px 20px', borderRadius: '20px', border: 'none', cursor: 'pointer' }}>Add a new task</button>
      </div>
      <div style={{ maxWidth: 600, margin: '100px', fontFamily: 'sans-serif' }}>
        <h1>Tasks (To do list)</h1>
        <ul style={{ listStyle: 'none', padding: 10, color: 'black' }}>
          {tasks.map(task => (
            <li key={task.id} style={{
              background: '#f7f7f7',
              margin: '10px 0',
              padding: '15px',
              borderRadius: '5px',
              borderLeft: task.completed ? '10px solid #4caf50' : '10px solid #f44336',
            }}>
              <div>
                <strong>{task.title}</strong>
                <p>{task.description}</p>
                <span>Status: {task.completed ? 'Completed' : 'Incomplete'}</span>
              </div>
              <div className="task-actions">
                <button className="edit-btn">
                  <Pencil />
                </button>
                <button className="delete-btn" onClick={() => handleDeleteTask(task.id)}>
                  <Trash2 />
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default App;

