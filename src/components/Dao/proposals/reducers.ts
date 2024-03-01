export const proposalsState = {
  status: "All",
  startDate: null,
  endDate: null,
};

export const proposalsReducer = (state: any, action: any) => {
  switch (action.type) {
    case "setStartDate":
      return { ...state, startDate: action.payload };
    case "setStatus":
      return { ...state, status: action.payload };
    case "setEndDate":
      return { ...state, endDate: action.payload };
    default:
      return state;
  }
};
