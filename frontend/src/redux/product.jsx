import {createAsyncThunk,createSlice } from "@reduxjs/toolkit";
import axios from "axios"
import { Server_Url } from "../server";
import {toast} from "react-toastify"
const token = localStorage.getItem('token');

export const getEstates = createAsyncThunk("/estates",async()=>{
    const res = await axios.get(`${Server_Url}/estate/get-estates`);
    
    return res.data.estates
})

export const deleteProducti = createAsyncThunk("/delete-product",async(id,dispatch)=>{
    const res = await axios.delete(`${Server_Url}/chick/delete-product/${id}`,{
        headers:{
            'Authorization':token
        }
    });
    return res.data
})

export const createProducti = createAsyncThunk("/create-product",async(formData)=>{
    const response = await axios.post(
        `${Server_Url}/chick/create-chick`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/formdata",
            Authorization: token,
          },
        }
      );
      return response.data;
})
export const updateProducti = createAsyncThunk("/update-product",async(product)=>{
    const response = await axios.post(
        `${Server_Url}/chick/update-product/${product?.id}`,
        product,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      return response.data;
})

const initialState ={
    estates:[],
    loading:true,
    error:null
}
const productSlice = createSlice({
    name:"estates",
    initialState,
    extraReducers:(builder)=>{
        builder
        .addCase(getEstates.pending,(state)=>{
            state.loading = true
        })
        .addCase(getEstates.fulfilled,(state,action)=>{
            state.estates = action.payload;
            state.loading = false;
        })
        .addCase(getEstates.rejected,(state,action)=>{
            state.error= action.payload;
            state.loading = false
        })
    }
})
export const createProductSlice = createSlice({
    name:"createProduct",
    initialState:{
        loading:false,
        error:null,
        success:false
    },
    extraReducers:(builder)=>{
        builder
        .addCase(createProducti.pending,(state)=>{
            state.loading = true;
        })
        .addCase(createProducti.fulfilled,(state,action)=>{
            state.success = action.payload.success;
            state.loading = false;
            if (state.success) {
              toast.success(action.payload.message);
            } else {
              toast.error(action.payload.message);
            }
        })
        .addCase(createProducti.rejected, (state, action) => {
            state.loading = false;
            state.success = false;
            state.error = action.payload.message;
            toast.error(action.payload.error);
          });
    }
}).reducer

export const updateProductSlice = createSlice({
    name:"updateProduct",
    initialState:{
        loading:false,
        error:null,
        success:false
    },
    extraReducers:(builder)=>{
        builder
        .addCase(updateProducti.pending,(state)=>{
            state.loading = true;
        })
        .addCase(updateProducti.fulfilled,(state,action)=>{
            state.success = action.payload.success;
            state.loading = false;
            if (state.success) {
              toast.success(action.payload.message);
            } else {
              toast.error(action.payload.message);
            }
        })
        .addCase(updateProducti.rejected, (state, action) => {
            state.loading = false;
            state.success = false;
            state.error = action.payload.message;
            toast.error(action.payload.error);
          });
    }
}).reducer

export const deleteProductSlice = createSlice({
    name:"deleteProduct",
    initialState:{
        loading:false,
        error:null,
        success:false
    },
    extraReducers:(builder)=>{
        builder
        .addCase(deleteProducti.pending,(state)=>{
            state.loading = true;
        })
        .addCase(deleteProducti.fulfilled,(state,action)=>{
            state.success = action.payload.success;
            state.loading = false;
            if (state.success) {
              toast.success(action.payload.message);
            } else {
              toast.error(action.payload.message);
            }
        })
        .addCase(deleteProducti.rejected, (state, action) => {
            state.loading = false;
            state.success = false;
            state.error = action.payload.message;
            toast.error(action.payload.error);
          });
    }
}).reducer


export default productSlice.reducer