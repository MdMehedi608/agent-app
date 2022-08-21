import { applyMiddleware, compose, createStore } from "redux";
import persistStore from "redux-persist/es/persistStore";
import thunk from "redux-thunk";
import reducers from './reducers/index';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(reducers, composeEnhancers(applyMiddleware(thunk)));
export const persistor = persistStore(store);
