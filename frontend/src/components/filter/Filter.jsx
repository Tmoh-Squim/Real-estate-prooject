import { useEffect, useState } from "react";
import "./filter.scss";
import { useSelector } from "react-redux";
import Card from "../card/Card";

function Filter({setOpen}) {
  const [data, setData] = useState(null);
  const { estates } = useSelector((state) => state.estates);
  const [searchData, setSearchData] = useState({
    city: "",
    type: "",
    maxPrice: "",
    minPrice: "",
    property: "",
    bedroom: "",
  });

  const handleChange = (e) => {
    setSearchData({ ...searchData, [e.target.name]: e.target.value });
  };

  const handleSearch = () => {
    setOpen(true);
    const data = estates?.filter((estate) => {
      const estatePrice = parseFloat(estate?.price);
      const minPrice = parseFloat(searchData?.minPrice) || 0;
      const maxPrice = parseFloat(searchData?.maxPrice) || Infinity;
      const bedrooms = parseInt(searchData?.bedroom) || 0;

      return (
        (searchData?.city ? estate?.city?.toLowerCase() === searchData?.city?.toLowerCase() : true) &&
        (searchData?.type ? estate?.type === searchData?.type : true) &&
        (searchData?.property ? estate?.property === searchData?.property : true) &&
        (searchData?.bedroom ? estate?.bedroom == bedrooms : true) &&
        (estatePrice >= minPrice && estatePrice <= maxPrice)
      );
    });
    setData(data);
  };

  return (
    <div className="filter">
      <h1>
        Search results for <b>{searchData.city || 'All'}</b>
      </h1>
      <div className="top">
        <div className="item">
          <label htmlFor="city">Location</label>
          <input
            type="text"
            id="city"
            value={searchData.city}
            onChange={handleChange}
            name="city"
            placeholder="City Location"
          />
        </div>
      </div>
      <div className="bottom">
        <div className="item">
          <label htmlFor="type">Type</label>
          <select name="type" id="type" onChange={handleChange}>
            <option value="">any</option>
            <option value="Buy">Buy</option>
            <option value="Rent">Rent</option>
          </select>
        </div>
        <div className="item">
          <label htmlFor="property">Property</label>
          <select name="property" id="property" onChange={handleChange}>
            <option value="">any</option>
            <option value="Apartment">Apartment</option>
            <option value="House">House</option>
            <option value="Condo">Condo</option>
            <option value="Land">Land</option>
          </select>
        </div>
        <div className="item">
          <label htmlFor="minPrice">Min Price</label>
          <input
            type="number"
            value={searchData.minPrice}
            onChange={handleChange}
            id="minPrice"
            name="minPrice"
            placeholder="any"
          />
        </div>
        <div className="item">
          <label htmlFor="maxPrice">Max Price</label>
          <input
            type="number"
            id="maxPrice"
            value={searchData.maxPrice}
            onChange={handleChange}
            name="maxPrice"
            placeholder="any"
          />
        </div>
        <div className="item">
          <label htmlFor="bedroom">Bedroom</label>
          <input
            type="number"
            id="bedroom"
            value={searchData.bedroom}
            onChange={handleChange}
            name="bedroom"
            placeholder="any"
          />
        </div>
        <button onClick={handleSearch}>
          <img src="/search.png" alt="" />
        </button>
      </div>
      {
     data !== null ? (
      data?.length > 0 ? (
        <div className="data">
          {
            data?.map((item,index)=>{
              return (
                <div key={index}>
                  <Card item={item} />
                </div>
              )
            })
          }
        </div>
      ):(
        <div className="empty">
          <h1>
            No data found!
          </h1>
        </div>
      )
     ):(
      null
     )
      }
    </div>
  );
}

export default Filter;
