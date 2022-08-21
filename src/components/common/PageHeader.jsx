import React from "react";
import { HeaderContent } from "../../assets/demand.css";

const PageHeader = ({ name, handleClick, children }) => {
  return (
    <HeaderContent className="round_background">
      <h4>{name}</h4>
      {
        handleClick && (<button type="button" className="btn btn-primary" onClick={handleClick}>
          {children}
      </button>)
      }
      
    </HeaderContent>
  );
};

export default PageHeader;
