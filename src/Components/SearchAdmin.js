"use client";

import { useState } from "react";

const SearchAdmin = () => {
  const [searchIndex, setSearchIndex] = useState(-1);
  const handleSearch = (value) => {
    const searchText = value.toLowerCase();
    const elements = document.querySelectorAll(".searchable");
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
        padding: "10px",
        backgroundColor: "gray",
        position: "sticky",
        top: "0",
      }}
    >
      <input
        type="text"
        onChange={(e) => handleSearch(e.target.value)}
        placeholder="Search anything..."
      />
    </div>
  );
};

export default SearchAdmin;
