import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toastr } from "react-redux-toastr";
import { useNavigate } from "react-router-dom";
import '../assets/login.css';
import Spinners from "../components/common/Spinners";
import {
  handleUserErrorChange,
  handleUserInputChange
} from "../redux/actions/userActions";
import { REMOVE_DEFAULT_LOGIN, SET_DEFAULT_LOGIN, SET_LOGIN } from "../redux/contants/action-type";
import { userLogin } from "../utils/users/UserApi";

const Login = () => {
  let [loading, setLoading] = useState(false);
  const { userData } = useSelector((state) => state.userStore);
  const { userErrorData } = useSelector((state) => state.userStore);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const userSignIn = async (data)=>{
    setLoading(true);
      let user = await userLogin(data);    
      if (user && !user.didError) {  
        setLoading(false);
        dispatch({
          type: SET_DEFAULT_LOGIN,
          payload: user.model
        });

        if (userData.password === "ppl123" || userData.password === user.model.agentCode)
        {
            navigate('/verify-password', {replace:true});
        }else{
          // toastr.success("Login Successfully");
          dispatch({
            type: SET_LOGIN,
            payload: user.model
          });
          dispatch({
            type: REMOVE_DEFAULT_LOGIN,
          });
          navigate('/demand', {replace:true});
        }
          
      }else{
        setLoading(false);
        toastr.error(user ? user.errorMessage: "undefined");
      }
  }
  return (
    <>
      <section id="sign_in_section" className="sign_in_section">
        <div className="sign_in_content">
          <div className="row">
            <div className="col">
              <div className="sign_header text-center">
                  <h2>Sign In</h2>
              </div>
              <div className="sign_in_right">
                <div className="row">
                  <div className="col ">
                      <div className="sign_header_title text-center">
                          <p>Sign In to start your session </p>
                      </div>
                    <form
                      onSubmit={(e) => {
                        e.preventDefault();
                        userSignIn(userData);
                      }}
                    >
                      <div className="form-group">
                        <input
                          type="text"
                          className="form-control"
                          name="userName"
                          value={userData.userName}
                          onChange={(e) => dispatch(handleUserInputChange(e))}
                          onBlur={(e) => dispatch(handleUserErrorChange(e))}
                          placeholder="User Name"
                          required
                        />
                        {userErrorData.userName && (
                          <span className="err">{userErrorData.userName}</span>
                        )}
                      </div>

                      <div className="form-group">
                        <input
                          type="password"
                          className="form-control"
                          name="password"
                          value={userData.password}
                          onChange={(e) => dispatch(handleUserInputChange(e))}
                          onBlur={(e) => dispatch(handleUserErrorChange(e))}
                          placeholder="Password"
                          required
                        />
                        {userErrorData.password && (
                          <span className="err">{userErrorData.password}</span>
                        )}
                      </div>
                      <div className="form-group text-right">
                        <input
                          type="submit"
                          className="btn btn-primary"
                          value="Login"
                        />
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Spinners left={'0%'} active={loading}></Spinners>
    </>
  );
};

export default Login;
