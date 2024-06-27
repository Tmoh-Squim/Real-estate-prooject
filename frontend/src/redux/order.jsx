import { createAsyncThunk,createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { Server_Url } from "../server";

const token = localStorage.getItem('token');

export const getOrdersAdmin = createAsyncThunk("/admin-orders",async()=>{
    const response = await axios.get(`${Server_Url}/order/admin-orders`,{
      headers:{
        'Authorization':token
      }
    });

    return response.data;
});

export const getOrdersUser = createAsyncThunk("/user-orders",async(id)=>{
  const response = await axios.get(`${Server_Url}/order/user-orders/${id}`,{
    headers:{
      'Authorization':token
    }
  });

  return response.data;
})

const initialState = {
    orders:[],
    loading:false,
    error:null
}

const adminOrderSlice = createSlice({
    name: "adminOrders",
    initialState,
    extraReducers: (builder) => {
      builder
        .addCase(getOrdersAdmin.pending, (state) => {
          state.loading = true;
        })
        .addCase(getOrdersAdmin.fulfilled, (state, action) => {
          state.orders = action.payload;
          state.loading = false;
        })
        .addCase(getOrdersAdmin.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload;
        });
    },
  })

export  const userOrderSlice = createSlice({
    name: "userOrders",
    initialState:{
      orders:[],
      loading:false,
      error:null
    },
    extraReducers: (builder) => {
      builder
        .addCase(getOrdersUser.pending, (state) => {
          state.loading = true;
        })
        .addCase(getOrdersUser.fulfilled, (state, action) => {
          state.orders = action.payload;
          state.loading = false;
        })
        .addCase(getOrdersUser.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload;
        });
    },
  }).reducer


  export default adminOrderSlice.reducer;