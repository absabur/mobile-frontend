"use client";

import { fetchPhoneComparison } from "@/Store/Action";
import { FaTrashAlt } from "react-icons/fa";
import { useDispatch } from "react-redux";

const RemoveCompare = ({ slug }) => {
  const dispatch = useDispatch();
  const handleAdd = () => {
    let slugs = localStorage.getItem("compare");
    if (slugs) {
      slugs = JSON.parse(slugs);
      slugs = slugs.filter((item) => item !== slug);
    } else {
      slugs = [];
    }
    localStorage.setItem("compare", JSON.stringify(slugs));
    dispatch(fetchPhoneComparison(slugs));
  };
  return (
    <div
      onClick={handleAdd}
      style={{
        cursor: "pointer",
        color: "red",
        backgroundColor: "white",
        padding: "5px",
        borderRadius: "100%",
        width: "20px",
        height: "20px",
        fontSize: "15px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        boxShadow: "0 0 10px black",
      }}
    >
      <FaTrashAlt />
    </div>
  );
};

export default RemoveCompare;
