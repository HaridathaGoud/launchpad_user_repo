export const proposalsState = {
  status: "All",
  startDate: null,
  endDate: null,
  search: "",
  isFilterOpen: false,
  filtersApplied:false
};

export const proposalsReducer = (state: any, action: any) => {
  switch (action.type) {
    case "setStartDate":
      return { ...state, startDate: action.payload };
    case "setStatus":
      return { ...state, status: action.payload };
    case "setEndDate":
      return { ...state, endDate: action.payload };
    case "setSearch":
      return { ...state, search: action.payload };
    case "setIsFilterOpen":
      return { ...state, isFilterOpen: action.payload };
    case 'setFiltersApplied':
      return {...state,filtersApplied:action.payload}
    default:
      return state;
  }
};
