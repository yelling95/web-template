import React from 'react'
import {MainView} from './pages'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'

export default function App(props) {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <MainView />,
    },
  ])

  return <RouterProvider router={router} />
}
