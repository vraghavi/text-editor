import {createSlice} from '@reduxjs/toolkit';

const initialState = "";

const contentSlice = createSlice({
    name: 'content',
    initialState,
    reducers:{
        contentUpdated(state,action){
            state = action.payload
            return state.content
        }
    }
})

export const {contentUpdated} = contentSlice.actions

export default contentSlice.reducer