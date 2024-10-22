"use client";

import SearchSelect from "@/Components/SearchSelect";
import {
  addPhoneAction,
  getBrandAction,
  getSpecificationAction,
} from "@/Store/Action";
import { buildSpecifications } from "@/util";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function page() {
  const { specifications, brands } = useSelector((state) => state);
  const [varientCount, setVarientCount] = useState(1);
  const [images, setImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);
  const [phone, setPhone] = useState({
    name: "",
    price: [
      {
        varient: "",
        price: "",
        status: "",
      },
    ],
    brand: {
      id: "",
      name: "",
    },
    specifications,
  });
  const [specs, setSpecs] = useState([]);
  const [value, setValue] = useState([]);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getSpecificationAction());
    dispatch(getBrandAction());
  }, []);

  const post = () => {
    let specifications = buildSpecifications(specs, value);

    const myForm = new FormData();

    myForm.set("name", phone.name);
    myForm.set("price", JSON.stringify(phone.price));
    myForm.set("specifications", JSON.stringify(specifications));
    myForm.set(
      "brand",
      JSON.stringify({
        id: phone.brand._id,
        value: phone.brand.name,
      })
    );

    images.forEach((image) => {
      myForm.append("images", image);
    });

    dispatch(addPhoneAction(myForm));
  };

  const createProductImagesChange = (e) => {
    const files = Array.from(e.target.files);

    setImages([]);
    setImagesPreview([]);

    files.forEach((file) => {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setImagesPreview((old) => [...old, reader.result]);

          setImages((old) => [...old, reader.result]);
        }
      };

      reader.readAsDataURL(file);
    });
  };

  const isChecked = (id) => specs.find((spec) => spec._id === id);
  const handleCheckboxChange = (e, value) => {
    const isChecked = e.target.checked;

    setSpecs((prevSpecs) => {
      if (isChecked) {
        // Add the object if checked and not already present
        if (!prevSpecs.some((spec) => spec._id === value._id)) {
          return [...prevSpecs, value];
        }
      } else {
        // Remove the object if unchecked
        return prevSpecs.filter((spec) => spec._id !== value._id);
      }
      return prevSpecs;
    });
  };

  const getCurrentValue = (categoryId, specKeyId) => {
    const existingSpec = value.find(
      (spec) => spec.categoryId === categoryId && spec.specKeyId === specKeyId
    );
    return existingSpec ? existingSpec.value : "";
  };
  const handleInputChange = (e, specObject) => {
    const inputValue = e.target.value;

    setValue((prevSpecs) => {
      const existingIndex = prevSpecs.findIndex(
        (spec) =>
          spec.categoryId === specObject.categoryId &&
          spec.specKeyId === specObject.specKeyId
      );

      if (inputValue) {
        // If the input is not empty, add or update the value in the state
        if (existingIndex !== -1) {
          // Update existing entry
          const updatedSpecs = [...prevSpecs];
          updatedSpecs[existingIndex] = {
            ...updatedSpecs[existingIndex],
            value: inputValue,
          };
          return updatedSpecs;
        } else {
          // Add a new entry
          return [
            ...prevSpecs,
            {
              ...specObject,
              value: inputValue,
            },
          ];
        }
      } else {
        // If the input is empty, remove the entry from the state
        if (existingIndex !== -1) {
          const updatedSpecs = [...prevSpecs];
          updatedSpecs.splice(existingIndex, 1);
          return updatedSpecs;
        }
      }

      return prevSpecs;
    });
  };

  const removePriceAtIndex = (index) => {
    setPhone((prevPhone) => ({
      ...prevPhone,
      price: prevPhone.price.filter((_, i) => i !== index), // Remove the element at the specified index
    }));
    setVarientCount(varientCount - 1);
  };

  return (
    <div>
      <h1 style={{ textAlign: "center", marginTop: "10px" }}>Add a phone</h1>
      <div className="add-phone-form">
        <input
          value={phone?.name}
          type="text"
          placeholder="Enter phone name"
          onChange={(e) => setPhone({ ...phone, name: e.target.value })}
        />
        <div className="varients-input">
          {Array(varientCount)
            .fill()
            .map((_, index) => (
              <div className="price-inputs" key={index}>
                <h4 className="price-input-heading">
                  <span>Price</span>
                  {!phone.price[index]?.varient &&
                    !phone.price[index]?.price &&
                    !phone.price[index]?.status &&
                    index >= 1 && (
                      <button
                        className="varient-decrease"
                        onClick={() => removePriceAtIndex(index)}
                      >
                        X
                      </button>
                    )}
                </h4>
                <input
                  value={phone?.price?.[index]?.varient}
                  type="text"
                  placeholder="6GB + 128GB"
                  onChange={(e) => {
                    const updatedPrice = [...phone.price];
                    updatedPrice[index] = {
                      ...updatedPrice[index],
                      varient: e.target.value,
                    };

                    setPhone({
                      ...phone,
                      price: updatedPrice,
                    });
                  }}
                />
                <input
                  value={phone?.price?.[index]?.price}
                  type="text"
                  placeholder="119990"
                  onChange={(e) => {
                    const updatedPrice = [...phone.price];
                    updatedPrice[index] = {
                      ...updatedPrice[index],
                      price: e.target.value,
                    };

                    setPhone({
                      ...phone,
                      price: updatedPrice,
                    });
                  }}
                />

                <input
                  value={phone?.price?.[index]?.status}
                  type="text"
                  placeholder="Official"
                  onChange={(e) => {
                    const updatedPrice = [...phone.price];
                    updatedPrice[index] = {
                      ...updatedPrice[index],
                      status: e.target.value,
                    };

                    setPhone({
                      ...phone,
                      price: updatedPrice,
                    });
                  }}
                />
              </div>
            ))}
          <button
            className="add-varient"
            onClick={() => setVarientCount(varientCount + 1)}
          >
            + Add Varient
          </button>
        </div>
        <select
          value={JSON.stringify(phone?.brand)}
          onChange={(e) =>
            setPhone({
              ...phone,
              brand: JSON.parse(e.target.value),
            })
          }
        >
          <option value="">Select Brand</option>
          {brands?.map((brand) => (
            <option key={brand._id} value={JSON.stringify(brand)}>
              {brand.name}
            </option>
          ))}
        </select>
        <div className="createProductFormFile">
          <label htmlFor="avatar">Product Images</label>
          <input
            type="file"
            name="avatar"
            accept="image/*"
            onChange={createProductImagesChange}
            multiple
          />
          <p style={{ color: "rgb(153, 153, 0)", margin: "5px" }}>
            Image should be less than 700kb
          </p>
        </div>

        <div className="createProductFormImage">
          {imagesPreview.map((image, index) => (
            <img
              key={index}
              src={image}
              alt="Product Preview"
              className="productImages"
            />
          ))}
        </div>
      </div>

      <div style={{ width: "100%" }}>
        {specifications?.map((specification) => (
          <div
            style={{
              marginBottom: "20px",
              padding: "10px",
              backgroundColor: "rgba(200,200,200,0.3)",
              boxShadow: "0 0 5px black",
              borderRadius: "10px",
            }}
            key={specification._id}
          >
            <h2
              style={{
                width: "100%",
                backgroundColor: "aqua",
                padding: "10px",
              }}
              className={`searchable`}
            >
              {specification.categoryValue}
            </h2>
            <div>
              {specification.specs?.map((spec) => (
                <div
                  style={{
                    padding: "10px",
                    borderBottom: "1px solid black",
                    width: "100%",
                    display: "flex",
                    gap: "10px",
                  }}
                  key={spec?.specKeyId}
                >
                  <div
                    style={{
                      flex: "1",
                      display: "flex",
                      justifyContent: "flex-start",
                      flexDirection: "column",
                    }}
                  >
                    <h3 className={`searchable`}>{spec?.specKey}</h3>

                    {spec?.filterValues.length > 0 && (
                      <>
                        <SearchSelect classId={spec?.specKeyId} />
                        <span className="selected-checkbox">
                          {
                            specs.filter((s) => s.specKeyId === spec.specKeyId)
                              .length
                          }{" "}
                          item selected
                        </span>
                      </>
                    )}
                    <div
                      style={{
                        height: "100%",
                        overflow: "auto",
                        padding: "10px",
                        maxHeight: "150px",
                      }}
                    >
                      {spec?.filterValues?.map((value) => (
                        <div
                          style={{
                            padding: "5px",
                            backgroundColor: "#00000010",
                            marginBottom: "5px",
                          }}
                          key={value.filterId}
                        >
                          <input
                            type="checkbox"
                            checked={isChecked(value.filterId)}
                            onChange={(e) =>
                              handleCheckboxChange(e, {
                                categoryId: specification.categoryId,
                                categoryValue: specification.categoryValue,
                                specKeyId: spec.specKeyId,
                                specKey: spec.specKey,
                                value: value.filterValue,
                                _id: value.filterId,
                              })
                            }
                          />
                          <span
                            className={`searchable select${spec?.specKeyId}`}
                          >
                            {value.filterValue}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div
                    style={{
                      flex: "1",
                      display: "flex",
                      justifyContent: "center",
                      flexDirection: "column",
                    }}
                  >
                    <label>{spec?.label}:</label>
                    <textarea
                      placeholder={spec?.placeholder || "Enter text here"}
                      rows={10}
                      value={getCurrentValue(
                        specification.categoryId,
                        spec.specKeyId
                      )}
                      style={{
                        resize: "none",
                        marginTop: "10px",
                        padding: "10px",
                        flex: "1",
                        borderRadius: "10px",
                      }}
                      onChange={(e) =>
                        handleInputChange(e, {
                          categoryId: specification.categoryId,
                          categoryValue: specification.categoryValue,
                          specKeyId: spec.specKeyId,
                          specKey: spec.specKey,
                        })
                      }
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <button className="post-btn" onClick={post}>
        Post
      </button>
    </div>
  );
}
