import React from "react";
import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../style/MainBoard.style.css";

const MainBoard = ({ board, showPrice }) => {
  let newImg = board && board?.filter((img, idx) => img.visible !== false);

  let settings = {
    dots: true,
    infinite: true,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 3000,
    centerMode: true,
    centerPadding: "0px",
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <Slider {...settings}>
      {newImg?.map((img, idx) => (
        <div className="MainBoard-img" key={idx}>
          <img className="Md-img" src={img.img} alt={`image-${idx}`} />
          <span className={!showPrice ? "none" : ""}>Code:{img.title}</span>
        </div>
      ))}
    </Slider>
  );
};

export default MainBoard;
