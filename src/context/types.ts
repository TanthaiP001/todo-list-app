export const MIN_PRIORITY = 1;
export const MAX_PRIORITY = 5;

export interface Todo {
  id: number;
  title: string;
  completed: boolean;
  priority: number;
}
  
  export interface TodoState {
    todos: Todo[];
    loading: boolean;
    error: string | null;
  }
  