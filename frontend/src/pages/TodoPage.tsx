import AddTodoForm from "../components/AddTodoForm";
import TodoList from "../components/TodoList";

export default function TodoPage() {
  return (
    <section className="section">
      <h1>My To-Do Board</h1>
      <p>Organize your tasks, update progress, and manage everything in one place.</p>
      <AddTodoForm />
      <TodoList />
    </section>
  );
}
