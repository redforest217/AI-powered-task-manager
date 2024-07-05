import { Task } from "@/types";
import { useState } from "react";
import toast from "react-hot-toast";
import { FaCalendarAlt } from "react-icons/fa";

interface TaskCardProps {
  task: Task;
  onUpdateTask: (task: Task) => void;
  onDeleteTask: (id: string) => void;
  onSuggestSubtasks?: (task: Task) => Promise<void>; // Optional prop for AI
}

export default function TaskCard({
  task,
  onUpdateTask,
  onDeleteTask,
  onSuggestSubtasks,
}: TaskCardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(task.title);
  const [editedDescription, setEditedDescription] = useState(task.description);
  const [editedDueDate, setEditedDueDate] = useState(task.dueDate);
  const [submittingSubtasks, setSubmittingSubtasks] = useState(false);

  const handleSave = () => {
    onUpdateTask({
      ...task,
      title: editedTitle.trim(),
      description: editedDescription.trim(),
      dueDate: editedDueDate,
    });
    toast.success("Task updated successfully.");
    setIsEditing(false);
  };

  const handleToggleStatus = () => {
    onUpdateTask({
      ...task,
      status: task.status === "pending" ? "completed" : "pending",
    });
    toast.success(
      `Task marked as ${task.status === "pending" ? "completed" : "pending"}.`
    );
  };

  const handleSuggestClick = async () => {
    if (onSuggestSubtasks) {
      setSubmittingSubtasks(true);
      try {
        await onSuggestSubtasks(task);
      } finally {
        setSubmittingSubtasks(false);
      }
    }
  };

  return (
    <div
      className={`group relative rounded-2xl p-6 shadow-xl bg-[#0c0c0c] hover:shadow-2xl 
      ${
        task.status === "completed"
          ? "border-gradient-emerald task-card-glow-completed"
          : "border-gradient-fuchsia task-card-glow"
      }`}
    >
      {isEditing ? (
        <>
          <input
            type="text"
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
            placeholder="Task title"
            className="w-full text-xl font-semibold mb-3 bg-transparent border-b border-white/20 text-[#FFFFFC] placeholder:text-gray-400 focus:outline-none focus:border-cyan-400 transition"
          />
          <textarea
            value={editedDescription}
            onChange={(e) => setEditedDescription(e.target.value)}
            placeholder="Description"
            rows={3}
            className="w-full text-sm mb-4 bg-transparent text-[#FFFFFC] border-b border-white/20 placeholder:text-gray-400 focus:outline-none focus:border-purple-400 transition"
          ></textarea>
          <input
            type="date"
            value={editedDueDate}
            onChange={(e) => setEditedDueDate(e.target.value)}
            className="w-full text-sm mb-6 bg-transparent text-[#FFFFFC] border-b border-white/20 focus:outline-none focus:border-blue-400 transition"
          />
          <div className="flex justify-end gap-2">
            <button
              onClick={handleSave}
              className="bg-emerald-600 hover:bg-emerald-700 text-[#FFFFFC] text-sm py-1.5 px-4 rounded-lg transition hover:cursor-pointer"
            >
              Save
            </button>
            <button
              onClick={() => setIsEditing(false)}
              className="bg-zinc-600 hover:bg-zinc-700 text-[#FFFFFC] text-sm py-1.5 px-4 rounded-lg transition hover:cursor-pointer"
            >
              Cancel
            </button>
          </div>
        </>
      ) : (
        <>
          <h3 className="text-xl sm:text-2xl font-semibold text-[#FFFFFC] mb-2 tracking-tight">
            {task.title || "No title"}
          </h3>
          <p className="text-[#FFFFFC] mb-5 text-sm sm:text-base leading-relaxed">
            {task.description || "No description"}
          </p>
          <p className="text-xs text-[#FFFFFC] mb-2 flex items-center gap-1">
            <FaCalendarAlt className="text-[#FFFFFC]" /> Due: {task.dueDate}
          </p>
          <p className="text-xs text-[#FFFFFC] mb-6">
            Status:
            <span
              className={`ml-1 font-medium ${
                task.status === "completed"
                  ? "text-emerald-400"
                  : "text-[#dd268b]"
              }`}
            >
              {task.status.charAt(0).toUpperCase() + task.status.slice(1)}
            </span>
          </p>

          {task.subtasks && task.subtasks.length > 0 && (
            <div className="mb-4">
              <h4 className="font-semibold text-[#FFFFFC] mb-2 text-sm">
                Subtasks
              </h4>
              <ul className="list-disc list-inside text-[#FFFFFC] text-sm space-y-1 pl-2">
                {task.subtasks.map((subtask, index) => (
                  <li key={index}>{subtask}</li>
                ))}
              </ul>
            </div>
          )}

          <div className="flex flex-wrap justify-center items-center gap-3">
            {onSuggestSubtasks && (
              <button
                onClick={handleSuggestClick}
                disabled={submittingSubtasks} // Disable button during AI call
                className="bg-gradient-to-r w-[45%] font-medium from-purple-500 to-fuchsia-500 hover:from-purple-400 hover:to-fuchsia-400 text-[#FFFFFC] text-sm py-1.5 px-4 rounded-lg transition hover:cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {submittingSubtasks ? "Suggesting..." : "AI Suggest"}
              </button>
            )}
            <button
              onClick={handleToggleStatus}
              className={`text-[#FFFFFC] text-sm w-[45%] py-1.5 px-4 rounded-lg transition font-medium shadow-inner hover:cursor-pointer ${
                task.status === "pending"
                  ? "bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500"
                  : "bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-400 hover:to-yellow-500"
              }`}
            >
              {task.status === "pending" ? "Mark As Done" : "Mark Pending"}
            </button>

            <button
              onClick={() => setIsEditing(true)}
              className="bg-gradient-to-r w-[45%] font-medium from-blue-500 to-indigo-500 hover:from-blue-400 hover:to-indigo-400 text-[#FFFFFC] text-sm py-1.5 px-4 rounded-lg transition hover:cursor-pointer"
            >
              Edit
            </button>

            <button
              onClick={() => onDeleteTask(task.id)}
              className="bg-gradient-to-r font-medium w-[45%] from-red-500 to-pink-500 hover:from-red-400 hover:to-pink-400 text-[#FFFFFC] text-sm py-1.5 px-4 rounded-lg transition hover:cursor-pointer"
            >
              Delete
            </button>
          </div>
        </>
      )}
    </div>
  );
}
