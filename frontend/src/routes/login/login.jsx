import { useEffect, useState } from "react";
import "./login.scss";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
function Login() {
  const [loading, setLoading] = useState(false);
  const {user} = useSelector((state)=>state.user);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      setLoading(true);

      const response = await axios.post(
        "http://localhost:2021/api/auth/login",
        { username, password }
      );
      if(response.data.success){
        toast.success(response.data.message);
        const {token} = response.data;
        localStorage.setItem("auth_token",token);
        navigate("/");
        window.location.reload();

      }else{
        toast.error(response.data.message)
      }
    } catch (error) {
      console.log("Something went wrong");
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
    <div className="login">
      <div className="formContainer">
        <div className="form">
          <h1>Welcome back</h1>
          <input
            name="username"
            type="text"
            placeholder="Username"
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          {loading ? (
            <button>Loading...</button>
          ) : (
            <button onClick={handleLogin}>Login</button>
          )}
          <Link to="/register">{"Don't"} you have an account ?</Link>
          <Link to="/register">{"Forgot"} password ?</Link>
        </div>
      </div>
      <div className="imgContainer">
        <img src="/bg.png" alt="" />
      </div>
    </div>
  );
}

export default Login;
