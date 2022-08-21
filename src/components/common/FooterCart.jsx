import React from 'react';
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { GlobalVariable } from '../../utility-class/ApiConnectionClass';

const FooterCart = () => {
    const rootUrl = GlobalVariable.LOCAL_WEB_URL;
    const { cart } = useSelector((state) => state.storageStore);
    const { cartTotalPrice } = useSelector((state) => state.storageStore);

  return (
    <div className="section_cart">
      <div className="cart_icon2">
        <Link to={'/cart'}>
          <img src={`${rootUrl}assets/images/icon/icon_cart.png`} />
          <span className="badge badge-warning cartPriceCount">{cart}</span>
          <p>TK. {cartTotalPrice}</p>
        </Link>
      </div>
    </div>
  );
}

export default FooterCart