"use client";
import { LuArrowLeftRight } from "react-icons/lu";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import { getSearchPhone } from "@/Store/Action";
import "./Navbar.css";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const dispatch = useDispatch();
  const searchPhones = useSelector((state) => state.searchPhones);
  const compareChanges = useSelector((state) => state.compareChanges);
  const [compareCount, setCompareCount] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const pathName = usePathname();
  const [searchValue, setSearchValue] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    dispatch(getSearchPhone(searchValue));
  }, [searchValue, dispatch]);

  useEffect(() => {
    let count = localStorage.getItem("compare");
    count = JSON.parse(count);
    count = count?.length;
    setCompareCount(count);
    setIsAnimating(true);
    setTimeout(() => {
      setIsAnimating(false);
    }, 2000);
  }, [compareChanges]);

  const handleBlur = () => {
    setTimeout(() => setIsFocused(false), 500);
  };

  return (
    <div className="search-bar">
      <div>
        <Link
          style={{
            fontSize: "20px",
            textDecoration: "none",
            margin: "0 10px",
            color: "black",
          }}
          href={`/`}
        >
          MS
        </Link>
        <Link
          style={{
            fontSize: "20px",
            textDecoration: "none",
            margin: "0 10px",
            color: "black",
          }}
          href={`/user/admin`}
        >
          Admin
        </Link>
      </div>
      <input
        type="text"
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        placeholder="Search..."
        onFocus={() => setIsFocused(true)}
        onBlur={handleBlur}
      />
      <Link
        href={`/compare`}
        className={`compare-count ${
          isAnimating ? "compare-link-animate" : "compare-link"
        }`}
      >
        <LuArrowLeftRight />
        <span>{compareCount}</span>
      </Link>
      {isFocused && pathName !== "/search" && (
        <div className="search-results">
          {searchPhones?.length > 0 ? (
            searchPhones.slice(0, 5).map((phone) => (
              <Link
                className="search-phone"
                href={`/${phone.slug}`}
                key={phone._id}
              >
                <img src={phone.images[0].url} alt={phone.name} />
                <h3>{phone.name}</h3>
              </Link>
            ))
          ) : (
            <p>No Phone Found</p>
          )}
          <Link className="see-all" href={`/search`}>
            See all results
          </Link>
        </div>
      )}
    </div>
  );
};

export default Navbar;
