import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { GlobalVariable } from "../../utility-class/ApiConnectionClass";
import ProgressiveImageLoad from "../common/ProgressiveImageLoad";
import AddToCardBtn from './AddToCardBtn';

const BookOrderItem = ({bookData}) => {
    const localRootUrl = GlobalVariable.LOCAL_WEB_URL;
    const apiRootUrl = GlobalVariable.LOCAL_API_WWW_URL;
    const navigate = useNavigate();
    
    const bookName = bookData.bookName
        ? bookData.bookName
        : bookData.bookName;
  const apiImageName = `${localRootUrl}assets/images/upload/book-image/${bookData.bookCode}.jpg`;
    const handleClickDetails = (code) => {
      navigate('/book-details' + code);
    }
  return (
    <div className="book-list-wrapper bbb_viewed_item d-flex flex-column align-items-center justify-content-around text-center">        
      <Link to={`/book-details${bookData.bookCode}`} className="bda">
        <div className="book_data_content">
            <div className="overlay_content" title={bookName}>
                <p>Book Details</p>
            </div>
          <ProgressiveImageLoad
            elementClass={`BookCarouselImg`}
            image={apiImageName}
            placeholderSrc={`${localRootUrl}assets/images/common_image/book3.svg`}
            bookName={bookName}
          />
          <div className="homepage_book_width">
            <h5 className="nowrap-title" title={bookName}>
              {bookName}
            </h5>
          </div>
          <div className="homepage_publisher_width">
            <h6 className="nowrap-author" title={bookData.edition}>
              {bookData.edition}
            </h6>
          </div>
          <span className="title_price">৳ {bookData.bookPrice}</span>
        </div>
      </Link>
      <div className="home-details-btn-wrapper">
        <AddToCardBtn bookData={bookData} className={'btn home-details-btn'}>
          Add To Cart
        </AddToCardBtn>        
      </div>
    </div>
  )
}

export default BookOrderItem