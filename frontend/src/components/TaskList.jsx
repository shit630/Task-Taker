import TaskCard from "./TaskCard";

const TaskList = ({ tasks, onTaskUpdated, onTaskDeleted }) => {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 mt-6">
      {tasks.length > 0 ? (
        tasks.map((task) => (
          <TaskCard
            key={task._id}
            task={task}
            onTaskUpdated={onTaskUpdated}
            onTaskDeleted={onTaskDeleted}
          />
        ))
      ) : (
        <p className="text-center text-gray-500 col-span-full">
          No tasks available
        </p>
      )}
    </div>
  );
};

export default TaskList;
