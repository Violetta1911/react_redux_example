import { configureStore } from "@reduxjs/toolkit";
import commentsReducer from "./commentsSlice";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { combineReducers } from "redux";

// Configuration for persisting the reducer
const persistConfig = {
    key: "root",
    storage,
    blacklist: ["comments"],
};

// Root reducer to combine multiple slices (if needed in the future)
const rootReducer = combineReducers({
    comments: commentsReducer,
});

// Create a persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure the store
const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                // Ignore paths that include non-serializable values in Redux Persist actions
                ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
                ignoredPaths: ["register", "rehydrate"],
            },
        }),
    devTools: process.env.NODE_ENV !== "production",
});

// Create types for RootState and AppDispatch
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const persistor = persistStore(store);
export default store;
