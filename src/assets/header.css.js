
import styled from "styled-components";

export const MobLeftSideBar = styled.div`
  @media (max-width: 834px) {
    transition: all 0.4s ease;
    transform: translatex(${({sidebar}) => sidebar.translate});
    z-index: ${({sidebar}) => sidebar.zIndex};
  }  
`;
export const OverlayMobMenu = styled.div`
  display: none;
  @media (max-width: 834px) {
    display: ${({overlay}) => overlay.display};
  }  
`;
