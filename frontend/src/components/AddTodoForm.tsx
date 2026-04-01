import { useForm, type SubmitHandler } from "react-hook-form";
import { useTodos } from "../hooks/useTodos";

type AddTodoValues = {
  title: string;
};

export default function AddTodoForm() {
  const { addTodo, canAddTodo, warningMessage } = useTodos();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<AddTodoValues>({
    defaultValues: {
      title: "",
    },
  });

  const titleValue = watch("title");
  const limitWarning = !canAddTodo
    ? "You can only have a maximum of 5 active tasks."
    : "";

  const onSubmit: SubmitHandler<AddTodoValues> = async (data) => {
    const trimmedTitle = data.title.trim();

    if (!trimmedTitle) return;

    const added = await addTodo(trimmedTitle);

    if (added) {
      setValue("title", "");
    }
  };

  return (
    <form className="todo-form" onSubmit={handleSubmit(onSubmit)}>
      <input
        type="text"
        placeholder="Enter a todo title"
        {...register("title", { required: "Title is required" })}
      />

      <button type="submit" disabled={!canAddTodo || !titleValue?.trim()}>
        Add Todo
      </button>

      {errors.title && <span className="error-text">{errors.title.message}</span>}
      {limitWarning && <span className="warning-text">{limitWarning}</span>}
      {!limitWarning && warningMessage && (
        <span className="warning-text">{warningMessage}</span>
      )}
    </form>
  );
}
