import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addCart, addCartList, addCartPrice } from '../../redux/actions/books/agentDemandActions';

const IncrementDecrement = ({detailsData}) => {
    const dispatch = useDispatch();
    const { newAgenetDemand } = useSelector((state) => state.storageStore);  
    const { agentDemand } = useSelector((state) => state.storageStore);  
    const { details } = useSelector((state) => state.bookStore);

    const handleClickIncrement = (data, qty) => {
        if(data){
            let cartData ={
                ...agentDemand,  
                ...newAgenetDemand,
                totalQty: (agentDemand.totalQty ? agentDemand.totalQty : newAgenetDemand.totalQty) + qty,
                totalAmount: (agentDemand.totalAmount ? agentDemand.totalAmount : newAgenetDemand.totalAmount) + (data.bookPrice*qty)     
            }
            cartData.demandDetails.forEach(element => {
                if (data.bookCode === element.bookCode) {
                    element.demandQty = (+element.demandQty) + qty;
                    element.demandAmount = element.demandAmount + (data.bookPrice*qty);
                }
            });
            
            dispatch(addCart(cartData.totalQty));
            dispatch(addCartPrice(cartData.totalAmount));
            dispatch(addCartList(cartData));
            
        }
        
    }
    const handleClickDecrement = (data, qty) => {
        if(data){
            let checkDetailsData = agentDemand.demandDetails.find(f=> f.bookCode == data.bookCode);
            if (checkDetailsData) {
                if (checkDetailsData.demandQty > 1) {
                    let cartData ={
                        ...agentDemand,  
                        totalQty: agentDemand.totalQty - qty,
                        totalAmount: agentDemand.totalAmount - (data.bookPrice*qty)    
                    }
                    cartData.demandDetails.forEach(element => {
                        if (data.bookCode === element.bookCode) {
                            element.demandQty = (+element.demandQty) - qty;
                            element.demandAmount = element.demandAmount - (data.bookPrice*qty);
                        }
                    });
            
                    dispatch(addCart(cartData.totalQty));
                    dispatch(addCartPrice(cartData.totalAmount));
                    dispatch(addCartList(cartData));
                }
                
            }
            
            
        }
    }
    const handleChange = (event) => {};

  return (
    <div className="quantity_content quantity_content_mob">
        <div className="input-group">
        <span className="input-group-btn">
            <button
            type="button"
            className="btn btn-sm btn-default btn-number btn_quantity"
            onClick={() => handleClickDecrement(detailsData, 1)}
            >
            <i className="fa fa-minus" aria-hidden="true"></i>
            </button>
        </span>
        <input
            type="text"
            className="quantity_input"
            value={detailsData?.demandQty}
            readOnly
        />
        <span className="input-group-btn" style={{ cursor: "pointer" }}>
            <button
            type="button"
            className="btn btn-sm btn-default btn-number btn_quantity"
            onClick={() => handleClickIncrement(detailsData, 1)}
            >
            <i className="fa fa-plus" aria-hidden="true"></i>
            </button>
        </span>
        </div>
    </div>
  )
}

export default IncrementDecrement