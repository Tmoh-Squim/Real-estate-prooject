import "./listPage.scss";
import Filter from "../../components/filter/Filter"
import Card from "../../components/card/Card"
import Map from "../../components/map/Map";
import { useSelector } from "react-redux";
import { useState } from "react";

function ListPage() {
  const {estates} = useSelector((state)=>state.estates);
  const [open,setOpen] = useState(false);

  return <div className="listPage">
    <div className="listContainer">
      <div className="wrapper">
        <Filter setOpen={setOpen}/>
        {
          !open && (
            <div className="wrapper-card">
            {estates?.map(item=>(
              <Card key={item.id} item={item}/>
            ))}
            </div>
          )
        }
      </div>
    </div>
    <div className="mapContainer">
      <Map items={estates}/>
    </div>
  </div>;
}

export default ListPage;
