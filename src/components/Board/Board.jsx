import { useState } from "react";

import { DndContext, DragOverlay } from "@dnd-kit/core";


import Column from "../Column/Column";
import Task from "../Task/Task";

import styles from "./Board.module.scss";

const Board = () => {
  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: "Создать компонент Board",
      status: "todo",
      description: "Реализовать базовую структуру компонента",
      progress: 0,
    },
    {
      id: 2,
      title: "Добавить стили",
      status: "todo",
      description: "Стилизовать компонент Board",
      progress: 0,
    },
    {
      id: 3,
      title: "Реализовать drag-and-drop",
      status: "todo",
      description: "Добавить функционал перетаскивания задач",
      progress: 0,
    },
  ]);

  const [activeId, setActiveId] = useState(null);

  const handleDragStart = (event) => {
    setActiveId(event.active.id);
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
        setTasks((tasks) =>
            tasks.map((task) =>
                task.id === active.id
                    ? { ...task, status: over.id }
                    : task
            )
        );
    }
    console.log(active, over)
    setActiveId(null);
};

  const handleChangeRange = (taskId, newProgress) => {
    console.log('taskId:', taskId);
    console.log('newProgress:', newProgress);
    console.log('тип taskId:', typeof taskId);
    
    setTasks(tasks.map(task => 
        task.id === taskId 
            ? { ...task, progress: newProgress }
            : task
    ));
  }

  const todoTasks = tasks.filter((task) => task.status === "todo" && task.id !== activeId);
  const inProgressTasks = tasks.filter((task) => task.status === "inProgress" && task.id !== activeId);
  const doneTasks = tasks.filter((task) => task.status === "done" && task.id !== activeId);

  const activeTask = tasks.find((task) => task.id === activeId);

  return (
    <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
      <div className={styles.board}>
        <Column onProgressChange={handleChangeRange}  id="todo" title="To Do" tasks={todoTasks} />
        <Column onProgressChange={handleChangeRange}  id="inProgress" title="In Progress" tasks={inProgressTasks} />
        <Column onProgressChange={handleChangeRange}   id="done" title="Done" tasks={doneTasks} />
      </div>
      <DragOverlay>
        {activeTask ? <Task task={activeTask} isActive={true} /> : null}
      </DragOverlay>
    </DndContext>
  );
};

export default Board;
