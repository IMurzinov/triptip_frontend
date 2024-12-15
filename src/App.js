import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { AuthPage, StartingPage, RegisterPage, NotFoundPage, ProfilePage, WelcomePage } from "pages";
import { ProtectedRoute } from "components";

import "assets/fonts/fonts.css";

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
    element: (
      <ProtectedRoute>
        <WelcomePage />
      </ProtectedRoute>
    ),
  },
  {
    path: "/profile/:username",
    element: (
      <ProtectedRoute>
        <ProfilePage/>
      </ProtectedRoute>
    ),
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
