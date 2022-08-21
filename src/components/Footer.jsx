import React from "react";
import { useSelector } from "react-redux";
import '../assets/footer.css';
import FooterCart from "./common/FooterCart";
import ScrollTop from "./common/ScrollTop";

const Footer = () => {
  const { isScroll } = useSelector((state) => state.footerStore);  
  return (
    <>
      <div className="row">
        <div className="col-xs-12 col-sm-12 col-md-12">
          <section id="footer_text1">
            <div className="copyright text-center">
              <p>&copy; 2022 panjeree.com All rights Reserved.</p>
            </div>
          </section>
        </div>
        <FooterCart />

        {
          isScroll && (<ScrollTop />)
        }
        
      </div>
    </>
  );
};

export default Footer;
