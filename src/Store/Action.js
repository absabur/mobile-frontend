// Action.js
export const getHeadings = () => async (dispatch) => {
  try {
    const response = await fetch("http://localhost:8000/api/category", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });

    const data = await response.json();
    dispatch({
      type: "GET_HEADINGS",
      payload: data,
    });
  } catch (error) {
    console.error("Error fetching headings:", error);
  }
};

export const addHeadingFunc = (name) => async (dispatch) => {
  try {
    const response = await fetch("http://localhost:8000/api/category/new", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include", // Include cookies
      cache: "no-store",
      body: JSON.stringify({ name }), // Serialize the body
    });

    const data = await response.json();

    dispatch({
      type: "GET_HEADINGS",
      payload: data,
    });
  } catch (error) {
    console.error("Error fetching headings:", error);
  }
};
export const editHeadingAction =
  ({ id, value }) =>
  async (dispatch) => {
    try {
      const response = await fetch(`http://localhost:8000/api/category/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // Include cookies
        cache: "no-store",
        body: JSON.stringify({ name: value }), // Serialize the body
      });

      const data = await response.json();

      dispatch({
        type: "GET_HEADINGS",
        payload: data,
      });
    } catch (error) {
      console.error("Error fetching headings:", error);
    }
  };

export const getSpecifications = () => async (dispatch) => {
  try {
    const response = await fetch(
      "http://localhost:8000/api/specificationName",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        cache: "no-store",
      }
    );

    const data = await response.json();
    dispatch({
      type: "GET_SPECIFICATION",
      payload: data.specificationNames,
    });
  } catch (error) {
    console.error("Error fetching spcification:", error);
  }
};

export const addSpecificationFunc =
  (name, heading, placeholder, label, multiple) => async (dispatch) => {
    try {
      let data = {
        name,
        categoryId: heading._id,
        categoryValue: heading.name,
        placeholder,
        label,
        multiple,
      };

      const response = await fetch(
        "http://localhost:8000/api/specificationName/new",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include", // Include cookies
          cache: "no-store",
          body: JSON.stringify(data), // Serialize the body
        }
      );
      const res = await response.json();

      dispatch({
        type: "GET_SPECIFICATION",
        payload: res.specificationNames,
      });
    } catch (error) {
      console.error("Error fetching spcification:", error);
    }
  };
export const editSpecificationAction =
  (name, heading, id, placeholder, label, multiple) => async (dispatch) => {
    try {
      let data = {
        name,
        categoryId: heading._id,
        categoryValue: heading.name,
        placeholder,
        label,
        multiple,
      };
      const response = await fetch(
        `http://localhost:8000/api/specificationName/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include", // Include cookies
          cache: "no-store",
          body: JSON.stringify(data), // Serialize the body
        }
      );

      const res = await response.json();
      console.log(res);

      dispatch({
        type: "GET_SPECIFICATION",
        payload: res.specificationNames,
      });
    } catch (error) {
      console.error("Error fetching spcification:", error);
    }
  };

export const getFiltersAction = () => async (dispatch) => {
  try {
    const response = await fetch("http://127.0.0.1:8000/api/filter-values", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });

    const data = await response.json();

    dispatch({
      type: "GET_FILTERS",
      payload: data.filterValues,
    });
  } catch (error) {
    console.error("Error fetching spcification:", error);
  }
};

export const addFilterFunc = (spec, value) => async (dispatch) => {
  try {
    let data = {
      value,
      categoryId: spec.categoryId,
      categoryValue: spec.categoryValue,
      specId: spec._id,
      specValue: spec.name,
    };
    const response = await fetch(
      "http://localhost:8000/api/filter-values/new",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // Include cookies
        cache: "no-store",
        body: JSON.stringify(data), // Serialize the body
      }
    );
    const res = await response.json();

    dispatch({
      type: "GET_FILTERS",
      payload: res.filterValues,
    });
  } catch (error) {
    console.error("Error fetching spcification:", error);
  }
};
export const editFilterAction = (id, spec, value) => async (dispatch) => {
  try {
    let data = {
      value,
      categoryId: spec.categoryId,
      categoryValue: spec.categoryValue,
      specId: spec._id,
      specValue: spec.name,
    };

    const response = await fetch(
      `http://localhost:8000/api/filter-values/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // Include cookies
        cache: "no-store",
        body: JSON.stringify(data), // Serialize the body
      }
    );

    const res = await response.json();

    dispatch({
      type: "GET_FILTERS",
      payload: res.filterValues,
    });
  } catch (error) {
    console.error("Error fetching spcification:", error);
  }
};

export const getBrandAction = () => async (dispatch) => {
  try {
    const response = await fetch("http://localhost:8000/api/brand", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });

    const data = await response.json();
    dispatch({
      type: "GET_BRAND",
      payload: data.brand,
    });
  } catch (error) {
    console.error("Error fetching headings:", error);
  }
};

export const addBrandAction = (name) => async (dispatch) => {
  try {
    const response = await fetch("http://localhost:8000/api/brand/new", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include", // Include cookies
      cache: "no-store",
      body: JSON.stringify({ name }), // Serialize the body
    });

    const data = await response.json();
    dispatch({
      type: "GET_BRAND",
      payload: data.brand,
    });
  } catch (error) {
    console.error("Error fetching headings:", error);
  }
};
export const editBrandAction = (id, name) => async (dispatch) => {
  try {
    const response = await fetch(`http://localhost:8000/api/brand/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include", // Include cookies
      cache: "no-store",
      body: JSON.stringify({ name }), // Serialize the body
    });

    const data = await response.json();

    dispatch({
      type: "GET_BRAND",
      payload: data.brand,
    });
  } catch (error) {
    console.error("Error fetching headings:", error);
  }
};

export const loginAction = () => async (dispatch) => {
  try {
    const response = await fetch("http://localhost:8000/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ email: "test@test.test", password: "aaaaaa" }),
    });

    const data = await response.json();

    dispatch({
      type: "LOGIN",
    });
  } catch (error) {
    console.error("Error login:", error);
  }
};

export const getSpecificationAction = () => async (dispatch) => {
  try {
    const response = await fetch(
      "http://127.0.0.1:8000/api/phone/specs-table",
      {
        method: "GET",
        credentials: "include", // This is essential to send cookies
        cache: "no-store",
      }
    );

    const data = await response.json();

    dispatch({
      type: "GET_SPECIFICATION",
      payload: data.specifications,
    });
  } catch (error) {
    console.error("Error login:", error);
  }
};

export const addPhoneAction = (value) => async (dispatch) => {
  try {
    const response = await fetch("http://localhost:8000/api/phone/new", {
      method: "POST",
      // Remove the Content-Type header
      // The browser will set it automatically when sending FormData
      credentials: "include", // Include cookies
      cache: "no-store",
      body: value, // Directly send the FormData
    });

    const res = await response.json();
    console.log(res);

    if (!response.ok) {
      throw new Error(res.message || "Failed to add phone");
    }

    dispatch({
      type: "add-edit", // Note: Make sure this action type is correct
      payload: res.phone,
    });
  } catch (error) {
    console.error("Error fetching specification:", error);
  }
};
export const editPhoneAction = (id, value) => async (dispatch) => {
  try {
    const response = await fetch(`http://localhost:8000/api/phone/${id}`, {
      method: "PUT",
      // Remove the Content-Type header
      // The browser will set it automatically when sending FormData
      credentials: "include", // Include cookies
      cache: "no-store",
      body: value, // Directly send the FormData
    });

    const res = await response.json();
    console.log(res);

    if (!response.ok) {
      throw new Error(res.message || "Failed to edit phone");
    }

    dispatch({
      type: "add-edit", // Note: Make sure this action type is correct
      payload: res.phone,
    });
  } catch (error) {
    console.error("Error fetching specification:", error);
  }
};

export const getSearchPhone = (value) => async (dispatch) => {
  try {
    const response = await fetch(
      `http://localhost:8000/api/phone?search=${value}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // Include cookies
        cache: "no-store",
      }
    );
    const res = await response.json();
    dispatch({
      type: "GET_SEARCH_PHONES", // Note: Make sure this action type is correct
      payload: res.phones,
    });
  } catch (error) {
    console.error("Error fetching specification:", error);
  }
};
export const getFilterPhones =
  ({ brand, filter, price }) =>
  async (dispatch) => {
    try {
      const response = await fetch(
        `http://localhost:8000/api/phone?brand=${JSON.stringify(
          brand
        )}&filter=${JSON.stringify(filter)}&price=${JSON.stringify(price)}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include", // Include cookies
          cache: "no-store",
        }
      );
      const res = await response.json();
      dispatch({
        type: "GET_FILTER_PHONES", // Note: Make sure this action type is correct
        payload: res.phones,
      });
    } catch (error) {
      console.error("Error fetching specification:", error);
    }
  };

export const fetchPhoneComparison = (phoneNames) => async (dispatch) => {
  try {
    const response = await fetch(
      `http://localhost:8000/api/phone/compare?phones=${phoneNames.join(",")}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // Include cookies
        cache: "no-store",
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch phone comparison data");
    }

    const data = await response.json();
    console.log(data);
    dispatch({
      type: "PHONE_COMPARISON",
      payload: data.specifications.phones,
    });
  } catch (error) {
    dispatch({
      type: "PHONE_COMPARISON",
      payload: [],
    });
    console.log(error);
  }
};
