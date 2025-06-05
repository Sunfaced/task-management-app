import { useDroppable } from "@dnd-kit/core";

import Task from "../Task/Task";

import styles from "./Column.module.scss";

const Column = ({id, title, tasks, onProgressChange }) => {
  const { setNodeRef } = useDroppable({
    id: id,
  });

  return (
    <div className={`${styles.column} ${styles[id]}`}>
      <h2>{title}</h2>
      <ul ref={setNodeRef} className={styles.taskList}>
        {tasks.length > 0 ? (
          tasks.map((task) => (
            <Task onProgressChange={onProgressChange} key={task.id} task={task} />
          ))
        ) : (
          <div className={styles.emptyState}>
            <p>Нет текущих задач</p>
          </div>
        )}
      </ul>
    </div>
  );
};

export default Column;
