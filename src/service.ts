import Axios from "axios";

const axios = Axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

export const fetchTasks = async () => {
  try {
    const response = await axios.get("/tasks");
    return response.data;
  } catch (error) {
    console.log("Error service/fetchTasks: ", error);
    throw error;
  }
};

export const createTask = async (payload: {
  body: string;
  priority: number;
}) => {
  try {
    console.log('creando tarea----------------');
    
    const response = await axios.post("/task/create", payload);
    return response.data;
  } catch (error) {
    console.log("Error service/createTask: ", error);
    throw error;
  }
};

export const editTask = async (id: number, completed: boolean) => {
  try {
    const response = await axios.patch("/task/edit/" + id, {
      completed,
    });
    return response.data;
  } catch (error) {
    console.log("Error service/editTask: ", error);
    throw error;
  }
};

// Nueva función para borrar una tarea
export const deleteTask = async (id: number) => {
  try {
    const response = await axios.delete("/task/delete/" + id);
    return response.data;
  } catch (error) {
    console.log("Error service/deleteTask: ", error);
    throw error;
  }
};