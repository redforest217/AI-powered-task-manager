import { NewTask } from "@/types";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { FaPlus } from "react-icons/fa6";

interface AddTaskFormProps {
  onAddTask: (newTask: NewTask) => void;
}

export default function AddTaskForm({ onAddTask }: AddTaskFormProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !description.trim() || !dueDate.trim()) {
      toast.error("All fields are required!");
      return;
    }

    onAddTask({
      title: title.trim(),
      description: description.trim(),
      status: "pending",
      dueDate: dueDate,
    });

    setTitle("");
    setDescription("");
    setDueDate("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="backdrop-blur-md bg-white/5 border-2 border-[#3b21a9]/90 rounded-xl p-6 shadow-lg max-w-xl w-full mx-auto mb-8"
    >
      <h2 className="text-xl sm:text-2xl font-bold text-white mb-6 text-center tracking-tight">
        Add <span className="text-gradient">New Task</span>
      </h2>

      <div className="mb-5">
        <label
          htmlFor="title"
          className="block text-sm font-medium text-[#f3f3f3] mb-2"
        >
          Title
        </label>
        <input
          type="text"
          id="title"
          className="w-full rounded-lg bg-white/10 text-[#FFFFFC] px-4 py-2 border border-transparent focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 placeholder:text-gray-400"
          placeholder="Enter task title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>

      <div className="mb-5">
        <label
          htmlFor="description"
          className="block text-sm font-medium text-[#f3f3f3] mb-2"
        >
          Description
        </label>
        <textarea
          id="description"
          rows={3}
          className="w-full rounded-lg bg-white/10 text-[#FFFFFC] px-4 py-2 border border-transparent focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500 placeholder:text-gray-400"
          placeholder="Enter task description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
      </div>

      <div className="mb-6">
        <label
          htmlFor="dueDate"
          className="block text-sm font-medium text-[#f3f3f3] mb-2"
        >
          Due Date
        </label>
        <input
          type="date"
          id="dueDate"
          className="w-full rounded-lg bg-white/10 text-[#FFFFFC] px-4 py-2 border border-transparent focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 placeholder:text-gray-400 hover:cursor-pointer"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />
      </div>

      <button
        type="submit"
        className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-[#FFFFFC] font-semibold py-2 px-4 rounded-lg shadow-md transition-all duration-300 flex justify-center items-center gap-2 hover:cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <FaPlus /> Add Task
      </button>
    </form>
  );
}
