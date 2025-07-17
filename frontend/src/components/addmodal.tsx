import React from 'react';
import './addmodal.css';

interface AddModalProps {
    show: boolean;
    onClose: () => void;
    onSubmit: (title: string, description: string) => void;
}

export default function AddModal({ show, onClose, onSubmit }: AddModalProps) {
    const [title, setTitle] = React.useState("");
    const [description, setDescription] = React.useState("");

    if (!show) return null;

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        onSubmit(title, description);
        setTitle("");
        setDescription("");
        onClose();
    }

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>Add a new task</h2>
                <form onSubmit={handleSubmit}>
                    <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} required />
                    <input type="text" placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} required />
                    <button style={{backgroundColor: 'green', color: 'white'}} type="submit">Add Task</button>
                    <button style={{backgroundColor: 'red', color: 'white'}} onClick={onClose}>Cancel</button>
                </form>
            </div>
        </div>
    )
}
    