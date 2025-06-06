import { useContext } from "react";

import { DndContext, DragOverlay } from "@dnd-kit/core";
import { TaskContext } from "../../context/TaskContext";

import Column from "../Column/Column";
import Task from "../Task/Task";

import styles from "./Board.module.scss";


const Board = () => {

  const {
    tasks,
    activeId,
    handleDragStart,
    handleDragEnd,
    handleChangeRange,
    todoTasks,
    inProgressTasks,
    doneTasks
  } = useContext(TaskContext)

  const activeTask = tasks.find((task) => task.id === activeId);

  return (
    <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
      <div className={styles.board}>
        <Column id="todo" title="To Do" />
        <Column id="inProgress" title="In Progress" />
        <Column id="done" title="Done" />
      </div>
      <DragOverlay>
        {activeTask ? <Task task={activeTask} isActive={true} /> : null}
      </DragOverlay>
    </DndContext>
  );
};

export default Board;
