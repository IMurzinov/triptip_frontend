import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { AuthPage, WelcomePage, RegisterPage, NotFoundPage, ProfilePage } from 'pages';


import 'assets/fonts/fonts.css';

const router = createBrowserRouter([
  {
    path: "/",
    element: <WelcomePage />,
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
]); 

function App() {
  return (
    <div className='App'>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
