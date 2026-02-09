# TODO List App

An Angular-based TODO list application with Google OAuth authentication, CRUD operations, and LocalStorage persistence.

## Features

- **CRUD Operations**: Create, Read, Update, and Delete TODO items
- **Data Persistence**: Todos are saved to LocalStorage and persist across sessions
- **Google OAuth Authentication**: Sign in with Google or continue as a guest
- **Filtering**: View all, active, or completed tasks
- **Responsive UI**: Clean, modern interface that works on desktop and mobile

## Project Structure

```
src/
├── app/
│   ├── components/
│   │   ├── login/           # Login page with Google OAuth
│   │   └── todo-list/       # Main TODO list with CRUD operations
│   ├── guards/
│   │   └── auth.guard.ts    # Route guard for authentication
│   ├── models/
│   │   └── todo.model.ts    # Todo data model interface
│   ├── services/
│   │   ├── auth.service.ts         # Google OAuth authentication service
│   │   ├── local-storage.service.ts # LocalStorage persistence service
│   │   └── todo.service.ts         # TODO CRUD operations service
│   ├── app.config.ts
│   ├── app.routes.ts
│   ├── app.ts
│   └── app.html
├── environments/
│   ├── environment.ts       # Development config
│   └── environment.prod.ts  # Production config
└── index.html
```

## Prerequisites

- Node.js (v18 or later)
- npm (v9 or later)

## Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd todo-list-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure Google OAuth** (optional)

   To enable Google Sign-In, replace the placeholder client ID in `src/environments/environment.ts`:
   ```typescript
   export const environment = {
     production: false,
     googleClientId: 'YOUR_ACTUAL_GOOGLE_CLIENT_ID.apps.googleusercontent.com'
   };
   ```

   To obtain a Google Client ID:
   - Go to [Google Cloud Console](https://console.cloud.google.com/)
   - Create or select a project
   - Navigate to APIs & Services > Credentials
   - Create an OAuth 2.0 Client ID (Web application)
   - Add your app's URL to Authorized JavaScript origins

4. **Start the development server**
   ```bash
   npm start
   ```
   Navigate to `http://localhost:4200/`.

## Usage

1. **Login**: Sign in with Google or click "Continue as Guest"
2. **Add a task**: Enter a title (and optional description), then click "Add"
3. **Complete a task**: Click the checkbox next to a task
4. **Edit a task**: Hover over a task and click the ✏️ button
5. **Delete a task**: Hover over a task and click the 🗑️ button
6. **Filter tasks**: Use the All / Active / Completed buttons

## Data Model

```typescript
interface Todo {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  createdAt: Date;
  updatedAt: Date;
}
```

## Running Tests

```bash
npm test
```

## Building for Production

```bash
npm run build
```

Build artifacts are stored in the `dist/` directory.
