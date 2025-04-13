import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer as createPersistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // Используем localStorage

import authReducer from "features/auth/authSlice";
import userTripsReducer from "features/userTrips/userTripsSlice";

const authPersistConfig = {
    key: "auth",
    storage,
    whitelist: ["isAuthenticated", "user", "token", "refreshToken"], // Сохраняем только эти поля
};

const userTripsPersistConfig = {
    key: "userTrips",
    storage,
    whitelist: ["trips", "totalCount"],
};

// Создаем persistedReducer
const authPersistedReducer = createPersistReducer(authPersistConfig, authReducer);
const userTripsPersistedReducer = createPersistReducer(userTripsPersistConfig, userTripsReducer);

// Настраиваем хранилище
const store = configureStore({
    reducer: {
        auth: authPersistedReducer, // Указываем ключ auth для persistedReducer
        userTrips: userTripsPersistedReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});

// Создаем persistor для интеграции
const persistor = persistStore(store);

export { store, persistor };