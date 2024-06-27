import { useState } from "react";
import "./navbar.scss";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function Navbar() {
  const [open, setOpen] = useState(false);
  const {user} = useSelector((state)=>state.user);
  const navigate = useNavigate();
  return (
    <nav>
      <div className="left">
        <a href="/" className="logo">
          <img src="/logo.png" alt="" />
          <span>SquimEstate</span>
        </a>
        <a href="/">Home</a>
        <a href="/estates">Estates</a>
        <a href="/">About</a>
        <a href="/contact-us">Contact</a>
        <a href="/">Agents</a>
      </div>
      <div className="right">
        {user?.user ? (
          <div className="user">
            <img
              src="https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
              alt=""
              onClick={()=>navigate('/profile')}
            />
            <span>{user?.user?.name}</span>
            <Link to={"/profile"} className="profile">
              <div className="notification">3</div>
              <span>Profile</span>
            </Link>
          </div>
        ) : (
          <>
            <a href="/login" className="login">Sign in</a>
            <a href="/register" className="register">
              Sign up
            </a>
          </>
        )}
        <div className="menuIcon">
          <img
            src="/menu.png"
            alt=""
            onClick={() => setOpen((prev) => !prev)}
          />
        </div>
        <div className={open ? "menu active" : "menu"}>
          <a href="/">Home</a>
          <a href="/estates">Estates</a>
          <a href="/about">About</a>
          <a href="/contact-us">Contact</a>
          <a href="/agents">Agents</a>
          <a href="/login">Sign in</a>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
