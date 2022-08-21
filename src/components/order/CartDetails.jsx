import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { addCart, addCartList, addCartPrice } from "../../redux/actions/books/agentDemandActions";
import CartItem from "./CartItem";

const CartDetails = ({cartData}) => {
  const dispatch = useDispatch();
  const { agentDemand } = useSelector((state) => state.storageStore);    
    const handleClickRemove = (index, data) => {
      
      if (data) {
        Swal.fire({
          title: "Are you sure?",
          icon: 'warning',
          confirmButtonColor: '#0d92e1',
          showCancelButton: true,
          cancelButtonColor: "#d33"
        }).then((result) => {
          if (result.isConfirmed) {
            let cartData ={
              ...agentDemand,  
              totalQty: agentDemand.totalQty - data.demandQty,
              totalAmount: agentDemand.totalAmount - data.demandAmount       
            }
            cartData.demandDetails.splice(index, 1);
    
            dispatch(addCart(cartData.totalQty));
            dispatch(addCartPrice(cartData.totalAmount));
            dispatch(addCartList(cartData));
          }
        });

        
      }

      
    }
  return (
    <>
      <div className="border_bottom_my_cart cart_header_content cart_details_header_bold_title">
        <div className="row">
          <div className="col-sm-6 col-md-6 col-lg-6 my_cart_title_position">
            <strong>My Cart</strong>(
            <strong>{cartData.totalQty} Items</strong>)
          </div>
          <div className="mob_display_none col-sm-3 col-md-3 col-lg-3 mycart_qty_title">
            <strong>Quantity</strong>
          </div>
          <div className="mob_display_none col-sm-1 col-md-1 col-lg-1 text_position_my_cart mycart_price_title">
            <strong>Price</strong>
          </div>
          <div className="col-sm-2 col-md-2 col-lg-2 text_position_my_cart mycart_price_title">
            <strong>Total: {cartData.totalAmount} TK.</strong>
          </div>
        </div>
      </div>
      {
          cartData.demandDetails.map((item, idx) => {
            return(<CartItem key={item.bookCode} index={idx} detailsData={item} handleClickRemove={handleClickRemove} />)
          })
      }
      
      
    </>
  );
};

export default CartDetails;
