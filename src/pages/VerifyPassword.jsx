import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toastr } from "react-redux-toastr";
import { useNavigate } from "react-router-dom";
import "../assets/login.css";
import {
  handlePasswordErrorChange,
  handlePasswordInputChange
} from "../redux/actions/userActions";
import { CHANGE_PASSWORD_INPUT, LOGOUT } from "../redux/contants/action-type";
import { checkPassword, userChangePassword } from "../utils/users/UserApi";

const VerifyPassword = () => {
  const { passwordData } = useSelector((state) => state.userStore);
  const { errorData } = useSelector((state) => state.userStore);
  const { defaultUser } = useSelector((state) => state.userStore);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const { user } = useSelector((state) => state.storageStore);

  useEffect(() => {
    //after change user - defaultUser
    if (!defaultUser?.id) {
      toastr.error("Please Default Login");
      navigate("/login", { replace: true });
    }
    
  }, [])

  const oldPasswordCheck = async (event) => {
    if (defaultUser?.id && event.target.value) {
      let userData = {
        userName: defaultUser?.id,
        password: event.target.value,
        newPassword: "",
      };
      let checkPass = await checkPassword(userData);
      if (checkPass.didError) {
        let inputData = {
          name: "password",
          value: "",
        };
        dispatch({
          type: CHANGE_PASSWORD_INPUT,
          payload: inputData,
        });
        toastr.error(checkPass.errorMessage);
      }
    }
  };

  const userVerifyPassword = async (data) => {
    if (defaultUser?.id) {
      let userData = {
        ...data,
        userName: defaultUser.id,
      };
      let response = await userChangePassword(userData);
      if (!response.didError) {
        toastr.success(response.message);
        navigate("/login", { replace: true });
      } else {
        toastr.error(response.errorMessage);
      }
    } else {
      dispatch({
        type: LOGOUT,
      });
      navigate("/login", { replace: true });
    }
  };

  return (
    <section id="verify_section" className="sign_in_section">
      <div className="sign_in_content">
        <div className="row">
          <div className="col">
            <div className="sign_header text-center" style={{ color: "red" }}>
              <h5>আপনার পাসওয়ার্ড এখনই পরিবর্তন করুন</h5>
              <h5>(Please, change your password immediately)</h5>
            </div>
            <div className="sign_in_right">
              <div className="row">
                <div className="col ">
                  <div className="sign_header_title text-center">
                    <p>Change Password </p>
                  </div>
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      userVerifyPassword(passwordData);
                    }}
                  >
                    <div className="form-group">
                      <input
                        type="password"
                        className="form-control"
                        name="password"
                        value={passwordData.password}
                        onChange={(e) => dispatch(handlePasswordInputChange(e))}
                        onBlur={(e) => {
                          dispatch(handlePasswordErrorChange(e));
                          oldPasswordCheck(e);
                        }}
                        placeholder="Old Password"
                        required
                      />
                      {errorData.password && (
                        <span className="err">{errorData.password}</span>
                      )}
                    </div>

                    <div className="form-group">
                      <input
                        type="password"
                        className="form-control"
                        name="newPassword"
                        value={passwordData.newPassword}
                        onChange={(e) => dispatch(handlePasswordInputChange(e))}
                        onBlur={(e) => dispatch(handlePasswordErrorChange(e))}
                        placeholder="Password"
                        required
                      />
                      {errorData.newPassword && (
                        <span className="err">{errorData.newPassword}</span>
                      )}
                    </div>
                    <div className="form-group">
                      <input
                        type="password"
                        className="form-control"
                        name="confirmPassword"
                        value={passwordData.confirmPassword}
                        onChange={(e) => dispatch(handlePasswordInputChange(e))}
                        onBlur={(e) => dispatch(handlePasswordErrorChange(e))}
                        placeholder="Confirm Password"
                        required
                      />
                      {errorData.confirmPassword && (
                        <span className="err">{errorData.confirmPassword}</span>
                      )}
                    </div>
                    <div className="form-group text-right">
                      <input
                        type="submit"
                        className="btn btn-primary"
                        value="Change"
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
  );
};

export default VerifyPassword;
