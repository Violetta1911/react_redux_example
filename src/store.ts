import { configureStore, combineReducers } from "@reduxjs/toolkit";
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from "redux-persist";
import localforage from "localforage";
import commentsReducer from "./slices/commentsSlice";
// Configuration for persisting the reducer
const persistConfig = {
    key: "root",
    storage: localforage,
    whitelist: ["comments"],
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
                // Ignore redux-persist actions
                ignoredActions: [
                    FLUSH,
                    REHYDRATE,
                    PAUSE,
                    PERSIST,
                    PURGE,
                    REGISTER,
                ],
            },
        }),
    devTools: process.env.NODE_ENV !== "production",
});
// Create types for RootState and AppDispatch

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const persistor = persistStore(store);
export default store;
