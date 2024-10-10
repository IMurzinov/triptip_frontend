import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { AuthPage, StartingPage, RegisterPage, NotFoundPage } from 'pages';

import { TopTripsCard } from 'components';

import 'assets/fonts/fonts.css';

const router = createBrowserRouter([
  {
    path: "/",
    element: <StartingPage />,
    errorElement: <NotFoundPage />,
  },
  {
    path: "/auth",
    element: <AuthPage />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
  }
]); 

function App() {
  return (
    <div className='App'>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
