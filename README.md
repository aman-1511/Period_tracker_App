# Period Tracker

<!-- Project Image Placeholder -->
<p align="center">
  <img src="project-image.png" alt="Period Tracker App" width="600">
</p>

## Overview

Period Tracker is a comprehensive menstrual cycle tracking application designed to help users monitor, predict, and understand their menstrual health. This full-stack application offers an intuitive interface for tracking periods, symptoms, and provides valuable insights through statistics and informative content.

## Features

- **Period Tracking**: Log and predict menstrual cycles with a user-friendly calendar interface
- **Symptom Monitoring**: Track various symptoms throughout your cycle
- **Personalized Dashboard**: View upcoming cycle predictions and health insights
- **Statistics & Analysis**: Visualize cycle patterns and symptom correlations
- **Educational Content**: Access informative blogs about menstrual and reproductive health

## Application Screenshots

### Home Page
<p align="center">
  <img src="screenshots/home-page.png" alt="Home Page" width="700">
</p>

### Dashboard
<p align="center">
  <img src="screenshots/dashboard.png" alt="Dashboard" width="700">
</p>

### Symptom Tracking
<p align="center">
  <img src="screenshots/symptoms.png" alt="Symptom Tracking" width="700">
</p>

### Statistics
<p align="center">
  <img src="screenshots/statistics.png" alt="Statistics" width="700">
</p>

### Blog Page
<p align="center">
  <img src="screenshots/blog.png" alt="Blog Page" width="700">
</p>

## Tech Stack

### Frontend
- React.js with Vite for fast development
- React Router for seamless navigation
- Modern responsive UI design
- Interactive charts and visualizations

### Backend
- Node.js with Express framework
- RESTful API architecture
- JWT authentication for secure user accounts
- Sequelize ORM with SQLite database

## Project Structure

The project is organized into two main directories:

- **frontend/**: React application with components, pages, and assets
- **backend/**: Express server with routes, controllers, models, and middleware

## Setup Instructions

Follow these steps to set up the project locally:

### Prerequisites
- Node.js (v14.0.0 or later)
- npm (v6.0.0 or later)

### Clone the Repository
```bash
git clone https://github.com/yourusername/period-tracker.git
cd period-tracker
```

### Backend Setup
```bash
cd backend
npm install
# Create a .env file with necessary configuration
# Example:
# PORT=5000
# JWT_SECRET=yoursecretkey
npm run dev
```

### Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

The frontend should now be running on http://localhost:5173 and the backend on http://localhost:5000.

## Privacy & Security

This application prioritizes user privacy and data security. All sensitive health information is stored securely and is never shared with third parties without explicit consent.

## Development Team

This project was developed with care and consideration for diverse user needs. Our team is committed to creating tools that empower users to take control of their health through technology.

---

© 2024 Period Tracker. All rights reserved.
