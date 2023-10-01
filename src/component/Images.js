import React, { useState } from "react";

import "../style/Images.style.css";
const Images = ({ img, idx,setMove }) => {
  const [bigger, setBigger] = useState(false);

  function makeBigger() {
    setBigger((prev) => !prev);
    setMove((prev)=>!prev)
  }

  const style = bigger ? { width: "650px", position: "relative" } : {};

  return (
    <div key={idx} className="Images">
      <img
        style={style}
        onClick={makeBigger}
        className="Images-img"
        src={img}
      />
    </div>
  );
};

export default Images;
