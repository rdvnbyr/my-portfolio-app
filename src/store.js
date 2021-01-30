import { createStore, applyMiddleware, compose } from "redux";
import { createEpicMiddleware } from "redux-observable";
import { routerMiddleware } from "connected-react-router";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import { epics } from "./epics/epics";
import { rootReducer, routerHistory } from "./reducers/rootReducer";


const epicMiddleware = createEpicMiddleware();

const middleware = compose(
    applyMiddleware(
        epicMiddleware,
        routerMiddleware(routerHistory)
    ),
    // process.env.NODE_ENV !== "production" &&  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

const persistConfig = {
    key: 'portfolio-app',
    storage,
    blacklist: []
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(persistedReducer, middleware);

const persistor = persistStore(store);

export { store, persistor };

epicMiddleware.run(epics);