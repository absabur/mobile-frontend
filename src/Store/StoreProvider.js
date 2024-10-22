"use client";
const { Provider } = require("react-redux");
const { store } = require("./Store");

export const StoreProvider = ({ children }) => {
  return <Provider store={store}>{children}</Provider>;
};
