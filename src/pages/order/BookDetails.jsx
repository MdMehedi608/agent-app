import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toastr } from "react-redux-toastr";
import { useNavigate, useParams } from "react-router-dom";
import '../../assets/book.css';
import ProgressiveImageLoad from "../../components/common/ProgressiveImageLoad";
import AddToCardBtn from "../../components/order/AddToCardBtn";
import IncrementDecrementDetails from "../../components/order/IncrementDecrementDetails";
import { bookDetails } from "../../redux/actions/books/bookActions";
import { GlobalVariable } from "../../utility-class/ApiConnectionClass";
import { GetBookDetailsByCode } from "../../utils/books/BookApi";

const BookDetails = () => {
  const localRootUrl = GlobalVariable.LOCAL_WEB_URL;
  const apiRootUrl = GlobalVariable.LOCAL_API_WWW_URL;
  const { user } = useSelector((state) => state.storageStore);
  const { agentDemand } = useSelector((state) => state.storageStore);
  const { details } = useSelector((state) => state.bookStore);
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  

  const apiImageName = `${localRootUrl}assets/images/upload/book-image/${details?.bookCode}.jpg`;

  useEffect(() => {
    if (!user) {
      navigate("/login", { replace: true });
      return;
    }
    window.scrollTo(0, 0);

    if (id) {
      getBookDetails(id);
    }
    
  }, [id]);

  const getBookDetails = async (bookCode) => {
    let response = await GetBookDetailsByCode(bookCode);
    if (!response.didError) {
      let checkDetailsData = agentDemand.demandDetails.find(f=> f.bookCode == bookCode);
      let details = {
        ...response.model, 
        demandQty: checkDetailsData?.demandQty ? checkDetailsData.demandQty : 0,                  
      }

      dispatch(bookDetails(details));
    }else{
      toastr.error(response.errorMessage);
    }
  }
  
  return (
    <section id="book_details">
      <div className="row">
        <div className="col">
          <div className="book_details_contentV3">
            <div className="row">
              <div className="col BookDetailsImageDiv">
                <ProgressiveImageLoad
                  elementClass={`BookDetailsImageV3`}
                  image={apiImageName}
                  placeholderSrc={`${localRootUrl}assets/images/common_image/book3.svg`}
                  bookName={details?.bookName}
                />
              </div>

              <div className="col book_details_data mobbook_details_data">
                  <div className="details_content_text padding_left7">
                    <div className="product_bold_title details_font_title">{details?.bookName}</div>
                    {/* <div className="product_bold_title edition_content"><span className="edition_text"></span> </div> */}
                    <div className="details_concern_content book_description_content">
                        <span>Concern</span>: 
                        <a className="change_tag_color">{details?.brandId}</a>
                    </div>
                    <div className="details_edition_content book_description_content">
                        <span>Edition</span>: 
                        <a className="change_tag_color">{details?.edition}</a>
                    </div>
                    <div className="details_class_content book_description_content">
                        <span>Class</span>: 
                        <a className="change_tag_color">{details?.bookTypeName}</a>
                    </div>
                    <div className="details_group_content book_description_content">
                        <span>Group</span>: 
                        <a className="change_tag_color">{details?.bookGroup}</a>
                    </div>
                  </div>

                  <div className="price_div_book_details padding_left7">
                    <div className="title_price">৳ {details?.bookPrice}</div>
                  </div>
                  <div className="details_quantity_content padding_left7">
                    <span className="quantity_text">Quantity</span> <IncrementDecrementDetails detailsData={details} />
                  </div>

                  <div className="book_details_icon check_hart_icon_content">
                    <AddToCardBtn bookData={details} className={'book_details_addToCart'}>
                    <img
                        className="book_details_btn_icon"
                        src={`${localRootUrl}assets/images/icon/add_to_cart.png`}
                      />
                    </AddToCardBtn>
                  </div>


              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BookDetails;
