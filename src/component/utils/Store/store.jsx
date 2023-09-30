import { configureStore } from "@reduxjs/toolkit";
import sessionStorage from "redux-persist/es/storage/session";
import { persistStore, persistReducer } from 'redux-persist';
import thunk from 'redux-thunk';

import loginreducer from "../Reducer/loginreducer";

const persistConfig = {
    key: 'root',
    storage: sessionStorage

}
const persistedReducer = persistReducer(persistConfig, loginreducer)
export const Store = configureStore(
    {
        reducer:
        {
            login: persistedReducer,

            middleware: [thunk]
        }
    }
)
export const persistor = persistStore(Store);
