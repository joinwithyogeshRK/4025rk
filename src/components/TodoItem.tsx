import { Trash2 } from 'lucide-react';
import { Todo } from './TodoApp';
import { Checkbox } from '@/components/ui/checkbox';

type TodoItemProps = {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
};

export const TodoItem = ({ todo, onToggle, onDelete }: TodoItemProps) => {
  const priorityClasses = {
    high: 'todo-priority-high',
    medium: 'todo-priority-medium',
    low: 'todo-priority-low',
    none: ''
  };

  return (
    <div className={`todo-item ${priorityClasses[todo.priority]}`}>
      <Checkbox
        id={`todo-${todo.id}`}
        className="todo-checkbox"
        checked={todo.completed}
        onCheckedChange={() => onToggle(todo.id)}
      />
      <label
        htmlFor={`todo-${todo.id}`}
        className={`flex-1 cursor-pointer ${todo.completed ? 'todo-completed' : ''}`}
      >
        {todo.text}
      </label>
      <button
        className="todo-delete-btn"
        onClick={() => onDelete(todo.id)}
        aria-label="Delete task"
      >
        <Trash2 className="h-4 w-4" />
      </button>
    </div>
  );
};
