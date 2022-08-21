import React from "react";
import { useScrollTo } from "react-use-window-scroll";

const ScrollTop = () => {
  const scrollTo = useScrollTo();
  return (
    <div className="scrol-to-top" style={{cursor:"pointer"}} onClick={() => scrollTo({ top: 0, behavior: 'smooth' })}>
      <div className="scrollup">
        <i className="fa fa-arrow-circle-up" aria-hidden="true"></i>
      </div>
    </div>
  );
};

export default ScrollTop;
