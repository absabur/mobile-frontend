import { applyMiddleware, createStore } from "@reduxjs/toolkit";
import { thunk } from "redux-thunk";
import { reducer } from "./Reducer";

export const store = createStore(reducer, applyMiddleware(thunk));
