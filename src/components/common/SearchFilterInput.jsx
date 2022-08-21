import React from 'react';
import { SearchFilter } from '../../assets/demand.css';

const SearchFilterInput = ({searchName, handleChangeParameter, handelChangeSearch}) => {
  return (
    <SearchFilter>
    <input
        type="text"
        className="form-control"
        name="searchName"
        value={searchName}
        onChange={(e) => {
        handleChangeParameter(e.target.name, e.target.value)
        handelChangeSearch(e);
        }}
        placeholder="Search.."
    />
    </SearchFilter>
  )
}

export default SearchFilterInput