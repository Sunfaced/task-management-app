import { useDroppable } from "@dnd-kit/core";
import { use, useContext } from "react";
import { TaskContext } from "../../context/TaskContext";

import Task from "../Task/Task";

import styles from "./Column.module.scss";

const Column = ({id, title}) => {
  const {handleChangeRange, todoTasks, inProgressTasks, doneTasks} = useContext(TaskContext);
  
  const columnTasks = {
    todo: todoTasks,
    inProgress: inProgressTasks,
    done: doneTasks
  }[id];

  const { setNodeRef } = useDroppable({
    id: id,
  });

  return (
    <div className={`${styles.column} ${styles[id]}`}>
      <h2>{title}</h2>
      <ul ref={setNodeRef} className={styles.taskList}>
        {columnTasks.length > 0 ? (
          columnTasks.map((task) => (
            <Task key={task.id} task={task} />
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
