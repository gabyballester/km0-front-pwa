import { useEffect, useState } from "react";
import { IoAdd } from "react-icons/io5";
import { Link } from "react-router-dom";
import Layout from "../components/Layout";
import TaskItem from "../components/TaskItem";
import { fetchTasks } from "../service";

type TTask = {
  id: number;
  body: string;
  priority: number;
  completed: boolean;
};

// Componente reutilizable para los botones de filtrado
const FilterButton = ({
  label,
  isSelected,
  onClick,
}: {
  label: string;
  isSelected: boolean;
  onClick: () => void;
}) => {
  return (
    <button
      className={`flex p-2 px-3 ${
        isSelected ? "bg-green-200 text-black" : "bg-gray-800 text-white"
      } rounded-full`}
      onClick={onClick}
    >
      {label}
    </button>
  );
};

function Tasks() {
  const [tasks, setTasks] = useState<TTask[]>([]);
  const [filter, setFilter] = useState<"all" | "completed" | "incomplete">(
    "all"
  );

  // Obtener las tareas desde el backend
  const getTasks = async () => {
    try {
      const tasks = await fetchTasks();
      setTasks(tasks);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  // Manejar el cambio de estado (completado/incompleto) de una tarea
  const handleTaskCheck = (taskId: number, completed: boolean) => {
    setTasks((tasks) =>
      tasks.map((task) => (task.id === taskId ? { ...task, completed } : task))
    );
    if (navigator.onLine) {
      getTasks(); // Sincronizar con el backend si hay conexión
    }
  };

  // Manejar la eliminación de una tarea
  const handleTaskDelete = (taskId: number) => {
    setTasks((tasks) => tasks.filter((task) => task.id !== taskId)); // Eliminar la tarea del estado
    if (navigator.onLine) {
      getTasks(); // Sincronizar con el backend si hay conexión
    }
  };

  // Filtrar las tareas según el estado del filtro
  const filteredTasks = tasks.filter((task) => {
    if (filter === "completed") {
      return task.completed;
    } else if (filter === "incomplete") {
      return !task.completed;
    } else {
      return true; // Mostrar todas las tareas si el filtro es "all"
    }
  });

  // Cargar las tareas al montar el componente
  useEffect(() => {
    getTasks();
  }, []);

  return (
    <Layout>
      {/* Botones de filtrado y creación de tareas */}
      <div className="flex gap-2 mb-4">
        <FilterButton
          label="Todo"
          isSelected={filter === "all"}
          onClick={() => setFilter("all")}
        />
        <FilterButton
          label="In Progress"
          isSelected={filter === "incomplete"}
          onClick={() => setFilter("incomplete")}
        />
        <FilterButton
          label="Done"
          isSelected={filter === "completed"}
          onClick={() => setFilter("completed")}
        />

        <Link
          to="/create"
          className="flex p-2 my-auto ml-auto text-black bg-yellow-200 rounded-full h-fit"
        >
          <IoAdd className="text-xl" />
        </Link>
      </div>

      {/* Lista de tareas */}
      <div className="space-y-2">
        {filteredTasks.map((task: TTask) => (
          <TaskItem
            id={task.id}
            key={task.id} // Usar el ID de la tarea como clave
            body={task.body}
            completed={task.completed}
            priority={task.priority}
            onCheck={(completed) => handleTaskCheck(task.id, completed)}
            onDelete={handleTaskDelete} // Pasar la función de borrado
          />
        ))}
      </div>
    </Layout>
  );
}

export default Tasks;
