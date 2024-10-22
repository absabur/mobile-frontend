import React, { useRef, useState } from "react";
import { FaChevronDown } from "react-icons/fa";
import { MdVerified, MdClose } from "react-icons/md";

const MultiSelectWithDropdown = ({
  items,
  onSelectionChange,
  selectedItems,
  isVisible,
  onToggle,
  label,
  onRemove,
}) => {
  const inputRef = useRef(null);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredItems = items.filter((item) =>
    item.filterValue.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const sortedFilteredItems = filteredItems.sort((a, b) => {
    const isASelected = selectedItems.includes(a.filterId);
    const isBSelected = selectedItems.includes(b.filterId);
    return isASelected === isBSelected ? 0 : isASelected ? -1 : 1;
  });

  const handleItemClick = (item) => {
    const isSelected = selectedItems.includes(item.filterId);
    const updatedSelectedItems = isSelected
      ? selectedItems.filter((id) => id !== item.filterId)
      : [...selectedItems, item.filterId];

    onSelectionChange(updatedSelectedItems);
  };

  const handleFocusInput = () => {
    onToggle();
    setTimeout(() => {
      inputRef.current?.focus();
    }, 10);
  };

  const handleRemoveSelectedItem = (id) => {
    const updatedSelectedItems = selectedItems.filter((item) => item !== id);
    onSelectionChange(updatedSelectedItems);
    onRemove(id);
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
            {sortedFilteredItems.map((item) => (
              <li key={item.filterId}>
                <label>
                  <input
                    type="checkbox"
                    value={item.filterId}
                    checked={selectedItems.includes(item.filterId)}
                    onChange={() => handleItemClick(item)}
                  />
                  {item.filterValue}
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
              const selectedItem = items.find((item) => item.filterId === id);
              if (selectedItem) {
                return (
                  <li key={id} className="selected-item">
                    <MdVerified color="green" />
                    {selectedItem.filterValue}
                    <MdClose
                      onClick={() => handleRemoveSelectedItem(id)}
                      className="remove-button"
                      aria-label={`Remove ${selectedItem.filterValue}`}
                    />
                  </li>
                );
              }
              return null;
            })}
          </ul>
        ) : null}
      </div>
    </div>
  );
};

export default MultiSelectWithDropdown;
