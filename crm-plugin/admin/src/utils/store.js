import { createStore, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";
import { logger } from "redux-logger";
import reducer from "../containers/HomePage/reducer";

// create the saga middleware
export const sagaMiddleware = createSagaMiddleware();
// mount it on the Store
export const store = createStore(
  reducer,
  applyMiddleware(sagaMiddleware, logger)
);
