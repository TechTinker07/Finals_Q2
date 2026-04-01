import { useForm, type SubmitHandler } from "react-hook-form";
import { useTodos } from "../hooks/useTodos";

type AddTodoValues = {
  title: string;
};

export default function AddTodoForm() {
  const { addTodo } = useTodos();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AddTodoValues>();

  const onSubmit: SubmitHandler<AddTodoValues> = async (data) => {
    const trimmedTitle = data.title.trim();

    if (!trimmedTitle) return;

    await addTodo(trimmedTitle);
    reset();
  };

  return (
    <form className="todo-form" onSubmit={handleSubmit(onSubmit)}>
      <input
        type="text"
        placeholder="Enter a todo title"
        {...register("title", { required: "Title is required" })}
      />
      {errors.title && <span className="error-text">{errors.title.message}</span>}
      <button type="submit">Add Todo</button>
    </form>
  );
}
