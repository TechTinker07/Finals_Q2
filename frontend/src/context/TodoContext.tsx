import { createContext, useEffect, useState, type ReactNode } from "react";
import type { Todo } from "../types/todo";

type TodoContextType = {
  todos: Todo[];
  fetchTodos: () => Promise<void>;
  addTodo: (title: string) => Promise<boolean>;
  toggleTodo: (id: string) => Promise<void>;
  deleteTodo: (id: string) => Promise<void>;
  editTodo: (id: string, title: string) => Promise<void>;
  canAddTodo: boolean;
  warningMessage: string;
  isNextCompletable: (id: string) => boolean;
  isChainValid: boolean;
  verifyChain: () => Promise<void>;
};

export const TodoContext = createContext<TodoContextType | undefined>(undefined);

const API_URL = "https://localhost:7229/api/todos";
const VERIFY_URL = "https://localhost:7229/api/todos/verify";

export function TodoProvider({ children }: { children: ReactNode }) {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [warningMessage, setWarningMessage] = useState("");
  //state para malaman kung valid pa ang todo chain
  const [isChainValid, setIsChainValid] = useState(true);


  // Tumatawag sa backend verify endpoint para icheck kung valid ang chain
  const verifyChain = async () => {
    try {
      const res = await fetch(VERIFY_URL);

      if (res.ok) {
        setIsChainValid(true);
      } else {
        setIsChainValid(false);
      }
    } catch {
      setIsChainValid(false);
    }
  };

  const fetchTodos = async () => {
    const res = await fetch(API_URL);

    if (res.ok) {
      const data: Todo[] = await res.json();
      setTodos(data);
    }

    // Tuwing kukuha ng todos, ichecheck din kung valid pa ang chain
    await verifyChain();
  };

  const activeTodos = todos.filter((t) => !t.completed);
  const canAddTodo = activeTodos.length < 5;

  const getPendingTodosInOrder = () => {
    return [...todos]
      .filter((t) => !t.completed)
      .sort((a, b) => {
        const aTime = new Date(a.createdAt ?? 0).getTime();
        const bTime = new Date(b.createdAt ?? 0).getTime();
        return aTime - bTime;
      });
  };

  const isNextCompletable = (id: string) => {
    const pendingTodos = getPendingTodosInOrder();
    if (pendingTodos.length === 0) return false;
    return pendingTodos[0].id === id;
  };

  const addTodo = async (title: string) => {
    if (!canAddTodo) {
      setWarningMessage("You can only have a maximum of 5 active tasks.");
      return false;
    }

    const res = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        completed: false,
        createdAt: new Date().toISOString(),
      }),
    });

    if (res.ok) {
      setWarningMessage("");
      await fetchTodos();
      return true;
    }

    setWarningMessage("Failed to add todo.");
    return false;
  };

  const deleteTodo = async (id: string) => {
    const res = await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
    });

    if (res.ok) {
      setTodos((prev) => prev.filter((t) => t.id !== id));
      await verifyChain();
    }
  };

  const toggleTodo = async (id: string) => {
    const todo = todos.find((t) => t.id === id);
    if (!todo) return;

    if (!todo.completed && !isNextCompletable(id)) {
      setWarningMessage("Tasks must be completed in the order they were created.");
      return;
    }

    const res = await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: todo.title,
        completed: !todo.completed,
        createdAt: todo.createdAt,
      }),
    });

    if (res.ok) {
      setWarningMessage("");
      await fetchTodos();

      if (!todo.completed) {
        setTimeout(async () => {
          await deleteTodo(id);
        }, 15000);
      }
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
        createdAt: todo.createdAt,
      }),
    });

    if (res.ok) {
      setTodos((prev) =>
        prev.map((t) => (t.id === id ? { ...t, title } : t))
      );

      await verifyChain();
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <TodoContext.Provider
      value={{
        todos,
        fetchTodos,
        addTodo,
        toggleTodo,
        deleteTodo,
        editTodo,
        canAddTodo,
        warningMessage,
        isNextCompletable,
        isChainValid,
        verifyChain,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
}
