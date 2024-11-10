"use client";

import {
  addFilterFunc,
  editFilterAction,
  getFiltersAction,
  getHeadings,
  getSpecifications,
} from "@/Store/Action";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function page() {
  const [addSpecification, setAddSpecification] = useState({});
  const [addValue, setAddValue] = useState("");
  const [editSpecification, setEditSpecification] = useState({});
  const [editValue, setEditValue] = useState("");
  const [editId, setEditId] = useState([]);
  const { filters, specifications } = useSelector((state) => state);
  const [paginations, setPaginations] = useState({
    currentPage: 1,
    itemsPerPage: 10,
    totalItems: filters?.length,
    totalPages: Math.ceil(filters?.length / 10),
  });
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getHeadings());
    dispatch(getSpecifications());
    dispatch(getFiltersAction());
  }, []);

  useEffect(() => {
    setPaginations({
      currentPage: 1,
      itemsPerPage: 10,
      totalItems: filters.length,
      totalPages: Math.ceil(filters?.length / 10),
    });
  }, [filters]);

  const handleEditSelect = (value, id) => {
    setEditSpecification(value);
    setEditId(id);
  };
  const valueEditChange = (value, id) => {
    setEditValue(value);
    setEditId(id);
  };

  const handleEdit = () => {
    dispatch(editFilterAction(editId, editSpecification, editValue));
  };

  const handleAddSelect = (value) => {
    setAddSpecification(value);
  };
  const valueAddChange = (value) => {
    setAddValue(value);
  };

  const handleAdd = () => {
    dispatch(addFilterFunc(addSpecification, addValue));
    setAddValue("");
  };

  return (
    <div>
      <h1>Welcome to the filters Page</h1>

      <div>
        <table>
          <thead>
            <tr>
              <th>Category Id</th>
              <th>Category Value</th>
              <th>Specification Id</th>
              <th>Specification Value</th>
              <th>Filter Id</th>
              <th>Filter Values</th>
              <th>Filter Input</th>
              <th>Edit</th>
            </tr>
          </thead>
          <tbody>
            {filters
              .slice(
                paginations.currentPage * paginations.itemsPerPage - 10 + 1,
                paginations.currentPage * paginations.itemsPerPage
              )
              .map((filter) => (
                <tr key={filter._id}>
                  <td className={`searchable`}>{filter.categoryId}</td>
                  <td className={`searchable`}>{filter.categoryValue}</td>
                  <td className={`searchable`}>{filter.specId}</td>
                  <td className={`searchable`}>{filter.specValue}</td>
                  <td className={`searchable`}>{filter._id}</td>
                  <td className={`searchable`}>{filter.value}</td>
                  <td>
                    <select
                      onChange={(e) =>
                        handleEditSelect(JSON.parse(e.target.value), filter._id)
                      }
                      value={
                        editId === filter._id
                          ? JSON.stringify(editSpecification)
                          : ""
                      }
                    >
                      <option value="">Specification</option>
                      {specifications?.map((value) => (
                        <option key={value._id} value={JSON.stringify(value)}>
                          {value.name}
                        </option>
                      ))}
                    </select>

                    <input
                      type="text"
                      placeholder="Value"
                      onChange={(e) =>
                        valueEditChange(e.target.value, filter._id)
                      }
                      value={editId === filter._id ? editValue : ""}
                    />
                  </td>
                  <td className={`searchable`}>
                    {editId === filter._id &&
                      editSpecification &&
                      editValue && <button onClick={handleEdit}>Edit</button>}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      <div style={{ margin: "10px 0", textAlign: "center" }}>
        <h3>Pagination</h3>
        <div style={{ margin: "10px 0" }}>
          <button
            disabled={paginations.currentPage === 1}
            onClick={() =>
              setPaginations((prev) => ({
                ...prev,
                currentPage: prev.currentPage - 1,
              }))
            }
          >
            Previous
          </button>
          <span style={{ margin: "10px" }}>
            Page {paginations.currentPage} of {paginations.totalPages}
          </span>
          <button
            disabled={paginations.currentPage === paginations.totalPages}
            onClick={() =>
              setPaginations((prev) => ({
                ...prev,
                currentPage: prev.currentPage + 1,
              }))
            }
          >
            Next
          </button>
        </div>
        <div>
          Showing {paginations.currentPage * paginations.itemsPerPage - 10 + 1}{" "}
          to {paginations.currentPage * paginations.itemsPerPage} of{" "}
          {paginations.totalItems}
        </div>
      </div>
      <div style={{ margin: "1rem" }}>
        <h3>Add Filter</h3>
        <select
          value={JSON.stringify(addSpecification)}
          onChange={(e) => handleAddSelect(JSON.parse(e.target.value))}
        >
          <option value="">Specification</option>
          {specifications?.map((value) => (
            <option key={value._id} value={JSON.stringify(value)}>
              {value.name}
            </option>
          ))}
        </select>
        <input
          type="text"
          placeholder="Value"
          onChange={(e) => valueAddChange(e.target.value)}
          value={addValue}
        />
        {addSpecification && addValue && (
          <button onClick={handleAdd}>Add</button>
        )}
      </div>
    </div>
  );
}
