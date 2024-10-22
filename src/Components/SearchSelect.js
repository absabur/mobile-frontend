"use client";

import { useState } from "react";

const SearchSelect = ({ classId }) => {
  const [searchIndex, setSearchIndex] = useState(-1);
  const handleSearch = (value) => {
    const searchText = value.toLowerCase();
    const elements = document.querySelectorAll(`.select${classId}`);
    let found = false;
    elements.forEach((element, index) => {
      if (
        searchText !== "" &&
        element.textContent.toLowerCase().includes(searchText)
      ) {
        if (!found) {
          element.scrollIntoView({ behavior: "smooth", block: "center" });
          setSearchIndex(index);
          found = true;
        }
        element.classList.add("found");
      } else {
        element.classList.remove("found");
      }
    });
  };
  return (
    <div
      style={{
        width: "100%",
        textAlign: "center",
        margin: "5px",
      }}
    >
      <input
        type="text"
        onChange={(e) => handleSearch(e.target.value)}
        placeholder="Search..."
      />
    </div>
  );
};

export default SearchSelect;
