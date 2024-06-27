import React, { useEffect, useState } from "react";
import "./register.scss";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios"; 
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { Server_Url } from "../../server";

function Register() {
  const [loading, setLoading] = useState(false);
  const {user} = useSelector((state)=>state.user);
  const navigate = useNavigate();
  const [registerDetails, setRegisterDetails] = useState({
    username: "",
    name:"",
    email: "",
    password: "",
    idNum: "",
    phone: "",
  });

  const handleChange = (e) => {
    setRegisterDetails({ ...registerDetails, [e.target.name]: e.target.value });
  };

  const handleRegister = async () => {
    const { username, email, password, idNum, phone,name } = registerDetails;
    try {
      setLoading(true);
      const response = await axios.post(
        `${Server_Url}/auth/create-user`,
        { username, password, email, idNum, phone,name }
      );
      if (response.data.success) {
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log("Something went wrong", error);
      toast.error("Something went wrong. Please try again later.");
    } finally {
      setLoading(false);
    }
  };
    useEffect(()=>{
      if(user?.user){
        navigate("/")
      }
      },[user])
  return (
    <div className="register">
      <div className="formContainer">
        <div className="form">
          <h1>Create an Account</h1>
          <input
            name="name"
            type="text"
            placeholder="Full name"
            value={registerDetails.name}
            onChange={handleChange}
          />
          <input
            name="username"
            type="text"
            placeholder="Username"
            value={registerDetails.username}
            onChange={handleChange}
          />
          <input
            name="email"
            type="text"
            placeholder="Email"
            value={registerDetails.email}
            onChange={handleChange}
          />
          <input
            name="phone"
            type="number"
            placeholder="Phone"
            value={registerDetails.phone}
            onChange={handleChange}
          />
          <input
            name="idNum"
            type="number"
            placeholder="Id number"
            value={registerDetails.idNum}
            onChange={handleChange}
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            value={registerDetails.password}
            onChange={handleChange}
          />
          <button onClick={handleRegister} disabled={loading}>
            {loading ? "Registering..." : "Register"}
          </button>
          <Link to="/login">Already have an account?</Link>
        </div>
      </div>
      <div className="imgContainer">
        <img src="/bg.png" alt="" />
      </div>
    </div>
  );
}

export default Register;
