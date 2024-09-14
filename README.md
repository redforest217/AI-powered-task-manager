# AI-Powered Smart Task Manager

## Project Overview

This is a modern, responsive task management application built with Next.js, React, and TypeScript. It offers standard task management functionalities (add, edit, delete, mark status) and integrates with the Google Gemini API to provide intelligent subtask suggestions for any given task, helping users break down their activities into actionable steps.

## Live Preview Link

[https://smart-task-manager-v1.vercel.app/](https://smart-task-manager-v1.vercel.app/)

## Getting Started

Follow these instructions to set up and run the project locally.

### Prerequisites

* Node.js
* npm

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/Shariar-Rafi/AI-Powered-Smart-Task-Manager.git
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Configure Environment Variables:**
    * Copy the `.env.example` file to `.env.local`:
        ```bash
        cp .env.example .env.local
        ```
    * Open `.env.local` and add your Google Gemini API key as described in the [API Setup](#api-setup-google-gemini) section.

### Running Locally

1.  **Start the development server:**
    ```bash
    npm run dev
    ```

2.  Open your browser and navigate to `http://localhost:3000`.

## API Setup (Google Gemini)

To enable the AI subtask suggestion feature, you need a Google Gemini API key.

1.  **Get an API Key:** Obtain a free Google Gemini API key from [Google AI Studio](https://aistudio.google.com/app/apikey).
2.  **Environment Variables:**
    * Create a file named `.env.local` in the root of your project.
    * Copy the content from `.env.example` into `.env.local`.
    * Replace `your-google-gemini-api-key` with your actual Gemini API Key.
    * The variable name required is `GOOGLE_GEMINI_API_KEY`.

    ```
    # .env.local
    GOOGLE_GEMINI_API_KEY=your-google-gemini-api-key
    ```

## Features

* **Task Management:**
    * Add new tasks with a title, description, and due date.
    * Edit existing tasks.
    * Delete tasks.
    * Mark tasks as "pending" or "completed".
* **AI-Powered Subtask Suggestions:**
    * Utilizes the Google Gemini API to generate 3-5 actionable subtasks based on a task's title.
    * "AI Suggest" button on each task card triggers the AI analysis.
* **Local Storage Persistence:**
    * All tasks are automatically saved to and loaded from `localStorage`, ensuring your tasks remain even after refreshing the page.
* **Responsive Design:**
    * Optimized for seamless experience across various devices using Tailwind CSS.
* **Clean and Simple UI:**
    * Intuitive user interface with modern design elements, including gradient borders and glow effects for visual appeal.
* **Toaster Notifications:**
    * Provides real-time feedback for actions (task added, task deleted, AI suggestions etc.).

## Technologies Used

* Next.js
* React.js
* TypeScript
* Tailwind CSS
* Google Gemini API

## Usage

* **Add a Task:** Use the "Add New Task" to add a new task.
* **Edit Task:** Click the "Edit" button on a task card to modify its title, description, or due date.
* **Delete Task:** Click the "Delete" button on a task card to remove it.
* **Change Status:** Use the "Mark As Done" / "Mark Pending" button to toggle a task's completion status.
* **AI Suggest Subtasks:** Click the "AI Suggest" button on any task card to generate a list of subtasks. If a task already has subtasks, it will inform you instead of regenerating.

## Challenges Faced

**Gemini API Prompt Engineering:** Getting the Gemini AI to consistently provide 3-5 concise, comma-separated subtasks without extraneous text, numbering, or explanations required iterative refinement of the prompt. Crafting a highly specific prompt with clear examples was crucial for controlling the AI's output format.

## License

This project is open-source and available under the [MIT License](LICENSE).

## Contact

David Lee - [david.g.lee2018@gmail.com](mailto:david.g.lee2018@gmail.com)
