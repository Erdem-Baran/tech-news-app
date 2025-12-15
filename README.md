# 📰 Tech News Dashboard

Tech News Dashboard is a modern web application that aggregates the latest technology and software news from popular platforms like **Dev.to** and **Hacker News** into a single interface.

This project is developed using **React**, **TypeScript**, and **Vite**; state management is provided by **Redux Toolkit**, and a modern interface is designed with **Tailwind CSS**.

## 🚀 Features

* **Multi-Source Support:** Fetches the latest posts from Dev.to and Hacker News.
* **Instant Search:** You can search for content simultaneously across all platforms using the search bar.
* **Add to Favorites:** You can add news you like to favorites and read them later (Stored in the browser via Local Storage).
* **Dark & Light Mode:** Switch between eye-friendly Dark and Light theme options with a single click.
* **Modern & Responsive Design:** An interface built with Tailwind CSS that looks perfect on every device (mobile, tablet, desktop).
* **High Performance:** Lightning-fast loading and runtime performance with Vite and React.

## 🛠️ Technologies Used

* **[React](https://react.dev/)** - User interface library
* **[TypeScript](https://www.typescriptlang.org/)** - For type safety
* **[Vite](https://vitejs.dev/)** - Fast development and build tool
* **[Redux Toolkit](https://redux-toolkit.js.org/)** - Global state management
* **[Tailwind CSS](https://tailwindcss.com/)** - Styling and design
* **[React Router](https://reactrouter.com/)** - Page routing

## 📦 Installation and Setup

Follow the steps below to run the project on your computer:

1.  **Clone the Project:**
    ```bash
    git clone [https://github.com/Erdem-Baran/tech-news-app.git](https://github.com/Erdem-Baran/tech-news-app.git)
    cd tech-news-app
    ```

2.  **Install Dependencies:**
    ```bash
    npm install
    # or
    yarn install
    ```

3.  **Start Development Server:**
    ```bash
    npm run dev
    # or
    yarn dev
    ```

4.  **Open in Browser:**
    Go to the address shown in the terminal (usually `http://localhost:5173`).

## 📂 Project Structure

```text
src/
├── components/      # Reusable components (PostCards, ThemeToggle, etc.)
├── hooks/           # Custom hooks (useTheme, useDebounce, ReduxHooks)
├── layout/          # Main page layout (MainLayout)
├── pages/           # Page components (Home, Favorites, etc.)
├── redux/           # Redux store and slice files
├── services/        # Services managing API requests
├── types/           # TypeScript type definitions
├── utils/           # Utility functions (Date formatting, etc.)
└── main.tsx         # Entry point of the application.
