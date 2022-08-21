import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { OverlayMobMenu } from "../../assets/header.css";
import { LOGOUT, SET_SESSION_PARENT_MENU } from "../../redux/contants/action-type";
import { GlobalVariable } from "../../utility-class/ApiConnectionClass";

const Header = ({setSidebar, setOverlay, overlay}) => {
  const rootUrl = GlobalVariable.LOCAL_WEB_URL;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.storageStore);
  const { cart } = useSelector((state) => state.storageStore);
  

  const logout = () => {
    dispatch({
      type: LOGOUT,
    });
    navigate("/login", { replace: true });
  };
  const handleClickMenuOpen = () => {
    const responsive = {
      translate: '0px',
      zIndex: '9999'
    }
    setSidebar(responsive);
    setOverlay({
      display: 'block'
    })
  }
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
  const handleClickByActive = (parentName, id) => {
    if (parentName) {
      let parent = {
        isExpanded: parentName
      }
      dispatch({
        type: SET_SESSION_PARENT_MENU,
        payload: parent
      });
    } 
    
  };

  return (
    <header id="fixed_header_part" className="top_header navbar-fixed-top">
      <div className="container padding_zero height100">
        <div className="header_top" id="header_top_part">
          <div className="row header_row align-items-center">
            <div className="col heder_col header_col_img mob_header_col_img">
              <nav className="navbar navbar-expand-lg navbar-light navbar-fixed-top mob_navbar">
                <OverlayMobMenu overlay={overlay} className="overlay_mob_menu" onClick={handleClickMenuClose}></OverlayMobMenu>
                <span className="mob_menu_icon" style={{cursor: 'pointer'}} onClick={handleClickMenuOpen}>&#9776;</span>
              </nav>

              <Link to={"/demand"} onClick={()=> handleClickByActive('demand', '')}>
                <img
                  className="main_logo_desktop"
                  src={`${rootUrl}assets/images/logo/logo.gif`}
                />
              </Link>
            </div>

            <div className="col heder_col">
              <div className="row icon_row justify-content-end align-items-center">
                <div className="col icon_col text-right">
                  <Link to={'/cart'} className="CartIconDiv" title="Cart">
                    <img src={`${rootUrl}assets/images/icon/cart.png`} />
                    <span className="badge badge-warning cartCount">{cart}</span>
                  </Link>
                </div>

                {user === null ? (
                  <div className="col icon_col text-right">
                    <a
                      style={{ color: "black", textDecoration: "none" }}
                      title="Sign in"
                      href="/login"
                    >
                      <img src={`${rootUrl}assets/images/icon/user.png`} />
                    </a>
                  </div>
                ) : (
                  <div className="col icon_col drop_down_col text-right">
                    <div className="dropdown">
                      <button 
                        className="btn btn-outline-primary dropdown-toggle mob_user_btn"
                        title={user.name}
                        type="button"
                        data-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded="false"
                      >
                        <img
                          className="img_signin_com"
                          style={{ cursor: "pointer" }}
                          title={user.name}
                          alt=""
                          src={`${rootUrl}assets/images/common_image/default_customer.png`}
                        />
                        <span className="mob_user_text">{user.name}</span>
                      </button>

                      <div
                        className="dropdown-menu dropdown-menu-right"
                        aria-labelledby="dropdownMenuButton"
                      >
                        <button className="dropdown-item font-weight-bold only_mob_user_text" type="button">{user.name}</button>
                        <button className="dropdown-item font-weight-bold" type="button" onClick={logout}>Logout</button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
