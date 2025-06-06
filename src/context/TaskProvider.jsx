import { createContext } from "react";
import { TaskContext } from "./TaskContext";

import { useState } from "react";

export const TaskProvider = ({children}) => {

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
      }]);
    const [activeId, setActiveId] = useState(null);

    const handleDragStart = (event) => {
        setActiveId(event.active.id);
      };
    
      const handleDragEnd = (event) => {
        const { active, over } = event;
        if (over && active.id !== over.id) {
          setTasks((tasks) =>
            tasks.map((task) =>
              task.id === active.id ? { ...task, status: over.id } : task
            )
          );
        }
        setActiveId(null);
      };
    
      const handleChangeRange = (taskId, newProgress) => {
        setTasks(
          tasks.map((task) =>
            task.id === taskId ? { ...task, progress: newProgress } : task
          )
        );
      };
    
      const todoTasks = tasks.filter(
        (task) => task.status === "todo" && task.id !== activeId
      );
      const inProgressTasks = tasks.filter(
        (task) => task.status === "inProgress" && task.id !== activeId
      );
      const doneTasks = tasks.filter(
        (task) => task.status === "done" && task.id !== activeId
      );


    return (
        <TaskContext.Provider value={{
            tasks,
            activeId,
            handleDragStart,
            handleDragEnd,
            handleChangeRange,
            todoTasks,
            inProgressTasks,
            doneTasks
        }}>
            {children}
        </TaskContext.Provider>
    )
}