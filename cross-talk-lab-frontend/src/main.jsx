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
import { Login } from './Pages/Login.jsx';
import { Authenticated } from './Components/Authenticated.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Authenticated>
        <Dashboard />
      </Authenticated>
    ),
  },
  {
    path: "scrape",
    element: (
      <Authenticated>
        <Scrape />
      </Authenticated>
    ),
  },
  {
    path: "chats",
    element: (
      <Authenticated>
        <Chats />
      </Authenticated>
    ),
  },
  {
    path: "chats/:id",
    element: (
      <Authenticated>
        <Chatbot />
      </Authenticated>

    ),
  },
  {
    path: "new-chat",
    element: (
      <Authenticated>
        <NewChat />
      </Authenticated>
    ),
  },
  {
    path: "settings",
    element: (
      <Authenticated>
        <Settings />
      </Authenticated>
    )
  },
  {
    path: "login",
    element: <Login />
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
