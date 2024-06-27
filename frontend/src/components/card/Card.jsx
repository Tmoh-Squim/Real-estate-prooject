import { Link, useNavigate } from "react-router-dom";
import "./card.scss";
import { Server, Server_Url } from "../../server";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import axios from "axios";
import { addToCart, removeFromCart } from "../../redux/cart";

function Card({ item,icon }) {
  const { user } = useSelector((state) => state.user);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleNavigate = (item) => {
    item !== null && navigate(`/estate/${item._id}`,{state:{ item }});

  };

  const handleCreateConversation = async () => {
    try {
      const groupTitle = item?.ownerId + user?.user?._id;
      const senderId = user?.user?._id;
      const receiverId = item?.ownerId;
      setLoading(true);
      const response = await axios.post(
        `${Server_Url}/conversation/create-conversation`,
        { groupTitle, senderId, receiverId }
      );
    } catch (error) {
      toast.error("something went wrong");
    } finally {
      setLoading(false);
    }
  };
  const handleAddToSaveList = (item)=>{
    dispatch(addToCart(item))
  }
  const handleRemoveFromWishList = (item)=>{
    dispatch(removeFromCart(item))
  }
  return (
    <div className="card">
      <Link
         onClick={()=>handleNavigate(item)}
        className="imageContainer"
      >
        <img src={`${Server}/${item?.images[0]}`} alt="" />
      </Link>
      <div className="textContainer">
        <h2 className="title">
          <Link  onClick={()=>handleNavigate(item)}>{item.title}</Link>
        </h2>
        <p className="address">
          <img src="/pin.png" alt="" />
          <span>{item.address}</span>
        </p>
        <p className="price">Ksh {item.price}</p>
        <div className="bottom">
          <div className="features">
            <div className="feature">
              <img src="/bed.png" alt="" />
              <span>{item.bedroom} bedroom</span>
            </div>
            <div className="feature">
              <img src="/bath.png" alt="" />
              <span>{item.bathroom} bathroom</span>
            </div>
          </div>
          <div className="icons">
            <div className="icon" onClick={()=>handleAddToSaveList(item)}>
              <img src="/save.png" alt="" />
            </div>
            <div className="icon" onClick={handleCreateConversation}>
              <img src="/chat.png" alt="" />
            </div>
          </div>
        </div>
      </div>
      {
        icon && (
         <div className="close" onClick={()=>handleRemoveFromWishList(item)}>
           {icon}
         </div>
        )
      }
      </div>
  );
}

export default Card;
