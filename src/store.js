import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer as createPersistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // Используем localStorage

import authReducer from "features/auth/authSlice";

const persistConfig = {
    key: "auth",
    storage,
    whitelist: ["isAuthenticated", "user"], // Сохраняем только эти поля
};

// Создаем persistedReducer
const persistedReducer = createPersistReducer(persistConfig, authReducer);

// Настраиваем хранилище
const store = configureStore({
    reducer: {
        auth: persistedReducer, // Указываем ключ auth для persistedReducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});

// Создаем persistor для интеграции
const persistor = persistStore(store);

export { store, persistor };