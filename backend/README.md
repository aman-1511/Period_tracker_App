# Menstrual Cycle Tracker API

Backend API for the Menstrual Cycle Tracker web application.

## Features

- User authentication (register, login)
- User onboarding
- Cycle tracking
- Symptom logging
- Dashboard data with cycle phase information
- Cycle history

## API Endpoints

### Authentication

- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login a user
- `GET /api/auth/me` - Get current user information

### Onboarding

- `POST /api/onboarding/save` - Save onboarding data
- `GET /api/onboarding/status` - Get onboarding status

### Cycle Tracking

- `GET /api/cycles/dashboard` - Get dashboard data
- `POST /api/cycles/period/start` - Log period start date
- `POST /api/cycles/period/end` - Log period end date
- `POST /api/cycles/symptoms` - Log symptoms
- `GET /api/cycles/history` - Get cycle history

## Setup

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```
3. Create a `.env` file in the root directory with the following variables:
   ```
   PORT=5000
   JWT_SECRET=your_secret_key
   NODE_ENV=development
   ```
4. Run the development server:
   ```
   npm run dev
   ```

## Database

This application uses SQLite with Sequelize ORM. The database file will be created automatically when you run the application for the first time.

## Models

- **User** - User information and preferences
- **CycleRecord** - Period cycle records
- **SymptomLog** - Daily symptom logs

## Development

Run the development server:

```
npm run dev
```

## Production

Run the production server:

```
npm start
``` 