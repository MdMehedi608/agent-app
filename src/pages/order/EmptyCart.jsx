import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { GlobalVariable } from '../../utility-class/ApiConnectionClass';

const EmptyCart = () => {
  const localRootUrl = GlobalVariable.LOCAL_WEB_URL;
    const navigate = useNavigate();
    const { user } = useSelector((state) => state.storageStore);

    useEffect(() => {
        if(!user){
          navigate('/login', {replace:true});
          return;
        }
        window.scrollTo(0, 0);
    }, []);

  return (
    <section>
        <div className="text-center min-height-container minimum_height">
            <div className="shoppingCartBanner" style={{marginTop: "7rem"}}>
                <img alt="Empty Cart" title="Empty Cart" src={`${localRootUrl}assets/images/shooping_cart/cartEmpty.png`} className="img-fluid mx-auto d-block" height="300" width="300" />
            </div>

            <p className="CartEmptyText1 text-center mt-5">Your Cart is Empty!</p>
            <p className="CartEmptyText2 text-center">Looks like you haven't made order yet.</p>
            <Link to={'/new-demand'} className="btn-empty-cart">Continue To Demand</Link>
        </div>
    </section>
  )
}

export default EmptyCart