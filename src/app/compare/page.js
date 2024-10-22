"use client";
import React, { useEffect, useState } from "react";
import { MdCancel, MdVerified } from "react-icons/md";
import "./compare.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchPhoneComparison, getSearchPhone } from "@/Store/Action";
import RemoveCompare from "@/Components/RemoveCompare";
import Link from "next/link";
import AddToCompare from "@/Components/AddToCompare";

const page = () => {
  const phones = useSelector((state) => state.comparison);
  const searchPhones = useSelector((state) => state.searchPhones);
  const dispatch = useDispatch();

  const [searchValue, setSearchValue] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    dispatch(getSearchPhone(searchValue));
  }, [searchValue, dispatch]);

  const handleBlur = () => {
    setTimeout(() => setIsFocused(false), 500);
  };
  useEffect(() => {
    let slugs = localStorage.getItem("compare");
    slugs = slugs ? JSON.parse(slugs) : [];
    dispatch(fetchPhoneComparison(slugs));
  }, []);

  return (
    <div className="table-container">
      <table className="comparison-table">
        <thead>
          <tr>
            <th className="specification-column">Specification</th>
            {phones.map((phone) => (
              <th key={phone._id} className="phone-column">
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <Link href={`/${phone.slug}`}>{phone.name}</Link>
                  <RemoveCompare slug={phone.slug} />
                </div>
              </th>
            ))}

            <th className="phone-column">
              <input
                type="text"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                placeholder="Add Phone"
                onFocus={() => setIsFocused(true)}
                onBlur={handleBlur}
              />

              {isFocused && (
                <div
                  className="search-results"
                  style={{ width: "100%", left: 0, top: "60px" }}
                >
                  {searchPhones?.length > 0 ? (
                    searchPhones.slice(0, 5).map((phone) => (
                      <AddToCompare slug={phone.slug} key={phone._id}>
                        <div className="search-phone" key={phone._id}>
                          <img src={phone.images[0].url} alt={phone.name} />
                          <h3>{phone.name}</h3>
                        </div>
                      </AddToCompare>
                    ))
                  ) : (
                    <p>No Phone Found</p>
                  )}
                  <Link className="see-all" href={`/search`}>
                    See all results
                  </Link>
                </div>
              )}
            </th>
          </tr>
          {phones.length > 0 && (
            <>
              <tr>
                <td></td>
                {phones.map((phone) => (
                  <td key={phone._id} className="phone-column">
                    <img src={phone.images[0].url} className="phone-image" />
                  </td>
                ))}
              </tr>
              <tr>
                <td className="specification-column">Price</td>
                {phones.map((phone) => (
                  <td key={phone._id} className="phone-column">
                    {phone.price[0].price}
                  </td>
                ))}
              </tr>
            </>
          )}
        </thead>
        <tbody>
          {phones.length > 0 &&
            Object.keys(phones[0].specifications).map((category) => (
              <React.Fragment key={category}>
                <tr>
                  <td colSpan={phones.length + 1} className="category-header">
                    {category}
                  </td>
                </tr>
                {Object.keys(phones[0].specifications[category]).map(
                  (specKey) => (
                    <tr key={specKey}>
                      <td className="spec-key">{specKey}</td>
                      {phones.map((phone) => (
                        <td key={phone._id + specKey} className="phone-column">
                          {phone.specifications[category][
                            specKey
                          ]?.toLowerCase() === "yes" && (
                            <span className="icon">
                              <MdVerified color="green" />
                            </span>
                          )}
                          {phone.specifications[category][
                            specKey
                          ]?.toLowerCase() === "no" && (
                            <span className="icon">
                              <MdCancel color="red" />
                            </span>
                          )}
                          {phone.specifications[category][specKey] || ""}
                        </td>
                      ))}
                    </tr>
                  )
                )}
              </React.Fragment>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default page;
