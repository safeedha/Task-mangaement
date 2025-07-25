import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { deleteTask, updateTask } from './taskSlice';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './TaskItem.css';

const TaskItem = ({ task }) => {
  const dispatch = useDispatch();

  const [editMode, setEditMode] = useState(false);
  const [editedTitle, setEditedTitle] = useState(task.title);
  const [editedDescription, setEditedDescription] = useState(task.description);

  const toggleStatus = async () => {
    try {
      await dispatch(
        updateTask({
          id: task._id,
          data: { status: task.status === 'Pending' ? 'Completed' : 'Pending' }
        })
      ).unwrap();
      toast.success(`Marked as ${task.status === 'Pending' ? 'Completed' : 'Pending'}`);
    } catch {
      toast.error('Failed to update task status');
    }
  };

  const handleDelete = async () => {
    try {
      await dispatch(deleteTask(task._id)).unwrap();
      toast.success('Task deleted successfully');
    } catch {
      toast.error('Failed to delete task');
    }
  };

  const handleUpdate = async () => {
    if (!editedTitle.trim()) {
      toast.error('Title is required');
      return;
    }

    try {
      await dispatch(
        updateTask({
          id: task._id,
          data: {
            title: editedTitle,
            description: editedDescription
          }
        })
      ).unwrap();
      toast.success('Task updated successfully');
      setEditMode(false);
    } catch {
      toast.error('Failed to update task');
    }
  };

  return (
    <div className={`task-card ${task.status === 'Completed' ? 'completed' : ''}`}>
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="task-content">
        {editMode ? (
          <>
            <input
              value={editedTitle}
              onChange={(e) => setEditedTitle(e.target.value)}
              placeholder="Title"
            />
            <textarea
              value={editedDescription}
              onChange={(e) => setEditedDescription(e.target.value)}
              placeholder="Description"
            />
          </>
        ) : (
          <>
            <h3>{task.title}</h3>
            <p>{task.description}</p>
            <p className="status">
          Status: <span className={task.status === 'Completed' ? 'green' : 'red'}>{task.status}</span>
        </p>
         <button className="delete-btn" onClick={handleDelete}>
          Delete
        </button>
         <button className="status-btn" onClick={toggleStatus}>
          {task.status === 'Pending' ? 'Mark as Completed' : 'Mark as Pending'}
        </button>
          </>
        )}
        {/* <p className="status">
          Status: <span className={task.status === 'Completed' ? 'green' : 'red'}>{task.status}</span>
        </p> */}
      </div>
      <div className="task-actions">
        {/* <button className="status-btn" onClick={toggleStatus}>
          {task.status === 'Pending' ? 'Mark as Completed' : 'Mark as Pending'}
        </button> */}
        <button className="edit-btn" onClick={() => (editMode ? handleUpdate() : setEditMode(true))}>
          {editMode ? 'Save' : 'Edit'}
        </button>
        {editMode && (
          <button className="cancel-btn" onClick={() => {
            setEditMode(false);
            setEditedTitle(task.title);
            setEditedDescription(task.description);
          }}>
            Cancel
          </button>
        )}
        {/* <button className="delete-btn" onClick={handleDelete}>
          Delete
        </button> */}
      </div>
    </div>
  );
};

export default TaskItem;
