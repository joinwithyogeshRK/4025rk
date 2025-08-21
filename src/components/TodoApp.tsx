import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { toast } from 'sonner';
import { Plus, Moon, Sun, Trash2, Check, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useTheme } from './ThemeProvider';
import { TodoItem } from './TodoItem';
import { AddTodoDialog } from './AddTodoDialog';

export type Todo = {
  id: string;
  text: string;
  completed: boolean;
  priority: 'low' | 'medium' | 'high' | 'none';
  createdAt: Date;
};

const TodoApp = () => {
  const [todos, setTodos] = useState<Todo[]>(() => {
    const savedTodos = localStorage.getItem('todos');
    if (savedTodos) {
      try {
        return JSON.parse(savedTodos).map((todo: any) => ({
          ...todo,
          createdAt: new Date(todo.createdAt)
        }));
      } catch (e) {
        console.error('Error parsing todos from localStorage', e);
        return [];
      }
    }
    return [];
  });
  
  const [dialogOpen, setDialogOpen] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = (text: string, priority: 'low' | 'medium' | 'high' | 'none') => {
    if (text.trim() === '') {
      toast.error("Task cannot be empty");
      return;
    }
    
    const newTodo: Todo = {
      id: uuidv4(),
      text,
      completed: false,
      priority,
      createdAt: new Date()
    };
    
    setTodos([...todos, newTodo]);
    toast.success("Task added successfully");
  };

  const toggleTodo = (id: string) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id: string) => {
    setTodos(todos.filter((todo) => todo.id !== id));
    toast.success("Task deleted successfully");
  };

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <Card className="mx-auto max-w-3xl">
        <CardHeader className="todo-header">
          <div className="flex items-center justify-between">
            <CardTitle className="todo-app-title">Complex Todo</CardTitle>
            <Button variant="ghost" size="icon" onClick={toggleTheme}>
              {theme === 'light' ? (
                <Moon className="h-5 w-5" />
              ) : (
                <Sun className="h-5 w-5" />
              )}
            </Button>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          {todos.length === 0 ? (
            <div className="todo-empty-state">
              <p>No tasks yet. Add your first task!</p>
            </div>
          ) : (
            <div className="space-y-2">
              {todos
                .sort((a, b) => {
                  // Sort by completion status first
                  if (a.completed !== b.completed) {
                    return a.completed ? 1 : -1;
                  }
                  
                  // Then sort by priority
                  const priorityOrder = { high: 0, medium: 1, low: 2, none: 3 };
                  if (a.priority !== b.priority) {
                    return priorityOrder[a.priority] - priorityOrder[b.priority];
                  }
                  
                  // Finally sort by creation date (newest first)
                  return b.createdAt.getTime() - a.createdAt.getTime();
                })
                .map((todo) => (
                  <TodoItem
                    key={todo.id}
                    todo={todo}
                    onToggle={toggleTodo}
                    onDelete={deleteTodo}
                  />
                ))}
            </div>
          )}
        </CardContent>
      </Card>
      
      <button 
        className="todo-floating-btn" 
        onClick={() => setDialogOpen(true)}
        aria-label="Add new task"
      >
        <Plus className="h-6 w-6" />
      </button>
      
      <AddTodoDialog 
        open={dialogOpen} 
        onOpenChange={setDialogOpen} 
        onAddTodo={addTodo} 
      />
    </div>
  );
};

export default TodoApp;
