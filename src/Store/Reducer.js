const initialState = {
  name: "MobileSpecs",
  compareChanges: new Date(),
  headings: [],
  specifications: [],
  filters: [],
  brands: [],
  specifications: [],
  searchPhones: [],
  filterPhones: [],
  comparison: [],
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_HEADINGS":
      return {
        ...state,
        headings: action.payload,
      };
    case "GET_SPECIFICATION":
      return {
        ...state,
        specifications: action.payload,
      };
    case "GET_FILTERS":
      return {
        ...state,
        filters: action.payload,
      };
    case "GET_BRAND":
      return {
        ...state,
        brands: action.payload,
      };
    case "GET_SPECIFICATION":
      return {
        ...state,
        specifications: action.payload,
      };
    case "GET_SEARCH_PHONES":
      return {
        ...state,
        searchPhones: action.payload,
      };
    case "GET_FILTER_PHONES":
      return {
        ...state,
        filterPhones: action.payload,
      };
    case "PHONE_COMPARISON":
      return {
        ...state,
        comparison: action.payload,
        compareChanges: new Date(),
      };
    default:
      return state;
  }
};
