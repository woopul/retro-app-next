/* eslint-disable @typescript-eslint/no-empty-function */
import { createContext, useState } from 'react';

export type TaskStoreContextType = {
  cards: TaskItemType[];
  setTaskList: React.Dispatch<React.SetStateAction<TaskItemType[]>>;
  localStorageTaskStore: { get: () => TaskItemType[]; set: (taskList: TaskItemType[]) => void };
};

// set empty initial values of context
export const TaskStoreContext = createContext<TaskStoreContextType>({
  taskList: [],
  setTaskList: () => {},
  localStorageTaskStore: { get: () => [], set() {} },
});

export type TaskStoreProviderType = {
  children: React.ReactNode;
};

export function TaskStoreProvider({ children }: TaskStoreProviderType) {
  const { set, get } = createLocalStorageStore<TaskItemType[]>();
  const [taskList, setTaskList] = useState(get(TASKS_STORAGE_KEY) || []);

  const localStorageTaskStore = {
    get: () => get(TASKS_STORAGE_KEY) || [],
    set: (taskList: TaskItemType[]) => set(TASKS_STORAGE_KEY, taskList),
  };

  const value = { taskList, setTaskList, localStorageTaskStore };
  return <TaskStoreContext.Provider value={value}>{children}</TaskStoreContext.Provider>;
}
