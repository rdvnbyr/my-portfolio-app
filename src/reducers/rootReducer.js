import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";
import { createHashHistory } from "history";

export const routerHistory = createHashHistory();

const appReducer = combineReducers({
    routes: connectRouter(routerHistory)
});

export const rootReducer = (state,action) => {
    return appReducer(state,action);
};