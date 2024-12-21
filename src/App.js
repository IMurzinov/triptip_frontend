import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";


import { AuthPage, StartingPage, RegisterPage, NotFoundPage, ProfilePage, WelcomePage } from "pages";
import { ProtectedRoute } from "components";
import { store, persistor } from "store";

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

// Основной компонент приложения
function App() {
  return (
    <Provider store={store}>
      {/* PersistGate обеспечивает восстановление состояния */}
      <PersistGate loading={<div>Загрузка...</div>} persistor={persistor}>
        <div className="App">
          <RouterProvider router={router} />
        </div>
      </PersistGate>
    </Provider>
  );
}

export default App;
