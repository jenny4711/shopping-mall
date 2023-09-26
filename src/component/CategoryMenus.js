import React from 'react';
import { Popover, OverlayTrigger } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import '../style/CategoryMenu.css'

const CategoryMenus = ({ menu , productList }) => {
  
  const popover = (
    <Popover id={`popover-positioned-${menu}`} placement="bottom">
      <Popover.Body>
        {menu === "Accessories"? (<ul className='popver-links'>
          <li>
            <Link to={`/?name=woman-${menu.toLowerCase()}`}>{menu}-Woman</Link>
          </li>
          <li>
            <Link to={`/?name=men-${menu.toLowerCase()}`}>{menu}-Men</Link>
          </li>
          <li>
            <Link to={`/?name=kids-${menu.toLowerCase()}`}>{menu}-Kids</Link>
          </li>
          <li>
            <Link to={`/?name=baby-${menu.toLowerCase()}`}>{menu}-Baby</Link>
          </li>







        </ul>
          ):(
          <ul className='popver-links'>
        <li>
            <Link to={`/?name=${menu.toLowerCase()}-top`}>{menu}-top</Link>
          </li>
          
            <li>
            <Link to={`/?name=${menu.toLowerCase()}-jacket`}>{menu}-jacket</Link>
          </li>
          <li>
            <Link to={`/?name=${menu.toLowerCase()}-pants`}>{menu}-pants</Link>
          </li>
          <li>
            <Link to={`/?name=${menu.toLowerCase()}-sale`}>{menu}-sale</Link>
          </li>

          {menu ==="Woman" || menu === "Kids" ?
            (<li>
            <Link to={`/?name=${menu.toLowerCase()}-dress`}>{menu}-dress</Link>
          </li>):("")
          }
          {menu ==="Baby" || menu === "Kids"?
        (
        <li>
          <Link to={`/?name=${menu.toLowerCase()}-bodysuit`}>{menu}-BodySuit</Link>
        </li>
        ):""  
        }
        {menu ==="Baby" || menu === "Kids"?
        (
        <li>
          <Link to={`/?name=${menu.toLowerCase()}-overalls`}>{menu}-Overalls</Link>
        </li>
        ):""  
        }
        {menu ==="Baby"?
        (
        <li>
          <Link to={`/?name=${menu.toLowerCase()}-jumpsuit`}>{menu}-Jump Suit</Link>
        </li>
        ):""  
        }

      {menu ==="Baby"?
        (
        <li>
          <Link to={`/?name=${menu.toLowerCase()}-CottonSet`}>{menu}-CottonSet</Link>
        </li>
        ):""  
        }

        </ul>)}
      </Popover.Body>
    </Popover>
  );



  return (
    <OverlayTrigger trigger="click" placement="bottom" overlay={popover}>
      <span>{menu}</span>
    </OverlayTrigger>
  );
}

export default CategoryMenus;
