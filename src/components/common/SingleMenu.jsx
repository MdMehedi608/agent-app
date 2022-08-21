import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { Accordion, AccordionSummaryBySingle } from "../../hooks/menu-accordion/accordion-style";
import { SET_SESSION_CHILD_MENU, SET_SESSION_PARENT_MENU } from "../../redux/contants/action-type";

const SingleMenu = ({setSidebar, setOverlay}) => {
  const dispatch = useDispatch();
  const {menuList} = useSelector(state=> state.menuStore);
  const {childMenu, parentMenu} = useSelector(state=> state.storageStore);
  const [expanded, setExpanded] = useState('demand');

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };
  useEffect(() => {    
    setExpanded(parentMenu ? parentMenu.isExpanded : expanded);
  }, [parentMenu]);
  
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
    if (id) {
      let child = {
        isActiveMenuId: id
      }
      dispatch({
        type: SET_SESSION_CHILD_MENU,
        payload: child
      });
    }  
    
  };

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
    <div className="gw-sidebar">
      <Accordion expanded={expanded === 'demand'} onChange={handleChange('demand')}>
        <AccordionSummaryBySingle className={parentMenu.isExpanded === 'demand' ? 'active_class' : ''}>
          <NavLink to={'demand'} onClick={()=>{handleClickByActive('demand', ''); handleClickMenuClose()}}>Demand</NavLink>
        </AccordionSummaryBySingle>                  
      </Accordion>
      <Accordion expanded={expanded === 'order'} onChange={handleChange('order')}>  
        <AccordionSummaryBySingle className={parentMenu.isExpanded === 'order' ? 'active_class' : ''}>
          <NavLink to={'order'} onClick={()=>{handleClickByActive('order', ''); handleClickMenuClose()}}>Order</NavLink>     
        </AccordionSummaryBySingle>                
      </Accordion>
      <Accordion expanded={expanded === 'challan'} onChange={handleChange('challan')}>  
        <AccordionSummaryBySingle className={parentMenu.isExpanded === 'challan' ? 'active_class' : ''}>
          <NavLink to={'challan'} onClick={()=>{handleClickByActive('challan', ''); handleClickMenuClose()}}>Challan</NavLink>     
        </AccordionSummaryBySingle>                
      </Accordion>
      <Accordion expanded={expanded === 'library-statement'} onChange={handleChange('library-statement')}>  
        <AccordionSummaryBySingle className={parentMenu.isExpanded === 'library-statement' ? 'active_class' : ''}>
          <NavLink to={'library-statement'} onClick={()=>{handleClickByActive('library-statement', ''); handleClickMenuClose()}}>Statement</NavLink>     
        </AccordionSummaryBySingle>                
      </Accordion>
    </div>
  )
}

export default SingleMenu