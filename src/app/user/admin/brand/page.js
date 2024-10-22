"use client";
import {
  addBrandAction,
  editBrandAction,
  getBrandAction,
} from "@/Store/Action";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const page = () => {
  const brands = useSelector((state) => state.brands);
  const [addBrand, setAddBrand] = useState("");
  const [editBrand, setEditBrand] = useState("");
  const [editId, setEditId] = useState("");
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getBrandAction());
  }, []);
  const handleEditChange = (id, name) => {
    setEditBrand(name);
    setEditId(id);
  };

  return (
    <div>
      <h1>Brands</h1>
      <div style={{ margin: "1rem" }}>
        <h3>Add new Brand</h3>
        <input
          type="text"
          placeholder="Brand name"
          value={addBrand}
          onChange={(e) => setAddBrand(e.target.value)}
        />
        {addBrand && (
          <button onClick={() => dispatch(addBrandAction(addBrand))}>
            Add Brand
          </button>
        )}
      </div>
      <p>Total brands: {brands.length}</p>
      <div>
        <table>
          <thead>
            <tr>
              <th>Brand Id</th>
              <th>Brand Name</th>
              <th>Input</th>
              <th>Edit</th>
            </tr>
          </thead>
          <tbody>
            {brands.map((brand) => {
              return (
                <tr key={brand._id}>
                  <td className={`searchable`}>{brand._id}</td>
                  <td className={`searchable`}>{brand.name}</td>
                  <td>
                    <input
                      type="text"
                      placeholder="Brand name"
                      value={editId === brand._id ? editBrand : ""}
                      onChange={(e) =>
                        handleEditChange(brand._id, e.target.value)
                      }
                    />
                  </td>
                  <td className={`searchable`}>
                    {editBrand && editId === brand._id && (
                      <button
                        onClick={() =>
                          dispatch(editBrandAction(editId, editBrand))
                        }
                      >
                        Edit
                      </button>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default page;
