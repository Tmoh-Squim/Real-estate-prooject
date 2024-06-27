import React, { useState } from "react";
import "./createPost.scss";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import axios from "axios";
import { Server_Url } from "../../server";
const CreatePost = () => {
  const [postDetails, setPostDetails] = useState({
    title: "",
    description: "",
    city: "",
    size: "",
    bedroom: "",
    bathroom: "",
    address: "",
    longitude: "",
    latitude: "",
    price: "",
    type: "",
    property: "",
    school: "",
    busStation: "",
  });

  const [images, setImages] = useState([]);
  const { user } = useSelector((state) => state.user);
  const [loading, setLoading] = useState(false);
  const handleChange = (e) => {
    setPostDetails({ ...postDetails, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    e.preventDefault();

    let files = Array.from(e.target.files);
    setImages((prevImages) => [...prevImages, ...files]);
  };

  const handleCreatePost = async () => {
    try {
      setLoading(true);
      if (
        postDetails.title === "" ||
        postDetails.description === "" ||
        images === null ||
        postDetails.price === ""
      ) {
        return toast.error("Name,description,price and images are required!");
      }
      const formData = new FormData();
      images.forEach((image) => {
        formData.append("images", image);
      });

      formData.append("title", postDetails.title);
      formData.append("description", postDetails.description);
      formData.append("price", postDetails.price);
      formData.append("size", postDetails.size);
      formData.append("school", postDetails.school);
      formData.append("busStation", postDetails.busStation);
      formData.append("bedroom", postDetails.bedroom);
      formData.append("bathroom", postDetails.bathroom);
      formData.append("address", postDetails.address);
      formData.append("city", postDetails.city);
      formData.append("latitude", postDetails.latitude);
      formData.append("longitude", postDetails.longitude);
      formData.append("type", postDetails.type);
      formData.append("property", postDetails.property);

      const response = await axios.post(
        `${Server_Url}/estate/create-post/${user?.user?._id}`,
        formData
      );

      if (response.data.success) {
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="createPost">
      <h1>Create post</h1>

      <div className="input-placeholder">
        <input
          type="text"
          onChange={handleChange}
          name="title"
          placeholder="Enter the estate title"
          id="title"
        />
        <textarea
          type="text"
          onChange={handleChange}
          name="description"
          placeholder="Enter the estate description"
          id="description"
        />
      </div>
      <div className="input-placeholder">
        <input
          type="text"
          onChange={handleChange}
          name="bedroom"
          placeholder="Enter the number of bebrooms"
          id="bedroom"
        />
        <input
          type="text"
          onChange={handleChange}
          name="bathroom"
          id="bathroom"
          placeholder="Enter the number of bathrooms"
        />
      </div>

      <div className="input-placeholder">
        <input
          type="text"
          onChange={handleChange}
          name="address"
          placeholder="Enter the estate address"
          id="address"
        />
        <input
          type="text"
          onChange={handleChange}
          name="city"
          placeholder="Enter the estate city"
          id="city"
        />
      </div>
      <div className="input-placeholder">
        <input
          type="text"
          onChange={handleChange}
          name="longitude"
          placeholder="Enter the estate longitude"
          id="longitude"
        />
        <input
          type="text"
          onChange={handleChange}
          name="latitude"
          placeholder="Enter the estate latitude"
          id="latitude"
        />
      </div>
      <div className="input-placeholder">
        <input
          type="number"
          onChange={handleChange}
          name="price"
          id="price"
          placeholder="Enter the room price"
        />
        <input
          type="number"
          onChange={handleChange}
          name="size"
          id="size"
          placeholder="Enter the room size"
        />
      </div>
      <div className="input-placeholder">
        <input
          type="text"
          onChange={handleChange}
          name="school"
          id="school"
          placeholder="Enter the nearby school distance"
        />
        <input
          type="text"
          onChange={handleChange}
          name="busStation"
          id="busStation"
          placeholder="Enter the nearby bus statation distance"
        />
      </div>

      <div className="input-placeholder">
        <select name="type" id="type" onChange={handleChange}>
          <option value="">Choose type</option>
          <option value="Buy">Buy</option>
          <option value="Rent">Rent</option>
        </select>
        <select name="property" id="property" onChange={handleChange}>
          <option value="">Choose property type</option>
          <option value="Apartment">Apartment</option>
          <option value="House">House</option>
          <option value="Condo">Condo</option>
          <option value="Land">Land</option>
        </select>
      </div>

      <div className="plusIcon">
        <input
          type="file"
          name="image"
          id="image"
          onChange={handleImageChange}
        />
      </div>

      <div className=" container">
        <label htmlFor="image">
          <AiOutlinePlusCircle size={30} className="mt-3" color="#555" />
        </label>
        {images &&
          images.map((i) => (
            <img src={URL.createObjectURL(i)} key={i} alt="" className="img" />
          ))}
      </div>

      <div className="button" onClick={handleCreatePost}>
        <h3>Create post</h3>
      </div>
    </div>
  );
};

export default CreatePost;
