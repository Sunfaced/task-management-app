import { useDraggable } from "@dnd-kit/core";
import { useContext } from "react";
import { TaskContext } from "../../context/TaskContext";

import styles from "./Task.module.scss";

const Task = ({ isActive, task }) => {

    const {handleChangeRange} = useContext(TaskContext)

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
                            onChange={(e) => handleChangeRange(task.id, e.target.value)}
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
