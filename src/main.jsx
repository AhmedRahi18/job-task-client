import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Main from './Layout/Main';
import Scholarships from './components/Scholarships/Scholarships';
import Universities from './components/Universities/Universities';
import Course from './components/Course/Course';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    children: [
      {
        path: 'university/:name',
        element:<Scholarships></Scholarships>,
        loader:({params})=>fetch(`https://job-task-server-topaz.vercel.app/university/${params.name}`)
      },
      {
        path: 'universities',
        element: <Universities></Universities>
      },
      {
        path: 'course/:name',
        element: <Course></Course>,
        loader: ({params})=>fetch(`https://job-task-server-topaz.vercel.app/course/${params.name}`)
      }
    ]
    
  },
]);


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
