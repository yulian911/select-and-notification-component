import { createSlice ,PayloadAction} from "@reduxjs/toolkit";
import { iNotification } from "../types";



const initialState:iNotification={
    message:'',
    type:"success"
}




export const notificationSlice = createSlice(
   {
    name:'notification',
    initialState,
    reducers:{
        setNotification:(state,action)=>{
            state.message = action.payload.message
            state.type=action.payload.type
        }
    }
   }
)

export const {setNotification} =notificationSlice.actions
export const notificationReducer = notificationSlice.reducer