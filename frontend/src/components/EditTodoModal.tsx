import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTodos } from "../hooks/useTodos";
import type { Todo } from "../types/todo";

type EditTodoModalProps = {
  todo: Todo;
  onClose: () => void;
};

export default function EditTodoModal({ todo, onClose }: EditTodoModalProps) {
  const [title, setTitle] = useState(todo.title);
  const { editTodo } = useTodos();
  const navigate = useNavigate();

  const handleSave = async () => {
    if (!title.trim()) return;

    await editTodo(todo.id, title);
    onClose();
    navigate("/");
  };

  return (
    <div className="modal-overlay">
      <div className="modal-box">
        <h2>Edit Todo</h2>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <div className="modal-actions">
          <button onClick={handleSave}>Save</button>
          <button onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
}
