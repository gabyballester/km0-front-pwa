import toast from "react-hot-toast";
import { MdComment, MdDelete } from "react-icons/md";
import { editTask, deleteTask } from "../service"; // Importa la función de borrado

type Props = {
  id: number;
  body: string;
  priority: number;
  completed: boolean;
  onCheck: (value: boolean) => void;
  onDelete: (id: number) => void; // Nueva prop para manejar el borrado
};

function TaskItem({ id, body, priority, completed, onCheck, onDelete }: Props) {
  const syncCheck = async (taskCompleted: boolean) => {
    try {
      await editTask(id, taskCompleted);
      onCheck(taskCompleted);
      toast.success(taskCompleted ? "Task completed!" : "Task pending!");
    } catch (err) {
      if (!navigator.onLine) {
        onCheck(taskCompleted);
        return toast.success(
          "You're offline! Changes will be synced when you're online again."
        );
      }
      toast.error("Failed to save changes!");
    }
  };

  const handleCheck = () => {
    syncCheck(!completed);
  };

  // Manejo de eliminación de tarea
  const handleDelete = async () => {
    if (!navigator.onLine) {
      // Si no hay conexión, manejamos la eliminación de forma offline
      onDelete(id); // Elimina la tarea de manera local
      toast.success(
        "You're offline! The delete request will be synced when you're online again."
      );
      return;
    }

    try {
      // Si hay conexión, hacemos la eliminación en el backend
      await deleteTask(id);
      onDelete(id); // Elimina la tarea de la lista en el estado del componente padre
      toast.success("Task deleted successfully!");
    } catch (err) {
      toast.error("Failed to delete task!");
    }
  };

  return (
    <div className="bg-[#1f1f1f] p-5 w-full rounded-xl">
      <p className="text-xs text-gray-400">Priority: {priority}</p>
      <div className="flex justify-between w-full mt-2">
        <p className="flex text-xl text-gray-200 grow">{body}</p>
        <input
          onChange={handleCheck}
          checked={completed}
          type="checkbox"
          className="inline-block h-5 m-5 my-auto cursor-pointer"
        />
      </div>

      <div className="flex gap-2 mt-4 ml-auto w-fit">
        <div className="flex text-sm">
          <MdComment className="my-auto mr-2" />
          <span className="inline-block my-auto">4</span>
        </div>
        {/* Botón de borrado */}
        <button
          onClick={handleDelete}
          className="p-2 text-red-500 hover:text-red-600"
        >
          <MdDelete className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}

export default TaskItem;
