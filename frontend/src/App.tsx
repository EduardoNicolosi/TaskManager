import React, { useState, useEffect } from 'react';
import './App.css';
import { getTasks, Task, deleteTask, createTask, updateTask } from './services/api';
import AddModal  from './components/addmodal';
import EditModal from './components/editmodal';
import { Trash2, Pencil } from 'lucide-react';

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState<Task | null>(null);

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
        show={showAddModal}
        onClose={() => setShowAddModal(false)}
        onSubmit={async(title, description) => {
          try {
            await createTask({title, description});
            const data = await getTasks();
            setTasks(data);
          } catch (error) {
            alert('Error adding task');
          }
          setShowAddModal(false);
        }}
      />
      <EditModal
        show={showEditModal}
        onClose={() => {
          setShowEditModal(false);
          setTaskToEdit(null);
        }}
        title={taskToEdit?.title || ''}
        description={taskToEdit?.description || ''}
        onSubmit={async(title, description) => {
          if (!taskToEdit) return;
          try {
            await updateTask(taskToEdit.id, {title, description});
            const data = await getTasks();
            setTasks(data);
          } catch (error) {
            alert('Error editing task');
          }
          setShowEditModal(false);
          setTaskToEdit(null);
        }}
      />
      <div className="addTask">
          <button className="addTaskBtn" onClick={() => setShowAddModal(true)} style={{ backgroundColor: 'white', color: 'black', padding: '10px 20px', borderRadius: '20px', border: 'none', cursor: 'pointer' }}>Add a new task</button>
        </div>
      <div className="container">
        <div className="to-do-list">
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
                  <div className="task-actions">
                    <button className="edit-btn" onClick={() => { setTaskToEdit(task); setShowEditModal(true); }}><Pencil /></button>
                    <button className="delete-btn" onClick={() => handleDeleteTask(task.id)}><Trash2 /></button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div className="doing-list">
          <h1>Doing</h1>
          <ul style={{ listStyle: 'none', padding: 10, color: 'black' }}>
            {tasks.map(task => (
              <li key={task.id} style={{
                background: '#f7f7f7',
                margin: '10px 0',
                padding: '15px',
                borderRadius: '5px',
                borderLeft: '10px solid #0066FF',
              }}>
                <div>
                  <strong>{task.title}</strong>
                  <p>{task.description}</p>
                  <span>Status: {task.completed ? 'Completed' : 'Incomplete'}</span>
                  <div className="task-actions">
                    <button className="edit-btn" onClick={() => { setTaskToEdit(task); setShowEditModal(true); }}><Pencil /></button>
                    <button className="delete-btn" onClick={() => handleDeleteTask(task.id)}><Trash2 /></button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div className="done-list">
          <h1>Done</h1>
          <ul style={{ listStyle: 'none', padding: 10, color: 'black' }}>
            {tasks.map(task => (
              <li key={task.id} style={{
                background: '#f7f7f7',
                margin: '10px 0',
                padding: '15px',
                borderRadius: '5px',
                borderLeft: '10px solid #4caf50',
              }}>
                <div>
                  <strong>{task.title}</strong>
                  <p>{task.description}</p>
                  <span>Status: Complete! </span>
                  <div className="task-actions">
                    <button className="edit-btn" onClick={() => { setTaskToEdit(task); setShowEditModal(true); }}><Pencil /></button>
                    <button className="delete-btn" onClick={() => handleDeleteTask(task.id)}><Trash2 /></button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}

export default App;

