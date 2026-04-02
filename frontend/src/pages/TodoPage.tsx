import AddTodoForm from "../components/AddTodoForm";
import TodoList from "../components/TodoList";
import { useTodos } from "../hooks/useTodos";

export default function TodoPage() {
  const { isChainValid } = useTodos();

  //updated: that use chain validity and show the warning banner
  return (
    <section className="section">
      {!isChainValid && ( // Kapag invalid ang chain, magpapakita ng warning banner
        <div className="tampered-banner">REDACTED / TAMPERED</div>
      )}

      <h1>My To-Do Board</h1>
      <p>Organize your tasks, update progress, and manage everything in one place.</p>
      <AddTodoForm />
      <TodoList />
    </section>
  );
}
