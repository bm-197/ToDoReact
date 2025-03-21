import { useState } from 'react';
import styles from './EditModal.module.css';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSave: (newName: string) => void;
  currentName: string;
}

function EditModal({ isOpen, onClose, onSave, currentName }: Props) {

  const [newName, setNewName] = useState(currentName);

  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <h2>Edit Task</h2>
        <input
          type="text"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          placeholder="Edit task name"
        />
        <div className={styles.modalButtons}>
          <button onClick={() => onSave(newName)}>Save</button>
          <button onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default EditModal;
