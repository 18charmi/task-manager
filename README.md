# Task Manager

A responsive task manager dashboard built with Next.js, Zustand state management, authentication using JWT, Material UI (MUI) components, and TailwindCSS for layout.  
All CRUD operations (authentication, project management, task management) are implemented using Next.js API routes with in-memory —**no external database required**.

## 🚀 Features

- **Authentication:** Sign Up, Sign In, and Sign Out with JWT-based token authentication
- **Project & Task Management:** Create projects, add/update/delete tasks, assign tasks to projects
- **Frontend-only API:** All data managed via Next.js API routes (in-memory only)
- **State Management:** Zustand for app-wide state
- **UI & Styling:**  
  - TailwindCSS layout and grid  
  - MUI for Buttons, Dialogs, Inputs, Cards, Lists  
  - Fully responsive, mobile-friendly, and includes reusable components

## 📁 Folder Structure

```
task-manager/
├── README.md
├── package.json
├── next.config.js
├── tailwind.config.js
├── postcss.config.js
├── tsconfig.json
├── .env.template           # Environment variables template
├── public/
├── app/
│   ├── (protected)/        # Authenticated, protected routes
│   ├── (public)/           # Public routes (login, signup)
│   └── api/
│       ├── auth/user/      # Authentication APIs (login, signup, logout, fetch user)
│       └── project/        # Project and tasks APIs (CRUD)
├── components/             # Common/reusable components (MUI + Tailwind)
├── services/
│   ├── Api/                # Axios instance for API requests
│   └── ApiHandler/         # API handler functions
├── store/
│   ├── user/               # Zustand store for user/auth
│   └── slice/              # Other Zustand slices/modules
├── types/                  # TypeScript interfaces and types
├── utils/                  # Shared constants and utility files
└── lib/                    # API helpers and default data (in-memory)
```

## 🛠️ Setup & Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/18charmi/task-manager.git
   cd task-manager
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Run the development server:**
   ```bash
   npm run dev
   ```

4. **Open [http://localhost:3000](http://localhost:3000) in your browser.**

## 📦 Common Commands

- `npm run dev` &nbsp;&nbsp;—&nbsp; Start the Next.js development server
- `npm run build` &nbsp;—&nbsp; Build the app for production
- `npm run start` &nbsp;—&nbsp; Run the production build

## 🔒 Notes

- **No external database is used.**  
  All data is stored in-memory or via localStorage for demo purposes.
- **JWT authentication** is used for protected API routes and layout wrappers.
- **Please see the source code** for custom hooks, state management logic, and API implementations.

## 📄 More Info

- Refer to the code for examples of authentication, API folder structure, protected layouts, and API handler usage.
- For any questions, please raise an issue on the GitHub repository.
