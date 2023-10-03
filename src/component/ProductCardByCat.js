import React from "react";
import Slider from "react-slick";

import { useNavigate} from "react-router-dom";


import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import "../style/ProductCardByCat.style.css";
import EachCard from "./EachCard";

const ProductCardByCat = ({ showList, showPrice }) => {
  const isMobile = window.navigator.userAgent.indexOf("Mobile") !== -1;

  const navigate = useNavigate();
  const showWoman = showList.filter((item, idx) => {
    return item.category.some((category) => category.includes("woman"));
  });

  const showMan = showList.filter((item, idx) => {
    return item.category.some((category) => category.includes("men"));
  });

  const showKids = showList.filter((item, idx) => {
    return item.category.some((category) => category.includes("kids"));
  });

  const goToAll = (cate) => {
    return navigate(`/?name=${cate}-all`);
  };

  let settings;
  if (!isMobile) {
    settings = {
      dots: true,
      infinite: true,
      speed: 500,
      autoplay: true,
      autoplaySpeed: 3000,
      centerMode: true,
      centerPadding: "0px",
      slidesToShow: 1,
      slidesToScroll: 1,
      slidesToShow: 4,
    };
  } else {
    settings = {
      dots: true,
      infinite: true,
      speed: 500,
      autoplay: true,
      autoplaySpeed: 3000,
      centerMode: true,
      centerPadding: "0px",
      slidesToShow: 1,
      slidesToScroll: 1,
      slidesToShow: 1,
    };
  }

  return (
    <>
      <div onClick={() => goToAll("woman")} className="category-title">
        {" "}
        View Woman
      </div>
      <Slider {...settings} className="card">
        {showWoman.map((item, idx) => (
          <EachCard
            img={item.image}
            id={item._id}
            name={item.name}
            price={item.price}
            showPrice={showPrice}
          />
        ))}
      </Slider>
      <div onClick={() => goToAll("men")} className="category-title">
        {" "}
        View Man
      </div>
      <Slider {...settings} className="card">
        {showMan.map((item, idx) => (
          <EachCard
            img={item.image}
            id={item._id}
            name={item.name}
            price={item.price}
            showPrice={showPrice}
          />
        ))}
      </Slider>

      <div onClick={() => goToAll("kids")} className="category-title">
        {" "}
        View Kids
      </div>
      <Slider {...settings} className="card">
        {showKids.map((item, idx) => (
          <EachCard
            img={item.image}
            id={item._id}
            name={item.name}
            price={item.price}
            showPrice={showPrice}
          />
        ))}
      </Slider>
    </>
  );
};

export default ProductCardByCat;
