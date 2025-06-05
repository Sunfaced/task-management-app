import { useDraggable } from "@dnd-kit/core";

import styles from "./Task.module.scss";

const Task = ({ task, isActive, onProgressChange }) => {

    const { attributes, listeners, setNodeRef } = useDraggable({
        id: task.id
    });

  return (
    <li 
            ref={setNodeRef} 
            {...listeners} 
            {...attributes} 
            className={`${styles.taskItem} ${isActive ? styles.active : ''}`}
        >
            <h3>{task.title}</h3>
            <div className={styles.taskInfo}>
                <div className={styles.status}>
                    <span className={styles.statusIndicator}></span>
                    {task.status}
                </div>
                {task.status === "inProgress" && (
                    <div className={styles.progress}>
                        <input 
                            onChange={(e) => onProgressChange(task.id, e.target.value)}
                            onPointerDown={(e) => e.stopPropagation()}
                            type="range"
                            min="0"
                            max="100"
                            step="10"
                            value={task.progress}
                        />
                        <span>{task.progress}%</span>
                    </div>
                )}
            </div>
            <p>{task.description}</p>
        </li>

  );
};

export default Task;
