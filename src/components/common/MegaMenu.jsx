import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import { Accordion, AccordionDetails, AccordionSummary } from "../../hooks/menu-accordion/accordion-style";
import { getAllMenuList } from '../../redux/actions/menu/menuAction';
import { SET_SESSION_CHILD_MENU, SET_SESSION_PARENT_MENU } from "../../redux/contants/action-type";

const MegaMenu = () => {
  const dispatch = useDispatch();
  const {menuList} = useSelector(state=> state.menuStore);
  const {childMenu, parentMenu} = useSelector(state=> state.storageStore);
  const [expanded, setExpanded] = useState('order');

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };
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

  
  useEffect(() => {    
    dispatch(getAllMenuList());
    
    setExpanded(parentMenu ? parentMenu.isExpanded : expanded);
  }, [parentMenu]);
  return (
    <div className="gw-sidebar">
      {
              menuList.model ?
              (
                menuList.model.map((item, idx) => {
                  return(
                    <Accordion expanded={expanded === item.nameEn} onChange={handleChange(item.nameEn)} key={item.id}>
                      <AccordionSummary aria-controls="panel1d-content" id="panel1d-header" >
                        {
                          item.subMenu.length > 0  
                          ? (<NavLink to={'#'}>{item.name}</NavLink>)
                          : (<NavLink to={item.reUrl}>{item.name}</NavLink>)
                        }
                        
                      </AccordionSummary>
                      {
                        item.subMenu.length > 0 && (
                          <AccordionDetails>
                            {
                              item.subMenu.map((subItem, subIdx) => (
                                <Link to={subItem.reUrl} key={subItem.id} className={childMenu?.isActiveMenuId === subItem.id ? 'active' : ''} onClick={()=>handleClickByActive(item.nameEn, subItem.id)}>{subItem.name}</Link>
                              ))
                            }
                            {
                              <Link to={item.reUrl} className={childMenu?.isActiveMenuId === item.id ? 'active menu_more_button' : 'menu_more_button'} onClick={()=>handleClickByActive(item.nameEn, item.id)}>আরো দেখুন...</Link>
                            }
                          </AccordionDetails>
                        )
                      }
                      
                    </Accordion>
                  )
                })
              )
              :""
              
            }
    </div>
  )
};

export default MegaMenu;
