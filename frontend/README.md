# Period Tracker - Frontend

This directory contains the frontend code for the Period Tracker application, built using React and Vite.

## Overview

The frontend provides the user interface for interacting with the Period Tracker application. It allows users to:

- Log in and manage their accounts.
- View and interact with a calendar to track menstrual cycles.
- Log daily symptoms.
- View a personalized dashboard with cycle predictions and insights.
- Explore statistics and visualizations based on their tracked data.
- Read educational blog posts.

## Tech Stack

- **Framework**: React.js (v19)
- **Build Tool**: Vite
- **Routing**: React Router (v7)
- **Styling**: CSS (with potential for CSS Modules or other libraries)
- **Linting**: ESLint

## Project Structure (`src` folder)

- `assets/`: Static assets like images, icons, etc.
- `components/`: Reusable UI components (e.g., Buttons, Calendar Cells, Input Fields).
- `pages/`: Top-level page components corresponding to different routes (e.g., Home, Dashboard, Symptoms).
- `App.jsx`: Main application component, sets up routing.
- `main.jsx`: Entry point for the React application.
- `index.css`/`App.css`: Global styles.

## Getting Started

1.  **Navigate to the frontend directory:**
    ```bash
    cd frontend
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    ```
3.  **Ensure the backend server is running.** (See the main project README for backend setup instructions).
4.  **Start the development server:**
    ```bash
    npm run dev
    ```

The application should now be accessible in your browser.
