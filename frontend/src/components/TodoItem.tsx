import { useTodos } from "../hooks/useTodos";
import type { Todo } from "../types/todo";

type TodoItemProps = {
  todo: Todo;
  onEdit: () => void;
};

export default function TodoItem({ todo, onEdit }: TodoItemProps) {
  const { toggleTodo, deleteTodo, isNextCompletable } = useTodos();

  const canToggle = todo.completed || isNextCompletable(todo.id);

  const handleToggle = async () => {
    await toggleTodo(todo.id);
  };

  const handleDelete = async () => {
    await deleteTodo(todo.id);
  };

  return (
    <div className="todo-item">
      <div>
        <h3>{todo.title}</h3>
        <p>Status: {todo.completed ? "Completed" : "Pending"}</p>
      </div>

      <div className="todo-actions">
        <button type="button" onClick={handleToggle} disabled={!canToggle}>
          {todo.completed ? "Completed" : "Toggle"}
        </button>
        <button type="button" onClick={onEdit}>Edit</button>
        <button type="button" onClick={handleDelete}>Delete</button>
      </div>
    </div>
  );
}
