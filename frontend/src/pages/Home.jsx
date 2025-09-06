import { useEffect, useState } from "react";
import api from "../utils/api";
import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";

const Home = () => {
  const [tasks, setTasks] = useState([]);

  // Fetch tasks
  const fetchTasks = async () => {
    try {
      const { data } = await api.get("/");
      setTasks(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <h1 className="text-3xl font-bold text-center mb-6">Task Taker App</h1>
      <TaskForm onTaskAdded={(newTask) => setTasks([newTask, ...tasks])} />
      <TaskList
        tasks={tasks}
        onTaskUpdated={(updatedTask) =>
          setTasks(
            tasks.map((t) => (t._id === updatedTask._id ? updatedTask : t))
          )
        }
        onTaskDeleted={(id) => setTasks(tasks.filter((t) => t._id !== id))}
      />
    </div>
  );
};

export default Home;
