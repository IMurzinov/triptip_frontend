import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { AuthPage, StartingPage, RegisterPage, NotFoundPage, ProfilePage, WelcomePage } from 'pages';


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
  },
  {
    path: "/welcome",
    element: <WelcomePage />,
  },
]); 

function App() {
  return (
    <div className='App'>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
