import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { toastr } from "react-redux-toastr";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { addCart, addCartList, addCartPrice } from "../../redux/actions/books/agentDemandActions";
import { bookDetails } from "../../redux/actions/books/bookActions";

const AddToCardBtn = ({ children, bookData, className }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  //for blank
  const { newAgenetDemand } = useSelector((state) => state.storageStore);
  const { newDemandDetails } = useSelector((state) => state.storageStore);

  //get reducers
  const { user } = useSelector((state) => state.storageStore);
  const { agentDemand } = useSelector((state) => state.storageStore);
  const { cart } = useSelector((state) => state.storageStore);
  const { cartTotalPrice } = useSelector((state) => state.storageStore);
  const { details } = useSelector((state) => state.bookStore);

  const handleClickAddToCart = (data) => {
    debugger;
    let addDemandQty = "";
    if (agentDemand.demandDetails.length > 0) {
       let getAddData = agentDemand.demandDetails.find(f=> f.bookCode === data.bookCode);
       addDemandQty = getAddData ? (+getAddData.demandQty) : "";
    }
    
    Swal.fire({
      title: "Please Quantity",
      input: "number",
      inputValue: `${addDemandQty}`,
      inputAttributes: {
        autocapitalize: "off",
      },
      showCancelButton: true,
      confirmButtonColor: '#0d92e1',
      cancelButtonColor: "#d33",
      preConfirm: (login) => {
        if (!login) {
          Swal.showValidationMessage(`Please enter Quantity!!`);
        }
      },
    }).then((result) => {
      if (result.isConfirmed) {
        if (!user) {
          navigate("/login", { replace: true });
          return;
        } 
        else if(result.value == 0){
          toastr.error("Zero Not Allow");
          return;
        }
        else {
          let orderDetails = {
            ...newDemandDetails,
            bookName: data.bookName,
            bookCode: data.bookCode,
            bookType: data.bookType,
            demandQty: result.value,
            bookPrice: data.bookPrice,
            demandAmount: result.value * data.bookPrice,
          };
          if (agentDemand.demandDetails.length > 0) {
            
            let addedOrderData = {
              ...agentDemand,
              ...newAgenetDemand,
              totalQty:
                ((agentDemand.totalQty
                  ? agentDemand.totalQty
                  : newAgenetDemand.totalQty) + (+orderDetails.demandQty)) - (+addDemandQty),
              totalAmount:
                ((agentDemand.totalAmount
                  ? agentDemand.totalAmount
                  : newAgenetDemand.totalAmount) + (+orderDetails.demandAmount)) - (+addDemandQty),
            };
  
            if (details) {
              let detailsData = {
              ...details,
              demandQty: (+orderDetails.demandQty),
              };
              dispatch(bookDetails(detailsData));
            }
            for (let item of addedOrderData.demandDetails) {
              if (item.bookCode == data.bookCode) {
                item.demandQty = (+orderDetails.demandQty);


                dispatch(addCart((cart + (+orderDetails.demandQty)) - (+addDemandQty)));
                dispatch(addCartPrice(addedOrderData.totalAmount));
      
                dispatch(addCartList(addedOrderData));

                // toastr.error("Already Exists");
                return;
              }
            }
          }

          
          let orderData = {
            ...agentDemand,
            ...newAgenetDemand,
            totalQty:
              (agentDemand.totalQty
                ? agentDemand.totalQty
                : newAgenetDemand.totalQty) + (+orderDetails.demandQty),
            totalAmount:
              (agentDemand.totalAmount
                ? agentDemand.totalAmount
                : newAgenetDemand.totalAmount) + (+orderDetails.demandAmount),
          };

          if (details) {
            let detailsData = {
            ...details,
            demandQty: (+orderDetails.demandQty),
            };
            dispatch(bookDetails(detailsData));
          }

          dispatch(addCart(cart + (+orderDetails.demandQty)));
          dispatch(addCartPrice(orderData.totalAmount));

          orderData.demandDetails.push(orderDetails);
          dispatch(addCartList(orderData));
        }
      }
    });
  };

  return (
    <a
      className={className}
      title={bookData?.bookName}
      alt={bookData?.bookName}
      onClick={() => handleClickAddToCart(bookData)}
    >
      {children}
    </a>
  );
};

export default AddToCardBtn;
