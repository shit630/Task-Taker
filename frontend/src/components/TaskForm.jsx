import React from "react";
import { useState } from "react";
import api from "../utils/api";

const TaskForm = ({ onTaskAdded }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim()) {
      return alert("Title is required!");
    }

    try {
      const { data } = await api.post("/", { title, description, dueDate });
      onTaskAdded(data);
      setTitle("");
      setDescription("");
      setDueDate("");
    } catch (error) {
      console.error(error);
      alert("Error creating task!");
    }
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white shadow-md rounded-xl p-4 flex flex-col gap-4 w-full max-w-lg mx-auto"
    >
      <h2 className="text-xl font-semibold text-center">Add New Task</h2>
      <input
        type="text"
        placeholder="Task title"
        className="border rounded-lg p-2 w-full"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <textarea
        placeholder="Task description"
        className="border rounded-lg p-2 w-full"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <input
        type="date"
        className="border rounded-lg p-2 w-full"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
      />
      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-600 text-white rounded-lg py-2 transition cursor-pointer"
      >
        Add Task
      </button>
    </form>
  );
};

export default TaskForm;
