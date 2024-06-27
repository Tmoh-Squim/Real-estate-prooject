import { useSelector } from "react-redux";
import Chat from "../../components/chat/Chat";
import "./profilePage.scss";
import { Link, useNavigate } from "react-router-dom";
import WishList from "../../components/wishlist/Wishlist";
import { AiOutlineLogout } from "react-icons/ai";
import { toast } from "react-toastify";
import MyList from "../../components/myList/MyList";
import { useEffect } from "react";
import socket from "../../socket";

function ProfilePage() {
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const handleLogout = () => {
    try {
      localStorage.removeItem("auth_token");
      navigate("/login");
      toast.success("Logged out successfully");
      window.location.reload();
    } catch (error) {
      toast.error("something went wrong");
    }
  };
  useEffect(()=>{
    user?.user && socket.emit('addUser',(user?.user?._id))
   },[user])
  return (
    <div className="profilePage">
      <div className="details">
        <div className="wrapper">
          <div className="title">
            <h1>User Information</h1>
            <Link to={"/update-profile"}>
              <button>Update Profile</button>
            </Link>
          </div>
          <div className="info">
            <span>
              Avatar:
              <img
                src="https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                alt=""
              />
            </span>
            <span>
              Fullname:<b>{user?.user?.name}</b>
            </span>
            <span>
              Phone number:<b>{user?.user?.phone}</b>
            </span>
            <span>
              Id number:<b>{user?.user?.idNum}</b>
            </span>
            <span>
              E-mail:<b>{user?.user?.email}</b>
            </span>
            <span className="logout" onClick={handleLogout}>
              <AiOutlineLogout size={30} /> <b>Logout</b>
            </span>
          </div>
          {user?.user?.role === "Agent" && (
            <>
            <div className="title">
              <h1>My List</h1>
              <Link to={"/create-post"}>
                <button>Create New Post</button>
              </Link>
            </div>
            <MyList />
            </>
          )}
          <div className="title">
            <h1>Saved List</h1>
          </div>
          <WishList />
        </div>
      </div>
      <div className="chatContainer">
        <div className="wrapper">
          <Chat />
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
