import { useState } from "react";
import { useTodos } from "../hooks/useTodos";
import TodoItem from "./TodoItem";
import EditTodoModal from "./EditTodoModal";
import type { Todo } from "../types/todo";

export default function TodoList() {
  const { todos } = useTodos();
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);

  return (
    <>
      <div className="todo-list">
        {todos.length === 0 ? (
          <p>No todos yet.</p>
        ) : (
          todos.map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onEdit={() => setSelectedTodo(todo)}
            />
          ))
        )}
      </div>

      {selectedTodo && (
        <EditTodoModal
          todo={selectedTodo}
          onClose={() => setSelectedTodo(null)}
        />
      )}
    </>
  );
}
