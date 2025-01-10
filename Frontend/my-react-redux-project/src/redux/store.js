import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistReducer} from "redux-persist"
import storage from 'redux-persist/lib/storage';
import persistStore from "redux-persist/es/persistStore";
import userSlice from "./slice"

const persistConfig = {
    key: 'root',
    version: 1,
    storage,
}

const rootReducer = combineReducers({
    user: userSlice,
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = configureStore({
    reducer: {
        auth : persistedReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
          serializableCheck: {
            ignoredActions: ['persist/PERSIST'], // Ignore specific actions
            ignoredPaths: ['register'], // Ignore paths with non-serializable values
          },
        }),
}
    
);

export const persister = persistStore(store)
export default store;