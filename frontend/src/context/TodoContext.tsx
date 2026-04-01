import { createContext, useEffect, useState, type ReactNode } from "react";
import type { Todo } from "../types/todo";

type TodoContextType = {
  todos: Todo[];
  fetchTodos: () => Promise<void>;
  addTodo: (title: string) => Promise<void>;
  toggleTodo: (id: string) => Promise<void>;
  deleteTodo: (id: string) => Promise<void>;
  editTodo: (id: string, title: string) => Promise<void>;
};

export const TodoContext = createContext<TodoContextType | undefined>(undefined);

const API_URL = "https://localhost:7229/api/todos";

export function TodoProvider({ children }: { children: ReactNode }) {
  const [todos, setTodos] = useState<Todo[]>([]);

  const fetchTodos = async () => {
    const res = await fetch(API_URL);
    if (res.ok) {
      const data: Todo[] = await res.json();
      setTodos(data);
    }
  };

  const addTodo = async (title: string) => {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ title, completed: false }),
  });

  if (res.ok) {
    await fetchTodos();
  } else {
    console.error("Failed to add todo");
  }
};

  const toggleTodo = async (id: string) => {
    const todo = todos.find((t) => t.id === id);
    if (!todo) return;

    const res = await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: todo.title,
        completed: !todo.completed,
      }),
    });

    if (res.ok) {
      await fetchTodos();
    }
  };

  const deleteTodo = async (id: string) => {
    const res = await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
    });

    if (res.ok) {
      setTodos((prev) => prev.filter((t) => t.id !== id));
    }
  };

  const editTodo = async (id: string, title: string) => {
    const todo = todos.find((t) => t.id === id);
    if (!todo) return;

    const res = await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        completed: todo.completed,
      }),
    });

    if (res.ok) {
      setTodos((prev) =>
        prev.map((t) => (t.id === id ? { ...t, title } : t))
      );
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <TodoContext.Provider
      value={{ todos, fetchTodos, addTodo, toggleTodo, deleteTodo, editTodo }}
    >
      {children}
    </TodoContext.Provider>
  );
}
