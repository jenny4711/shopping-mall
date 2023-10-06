import React ,{useRef}from 'react';
import { Popover, OverlayTrigger } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import '../style/CategoryMenu.css'

const CategoryMenus = ({ menu , productList }) => {
  const ref = useRef(null)
  const popover = (
    <Popover id={`popover-positioned-${menu}`} placement="bottom">
      <Popover.Body >
        {menu === "Accessories"? (<ul className='popver-links'>
          <li>
            <Link to={`/?items=woman-${menu.toLowerCase()}`}>{menu}-Woman</Link>
          </li>
          <li>
            <Link to={`/?items=men-${menu.toLowerCase()}`}>{menu}-Men</Link>
          </li>
          <li>
            <Link to={`/?items=kids-${menu.toLowerCase()}`}>{menu}-Kids</Link>
          </li>
          <li>
            <Link to={`/?items=baby-${menu.toLowerCase()}`}>{menu}-Baby</Link>
          </li>







        </ul>
          ):(
          <ul className='popver-links'>
        <li>
            <Link to={`/?items=${menu.toLowerCase()}-top`}>{menu}-top</Link>
          </li>
          
            <li>
            <Link to={`/?items=${menu.toLowerCase()}-jacket`}>{menu}-jacket</Link>
          </li>
          <li>
            <Link to={`/?items=${menu.toLowerCase()}-pants`}>{menu}-pants</Link>
          </li>
          <li>
            <Link to={`/?items=${menu.toLowerCase()}-sale`}>{menu}-sale</Link>
          </li>

          {menu ==="Woman" || menu === "Kids" ?
            (<li>
            <Link to={`/?items=${menu.toLowerCase()}-dress`}>{menu}-dress</Link>
          </li>):("")
          }
          {menu ==="Baby" || menu === "Kids"?
        (
        <li>
          <Link to={`/?items=${menu.toLowerCase()}-bodysuit`}>{menu}-BodySuit</Link>
        </li>
        ):""  
        }
        {menu ==="Baby" || menu === "Kids"?
        (
        <li>
          <Link to={`/?items=${menu.toLowerCase()}-overalls`}>{menu}-Overalls</Link>
        </li>
        ):""  
        }
        {menu ==="Baby"?
        (
        <li>
          <Link to={`/?items=${menu.toLowerCase()}-jumpsuit`}>{menu}-Jump Suit</Link>
        </li>
        ):""  
        }

      {menu ==="Baby"?
        (
        <li>
          <Link to={`/?items=${menu.toLowerCase()}-CottonSet`}>{menu}-CottonSet</Link>
        </li>
        ):""  
        }

        </ul>)}
      </Popover.Body>
    </Popover>
  );



  return (
    <OverlayTrigger  trigger={['hover','focus']} delay={{show:100,hide:1000}}  placement="bottom" overlay={popover}>
      <span ref={ref}>{menu}</span>
    </OverlayTrigger>
  );
}

export default CategoryMenus;