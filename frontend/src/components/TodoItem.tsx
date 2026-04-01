import { useNavigate } from "react-router-dom";
import { useTodos } from "../hooks/useTodos";
import type { Todo } from "../types/todo";

type TodoItemProps = {
  todo: Todo;
  onEdit: () => void;
};

export default function TodoItem({ todo, onEdit }: TodoItemProps) {
  const { toggleTodo, deleteTodo } = useTodos();
  const navigate = useNavigate();

  const handleToggle = async () => {
    await toggleTodo(todo.id);
    navigate("/");
  };

  const handleDelete = async () => {
    await deleteTodo(todo.id);
    navigate("/");
  };

  return (
    <div className="todo-item">
      <div>
        <h3>{todo.title}</h3>
        <p>Status: {todo.completed ? "Completed" : "Pending"}</p>
      </div>

      <div className="todo-actions">
        <button onClick={handleToggle}>
          {todo.completed ? "Mark Pending" : "Toggle"}
        </button>
        <button onClick={onEdit}>Edit</button>
        <button onClick={handleDelete}>Delete</button>
      </div>
    </div>
  );
}
