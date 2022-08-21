import React from "react";
import { Link } from "react-router-dom";
import { GlobalVariable } from "../../utility-class/ApiConnectionClass";
import ProgressiveImageLoad from "../common/ProgressiveImageLoad";
import IncrementDecrement from "./IncrementDecrement";

const CartItem = ({
  index,
  detailsData,
  handleClickRemove,
}) => {
  const localRootUrl = GlobalVariable.LOCAL_WEB_URL;
  const apiImageName = `${localRootUrl}assets/images/upload/book-image/${detailsData.bookCode}.jpg`;

  return (
    <div className="my_cart_boxV3 row border_bottom_my_cart">
      <div className="col-xs-12 col-md-6 col-sm-6 col-lg-6 padding_zero_mob">
        <div className="cart_book_info_content">
            <ProgressiveImageLoad
            elementClass={`MyCartImg`}
            image={apiImageName}
            placeholderSrc={`${localRootUrl}assets/images/common_image/book3.svg`}
            bookName={detailsData.bookName}
            />
            <div className="cart_book_text">
                <p className="mycart_product_name">
                <Link to={`/order-details${detailsData.bookCode}`} className="a_tag_color">{detailsData.bookName}</Link>
                </p>
                <a
                className="btn btn-outline-danger"
                alt="Remove Button"
                title="Remove Button"
                style={{marginTop: '6px'}}
                onClick={() => handleClickRemove(index, detailsData)}
                >
                Remove
                </a>
            </div>
        </div>
      </div>
      <div className="col-xs-12 col-sm-3 col-md-3 col-lg-3 text-center padding_zero_mob">
        <IncrementDecrement detailsData={detailsData} />
      </div>
      <div className="col-xs-12 col-sm-1 col-md-1 col-lg-1 text_position_my_cart padding_zero_mob">
        <div className="price_content_mob">
          <p>TK. {detailsData.bookPrice}</p>
        </div>
      </div>
      <div className="col-xs-12 col-sm-2 col-md-2 col-lg-2 text_position_my_cart padding_zero_mob">
        <p className="padding_top_mob10">TK. {detailsData.demandAmount}</p>
      </div>
    </div>
  );
};

export default CartItem;
