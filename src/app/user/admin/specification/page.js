"use client";

import {
  addSpecificationFunc,
  editSpecificationAction,
  getHeadings,
  getSpecifications,
} from "@/Store/Action";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function page() {
  const { headings, specifications } = useSelector((state) => state);

  const [addSpecification, setAddSpecification] = useState("");
  const [addCategory, setAddCategory] = useState("");
  const [addPlaceholder, setAddPlaceholder] = useState("");
  const [addLabel, setAddLabel] = useState("");
  const [addMultiple, setAddMultiple] = useState(Boolean);

  const [editSpecification, setEditSpecification] = useState("");
  const [editCategory, setEditCategory] = useState({});
  const [editPlaceholder, setEditPlaceholder] = useState("");
  const [editLabel, setEditLabel] = useState("");
  const [editMultiple, setEditMultiple] = useState("");

  const [id, setId] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getHeadings());
    dispatch(getSpecifications());
  }, [dispatch]);

  useEffect(() => {
    setAddSpecification("");
    setAddPlaceholder("");
    setAddLabel("");
    setAddMultiple(false);
    setEditCategory({});
    setEditSpecification("");
    setEditPlaceholder("");
    setEditLabel("");
    setEditMultiple("");
    setId("");
  }, [specifications]);

  const handleValueChange = (e, id) => {
    setEditSpecification(e.target.value);
    setId(id);
    if (!e.target.value) {
      setId("");
    }
  };
  const handleHeadingChange = (e, id) => {
    setEditCategory(e.target.value && JSON.parse(e.target.value));
    setId(id);
    if (!e.target.value) {
      setId("");
    }
  };

  return (
    <div>
      <h1>Welcome to the Specifications Page</h1>

      <div>
        <table>
          <thead>
            <tr>
              <th>Category Id</th>
              <th>Category Value</th>
              <th>Specification Id</th>
              <th>Specification Value</th>
              <th>Placeholder</th>
              <th>Label</th>
              <th>Multiple</th>
              <th>Specification Input</th>
              <th>Edit</th>
            </tr>
          </thead>
          <tbody>
            {specifications?.map((spec) => (
              <tr key={spec._id}>
                <td className={`searchable`}>{spec?.categoryId}</td>
                <td className={`searchable`}>{spec?.categoryValue}</td>
                <td className={`searchable`}>{spec?._id}</td>
                <td className={`searchable`}>{spec?.name}</td>
                <td className={`searchable`}>{spec?.placeholder}</td>
                <td className={`searchable`}>{spec?.label}</td>
                <td className={`searchable`}>{spec?.multiple?.toString()}</td>
                <td>
                  <div>
                    <select
                      value={
                        id === spec._id ? JSON.stringify(editCategory) : ""
                      }
                      onChange={(e) => handleHeadingChange(e, spec._id)}
                    >
                      <option value="">Select a Category</option>
                      {headings.category?.map((category) => (
                        <option
                          key={category._id}
                          value={JSON.stringify(category)}
                        >
                          {category.name}
                        </option>
                      ))}
                    </select>
                    <input
                      value={id === spec._id ? editSpecification : ""}
                      onChange={(e) => handleValueChange(e, spec._id)}
                      type="text"
                      placeholder="Specification value"
                    />
                    <input
                      value={id === spec._id ? editPlaceholder : ""}
                      onChange={(e) => {
                        setEditPlaceholder(e.target.value);
                        setId(spec._id);
                        if (!e.target.value) {
                          setId("");
                        }
                      }}
                      type="text"
                      placeholder="Placeholder"
                    />
                    <input
                      value={id === spec._id ? editLabel : ""}
                      onChange={(e) => {
                        setEditLabel(e.target.value);
                        setId(spec._id);
                        if (!e.target.value) {
                          setId("");
                        }
                      }}
                      type="text"
                      placeholder="label"
                    />
                    <label>Multiple: </label>
                    <select
                      onChange={(e) => {
                        setEditMultiple(e.target.value);
                        setId(spec._id);
                      }}
                    >
                      <option value="">Select</option>
                      <option value={"false"}>No</option>
                      <option value={"true"}>Yes</option>
                    </select>
                  </div>
                </td>
                <td className={`searchable`}>
                  {id === spec._id && (
                    <button
                      onClick={() =>
                        dispatch(
                          editSpecificationAction(
                            editSpecification,
                            editCategory,
                            spec._id,
                            editPlaceholder,
                            editLabel,
                            editMultiple
                          )
                        )
                      }
                    >
                      Edit
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div style={{ margin: "1rem" }}>
        <h3>Add a spec</h3>
        <select
          onChange={(e) =>
            setAddCategory(e.target.value && JSON.parse(e.target.value))
          }
        >
          <option value="">Select a Category</option>
          {headings.category?.map((category) => (
            <option key={category._id} value={JSON.stringify(category)}>
              {category.name}
            </option>
          ))}
        </select>
        <input
          value={addSpecification}
          onChange={(e) => setAddSpecification(e.target.value)}
          type="text"
          placeholder="Specification Name"
        />
        <input
          value={addPlaceholder}
          onChange={(e) => setAddPlaceholder(e.target.value)}
          type="text"
          placeholder="Placeholder"
        />
        <input
          value={addLabel}
          onChange={(e) => setAddLabel(e.target.value)}
          type="text"
          placeholder="label"
        />
        <label>Multiple: </label>
        <input
          checked={addMultiple} // Use 'checked' for checkboxes instead of 'value'
          onChange={(e) => setAddMultiple(e.target.checked)} // 'checked' gives the boolean value (true/false)
          type="checkbox"
        />
        <button
          onClick={() =>
            dispatch(
              addSpecificationFunc(
                addSpecification,
                addCategory,
                addPlaceholder,
                addLabel,
                addMultiple
              )
            )
          }
        >
          Add
        </button>
      </div>
    </div>
  );
}
