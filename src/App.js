import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";


import { 
  AuthPage, StartingPage, RegisterPage,
  NotFoundPage, ProfilePage, WelcomePage,
  TripCreatePage, TripGuidePage, EmailNotificationPage,
  VerifyPage, ResetPasswordPage, BadGatewayPage
} from "pages";
import { ProtectedRoute, EntranceAuthCheck, RouteStatusCheck } from "components";
import { store, persistor } from "store";

import "assets/fonts/fonts.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <RouteStatusCheck>
        <EntranceAuthCheck>
          <StartingPage />
        </EntranceAuthCheck>
      </RouteStatusCheck>
    ),
  },
  {
    path: "/auth",
    element: (
      <RouteStatusCheck>
        <AuthPage />
      </RouteStatusCheck>
    ),
  },
  {
    path: "/register",
    element: (
      <RouteStatusCheck>
        <RegisterPage />
      </RouteStatusCheck>
    ),
  },
  {
    path: "/welcome",
    element: (
      <RouteStatusCheck>
        <ProtectedRoute>
          <WelcomePage />
        </ProtectedRoute>
      </RouteStatusCheck>
    ),
  },
  {
    path: "/profile/:userId",
    element: (
      <RouteStatusCheck>
        <ProfilePage/>
      </RouteStatusCheck>
    ),
  },
  {
    path: "/createyourtrip",
    element: (
      <RouteStatusCheck>
        <ProtectedRoute>
          <TripCreatePage />
        </ProtectedRoute>
      </RouteStatusCheck>
    ),
  },
  {
    path: "/trip/:id",
    element: (
      <RouteStatusCheck>
        <TripGuidePage/>
      </RouteStatusCheck>
    )
  },
  {
    path: "/emailnotification",
    element: (
      <RouteStatusCheck>
        <EmailNotificationPage/>
      </RouteStatusCheck>
    )
  },
  {
    path: "/verify/:verificationToken",
    element: (
      <RouteStatusCheck>
        <VerifyPage/>
      </RouteStatusCheck>
    )
  },
  {
    path: "/passwordreset",
    element: (
      <RouteStatusCheck>
        <ResetPasswordPage/>
      </RouteStatusCheck>
    )
  },
  {
    path: "/404",
    element: <NotFoundPage />,
  },
  {
    path: "/502",
    element: <BadGatewayPage />,
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
