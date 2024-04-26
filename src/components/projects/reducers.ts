export const allocationState = {
  allocations: null,
  shouldOpenDrawer: false,
  drawerStep: 1,
  hide: false,
  allocationVolume: 0,
  volumeData: null,
  buyAmount: null,
  amountError: "",
  isBuying: false,
  isPublic:false,
};

export const allocationsReducer = (state = allocationState, action) => {
  switch (action.type) {
    case "setAllocations":
      return { ...state, allocations: action.payload };
    case "setShouldOpenDrawer":
      return { ...state, shouldOpenDrawer: action.payload };
    case "setDrawerStep":
      return { ...state, drawerStep: action.payload };
    case "setHide":
      return { ...state, hide: action.payload };
    case "setIsPublic":
      return {...state,isPublic:action.payload}
    case "setAllocationVolume":
      return { ...state, allocationVolume: action.payload };
    case "setVolumeData":
      return { ...state, volumeData: action.payload };
    case "setBuyAmount":
      return { ...state, buyAmount: action.payload };
    case "setAmountError":
      return { ...state, amountError: action.payload };
    case "setIsBuying":
      return { ...state, isBuying: action.payload };
    default:
      return { ...state };
  }
};
