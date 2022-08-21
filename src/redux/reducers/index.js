import { reducer as toastrReducer } from 'react-redux-toastr';
import { combineReducers } from "redux";
import persistReducer from "redux-persist/es/persistReducer";
import storage from 'redux-persist/lib/storage';
import { bookReducers } from './bookReducers';
import { commonReducers } from './commonReducers';
import { footerReducers } from './footerReducers';
import { libraryStatementReducers } from './libraryStatementReducers';
import { menuReducers } from './menuReducers';
import { storageReducers } from "./storageReducers";
import { userReducers } from './userReducers';

const persistConfig = {
    key: "root",
    // timeout: 60000,
    storage
}
const persistedReducer = persistReducer(persistConfig, storageReducers);

const reducers = combineReducers({
    storageStore: persistedReducer,
    menuStore: menuReducers,
    libraryStore: libraryStatementReducers,
    footerStore: footerReducers,
    userStore: userReducers,    
    bookStore: bookReducers,   
    commonStore: commonReducers,    
    toastr: toastrReducer,

})
export default reducers