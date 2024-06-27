import { configureStore } from "@reduxjs/toolkit";
import productReducer, { createProductSlice, deleteProductSlice, updateProductSlice } from "./product";
import userReducer, {
  ForgotPasswordSlice,
  ResetPasswordSlice,
  VerifyEmailSlice,
  VerifyOtpSlice,
  allUsersSlice,
  loginUserSlice,
  registerUserSlice,
} from "./user";
import wishlistReducer from "./cart";
import themeReducer from "./theme";
import adminOrderReducer, { userOrderSlice } from "./order";
import conversationSlice, { deleteCategorySlice } from "./category";

const store = configureStore({
  reducer: {
    estates: productReducer,
    user: userReducer,
    wishlist: wishlistReducer,
    forgotpassword: ForgotPasswordSlice,
    verifyOtp: VerifyOtpSlice,
    verifyEmail: VerifyEmailSlice,
    resetPassword: ResetPasswordSlice,
    theme: themeReducer,
    users: allUsersSlice,
    adminOrders: adminOrderReducer,
    userOrders: userOrderSlice,
    loginUser: loginUserSlice,
    registerUser: registerUserSlice,
    deleteProduct: deleteProductSlice,
    createProduct: createProductSlice,
    updateProduct: updateProductSlice,
    conversations: conversationSlice,
    deleteCategory: deleteCategorySlice,
  },
});

export default store;
