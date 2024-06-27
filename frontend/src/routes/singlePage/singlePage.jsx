import "./singlePage.scss";
import Slider from "../../components/slider/Slider";
import Map from "../../components/map/Map";
import { singlePostData, userData } from "../../lib/dummydata";
import { useLocation, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { Server_Url } from "../../server";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../redux/cart";

function SinglePage() {
  const {users} = useSelector((state)=>state.users);
  const [user,setUser] = useState(null)
  const [estate,setEstate] = useState(null);
  const [loading,setLoading] = useState(false);
  const {id} = useParams();
  const dispatch = useDispatch();
  useEffect(()=>{
    const data = users?.find((user)=>user?._id === estate?.ownerId);
    setUser(data)
  },[estate])

  async function getEstate(){
  try {
    setLoading(true);
    const response = await axios.get(`${Server_Url}/estate/estate/${id}`)
    setEstate(response.data.estate)
  } catch (error) {
    toast.error('something went wrong')
  }finally{
    setLoading(false)
  }
  }
 useEffect(()=>{
  getEstate();
  console.log('estate',estate)
 },[])

 const handleAddToWishList = (estate)=>{
  dispatch(addToCart(estate))
 }
  return (

    <>
    {
      loading === true ? (
        <div>
          <h1>Loading...</h1>
        </div>
      ):(
        <div className="singlePage">
      <div className="details">
        <div className="wrapper">
         {
          estate?.images.length > 0 &&  <Slider images={estate?.images} />
         }
          <div className="info">
            <div className="top">
              <div className="post">
                <h1>{estate?.title}</h1>
                <div className="address">
                  <img src="/pin.png" alt="" />
                  <span>{estate?.address}</span>
                </div>
                <div className="price">Ksh {estate?.price}</div>
              </div>
              <div className="user">
                <img src={userData.img} alt="" />
                <span>{user?.name}</span>
              </div>
            </div>
            <div className="bottom">{estate?.description}</div>
          </div>
        </div>
      </div>
      <div className="features">
        <div className="wrapper">
          <p className="title">General</p>
          <div className="listVertical">
            <div className="feature">
              <img src="/utility.png" alt="" />
              <div className="featureText">
                <span>Utilities</span>
                <p>Renter is responsible</p>
              </div>
            </div>
            <div className="feature">
              <img src="/pet.png" alt="" />
              <div className="featureText">
                <span>Pet Policy</span>
                <p>Pets Allowed</p>
              </div>
            </div>
            <div className="feature">
              <img src="/fee.png" alt="" />
              <div className="featureText">
                <span>Property Fees</span>
                <p>Must have 3x the rent in total household income</p>
              </div>
            </div>
          </div>
          <p className="title">Sizes</p>
          <div className="sizes">
            <div className="size">
              <img src="/size.png" alt="" />
              <span>{estate?.size} sqft</span>
            </div>
            <div className="size">
              <img src="/bed.png" alt="" />
              <span>{estate?.bedroom} beds</span>
            </div>
            <div className="size">
              <img src="/bath.png" alt="" />
              <span>{estate?.bathroom} bathroom</span>
            </div>
          </div>
          <p className="title">Nearby Places</p>
          <div className="listHorizontal">
            <div className="feature">
              <img src="/school.png" alt="" />
              <div className="featureText">
                <span>School</span>
                <p>{estate?.nearbyPlaces?.school}m away</p>
              </div>
            </div>
            <div className="feature">
              <img src="/pet.png" alt="" />
              <div className="featureText">
                <span>Bus Stop</span>
                <p>{estate?.nearbyPlaces?.busStation}m away</p>
              </div>
            </div>
            <div className="feature">
              <img src="/fee.png" alt="" />
              <div className="featureText">
                <span>Restaurant</span>
                <p>200m away</p>
              </div>
            </div>
          </div>
          <p className="title">Location</p>
          <div className="mapContainer">
          {
            estate && <Map items={[estate]} />
          }
          </div>
          <div className="buttons">
            <button>
              <img src="/chat.png" alt="" />
              Send a Message
            </button>
            <button onClick={()=>handleAddToWishList(estate)}>
              <img src="/save.png" alt="" />
              Save the Place
            </button>
          </div>
        </div>
      </div>
    </div>
      )
    }
    </>
  );
}

export default SinglePage;
