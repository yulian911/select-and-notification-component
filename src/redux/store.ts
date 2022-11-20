import { configureStore } from "@reduxjs/toolkit";
import {setupListeners} from '@reduxjs/toolkit/query'
import { notificationReducer } from "./features/notificationSlice";

export const store =configureStore({
  reducer:{
 
   notification:notificationReducer
  },
})

setupListeners(store.dispatch)

export type RootState =ReturnType<typeof store.getState>

export type AppDispatch =typeof store.dispatch