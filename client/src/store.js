import { configureStore } from "@reduxjs/toolkit";
import contentReducer from './contentSlice';

export default configureStore({
    reducer:{
        content:contentReducer
    }
})