import React, { useState } from "react";

import "../style/Images.style.css";
const Images = ({ img, idx,setMove }) => {
  const [bigger, setBigger] = useState(false);
  const isMobile = window.navigator.userAgent.indexOf("Mobile") !== -1;
  function makeBigger() {
    setBigger((prev) => !prev);
    setMove((prev)=>!prev)
  }
 
  let style = bigger ? { width: "650px", position: "relative" } : {};
  let mobile = bigger ?{width:"550px",position:"relative"}:{}

  return (
    <div key={idx} className="Images">
      <img
        style={!isMobile?style:mobile}
        onClick={makeBigger}
        className="Images-img"
        src={img}
      />
    </div>
  );
};

export default Images;
