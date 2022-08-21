import moment from "moment";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toastr } from "react-redux-toastr";
import { Link, useNavigate } from "react-router-dom";
import "../../assets/cart.css";
import Spinners from "../../components/common/Spinners";
import CartDetails from "../../components/order/CartDetails";
import CartSummery from "../../components/order/CartSummery";
import { addOrderConfirm } from "../../redux/actions/books/agentDemandActions";
import { addAgentDemand } from "../../utils/books/AgentDemandApi";

const MyCart = () => {
  const { agentDemand } = useSelector((state) => state.storageStore);
  const { user } = useSelector((state) => state.storageStore);
  // const { loading } = useSelector((state) => state.commonStore);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  let [loading, setLoading] = useState(false);
  useEffect(() => {
    if (!user) {
      navigate("/login", { replace: true });
      return;
    }
    if (agentDemand.demandDetails.length < 1) {
      navigate("/empty-cart", { replace: true });
      return;
    }
    window.scrollTo(0, 0);
  }, []);

  const handleClickOrder = async () =>{
    setLoading(true);
    let order = {
      ...agentDemand,
      orderBy: user.name,
      addUserId: user.id,
      demandDate: moment(new Date()).format('YYYY-MM-DD'),
      addDateString: moment(new Date()).format('YYYY-MM-DD hh:mm A'),
      entryDateString: moment(new Date()).format('YYYY-MM-DD hh:mm A'),
    }      
    const response = await addAgentDemand(order); 
    if(!response.didError){
      setLoading(false);
      if (response.model) {
        toastr.success(response.message);
        dispatch(addOrderConfirm());
        navigate("/confirm-message", { replace: true });
        return;
      }
    }else{
      setLoading(false);
      toastr.error(response.errorMessage);
    }
  }
  return (
    <>
    <section id="my_cart">
      <div className="my_cart_container minimum_height">
        <div className="my_cart_content">
          <div className="row">
            <div className="col cart_view_col">
              <div className="mycart_product_content round_background">
                <CartDetails cartData={agentDemand} />

                <div className="cart_submit_btn text-right">
                    <Link
                      to={"/new-demand"}
                      className="btn btn-outline-dark"
                      style={{ marginRight: "10px" }}
                    >
                      More Demand
                    </Link>
                    <button type="button" className="btn btn-primary" onClick={handleClickOrder}>
                      Confirm
                    </button>
                </div>
              </div>
            </div>
            <div className="col cart_summery_col">
              <div className="round_background mycart_checkout_summary_content">
                  <CartSummery subTotal={agentDemand.totalAmount} total={agentDemand.totalAmount} grandTotal={agentDemand.totalAmount} />
              </div>
            </div>
          </div>
        </div>
      </div>
      
    </section>
    <Spinners left={'26%'} active={loading}></Spinners>
    </>
    
  );
};

export default MyCart;
