import React from 'react';
import './modal.css';

interface EditModalProps {
    show: boolean;
    onClose: () => void;
    onSubmit: (title: string, description: string) => void;
    title: string;
    description: string;
}

export default function EditModal({ show, onClose, onSubmit, title: initialTitle, description: initialDescription }: EditModalProps) {
    const [title, setTitle] = React.useState(initialTitle);
    const [description, setDescription] = React.useState(initialDescription);

    React.useEffect(() => {
        setTitle(initialTitle);
        setDescription(initialDescription);
    }, [initialTitle, initialDescription, show]);

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
                <h2>Edit existing task</h2>
                <form onSubmit={handleSubmit}>
                    <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} required />
                    <input type="text" placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} required />
                    <button style={{backgroundColor: 'green', color: 'white'}} type="submit">Edit Task</button>
                    <button style={{backgroundColor: 'red', color: 'white'}} onClick={onClose}>Cancel</button>
                </form>
            </div>
        </div>
    )
}
    