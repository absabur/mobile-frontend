"use client";

import { fetchPhoneComparison } from "@/Store/Action";
import { useDispatch } from "react-redux";

const AddToCompare = ({ slug, children }) => {
  const dispatch = useDispatch();
  const handleAdd = () => {
    let items = localStorage.getItem("compare");
    if (items) {
      items = JSON.parse(items);
      let fin = items.find((item) => item === slug);
      if (fin) {
        return;
      }
    } else {
      items = [];
    }
    items.push(slug);

    localStorage.setItem("compare", JSON.stringify(items));
    let slugs = localStorage.getItem("compare");
    if (slugs) {
      slugs = JSON.parse(slugs);
    } else {
      slugs = [];
    }
    dispatch(fetchPhoneComparison(slugs));
  };
  return (
    <div
      style={{ width: children ? "100%" : "max-content", cursor: "pointer" }}
      onClick={handleAdd}
    >
      {children ? children : "Add to compare"}
    </div>
  );
};

export default AddToCompare;
