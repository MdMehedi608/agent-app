import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "../assets/home.css";

const Index = () => {
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
    <div className="slider">
      <div className="slider_top">
        Home Page
      </div>
    </div>
  );
};

export default Index;
