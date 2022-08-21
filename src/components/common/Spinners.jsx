import React, { useState } from 'react';
import LoadingOverlay from 'react-loading-overlay';
import { BounceLoader } from 'react-spinners';
import styled from "styled-components";
 
const StyledLoader = styled(LoadingOverlay)`
    position: fixed;
    height: 100vh;
    overflow: hidden;
    top: 0;
    left: 25%;
    right: 0;
    .MyLoader_overlay {
        background: rgba(255, 0, 0, 0.5);
    }
    &.MyLoader_wrapper--active {
        overflow: hidden;
    }
`

const Spinners = ({left, active, children}) => {
    let [color, setColor] = useState("#0088CC");

  return (
      <LoadingOverlay
      active={active}
      styles={{
      overlay: (base) => ({
        ...base,
      //   background: 'rgba(255, 0, 0, 0.5)',
        position: 'fixed',
        left: left,
        width: 'auto',
        right: '0'
      })
      }}
      spinner={<BounceLoader color={color} size={60} />}>
          {children}
      </LoadingOverlay>
  )
}

export default Spinners