"use client";

import {
  addHeadingFunc,
  editHeadingAction,
  getHeadings,
  loginAction,
} from "@/Store/Action";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function page() {
  const [addHeading, setAddHeading] = useState("");
  const [editHeading, setEditHeading] = useState({});
  const dispatch = useDispatch();
  const headings = useSelector((state) => state.headings);
  useEffect(() => {
    dispatch(getHeadings());

    // dispatch(loginAction());
  }, [dispatch, headings]);

  return (
    <div>
      <h1>Welcome to the Headings Page</h1>
      <div style={{ margin: "1rem" }}>
        <h3>Add a heading</h3>
        <input
          value={addHeading}
          onChange={(e) => setAddHeading(e.target.value)}
          type="text"
          placeholder="Heading Name"
        />
        <button onClick={() => dispatch(addHeadingFunc(addHeading))}>
          Add
        </button>
      </div>
      <div>
        <table>
          <thead>
            <tr>
              <th>Category Id</th>
              <th>Category Value</th>
              <th>Input</th>
              <th>Edit</th>
            </tr>
          </thead>
          <tbody>
            {headings.category?.map((cate) => (
              <tr key={cate._id}>
                <td className={`searchable`}>{cate._id}</td>
                <td className={`searchable`}>{cate.name}</td>
                <td>
                  <input
                    type="text"
                    placeholder="value"
                    onChange={(e) =>
                      setEditHeading({ id: cate._id, value: e.target.value })
                    }
                  />
                </td>
                <td className={`searchable`}>
                  {editHeading.id === cate._id && editHeading.value != "" && (
                    <button
                      onClick={() => dispatch(editHeadingAction(editHeading))}
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
    </div>
  );
}
