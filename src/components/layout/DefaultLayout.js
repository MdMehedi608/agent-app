import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import { MobLeftSideBar } from "../../assets/header.css";
import Header from "../common/Header";
import SingleMenu from "../common/SingleMenu";
import Footer from "../Footer";

const defaultCssContent = {
  translate: '-220px',
  zIndex: '9999'
}
const DefaultLayout = () => {  
  const [sidebar, setSidebar] = useState(defaultCssContent);
  const [overlay, setOverlay] = useState({
    display: 'none'
  });
  
  const handleClickMenuClose = () => {
    const responsive = {
      translate: '-220px',
      zIndex: '9999'
    }
    setSidebar(responsive);
    setOverlay({
      display: 'none'
    })
  }

  return (
    <>
      <Header setSidebar={setSidebar} setOverlay={setOverlay} overlay={overlay} />
      <div className="container-fluid padding_zero">
        <div className="main_container">
          <div className="container padding_zero">
          <div className="home_page_row">
            <div className="home_page_col home_page_left_side_div">
              <MobLeftSideBar sidebar={sidebar} className="home_page_left_side">
                <div className="home_page_left_side_menu">
                  <div className="sidenav">
                    <a className="closebtn" onClick={handleClickMenuClose}>&times;</a>
                  </div>                  
                  <SingleMenu setSidebar={setSidebar} setOverlay={setOverlay} />
                </div>
              </MobLeftSideBar>
            </div>
            <div className="home_page_col home_page_right_side_div">
              <div className="row">
                <div className="col">
                  <main role="main" className="pb-3">
                    <div className="home_page_container">
                      <div className="body_content">
                        <Outlet />
                      </div>
                      <div className="footer_content">
                          <Footer />
                      </div>
                    </div>
                  </main>
                </div>
              </div>
            </div>
          </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DefaultLayout;
