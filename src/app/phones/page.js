"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./phones.css";
import {
  getBrandAction,
  getFilterPhones,
  getSpecificationAction,
} from "@/Store/Action";
import BrandSelect from "@/Components/BrandSelect";
import MultiSelectWithDropdown from "@/Components/MultiSelectWithSearch";

const Page = () => {
  const filterPhones = useSelector((state) => state.filterPhones);
  const brands = useSelector((state) => state.brands);
  const specifications = useSelector((state) => state.specifications);
  const [isRestored, setIsRestored] = useState(false);

  const dispatch = useDispatch();
  const [selectedBrand, setSelectedBrand] = useState([]);
  const [selectedPrice, setSelectedPrice] = useState({
    minPrice: 0,
    maxPrice: 300000,
  });
  const [selectedFilters, setSelectedFilters] = useState({});
  const [activeDropdown, setActiveDropdown] = useState(null);

  const handleToggleDropdown = (specKeyId) => {
    setActiveDropdown((prev) => (prev === specKeyId ? null : specKeyId));
  };

  const restoreFiltersFromSession = () => {
    const storedBrands = JSON.parse(sessionStorage.getItem("brands"));
    const storedFilters = JSON.parse(sessionStorage.getItem("filters"));
    const storedPrice = JSON.parse(sessionStorage.getItem("price"));

    setSelectedBrand(storedBrands || []);
    setSelectedFilters(storedFilters || {});
    setSelectedPrice(
      storedPrice || {
        minPrice: 0,
        maxPrice: 300000,
      }
    );
  };

  useEffect(() => {
    restoreFiltersFromSession();
    setIsRestored(true);
  }, []);

  useEffect(() => {
    dispatch(getBrandAction());
    dispatch(getSpecificationAction());
  }, [dispatch]);

  useEffect(() => {
    if (isRestored) {
      dispatch(
        getFilterPhones({
          brand: selectedBrand,
          filter: selectedFilters,
          price: selectedPrice,
        })
      );

      sessionStorage.setItem("brands", JSON.stringify(selectedBrand));
      sessionStorage.setItem("filters", JSON.stringify(selectedFilters));
      sessionStorage.setItem("price", JSON.stringify(selectedPrice));
    }
  }, [selectedBrand, selectedFilters, selectedPrice, dispatch]);

  const handleSelectionChange = (specKeyId, selectedItems) => {
    setSelectedFilters((prevFilters) => ({
      ...prevFilters,
      [specKeyId]: selectedItems,
    }));
  };

  const handleFilterRemove = (specKeyId, id) => {
    setSelectedFilters((prevFilters) => {
      const updatedSpecFilters = prevFilters[specKeyId]?.filter(
        (filterId) => filterId !== id
      );
      return {
        ...prevFilters,
        [specKeyId]: updatedSpecFilters,
      };
    });
  };

  const handleMinPriceChange = (e) => {
    const newMinPrice = Math.min(
      parseInt(e.target.value, 10),
      selectedPrice.maxPrice - 1
    );
    setSelectedPrice({ ...selectedPrice, minPrice: newMinPrice });
  };

  const handleMaxPriceChange = (e) => {
    const newMaxPrice = Math.max(
      parseInt(e.target.value, 10),
      selectedPrice.minPrice + 1
    );
    setSelectedPrice({ ...selectedPrice, maxPrice: newMaxPrice });
  };

  const handleClearFilter = () => {
    setSelectedBrand([]);
    setSelectedPrice({ minPrice: 0, maxPrice: 300000 });
    setSelectedFilters({});
  };

  const filterEmptySpecifications = (specification) => {
    const hasNonEmptySpecs = specification.specs.some((spec) => {
      return spec.filterValues.length > 0;
    });
    return hasNonEmptySpecs;
  };

  return (
    <div className="phones-page">
      <div className="phones">
        {filterPhones?.map((phone) => (
          <Link
            href={`/${phone.slug}`}
            style={{
              width: "200px",
              border: "1px solid black",
              marginRight: "10px",
            }}
            key={phone._id}
          >
            <img
              src={`${phone.images[0].url}`}
              alt={phone.name}
              style={{ height: "100px", width: "auto" }}
            />
            <h2>{phone.name}</h2>
            <p>
              {phone.price[0].price} BDT ({phone.price[0].varient})
            </p>
          </Link>
        ))}
      </div>
      <div className="filter-section">
        <div className="filter-inputs-section">
          <h3>Filter by Price Range</h3>
          <div className="price-range-selector">
            <div className="range-slider">
              <input
                type="range"
                min="0"
                max="300000"
                value={selectedPrice.minPrice}
                onChange={handleMinPriceChange}
                className="range-input"
              />
              <input
                type="range"
                min="0"
                max="300000"
                value={selectedPrice.maxPrice}
                onChange={handleMaxPriceChange}
                className="range-input"
              />
            </div>
            <div className="range-values">
              <div>
                <h4>Minimum</h4>
                <input
                  type="number"
                  value={selectedPrice.minPrice}
                  min="0"
                  max={selectedPrice.maxPrice - 1}
                  onChange={handleMinPriceChange}
                />
              </div>
              <div>
                <h4>Maximum</h4>
                <input
                  type="number"
                  value={selectedPrice.maxPrice}
                  min={selectedPrice.minPrice + 1}
                  max="300000"
                  onChange={handleMaxPriceChange}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="filter-inputs-section">
          {/* <h3>Brand</h3> */}
          <BrandSelect
            label="Brand"
            items={brands}
            onSelectionChange={setSelectedBrand}
            selectedBrand={selectedBrand}
          />
        </div>
        {specifications?.map((specification) => {
          if (filterEmptySpecifications(specification))
            return (
              <div className="filter-category">
                <h3 style={{ marginBottom: "5px", textAlign: "center" }}>
                  {specification.categoryValue}
                </h3>
                {specification.specs?.map((spec) => {
                  if (spec.filterValues.length > 0) {
                    return (
                      <div
                        className="filter-inputs-section"
                        key={spec.specKeyId}
                      >
                        {/* <h4>{`${spec.specKey}`}</h4> */}
                        <MultiSelectWithDropdown
                          label={`${spec.specKey}`}
                          items={spec.filterValues}
                          selectedItems={selectedFilters[spec.specKeyId] || []}
                          onSelectionChange={(selectedItems) =>
                            handleSelectionChange(spec.specKeyId, selectedItems)
                          }
                          onRemove={(id) =>
                            handleFilterRemove(spec.specKeyId, id)
                          }
                          isVisible={activeDropdown === spec.specKeyId}
                          onToggle={() => handleToggleDropdown(spec.specKeyId)}
                        />
                      </div>
                    );
                  }
                })}
              </div>
            );
        })}
        <button className="clear-filter-btn" onClick={handleClearFilter}>
          Clear All Filters
        </button>
      </div>
    </div>
  );
};

export default Page;
