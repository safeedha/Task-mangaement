import React from 'react';
import { useDispatch } from 'react-redux';
import { deleteTask, updateTask } from './taskSlice';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './TaskItem.css';

const TaskItem = ({ task }) => {
  const dispatch = useDispatch();

  const toggleStatus = async () => {
    try {
      await dispatch(
        updateTask({
          id: task._id,
          data: { status: task.status === 'Pending' ? 'Completed' : 'Pending' }
        })
      ).unwrap(); 
      toast.success(`Marked as ${task.status === 'Pending' ? 'Completed' : 'Pending'}`);
    } catch (error) {
      toast.error('Failed to update task status');
    }
  };

  const handleDelete = async () => {
    try {
      await dispatch(deleteTask(task._id)).unwrap();
      toast.success('Task deleted successfully');
    } catch (error) {
      toast.error('Failed to delete task');
    }
  };

  return (
    <div className={`task-card ${task.status === 'Completed' ? 'completed' : ''}`}>
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="task-content">
        <h3>{task.title}</h3>
        <p>{task.description}</p>
        <p className="status">
          Status: <span className={task.status === 'Completed' ? 'green' : 'red'}>{task.status}</span>
        </p>
      </div>
      <div className="task-actions">
        <button className="status-btn" onClick={toggleStatus}>
          {task.status === 'Pending' ? 'Mark as Completed' : 'Mark as Pending'}
        </button>
        <button className="delete-btn" onClick={handleDelete}>
          Delete
        </button>
      </div>
    </div>
  );
};

export default TaskItem;
