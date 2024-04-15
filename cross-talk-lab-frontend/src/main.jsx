import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";
import { Dashboard } from './Pages/Dashboard.jsx';
import './index.css'
import { Scrape } from './Pages/Scrape.jsx';
import { Chatbot } from './Pages/Chatbot.jsx';
import { Chats } from './Pages/Chats.jsx';
import { NewChat } from './Pages/NewChat.jsx';
import { Settings } from './Pages/Settings.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Dashboard />
    ),
  },
  {
    path: "scrape",
    element: <Scrape />,
  },
  {
    path: "chats",
    element: <Chats />,
  },
  {
    path: "chats/:id",
    element: <Chatbot />,
  },
  {
    path: "new-chat",
    element: <NewChat />,
  },
  {
    path: "settings",
    element: <Settings />
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
