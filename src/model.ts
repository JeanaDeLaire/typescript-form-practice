export interface Todo{
    id: number;
    todo: string;
    isDone: boolean; 
}

// export interface Task {
//     id: string;
//     title: string;
//     description: string;
//     assignedUser?: string;
//   }

export interface Task {
    id: string;
    title: string;
    description: string;
    assignedUser?: string;
    status?: string;
  }
  
export interface Tasks {
    todoItems: Task[];
    inProgressItems: Task[];
    doneItems: Task[];
  }
  
export interface TaskData {
    tasks: Tasks;
  }