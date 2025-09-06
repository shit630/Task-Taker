import api from "../utils/api";

const TaskCard = ({ task, onTaskUpdated, onTaskDeleted }) => {
  const handleToggle = async () => {
    try {
      const { data } = await api.put(`/${task._id}`, {
        status: task.status === "pending" ? "completed" : "pending",
      });
      onTaskUpdated(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async () => {
    if (!confirm("Delete this task?")) return;
    try {
      await api.delete(`/${task._id}`);
      onTaskDeleted(task._id);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="bg-white shadow-md rounded-xl p-4 flex flex-col gap-2 w-full">
      <h3 className="text-lg font-semibold">{task.title}</h3>
      <p className="text-gray-600">{task.description}</p>
      {task.dueDate && (
        <p className="text-sm text-gray-500">
          Due: {new Date(task.dueDate).toLocaleDateString()}
        </p>
      )}
      <div className="flex justify-between items-center mt-2">
        <span
          className={`px-2 py-1 rounded-lg text-sm ${
            task.status === "completed"
              ? "bg-green-200 text-green-700"
              : "bg-yellow-200 text-yellow-700"
          }`}
        >
          {task.status}
        </span>
        <div className="flex gap-2">
          <button
            onClick={handleToggle}
            className="bg-indigo-500 hover:bg-indigo-600 text-white px-3 py-1 rounded-lg cursor-pointer"
          >
            {task.status === "pending" ? "Complete" : "Undo"}
          </button>
          <button
            onClick={handleDelete}
            className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg cursor-pointer"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
