import {createSlice} from "@reduxjs/toolkit";

const initialState={
    theme: localStorage.getItem('theme') ? JSON.parse(localStorage.getItem('theme')) : false
}

const themeSlice = createSlice({
    name:'theme',
    initialState,
    reducers:{
        setTheme:(state)=>{
            state.theme = true;
            localStorage.setItem('theme',true)
        },
        removeTheme:(state)=>{
            state.theme = false;
            localStorage.setItem('theme',false)
        }
    }
});
export const {setTheme,removeTheme} = themeSlice.actions;

export default themeSlice.reducer;