import { PlusCircle, ClipboardText, Trash } from "phosphor-react";
import { MouseEvent, useState } from "react";
import clipboard from "../assets/clipboard.png";
import check from "../assets/check.svg";
import checked from "../assets/checked.svg";

import styles from "./Content.module.css";

interface Task {
  task: string;
  completed: boolean;
}

export const Content = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [value, setValue] = useState("");
  const [numberOfTaskCreated, setNumberOfTaskCreated] = useState(0);

  const handleCreateTask = () => {
    setTasks((task) => [
      ...task,
      {
        task: value,
        completed: false,
      },
    ]);
    console.log(tasks);
    setValue("");

    setNumberOfTaskCreated((task) => task + 1);
  };

  const handleCompletedTask = (index: number) => {
    const newTasks = [...tasks];
    const [removed] = newTasks.splice(index, 1);
    newTasks.splice(removed.completed ? 0 : newTasks.length, 0, {
      task: removed.task,
      completed: !removed.completed,
    });

    setTasks(newTasks);

    console.log(removed);
  };

  const handleDeleteTask = (index: number, e: MouseEvent<SVGSVGElement, globalThis.MouseEvent>) => {
    e.stopPropagation();

    const newTasks = [...tasks];
    newTasks.splice(index, 1);
    setTasks(newTasks);
  };

  return (
    <div className={styles.contentContainer}>
      <div className={styles.addTask}>
        <input
          onChange={(e) => setValue(e.target.value)}
          value={value}
          type="text"
          placeholder="Adicione uma nova tarefa"
        />
        <button onClick={handleCreateTask} type="submit">
          Criar <PlusCircle size={16} />
        </button>
      </div>

      <div className={styles.tasks}>
        <div className={styles.status}>
          <div className={styles.numberOfTaskCreated}>
            <h2>Tarefas criadas</h2>
            <span>{numberOfTaskCreated}</span>
          </div>

          <div className={styles.numberOfTaskCompleted}>
            <h2>concluídas</h2>
            <span>
              {tasks.filter((task) => task.completed === true).length}
            </span>
          </div>
        </div>

        <div className={styles.taskList}>
          {tasks.length > 0 ? (
            <div className={styles.taskCreated}>
              {tasks.map(({ task, completed }, index) => (
                <div
                  onClick={() => handleCompletedTask(index)}
                  key={task}
                  className={styles.task}
                >
                  {completed ? (
                    <img src={checked} alt="checked" />
                  ) : (
                    <img src={check} alt="" />
                  )}
                  <p className={!completed ? "" : styles.taskCompleted}>
                    {task}
                  </p>
                  <Trash
                    onClick={(e) => handleDeleteTask(index, e)}
                    size={14}
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className={styles.noTaskCreated}>
              <img src={clipboard} alt="clipboard" />

              <strong>Você ainda não tem tarefas cadastradas</strong>
              <p>Crie tarefas e organize seus itens a fazer</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
