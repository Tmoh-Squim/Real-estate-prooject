import "./App.css"
import React, { useEffect } from "react";
import HomePage from "./routes/homePage/homePage";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import ListPage from "./routes/listPage/listPage";
import Layout from "./routes/layout/layout";
import SinglePage from "./routes/singlePage/singlePage";
import ProfilePage from "./routes/profilePage/profilePage";
import CreatePost from "./components/create-post/createPost";
import Login from "./routes/login/login";
import Register from "./routes/register/register";
import { ToastContainer } from "react-toastify";
import "react-toastify/ReactToastify.min.css";
import store from "./redux/store";
import { getUser, getUsers } from "./redux/user";
import {useDispatch, useSelector} from "react-redux";
import socket from "./socket";
import { getEstates } from "./redux/product";
import { getConversations } from "./redux/category";
import ProfileUpdatePage from "./routes/profileUpdatePage/profileUpdatePage";
import Contact from "./routes/contact/Contact";
import ProtectedRoute, { AgentRoute } from "./middlewares/ProtectedAuth";
function App() {
  const {user} = useSelector((state)=>state.user);
  useEffect(()=>{
   user?.user && socket.emit('addUser',(user?.user?._id))
  },[user])
  useEffect(()=>{
    store.dispatch(getUser())
    store.dispatch(getEstates())
  },[store])
  const dispatch = useDispatch();
  useEffect(()=>{
    dispatch(getConversations(user?.user?._id));
    dispatch((getUsers()));
  },[user])
 
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children:[
        {
          path:"/",
          element:<ProtectedRoute>
            <HomePage/>
          </ProtectedRoute>
        },
        {
          path:"/estates",
          element:<ProtectedRoute>
            <ListPage/>
          </ProtectedRoute>
        },
        {
          path:"/estate/:id",
          element:<SinglePage/>
        },
        {
          path:"/profile",
          element: <ProtectedRoute>
          <ProfilePage />
        </ProtectedRoute>
        },
        {
          path:"/update-profile",
          element: <ProtectedRoute>
          <ProfileUpdatePage />
        </ProtectedRoute>
        },
        {
          path:"/login",
          element:<Login/>
        },
        {
          path:"/register",
          element:<Register/>
        },
        {
          path:"/contact-us",
          element:<Contact/>
        },
        {
          path:"/create-post",
          element:
            <AgentRoute>
              <CreatePost />
            </AgentRoute>
        }
      ]
    }
  ]);

  return (
    <>
      <ToastContainer />
      <RouterProvider router={router}/>
      </>
  );
}

export default App;
