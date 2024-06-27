import { Marker, Popup } from "react-leaflet";
import "./pin.scss";
import { Link } from "react-router-dom";
import { Server } from "../../server";

function Pin({ item }) {
  return (
    <Marker position={[item.latitude, item.longitude]}>
      <Popup>
        <div className="popupContainer">
          <img src={`${item.images[0]}`} alt="apartment" />
          <div className="textContainer">
            <Link to={`/estate/${item._id}`}>{item.title}</Link>
            <span>{item.bedroom} bedroom</span>
            <b>Ksh {item.price}</b>
          </div>
        </div>
      </Popup>
    </Marker>
  );
}

export default Pin;
