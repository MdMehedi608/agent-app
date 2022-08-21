import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toastr } from "react-redux-toastr";
import {
  brandAllDataList,
  classAllDataList,
  editionAllDataList,
  groupAllDataList
} from "../../redux/actions/books/bookActions";
import { handleParameterInputChange } from "../../redux/actions/commonActions";
import { SET_BOOK_LIST } from "../../redux/contants/action-type";
import { GlobalVariable } from "../../utility-class/ApiConnectionClass";
import { getAllBookInfo } from "../../utils/books/BookApi";

const CategoryHeader = () => {
  const localRootUrl = GlobalVariable.LOCAL_WEB_URL;
  const dispatch = useDispatch();
  const { bookParameter } = useSelector((state) => state.commonStore);
  const { bookData } = useSelector((state) => state.bookStore);
  const { dropDownEditionList } = useSelector((state) => state.bookStore);
  const { dropDownClassList } = useSelector((state) => state.bookStore);
  const { dropDownGroupList } = useSelector((state) => state.bookStore);
  const { dropDownBrandList } = useSelector((state) => state.bookStore);

  useEffect(() => {
    dispatch(editionAllDataList());
    dispatch(classAllDataList());
    dispatch(groupAllDataList());
    dispatch(brandAllDataList());
  }, []);


  const handelChangeBrand = (event) => {
    let parameterData = {
      ...bookParameter,
      brandId: event.target.value,
      page: 1,
    };
    filterWiseAllBookList(parameterData);
  };
  const handelChangeEdition = (event) => {
    let parameterData = {
      ...bookParameter,
      editionId: event.target.value,
      page: 1,
    };
    filterWiseAllBookList(parameterData);
  };
  const handelChangeClass = (event) => {
    let parameterData = {
      ...bookParameter,
      classId: event.target.value,
      page: 1,
    };
    filterWiseAllBookList(parameterData);
  };

  const handelChangeGroup = (event) => {
    let parameterData = {
      ...bookParameter,
      group: event.target.value,
      page: 1,
    };
    filterWiseAllBookList(parameterData);
  };

  const handelChangeSearch = (event) => {
    let parameterData = {
      ...bookParameter,
      searchName: event.target.value,
      page: 1,
    };
    filterWiseAllBookList(parameterData);
  };

  const filterWiseAllBookList = async (parameterData) => {
    const response = await getAllBookInfo(parameterData);
    if (response && !response.didError) {
      let bookList = {
        ...bookData,
        bookList: response.model,
      };
      dispatch({
        type: SET_BOOK_LIST,
        payload: bookList,
      });
    } else {
      toastr.error(response.errorMessage ? response.errorMessage : "Unauthorized");
    }
  };
  return (
    <div className="row header_filter_row mobheader_filter_row">
      <div className="col header_filter_col mobheader_filter_col">
        <input
          type="text"
          className="form-control"
          name="searchName"
          value={bookParameter.searchName}
          onChange={(e) => {
            dispatch(handleParameterInputChange(e));
            handelChangeSearch(e);
          }}
          placeholder="Search.."
        />
      </div>
      <div className="col header_filter_col mobheader_filter_col">
        <div className="row header_filter_subrow mobheader_filter_subrow">
          <div className="col header_filter_subcol mobheader_filter_subcol">
            <select
              name="brandId"
              className="form-control"
              value={bookParameter.brandId}
              onChange={(e) => {dispatch(handleParameterInputChange(e));handelChangeBrand(e)}}
            >
              <option value="">Brand</option>
              {dropDownBrandList.map((item) => (
                <option value={item.stringId} key={item.stringId}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>

          <div className="col header_filter_subcol mobheader_filter_subcol">
            <select
              name="editionId"
              className="form-control"
              value={bookParameter.editionId}
              onChange={(e) => {
                dispatch(handleParameterInputChange(e));
                handelChangeEdition(e);
              }}
            >
              <option value="">Edition</option>
              {dropDownEditionList.map((item) => (
                <option value={item.stringId} key={item.stringId}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>

          <div className="col header_filter_subcol mobheader_filter_subcol">
            <select
              name="classId"
              className="form-control"
              value={bookParameter.classId}
              onChange={(e) => {
                dispatch(handleParameterInputChange(e));
                handelChangeClass(e);
              }}
            >
              <option value="">Class</option>
              {dropDownClassList.map((item) => (
                <option value={item.stringId} key={item.stringId}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>

          <div className="col header_filter_subcol mobheader_filter_subcol">
            <select
              name="group"
              className="form-control"
              value={bookParameter.group}
              onChange={(e) => {
                dispatch(handleParameterInputChange(e));
                handelChangeGroup(e);
              }}              
            >
              <option value="">Group</option>
              {dropDownGroupList.map((item) => (
                <option value={item.stringId} key={item.stringId}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default CategoryHeader;
