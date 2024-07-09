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
        <Link to="/" className="logo">
          <img src="/logo.png" alt="" />
          <span>SquimEstate</span>
        </Link>
        <Link to="/">Home</Link>
        <Link to="/estates">Estates</Link>
        <Link to="/">About</Link>
        <Link to="/contact-us">Contact</Link>
        <Link to="/">Agents</Link>
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
            <Link to="/login" className="login">Sign in</Link>
            <Link to="/register" className="register">
              Sign up
            </Link>
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
          <Link to="/">Home</Link>
          <Link to="/estates">Estates</Link>
          <Link to="/about">About</Link>
          <Link to="/contact-us">Contact</Link>
          <Link to="/agents">Agents</Link>
          {
            user?.user ? (
              <Link to="/profile">Profile</Link>
            ):(
              <Link to="/login">Sign in</Link>
            )
          }
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
