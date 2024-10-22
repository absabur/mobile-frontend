import React, { useEffect, useRef, useState } from "react";
import { FaChevronDown } from "react-icons/fa";

import { MdClose, MdVerified } from "react-icons/md";

const BrandSelect = ({ items, onSelectionChange, label, selectedBrand }) => {
  const inputRef = useRef(null);
  const [selectedItems, setSelectedItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setSelectedItems(selectedBrand);
  }, [selectedBrand]);

  // Filter items based on the search query
  const filteredItems = items.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Function to handle the selection of an item
  const handleItemClick = (item) => {
    const isSelected = selectedItems.includes(item._id);
    const updatedSelectedItems = isSelected
      ? selectedItems.filter((id) => id !== item._id)
      : [...selectedItems, item._id];

    setSelectedItems(updatedSelectedItems);
    onSelectionChange(updatedSelectedItems); // Callback for parent component
  };

  const handleFocusInput = () => {
    setIsVisible(!isVisible);
    setTimeout(() => {
      inputRef.current?.focus();
    }, 10);
  };

  const handleRemoveSelectedItem = (id) => {
    const updatedSelectedItems = selectedItems.filter((item) => item !== id);
    setSelectedItems(updatedSelectedItems);
    onSelectionChange(updatedSelectedItems);
  };

  return (
    <div className="filter-inputs">
      <button
        onClick={handleFocusInput}
        className={`select-button ${isVisible ? "active-button" : ""}`}
      >
        <span>{label}:</span>
        <span className={`drop-arrow ${isVisible ? "drop-arrow-down" : ""}`}>
          <FaChevronDown />
        </span>
      </button>

      {isVisible && (
        <div className="dropdown-content">
          {items.length > 7 && (
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search..."
              className="search-input"
              ref={inputRef}
            />
          )}

          <ul className="items-list">
            {filteredItems.map((item) => (
              <li key={item._id}>
                <label>
                  <input
                    type="checkbox"
                    value={item._id}
                    checked={selectedItems.includes(item._id)}
                    onChange={() => handleItemClick(item)}
                  />
                  {item.name}
                </label>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="selected-items">
        {selectedItems.length > 0 ? (
          <ul>
            {selectedItems.map((id) => {
              const selectedItem = items.find((item) => item._id === id);
              return (
                <li key={id} className="selected-item">
                  <MdVerified color="green" />
                  {selectedItem?.name}
                  <MdClose
                    onClick={() => handleRemoveSelectedItem(id)} // Remove item on click
                    className="remove-button"
                    aria-label={`Remove ${selectedItem?.name}`}
                  />
                </li>
              );
            })}
          </ul>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default BrandSelect;
