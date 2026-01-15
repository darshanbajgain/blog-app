# Blog App

A  blog application built with React, TypeScript, and TailwindCSS. This project demonstrates advanced frontend concepts including authentication, protected routes, CRUD operations, and state management.

## 🚀 Features

*   **Public Home Page**: A visually engaging landing page featuring read-only blog posts.
*   **Blog Details**: Dedicated reading view for individual stories (`/blog/:id`).
*   **Authentication**:
    *   **Login**: Secure access to the dashboard.
*   **Admin Dashboard**:
    *   **CRUD Operations**: Create, Read, Update, and Delete blog posts.
*   **Mock Backend**: Uses `axios-mock-adapter` to simulate a real API with network delays.

## � Authentication & Security (Mock)

This application uses a **simulation of JWT-based authentication**:

1.  **Fake Token Generation**: structured like a real JWT but generated client-side by the mock adapter upon successful login (`fake-jwt-token-xyz-123`).
2.  **Storage**: The token is stored in `localStorage` to persist sessions across page reloads.
3.  **Route Protection**:
    *   **Public Routes**: (`/`, `/login`) redirect authenticated users to the dashboard.
    *   **Protected Routes**: (`/dashboard`) check for the token's existence in the Zustand store/localStorage. If missing, they redirect to the login page.
4.  **API Requests**: The `useAuth` hook and API client attach this token to the `Authorization` header (Bearer scheme) for requests to protected endpoints, mimicking strict security practices.

## ⚡ State Management Architecture

This project employs a hybrid state management strategy:

### 1. Client State (Zustand)
We use **Zustand** for managing synchronous, global client-side state.
*   **authStore**: Manages authentication status (`isAuthenticated`), user profile, and persists the JWT token to `localStorage`.
*   **blogStore**: Handles UI state such as modal visibility (`createModal`, `editModal`) and the active post selection for editing.

### 2. Server State (TanStack Query)
We use **TanStack Query (React Query)** for asynchronous data fetching and server state synchronization.
*   **Caching**: Posts are cached to avoid redundant network requests.
*   **Invalidation**: Mutations (Create/Update/Delete) automatically invalidate the `['posts']` query key, triggering a re-fetch to keep the UI in sync without manual state updates.
*   **States**: Handles `isLoading` and `error` states gracefully.

## �🛠 Tech Stack

*   **Frontend Framework**: React 19 (Vite)
*   **Language**: TypeScript
*   **Styling**: TailwindCSS
*   **State Management**: Zustand
*   **Data Fetching**: TanStack Query (React Query)
*   **Routing**: React Router DOM v7
*   **Icons**: Lucide React
*   **API Mocking**: Axios Mock Adapter

## 📂 Project Structure

```
src/
├── api/            # API client and Mock definitions
├── components/     # Reusable UI components (Modals, Loader, etc.)
├── hooks/          # Custom hooks (useAuth, usePosts)
├── pages/          # Application pages (Home, Dashboard, Login, etc.)
├── routes/         # Route guards (ProtectedRoute, PublicRoute)
├── store/          # Zustand stores (authStore, blogStore)
└── types.ts        # TypeScript definitions
```

## 🏃‍♂️ Getting Started

1.  **Install Dependencies**
    ```bash
    npm install
    ```

2.  **Run Development Server**
    ```bash
    npm run dev
    ```

3.  **Access the App**
    *   Open `http://localhost:5173`
    *   **Login Demo Credentials**:
        *   Email: `demo@user.com`
        *   Password: `password`

## 🔄 App Flow

1.  **Public Access**: Users land on the **Home** page. They can browse and read posts but cannot edit them.
2.  **Authentication**: Users click "Sign In" or "Get Started" to **Login**.
3.  **Dashboard**: Upon authentication, users are redirected to the **Dashboard**.
4.  **Management**: In the Dashboard, users can manage their posts. Changes are persisted in the mock memory.

## 🧪 Testing The Flow

1.  **Create Post**: In Dashboard, click `+ New Post`.
2.  **Read**: Go back to Home (`/`) to see your new post. Click it to read the details.
3.  **Delete**: Go back to Dashboard and delete the post. it disappears from Home.
