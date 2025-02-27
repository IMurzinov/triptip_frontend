import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";


import { AuthPage, StartingPage, RegisterPage, NotFoundPage, ProfilePage, WelcomePage, TripCreatePage } from "pages";
import { ProtectedRoute, EntranceAuthCheck } from "components";
import { store, persistor } from "store";

import "assets/fonts/fonts.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <EntranceAuthCheck>
        <StartingPage />
      </EntranceAuthCheck>
    ),
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
  {
    path: "/createyourtrip",
    element: (
      <ProtectedRoute>
        <TripCreatePage />
      </ProtectedRoute>
    ),
  },
]);

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
