import { useState } from "react";
import "./slider.scss";
import { Server } from "../../server";

function Slider({ images }) {
  const [imageIndex, setImageIndex] = useState(null);

  const changeSlide = (direction) => {
    if (direction === "left") {
      if (imageIndex === 0) {
        setImageIndex(images?.length - 1);
      } else {
        setImageIndex(imageIndex - 1);
      }
    } else {
      if (imageIndex === images?.length - 1) {
        setImageIndex(0);
      } else {
        setImageIndex(imageIndex + 1);
      }
    }
  };

  return (
   <>
   {
    images?.length > 0 &&  <div className="slider">
    {imageIndex !== null && (
      <div className="fullSlider">
        <div className="arrow" onClick={() => changeSlide("left")}>
          <img src="/arrow.png" alt="" />
        </div>
        <div className="imgContainer">
          <img src={`${Server}/${images[imageIndex]}`} alt="" />
        </div>
        <div className="arrow" onClick={() => changeSlide("right")}>
          <img src="/arrow.png" className="right" alt="" />
        </div>
        <div className="close" onClick={() => setImageIndex(null)}>
          X
        </div>
      </div>
    )}
    <div className="bigImage">
      <img src={`${Server}/${images[0]}`} alt="" onClick={() => setImageIndex(0)} />
    </div>
    <div className="smallImages">
      {images?.slice(0,3).map((image, index) => (
        <img
          src={`${Server}/${image}`}
          alt=""
          key={index}
          onClick={() => setImageIndex(index + 1)}
        />
      ))}
    </div>
  </div>
   }
   </>
  );
}

export default Slider;
