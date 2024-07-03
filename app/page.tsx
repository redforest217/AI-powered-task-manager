"use client";
import AddTaskForm from "@/components/AddTaskForm";
import TaskCard from "@/components/TaskCard";
import { NewTask, Task } from "@/types";
import { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]); //array of Task

  // Load tasks from localStorage on component mount
  useEffect(() => {
    const storedTasks = localStorage.getItem("tasks");
    if (storedTasks) {
      try {
        setTasks(JSON.parse(storedTasks));
      } catch (e) {
        console.error("Failed to parse tasks from localStorage!", e);

        // Optionally clear corrupted data
        localStorage.removeItem("tasks");
      }
    }
  }, []);

  // Save tasks to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const handleAddTask = (newTaskData: NewTask) => {
    const newTask: Task = {
      id: crypto.randomUUID(), // Generate a unique ID
      ...newTaskData,
    };
    setTasks((prevTasks) => [...prevTasks, newTask]);
  };

  const handleUpdateTask = (updatedTask: Task) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) => (task.id === updatedTask.id ? updatedTask : task))
    );
  };

  const handleDeleteTask = (id: string) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
  };

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <h2 className="text-3xl sm:text-4xl xl:text-[42px] text-center mt-6 mb-7 sm:mb-10 font-bold text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-blue-500 to-indigo-500">
        AI-Powered <span className="text-[#FFFFFC]">Smart Task Manager</span>
      </h2>

      <AddTaskForm onAddTask={handleAddTask} />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 mt-8">
        {tasks.length === 0 ? (
          <p className="text-center text-[#FFFFFC] text-base sm:text-lg font-medium col-span-full">
            No tasks yet! Add a new task to get started.
          </p>
        ) : (
          tasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onUpdateTask={handleUpdateTask}
              onDeleteTask={handleDeleteTask}
              // We will pass an onSuggestSubtasks prop later for AI
            />
          ))
        )}
      </div>
      <Toaster
        position="top-right"
        reverseOrder={false}
        toastOptions={{
          // Define default options
          className: "",
          duration: 5000,
          removeDelay: 1000,
          style: {
            background: "#262626",
            color: "#fff",
          },

          // Default options for specific types
          success: {
            duration: 4000,
            iconTheme: {
              primary: "green",
              secondary: "white",
            },
          },
        }}
      />
    </div>
  );
}
