"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const page = () => {
  const searchPhones = useSelector((state) => state.searchPhones);
  const searchParams = useSearchParams();
  const dispatch = useDispatch();

  // useEffect(() => {

  // }, []);

  return (
    <div>
      <div className="go-to-filter-section">
        <Link className="go-to-filter" href={`/phones`}>
          Find Phones With Advance <span>Filter</span>
        </Link>
      </div>
      <div style={{ display: "flex" }}>
        {searchPhones?.map((phone) => {
          return (
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
          );
        })}
      </div>
    </div>
  );
};

export default page;
