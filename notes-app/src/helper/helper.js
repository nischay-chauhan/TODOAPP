import axios from "axios";

const BASE_URL = "http://localhost:5000/api/tasks";

export const addTask = async (title, description) => {
  try {
    const response = await axios.post(BASE_URL, {
      title,
      description,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const fetchTasks = async () => {
  try {
    const response = await axios.get(BASE_URL);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteTask = async (taskId) => {
  try {
    const response = await fetch(`${BASE_URL}/${taskId}`, {
      method: "DELETE",
    });

    if (response.ok) {
      return true;
    } else {
      throw new Error("Failed to delete task");
    }
  } catch (error) {
    throw error;
  }
};

export const editTask = async (taskId, editedTitle, editedDescription) => {
  try {
    const response = await axios.put(`${BASE_URL}/${taskId}`, {
      title: editedTitle,
      description: editedDescription,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

