// app/page.tsx
"use client";

import AddTaskForm from "@/components/AddTaskForm";
import TaskCard from "@/components/TaskCard";
import { NewTask, Task } from "@/types";
import { useEffect, useState } from "react";
import { Toaster, toast } from "react-hot-toast";

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  // Load tasks from localStorage on component mount
  useEffect(() => {
    const storedTasks = localStorage.getItem("tasks");
    if (storedTasks) {
      try {
        const parsedTasks: Task[] = JSON.parse(storedTasks);
        setTasks(parsedTasks);
        console.log("Tasks loaded from localStorage:", parsedTasks); // For debugging
      } catch (e) {
        console.error("Failed to parse tasks from localStorage!", e);
        toast.error(
          "Failed to load tasks from local storage. Data might be corrupted."
        );
        localStorage.removeItem("tasks"); // Clear corrupted data
      }
    } else {
      console.log("No 'tasks' item found in localStorage on load."); // For debugging
    }
  }, []);

  // Save tasks to localStorage whenever they change
  useEffect(() => {
    // Only save if tasks is not undefined or null (important for initial render)
    if (tasks !== null && tasks !== undefined) {
      localStorage.setItem("tasks", JSON.stringify(tasks));
      console.log("Tasks saved to localStorage:", tasks); // For debugging
    }
  }, [tasks]);

  const handleAddTask = (newTaskData: NewTask) => {
    const newTask: Task = {
      id: crypto.randomUUID(),
      ...newTaskData,
      subtasks: [], // Initialize with empty subtasks
    };
    setTasks((prevTasks) => [...prevTasks, newTask]);
    toast.success("Task added successfully!");
  };

  const handleUpdateTask = (updatedTask: Task) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) => (task.id === updatedTask.id ? updatedTask : task))
    );
    // A toast for update is handled by TaskCard for edits,
    // and for AI suggestion, it's handled directly in handleSuggestSubtasks
  };

  const handleDeleteTask = (id: string) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
    toast.success("Task deleted successfully!");
  };

  const handleSuggestSubtasks = async (task: Task) => {
    // Check if task already has subtasks to prevent redundant calls
    if (task.subtasks && task.subtasks.length > 0) {
      toast("This task already has subtasks. Consider editing them.", {
        icon: "ℹ️",
        style: {
          background: "#333",
          color: "#fff",
        },
      });
      return;
    }

    const toastId = toast.loading("Generating subtasks with AI...", {
      style: {
        background: "#161616",
        color: "#fff",
        borderColor: "#222",
        borderWidth: "1px",
      },
    });

    try {
      const response = await fetch("/api/gemini", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt: task.title }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to fetch subtasks from AI.");
      }

      const data = await response.json();
      if (data.subtasks && data.subtasks.length > 0) {
        handleUpdateTask({ ...task, subtasks: data.subtasks });
        toast.success("Subtasks suggested!", { id: toastId });
      } else {
        toast.error(
          "AI couldn't suggest subtasks. Try a different task title.",
          { id: toastId }
        );
      }
    } catch (error) {
      console.error("Error calling Gemini API:", error);
      toast.error(
        `Failed to suggest subtasks: ${
          error instanceof Error ? error.message : "Unknown error"
        }`,
        { id: toastId }
      );
    }
  };

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <h2 className="text-2xl sm:text-4xl xl:text-[42px] text-center mt-0 sm:mt-6 mb-5 sm:mb-10 font-bold text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-blue-500 to-indigo-500">
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
              onSuggestSubtasks={handleSuggestSubtasks}
            />
          ))
        )}
      </div>
      <Toaster
        position="top-right"
        reverseOrder={false}
        toastOptions={{
          className: "",
          duration: 5000,
          removeDelay: 1000,
          style: {
            background: "#161616",
            color: "#fff",
            borderColor: "#222",
            borderWidth: "1px",
          },
          success: {
            duration: 4000,
            iconTheme: {
              primary: "green",
              secondary: "white",
            },
          },
          error: {
            duration: 5000,
            iconTheme: {
              primary: "#ff4d4f",
              secondary: "white",
            },
          },
        }}
      />
    </div>
  );
}
