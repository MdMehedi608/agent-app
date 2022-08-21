import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toastr } from 'react-redux-toastr';
import { useNavigate } from 'react-router-dom';
import '../../assets/book.css';
import CategoryHeader from '../../components/category/CategoryHeader';
import InfiniteScroll from '../../components/common/InfiniteScroll';
import BookOrderItem from '../../components/order/BookOrderItem';
import { SET_BOOK_LIST, SET_PARAMETER } from '../../redux/contants/action-type';
import { getAllBookInfo } from '../../utils/books/BookApi';

const Book = () => {
    const { user } = useSelector((state) => state.storageStore);
    const { bookData } = useSelector((state) => state.bookStore);
    const { bookParameter } = useSelector((state) => state.commonStore);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        if(!user){
          navigate('/login', {replace:true});
          return;
        }
        // window.scrollTo(0, 0);
        getAllBookList();
    }, []);

    const getAllBookList = async () => {
        let requestModel = {
            ...bookParameter,
            page: 1
        };
        const response = await getAllBookInfo(requestModel);
        if(response && !response.didError){
        let bookList = {
            ...bookData,
            bookList: response.model
        }
        dispatch({
            type: SET_BOOK_LIST,
            payload: bookList,
        });
        }else{
            toastr.error(response.errorMessage ? response.errorMessage : "Unauthorized");
        }
    }
    const fatchAllBookList = async (data) => {
        let parameterData = {
        ...bookParameter,
        page: bookParameter.page + 1
        }
        dispatch({
            type:SET_PARAMETER,
            payload: parameterData
        });
        // setparameter(parameterData);
        const response = await getAllBookInfo(parameterData);
        if(response && !response.didError){
        let bookList = {
            ...bookData,
            bookList: bookData.bookList != null ? bookData.bookList.concat(response.model) : response.model
        }
        dispatch({
            type: SET_BOOK_LIST,
            payload: bookList,
        });
        }else{
            toastr.error(response.errorMessage ? response.errorMessage : "Unauthorized");
        }
    }
  return (
    <section id='novel_section'>
        <div className="book_page_container minimum_height">
            <div className="book_page_content round_background">
                <div className="page_header_content">
                    <CategoryHeader />
                </div>
                <div className="page_body_content">
                    <div className="page_body_right">
                        {
                            bookData.bookList !== null ? (
                            <InfiniteScroll
                            dataListLength={bookData.bookList && bookData.bookList.length}
                            style={{ display: 'flex', flexDirection: 'column', overflow: 'hidden' }} 
                            fatchNextData={fatchAllBookList}
                            >
                                <div className="row book_row data_grid data_list">
                                {
                                    bookData.bookList.map((item, idx) => {
                                        
                                        return (                                        
                                            <div className="col book_col" key={item.id}>
                                                <BookOrderItem bookData={item} />
                                            </div>
                                        )
                                    
                                     })
                                }
                                </div>
                            </InfiniteScroll>
                            ):""
                        }    
                    </div>
                </div>
            </div>
        </div>
    </section>
  )
}

export default Book